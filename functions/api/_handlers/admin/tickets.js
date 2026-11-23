import { cors, getServiceClient, json, readBody, requireAdmin, writeAudit } from '../../_lib/supabaseAdmin.js'

function ticketRef() {
  return `TCK-${Date.now().toString().slice(-6)}`
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*, support_messages(*)')
        .order('created_at', { ascending: false })
        .limit(100)
      if (error) return json(res, 500, { error: 'Could not load tickets' })
      return json(res, 200, { tickets: data || [] })
    }

    if (req.method === 'POST') {
      const body = await readBody(req)
      if (!body.customer_email || !body.subject) {
        return json(res, 400, { error: 'customer_email and subject required' })
      }
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          reference_code: ticketRef(),
          customer_name: body.customer_name || null,
          customer_email: body.customer_email,
          subject: body.subject,
          category: body.category || 'General',
          priority: body.priority || 'NORMAL',
          status: 'OPEN',
          assigned_to: admin.id,
        })
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Create failed' })
      if (body.body) {
        await supabase.from('support_messages').insert({
          ticket_id: data.id,
          sender_type: 'admin',
          sender_email: admin.email,
          body: body.body,
        })
      }
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'TICKET_CREATED',
        resource: 'support_tickets',
        resource_id: data.id,
      })
      return json(res, 201, { ticket: data })
    }

    if (req.method === 'PATCH') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const patch = { updated_at: new Date().toISOString() }
      if (body.status) patch.status = body.status
      if (body.priority) patch.priority = body.priority
      if (body.assigned_to !== undefined) patch.assigned_to = body.assigned_to
      const { data, error } = await supabase
        .from('support_tickets')
        .update(patch)
        .eq('id', body.id)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })
      if (body.reply) {
        await supabase.from('support_messages').insert({
          ticket_id: body.id,
          sender_type: 'admin',
          sender_email: admin.email,
          body: body.reply,
        })
      }
      return json(res, 200, { ticket: data })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
