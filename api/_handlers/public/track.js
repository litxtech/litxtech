import { cors, getDbClient, json, readBody } from '../../_lib/supabaseAdmin.js'
import { clientGeo, deviceFromUa } from '../../_lib/notify.js'

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
  'demo_click',
  'live_chat_open',
  'ticket_created',
  'feed_view',
  'feed_click',
  'login',
  'logout',
  'signup',
  'session_start',
  'product_view',
  'case_study_view',
  'cta_click',
  'download_click',
  'support_click',
  'search',
  'share',
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
      if (event_name === 'page_view') {
        const geo = clientGeo(req)
        const parsed = deviceFromUa(req.headers['user-agent'])
        await supabase.from('page_views').insert({
          path: body.path || '/',
          visitor_id: body.visitor_id || null,
          session_id: body.session_id || null,
          referrer: body.meta?.referrer || null,
          device: parsed.device,
          browser: parsed.browser,
          os: parsed.os,
          country: geo.country,
          city: geo.city,
          utm: body.meta?.utm || {},
        })
      }
    } catch {
      // analytics must never break UX
    }
    return json(res, 201, { ok: true })
  } catch {
    return json(res, 200, { ok: false })
  }
}
