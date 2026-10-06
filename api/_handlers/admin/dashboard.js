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
      recentEvents,
      recentViews,
      failedLogins,
      onlineUsers,
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
      supabase.from('analytics_events').select('event_name, created_at, path').gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()).limit(3000),
      supabase.from('page_views').select('path, visitor_id, created_at, device').gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()).limit(3000),
      supabase.from('login_attempts').select('id', { count: 'exact', head: true }).eq('success', false).gte('created_at', new Date(Date.now() - 86400000).toISOString()),
      supabase.from('user_presence').select('user_id', { count: 'exact', head: true }).eq('status', 'online'),
    ])

    const events = recentEvents.data || []
    const views = recentViews.data || []
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const day = startOfDay.getTime()
    const week = Date.now() - 7 * 86400000
    const countVisitors = (from) => new Set(views.filter((v) => new Date(v.created_at).getTime() >= from).map((v) => v.visitor_id || v.path)).size
    const countEvent = (name, from = 0) => events.filter((e) => e.event_name === name && new Date(e.created_at).getTime() >= from).length

    return json(res, 200, {
      admin: { email: admin.email, role: admin.role, full_name: admin.full_name },
      cards: {
        new_leads: leadsNew.count ?? 0,
        open_leads: leadsOpen.count ?? 0,
        open_tickets: ticketsOpen.count ?? 0,
        published_apps: appsPublished.count ?? 0,
        new_messages: messagesNew.count ?? 0,
        visitors_today: countVisitors(day),
        visitors_7d: countVisitors(week),
        visitors_30d: countVisitors(0),
        online_users: onlineUsers.count ?? 0,
        whatsapp_clicks: countEvent('whatsapp_click', day),
        phone_clicks: countEvent('phone_click', day),
        email_clicks: countEvent('email_click', day),
        failed_logins: failedLogins.count ?? 0,
        page_views_30d: views.length,
      },
      analytics_status: recentViews.error ? 'ERROR' : 'LIVE',
      series: views,
      events,
      recent_leads: recentLeads.data || [],
      recent_activity: recentAudit.data || [],
      health: {
        database: 'Healthy',
        authentication: 'Healthy',
        storage: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Healthy' : 'Warning',
        analytics: recentViews.error ? 'Error' : 'Healthy',
      },
    })
  } catch {
    return json(res, 500, { error: 'Dashboard failed' })
  }
}
