import { cors, getDbClient, json, readBody } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
  try {
    const body = await readBody(req)
    if (body.website_url_hp) return json(res, 200, { ok: true })
    if (!body.email || !body.subject || !body.message) {
      return json(res, 400, { error: 'E-posta, konu ve mesaj gerekli.' })
    }
    const supabase = getDbClient()
    const reference = `TCK-${Date.now().toString().slice(-6)}`
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        reference_code: reference,
        customer_name: body.name || null,
        customer_email: body.email,
        subject: String(body.subject).slice(0, 180),
        category: body.category || 'General',
        priority: body.priority || 'NORMAL',
        status: 'OPEN',
      })
      .select('id, reference_code')
      .single()
    if (error) return json(res, 500, { error: error.message })
    await supabase.from('support_messages').insert({
      ticket_id: data.id,
      sender_type: 'customer',
      sender_email: body.email,
      body: String(body.message).slice(0, 4000),
    })
    await supabase.from('admin_notifications').insert({
      type: 'ticket',
      title: 'Yeni destek talebi',
      body: reference,
      href: '/support/tickets',
    })
    await supabase.from('analytics_events').insert({ event_name: 'ticket_created', path: '/destek', meta: { reference } })
    return json(res, 201, { ok: true, reference_code: reference })
  } catch (e) {
    return json(res, 500, { error: e.message || 'Ticket failed' })
  }
}
