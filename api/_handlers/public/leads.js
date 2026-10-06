import { cors, getServiceClient, json, readBody } from '../../_lib/supabaseAdmin.js'

function refCode() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `LTX-${Date.now().toString().slice(-6)}-${n}`
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  try {
    const body = await readBody(req)

    // honeypot
    if (body.website_url_hp) {
      return json(res, 200, { ok: true, reference_code: refCode() })
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

    const supabase = getServiceClient()
    const reference_code = refCode()

    const row = {
      reference_code,
      name,
      email,
      phone: body.phone || null,
      whatsapp: body.whatsapp || null,
      company: body.company || null,
      customer_type: body.customer_type || null,
      project_type: body.project_type || null,
      budget_range: body.budget_range || null,
      timeline: body.timeline || null,
      platforms: Array.isArray(body.platforms) ? body.platforms : [],
      project_description,
      preferred_contact: body.preferred_contact || null,
      source: body.source || 'website',
      status: 'NEW',
    }

    const { data, error } = await supabase.from('leads').insert(row).select('id, reference_code').single()
    if (error) {
      return json(res, 500, { error: 'Could not save lead' })
    }

    await supabase.from('lead_events').insert({
      lead_id: data.id,
      event_type: 'FORM_SUBMITTED',
      to_status: 'NEW',
      meta: { source: row.source },
    })

    await supabase.from('analytics_events').insert({
      event_name: 'lead_completed',
      path: body.path || '/projemi-anlat',
      meta: { reference_code, project_type: row.project_type },
    })

    return json(res, 201, {
      ok: true,
      reference_code: data.reference_code,
      message: 'Talebinizi aldık. Ekibimiz projenizi inceleyerek sizinle iletişime geçecek.',
    })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
