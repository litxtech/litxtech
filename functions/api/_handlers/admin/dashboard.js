import { cors, getServiceClient, json, requireAdmin } from '../../_lib/supabaseAdmin.js'

const FAIL = { count: null, data: [], error: { message: 'unavailable' } }

function safe(promise) {
  return promise.then((r) => r).catch(() => FAIL)
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const supabase = getServiceClient()
    const from = new Date(Date.now() - 30 * 86400000).toISOString()
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

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
      signupsToday,
      unreadChat,
      recentMessages,
    ] = await Promise.all([
      safe(
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'NEW')
          .is('deleted_at', null),
      ),
      safe(
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .in('status', ['NEW', 'CONTACTED', 'DISCOVERY', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'])
          .is('deleted_at', null),
      ),
      safe(
        supabase
          .from('support_tickets')
          .select('id', { count: 'exact', head: true })
          .in('status', ['OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER']),
      ),
      safe(
        supabase
          .from('cms_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'published')
          .is('deleted_at', null),
      ),
      safe(supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new')),
      safe(
        supabase
          .from('leads')
          .select('id, reference_code, name, email, project_type, status, created_at')
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(8),
      ),
      safe(
        supabase
          .from('system_logs')
          .select('id, admin_user_id, action, resource_type, details, created_at')
          .order('created_at', { ascending: false })
          .limit(12),
      ),
      safe(
        supabase
          .from('analytics_events')
          .select('event_name, created_at, path')
          .gte('created_at', from)
          .limit(3000),
      ),
      safe(
        supabase
          .from('page_views')
          .select('path, visitor_id, created_at, device')
          .gte('created_at', from)
          .limit(3000),
      ),
      safe(
        supabase
          .from('login_attempts')
          .select('id', { count: 'exact', head: true })
          .eq('success', false)
          .gte('created_at', new Date(Date.now() - 86400000).toISOString()),
      ),
      safe(supabase.from('user_presence').select('user_id', { count: 'exact', head: true }).eq('is_online', true)),
      safe(
        supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfDay.toISOString()),
      ),
      safe(
        supabase
          .from('chat_messages')
          .select('id', { count: 'exact', head: true })
          .eq('sender', 'visitor')
          .neq('status', 'read'),
      ),
      safe(
        supabase
          .from('contact_messages')
          .select('id, name, subject, status, created_at')
          .order('created_at', { ascending: false })
          .limit(6),
      ),
    ])

    const events = recentEvents.data || []
    const views = recentViews.data || []
    const day = startOfDay.getTime()
    const week = Date.now() - 7 * 86400000
    const countVisitors = (since) =>
      new Set(views.filter((v) => new Date(v.created_at).getTime() >= since).map((v) => v.visitor_id || v.path)).size
    const countEvent = (name, since = 0) =>
      events.filter((e) => e.event_name === name && new Date(e.created_at).getTime() >= since).length

    return json(res, 200, {
      admin: { email: admin.email, role: admin.role, full_name: admin.full_name },
      cards: {
        new_leads: leadsNew.count ?? 0,
        open_leads: leadsOpen.count ?? 0,
        open_tickets: ticketsOpen.count ?? 0,
        published_apps: appsPublished.count ?? 0,
        new_messages: messagesNew.count ?? 0,
        unread_chat: unreadChat.count ?? 0,
        signups_today: signupsToday.count ?? 0,
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
      recent_messages: recentMessages.data || [],
      recent_activity: (recentAudit.data || []).map((row) => ({
        ...row,
        actor_email: row.details?.actor_email || null,
        action: row.action,
        resource: row.resource_type,
      })),
      health: {
        database: leadsNew.error ? 'Warning' : 'Healthy',
        authentication: onlineUsers.error ? 'Warning' : 'Healthy',
        storage: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Healthy' : 'Warning',
        analytics: recentViews.error ? 'Error' : 'Healthy',
      },
    })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Dashboard failed' })
  }
}
