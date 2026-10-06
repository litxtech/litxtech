import { cors, getDbClient, json, readBody } from '../../_lib/supabaseAdmin.js'

const ALLOWED = new Set([
  'page_view',
  'lead_started',
  'lead_completed',
  'whatsapp_click',
  'phone_click',
  'email_click',
  'app_store_click',
  'google_play_click',
  'project_view',
  'service_view',
  'contact_submit',
  'application_view',
  'audit_ping',
])

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })

  try {
    const body = await readBody(req)
    const event_name = String(body.event_name || '')
    if (!ALLOWED.has(event_name)) {
      return json(res, 400, { error: 'Invalid event' })
    }
    try {
      const supabase = getDbClient()
      await supabase.from('analytics_events').insert({
        event_name,
        path: body.path || null,
        meta: body.meta || {},
      })
    } catch {
      // analytics must never break UX
    }
    return json(res, 201, { ok: true })
  } catch {
    return json(res, 200, { ok: false })
  }
}
