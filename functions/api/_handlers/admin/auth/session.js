import {
  clearAdminCookie,
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  setAdminCookie,
  writeAudit,
} from '../../../_lib/supabaseAdmin.js'

const SUPER_ADMIN_UUID = '26d4e301-9ae7-465d-805c-611ff302c04f'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})

  try {
    if (req.method === 'GET') {
      const admin = await requireAdmin(req, res)
      if (!admin) return
      return json(res, 200, {
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          full_name: admin.full_name,
          is_super_admin:
            admin.role === 'SUPER_ADMIN' ||
            admin.role === 'super_admin' ||
            admin.id === SUPER_ADMIN_UUID ||
            admin.auth_user_id === SUPER_ADMIN_UUID,
        },
      })
    }

    if (req.method === 'DELETE') {
      const cookies = (req.headers.cookie || '')
      const match = cookies.match(/ltx_admin_session=([^;]+)/)
      const token = match ? decodeURIComponent(match[1]) : null
      const supabase = getServiceClient()
      if (token) {
        // Live schema uses `token` (+ optional revoke); support both shapes
        await supabase.from('admin_sessions').update({ revoked: true }).eq('token', token)
        await supabase.from('admin_sessions').delete().eq('session_token', token)
      }
      clearAdminCookie(res)
      return json(res, 200, { ok: true })
    }

    if (req.method !== 'POST') {
      return json(res, 405, { error: 'Method not allowed' })
    }

    const body = await readBody(req)
    const accessToken = body.access_token
    if (!accessToken) {
      return json(res, 400, { error: 'access_token required' })
    }

    let supabase
    try {
      supabase = getServiceClient()
    } catch (cfgErr) {
      return json(res, 503, {
        error: cfgErr.message || 'Server Supabase not configured',
      })
    }
    const { data: authData, error: authError } = await supabase.auth.getUser(accessToken)
    if (authError || !authData?.user) {
      await supabase.from('login_attempts').insert({
        email: body.email || null,
        success: false,
        ip_address: req.headers['x-forwarded-for'] || null,
      })
      return json(res, 401, { error: 'Invalid credentials' })
    }

    const user = authData.user

    // Ensure super admin UUID is always privileged
    if (user.id === SUPER_ADMIN_UUID) {
      await supabase.from('admin_users').upsert(
        {
          id: SUPER_ADMIN_UUID,
          auth_user_id: SUPER_ADMIN_UUID,
          email: user.email,
          password_hash: 'supabase-auth-managed',
          full_name: 'LitxTech Super Admin',
          role: 'SUPER_ADMIN',
          is_active: true,
        },
        { onConflict: 'id' },
      )
    }

    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, role, full_name, is_active, auth_user_id')
      .or(`auth_user_id.eq.${user.id},id.eq.${user.id}`)
      .eq('is_active', true)
      .maybeSingle()

    if (adminError || !admin) {
      await supabase.from('login_attempts').insert({
        email: user.email,
        success: false,
        ip_address: req.headers['x-forwarded-for'] || null,
      })
      return json(res, 403, { error: 'Not an administrator' })
    }

    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
    const ua = req.headers['user-agent'] || null
    const ipRaw = req.headers['x-forwarded-for']
    const ip = Array.isArray(ipRaw) ? ipRaw[0] : String(ipRaw || '').split(',')[0].trim() || null

    // Production table columns: admin_id, username, token (not admin_user_id/session_token)
    let sessError = (
      await supabase.from('admin_sessions').insert({
        admin_id: admin.id,
        username: admin.email || 'admin',
        token: sessionToken,
        expires_at: expiresAt,
        ip_address: ip,
        user_agent: ua,
        revoked: false,
      })
    ).error

    // Fallback for legacy schema from supabase-admin-setup.sql
    if (sessError) {
      const legacy = await supabase.from('admin_sessions').insert({
        admin_user_id: admin.id,
        session_token: sessionToken,
        expires_at: expiresAt,
        ip_address: ip,
        user_agent: ua,
      })
      sessError = legacy.error
    }

    if (sessError) {
      console.error('admin_sessions insert failed:', sessError)
      return json(res, 500, {
        error: 'Session creation failed',
        detail: sessError.message || String(sessError.code || ''),
      })
    }

    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id)

    await supabase.from('login_attempts').insert({
      email: admin.email,
      success: true,
      ip_address: req.headers['x-forwarded-for'] || null,
    })

    await writeAudit(supabase, {
      actor_id: admin.id,
      actor_email: admin.email,
      action: 'LOGIN_SUCCESS',
      resource: 'admin_session',
      user_agent: req.headers['user-agent'] || null,
    })

    setAdminCookie(res, sessionToken)
    return json(res, 200, {
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        full_name: admin.full_name,
        is_super_admin:
          admin.role === 'SUPER_ADMIN' ||
          admin.role === 'super_admin' ||
          admin.id === SUPER_ADMIN_UUID,
      },
    })
  } catch (e) {
    return json(res, 500, { error: 'Server error' })
  }
}
