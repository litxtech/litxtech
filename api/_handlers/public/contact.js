import { cors, json, readBody } from '../../_lib/supabaseAdmin.js'
import { saveContactOrFallback } from '../../_lib/formInbox.js'

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

    const result = await saveContactOrFallback({
      name,
      email,
      phone: body.phone,
      subject,
      message,
    })

    return json(res, 201, {
      ok: true,
      reference_code: result.reference_code,
      message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.',
    })
  } catch (e) {
    return json(res, 500, {
      error: e?.message || 'Could not send message',
    })
  }
}
