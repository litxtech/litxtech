import { cors, getServiceClient, json, requireAdmin } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const supabase = getServiceClient()

    const [
      leadsNew,
      leadsOpen,
      ticketsOpen,
      appsPublished,
      messagesNew,
      recentLeads,
      recentAudit,
    ] = await Promise.all([
      supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'NEW').is('deleted_at', null),
      supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .in('status', ['NEW', 'CONTACTED', 'DISCOVERY', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'])
        .is('deleted_at', null),
      supabase
        .from('support_tickets')
        .select('id', { count: 'exact', head: true })
        .in('status', ['OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER']),
      supabase
        .from('cms_applications')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'published')
        .is('deleted_at', null),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase
        .from('leads')
        .select('id, reference_code, name, email, project_type, status, created_at')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(8),
      supabase
        .from('audit_logs')
        .select('id, actor_email, action, resource, created_at, result')
        .order('created_at', { ascending: false })
        .limit(12),
    ])

    return json(res, 200, {
      admin: { email: admin.email, role: admin.role, full_name: admin.full_name },
      cards: {
        new_leads: leadsNew.count ?? 0,
        open_leads: leadsOpen.count ?? 0,
        open_tickets: ticketsOpen.count ?? 0,
        published_apps: appsPublished.count ?? 0,
        new_messages: messagesNew.count ?? 0,
        website_visitors: null,
        conversion_rate: null,
      },
      analytics_status: 'NOT CONFIGURED',
      recent_leads: recentLeads.data || [],
      recent_activity: recentAudit.data || [],
      health: {
        database: 'OK',
        authentication: 'OK',
        storage: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'CONFIGURED' : 'NOT CONFIGURED',
        analytics: 'NOT CONFIGURED',
      },
    })
  } catch {
    return json(res, 500, { error: 'Dashboard failed' })
  }
}
