import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

function supabaseUrl() {
  return env('SUPABASE_URL') || env('VITE_SUPABASE_URL')
}

function serviceKey() {
  return env('SUPABASE_SERVICE_ROLE_KEY')
}

function anonKey() {
  return env('SUPABASE_ANON_KEY') || env('VITE_SUPABASE_ANON_KEY')
}

export function getServiceClient() {
  const url = supabaseUrl()
  const key = serviceKey()
  if (!url || !key) {
    throw new Error(
      'Server Supabase not configured (set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY on Vercel)',
    )
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getAnonClient() {
  const url = supabaseUrl()
  const key = anonKey()
  if (!url || !key) {
    throw new Error('Anon Supabase not configured')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Prefer service role; fall back to anon for public writes when RLS allows. */
export function getDbClient() {
  const url = supabaseUrl()
  const service = serviceKey()
  const anon = anonKey()
  if (!url) throw new Error('SUPABASE_URL missing')
  if (service) {
    return createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  if (anon) {
    return createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  throw new Error('No Supabase keys configured')
}

export function isDbRestrictedError(err) {
  const msg = String(err?.message || err || '')
  const code = err?.code || err?.status || ''
  return (
    code === 402 ||
    code === '402' ||
    /402|Payment Required|exceed_storage|restricted|quota/i.test(msg)
  )
}

export function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export function parseCookies(req) {
  const header = req.headers.cookie || ''
  return Object.fromEntries(
    header
      .split(';')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const i = p.indexOf('=')
        return [decodeURIComponent(p.slice(0, i)), decodeURIComponent(p.slice(i + 1))]
      }),
  )
}

export function setAdminCookie(res, token, maxAgeSeconds = 60 * 60 * 12) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const parts = [
    `ltx_admin_session=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ]
  if (secure) parts.push('Secure')
  res.setHeader('Set-Cookie', parts.join('; '))
}

export function clearAdminCookie(res) {
  res.setHeader(
    'Set-Cookie',
    'ltx_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
  )
}

export async function requireAdmin(req, res) {
  try {
    const cookies = parseCookies(req)
    const token = cookies.ltx_admin_session
    if (!token) {
      json(res, 401, { error: 'Unauthorized' })
      return null
    }

    const supabase = getDbClient()
    const { data: sessionRows, error } = await supabase.rpc('validate_admin_session', {
      token,
    })

    let admin = null
    if (!error && sessionRows && sessionRows.length > 0) {
      const row = sessionRows[0]
      const { data: user } = await supabase
        .from('admin_users')
        .select('id, email, role, full_name, is_active, auth_user_id')
        .eq('id', row.admin_id)
        .single()
      admin = user
    } else {
      const { data: sess } = await supabase
        .from('admin_sessions')
        .select('admin_user_id, expires_at')
        .eq('session_token', token)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle()
      if (sess) {
        const { data: user } = await supabase
          .from('admin_users')
          .select('id, email, role, full_name, is_active, auth_user_id')
          .eq('id', sess.admin_user_id)
          .eq('is_active', true)
          .single()
        admin = user
      }
    }

    if (!admin || !admin.is_active) {
      json(res, 401, { error: 'Unauthorized' })
      return null
    }

    return admin
  } catch (e) {
    if (isDbRestrictedError(e)) {
      json(res, 503, {
        error:
          'Veritabanı kotası dolu (Supabase storage). Projeyi restore edin veya plan yükseltin.',
      })
      return null
    }
    json(res, 500, { error: 'Auth check failed' })
    return null
  }
}

export function isSuperAdmin(admin) {
  return admin?.role === 'SUPER_ADMIN' || admin?.role === 'super_admin'
}

export async function writeAudit(supabase, entry) {
  try {
    await supabase.from('audit_logs').insert({
      actor_id: entry.actor_id || null,
      actor_email: entry.actor_email || null,
      action: entry.action,
      resource: entry.resource || null,
      resource_id: entry.resource_id || null,
      old_value: entry.old_value || null,
      new_value: entry.new_value || null,
      ip_address: entry.ip_address || null,
      user_agent: entry.user_agent || null,
      result: entry.result || 'OK',
    })
  } catch {
    // non-fatal
  }
}

export function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 1_000_000) {
        reject(new Error('Payload too large'))
      }
    })
    req.on('end', () => {
      if (!data) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
  })
}

export function cors(req, res) {
  const origin = req.headers.origin || ''
  const allowed = [
    env('VITE_ADMIN_SITE_URL'),
    env('VITE_PUBLIC_SITE_URL'),
    'https://admin.litxtech.com',
    'https://www.litxtech.com',
    'https://litxtech.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ].filter(Boolean)

  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  }
}
