import { cors, getServiceClient, json, requireAdmin } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('system_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(250)
    if (error) return json(res, 500, { error: `Could not load audit log: ${error.message}` })

    const ids = Array.from(new Set((data || []).map((row) => row.admin_user_id).filter(Boolean)))
    let actors = {}
    if (ids.length) {
      const { data: admins } = await supabase
        .from('admin_users')
        .select('id, email, full_name')
        .in('id', ids)
      actors = Object.fromEntries((admins || []).map((row) => [row.id, row]))
    }

    const logs = (data || []).map((row) => ({
      ...row,
      actor_email: actors[row.admin_user_id]?.email || row.details?.actor_email || null,
      actor_name: actors[row.admin_user_id]?.full_name || null,
      resource: row.resource_type,
      resource_id: row.resource_id,
      old_value: row.details?.old_value ?? null,
      new_value: row.details?.new_value ?? null,
      result: row.details?.result || 'OK',
    }))

    return json(res, 200, { logs })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Server error' })
  }
}
