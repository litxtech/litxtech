// Cloudflare Pages projesine ortam değişkenlerini yazar.
// wrangler OAuth token'ını yerel config'ten okur, hiçbir sırrı ekrana basmaz.
import fs from 'fs'
import os from 'os'
import path from 'path'

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'acf99dc4d05885166e2c3300aff7b2ef'
const PROJECT = process.env.CF_PAGES_PROJECT || 'litxtechweb'

function findToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN
  const candidates = [
    path.join(os.homedir(), 'AppData', 'Roaming', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), 'AppData', 'Roaming', '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), '.config', '.wrangler', 'config', 'default.toml'),
  ]
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    const text = fs.readFileSync(file, 'utf8')
    const oauth = text.match(/oauth_token\s*=\s*"([^"]+)"/)
    if (oauth) return oauth[1]
    const api = text.match(/api_token\s*=\s*"([^"]+)"/)
    if (api) return api[1]
  }
  throw new Error('Cloudflare token bulunamadı (wrangler login gerekli)')
}

function readEnv(file) {
  if (!fs.existsSync(file)) return {}
  const out = {}
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(.*))$/)
    if (!m) continue
    const value = (m[2] ?? m[3] ?? m[4] ?? '').trim()
    if (value) out[m[1]] = value
  }
  return out
}

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..')
const envLocal = readEnv(path.join(root, '.env.local'))
const envVercel = readEnv(path.join(root, '.env.vercel.pull'))
const merged = { ...envVercel, ...envLocal }

const SUPABASE_URL = merged.SUPABASE_URL || merged.VITE_SUPABASE_URL
const ANON = merged.SUPABASE_ANON_KEY || merged.VITE_SUPABASE_ANON_KEY
// Secret keys are never hardcoded: pass them through the environment or
// `.env.local` (which stays untracked).
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || merged.SUPABASE_SERVICE_ROLE_KEY

const vars = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY: ANON,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE,
  VITE_SUPABASE_URL: SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: ANON,
  VITE_PUBLIC_SITE_URL: 'https://litxtech.com',
  VITE_ADMIN_SITE_URL: 'https://litxtech.com',
  ADMIN_SESSION_SECRET:
    merged.ADMIN_SESSION_SECRET ||
    'ltx-' + Buffer.from(`litx-admin-${SUPABASE_URL}`).toString('base64url').slice(0, 40),
  NODE_ENV: 'production',
  VERCEL: '1',
}
if (merged.STRIPE_SECRET_KEY) vars.STRIPE_SECRET_KEY = merged.STRIPE_SECRET_KEY
if (merged.VITE_STRIPE_PUBLISHABLE_KEY) vars.VITE_STRIPE_PUBLISHABLE_KEY = merged.VITE_STRIPE_PUBLISHABLE_KEY

const token = findToken()
const base = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`

async function cf(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text.slice(0, 500) }
  }
  if (!res.ok || body.success === false) {
    throw new Error(`${res.status} ${JSON.stringify(body.errors || body).slice(0, 800)}`)
  }
  return body.result
}

const project = await cf(base)
const prod = project.deployment_configs?.production || {}
const existing = prod.env_vars || {}

const nextVars = {}
for (const [key, entry] of Object.entries(existing)) {
  nextVars[key] = entry
}
for (const [key, value] of Object.entries(vars)) {
  if (!value) continue
  nextVars[key] = { value: String(value) }
}

const flags = new Set(prod.compatibility_flags || [])
flags.add('nodejs_compat')

await cf(base, {
  method: 'PATCH',
  body: JSON.stringify({
    deployment_configs: {
      production: {
        env_vars: nextVars,
        compatibility_flags: [...flags],
        compatibility_date: prod.compatibility_date || '2026-11-23',
      },
    },
  }),
})

const names = Object.keys(nextVars).sort()
console.log('yazılan değişkenler:', names.join(', '))
console.log('compatibility_flags:', [...flags].join(', '))
console.log('SUPABASE_URL:', vars.SUPABASE_URL)
console.log(
  'service key tipi:',
  SERVICE ? (SERVICE.startsWith('sb_secret_') ? 'secret (yeni)' : 'legacy JWT') : 'tanımsız',
)
