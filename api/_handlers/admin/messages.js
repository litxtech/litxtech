import { cors, getServiceClient, json, readBody, requireAdmin, writeAudit } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      if (error) return json(res, 500, { error: 'Could not load messages' })
      return json(res, 200, { messages: data || [] })
    }

    if (req.method === 'PATCH') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const patch = {}
      if (body.status) patch.status = body.status
      if (body.admin_notes !== undefined) patch.admin_notes = body.admin_notes
      const { data, error } = await supabase
        .from('contact_messages')
        .update(patch)
        .eq('id', body.id)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'MESSAGE_UPDATED',
        resource: 'contact_messages',
        resource_id: body.id,
      })
      return json(res, 200, { message: data })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
