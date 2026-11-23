// Pages projesine özel domain ekler (litxtech.com + www.litxtech.com).
// Zone aktif olduğunda CNAME kaydı otomatik oluşur.
import fs from 'fs'
import os from 'os'
import path from 'path'

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'acf99dc4d05885166e2c3300aff7b2ef'
const PROJECT = process.env.CF_PAGES_PROJECT || 'litxtechweb'
const DOMAINS = (process.env.CF_DOMAINS || 'litxtech.com,www.litxtech.com').split(',').map((d) => d.trim())

function findToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN
  const candidates = [
    path.join(os.homedir(), 'AppData', 'Roaming', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), '.config', '.wrangler', 'config', 'default.toml'),
  ]
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    const m = fs.readFileSync(file, 'utf8').match(/(?:oauth_token|api_token)\s*=\s*"([^"]+)"/)
    if (m) return m[1]
  }
  throw new Error('Cloudflare token bulunamadı')
}

const token = findToken()
const base = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`

for (const domain of DOMAINS) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: domain }),
  })
  const body = await res.json()
  if (body.success) {
    console.log(`eklendi   : ${domain} (status: ${body.result?.status || 'pending'})`)
  } else {
    const msg = (body.errors || []).map((e) => `${e.code} ${e.message}`).join('; ')
    if (/already|exists|duplicate/i.test(msg)) console.log(`zaten var : ${domain}`)
    else console.log(`hata      : ${domain} -> ${msg}`)
  }
}

const list = await fetch(base, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json())
if (list.success) {
  console.log('\nbağlı domainler:')
  for (const d of list.result || []) console.log(`  ${d.name}  ${d.status}`)
}
