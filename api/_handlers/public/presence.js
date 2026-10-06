import { cors, getServiceClient, json, readBody } from '../../_lib/supabaseAdmin.js'
import { deviceFromUa } from '../../_lib/notify.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) return json(res, 401, { error: 'Unauthorized' })

    const body = await readBody(req)
    const supabase = getServiceClient()
    const { data: authData, error } = await supabase.auth.getUser(token)
    if (error || !authData?.user) return json(res, 401, { error: 'Unauthorized' })

    const user = authData.user
    const status = body.status === 'offline' ? 'offline' : 'online'
    const now = new Date().toISOString()
    const device = deviceFromUa(body.device || req.headers['user-agent'])
    const { data: prev } = await supabase
      .from('user_presence')
      .select('login_count, last_login')
      .eq('user_id', user.id)
      .maybeSingle()

    const row = {
      user_id: user.id,
      email: user.email || null,
      full_name: user.user_metadata?.full_name || null,
      status,
      last_seen: now,
      device: device.device,
      browser: device.browser,
      role: 'user',
    }
    if (status === 'online' && body.login) {
      row.last_login = now
      row.login_count = (prev?.login_count || 0) + 1
    }

    const { error: upsertError } = await supabase.from('user_presence').upsert(row, { onConflict: 'user_id' })
    if (upsertError) return json(res, 200, { ok: false })
    return json(res, 200, { ok: true, status })
  } catch {
    return json(res, 200, { ok: false })
  }
}
