import { cors, getServiceClient, json, readBody } from '../../_lib/supabaseAdmin.js'

function refCode() {
  return `LTX-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  try {
    const body = await readBody(req)
    if (body.website_url_hp) return json(res, 200, { ok: true })

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()
    const subject = String(body.subject || 'Contact form').trim()

    if (!name || !email || !message) {
      return json(res, 400, { error: 'name, email and message required' })
    }

    const supabase = getServiceClient()
    const reference_code = refCode()

    await supabase.from('contact_messages').insert({
      name,
      email,
      phone: body.phone || null,
      subject,
      message,
      status: 'new',
    })

    await supabase.from('leads').insert({
      reference_code,
      name,
      email,
      phone: body.phone || null,
      project_description: `${subject}\n\n${message}`,
      project_type: 'contact',
      customer_type: 'other',
      source: 'contact-form',
      status: 'NEW',
    })

    await supabase.from('analytics_events').insert({
      event_name: 'contact_submit',
      path: '/contact',
      meta: { reference_code },
    })

    return json(res, 201, {
      ok: true,
      reference_code,
      message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.',
    })
  } catch {
    return json(res, 500, { error: 'Could not send message' })
  }
}
