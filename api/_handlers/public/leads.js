import { cors, json, readBody } from '../../_lib/supabaseAdmin.js'
import { saveLeadOrFallback } from '../../_lib/formInbox.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  try {
    const body = await readBody(req)

    if (body.website_url_hp) {
      return json(res, 200, { ok: true, reference_code: 'LTX-OK' })
    }

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const project_description = String(body.project_description || body.message || '').trim()

    if (!name || !email || !project_description) {
      return json(res, 400, { error: 'name, email and project description required' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(res, 400, { error: 'Invalid email' })
    }

    const result = await saveLeadOrFallback({
      ...body,
      name,
      email,
      project_description,
      source: body.source || 'website',
      path: body.path || '/projemi-anlat',
    })

    return json(res, 201, {
      ok: true,
      reference_code: result.reference_code,
      message: 'Talebinizi aldık. Ekibimiz projenizi inceleyerek sizinle iletişime geçecek.',
    })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Server error' })
  }
}
