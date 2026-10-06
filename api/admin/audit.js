import { cors, getServiceClient, json, requireAdmin } from '../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) return json(res, 500, { error: 'Could not load audit log' })
    return json(res, 200, { logs: data || [] })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
