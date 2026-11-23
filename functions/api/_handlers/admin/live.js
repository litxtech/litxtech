import { cors, getServiceClient, json, requireAdmin } from '../../_lib/supabaseAdmin.js'

const TYPE_META = {
  lead: { label: 'Yeni lead', tone: 'amber', href: '/leads' },
  message: { label: 'İletişim mesajı', tone: 'sky', href: '/messages' },
  chat: { label: 'Canlı destek', tone: 'emerald', href: '/support/chat' },
  ticket: { label: 'Destek talebi', tone: 'violet', href: '/support/tickets' },
  signup: { label: 'Yeni üye', tone: 'rose', href: '/customers/users' },
  application: { label: 'Başvuru', tone: 'cyan', href: '/applications' },
}

function meta(type) {
  return TYPE_META[type] || { label: type, tone: 'slate', href: '/dashboard' }
}

const safe = (query) =>
  Promise.resolve(query)
    .then((r) => r)
    .catch(() => ({ data: [] }))

function item(type, id, title, subtitle, created_at, extra) {
  return {
    key: `${type}:${id}`,
    id,
    type,
    title: title || '—',
    subtitle: subtitle || '',
    created_at: created_at || new Date().toISOString(),
    href: meta(type).href,
    label: meta(type).label,
    tone: meta(type).tone,
    ...extra,
  }
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const admin = await requireAdmin(req, res)
  if (!admin) return

  try {
    const supabase = getServiceClient()
    const url = new URL(req.url || '/', 'http://localhost')
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 10), 1), 30)
    const since = url.searchParams.get('since')
    const sinceIso = since && !Number.isNaN(Date.parse(since)) ? new Date(since).toISOString() : null
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const dayIso = startOfDay.toISOString()

    const applySince = (query) => (sinceIso ? query.gt('created_at', sinceIso) : query)

    const [leads, messages, chats, conversations, tickets, signups, counts] = await Promise.all([
      safe(
        applySince(
          supabase
            .from('leads')
            .select('id, name, email, project_type, status, created_at')
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .limit(limit),
        ),
      ),
      safe(
        applySince(
          supabase
            .from('contact_messages')
            .select('id, name, email, subject, status, created_at')
            .order('created_at', { ascending: false })
            .limit(limit),
        ),
      ),
      safe(
        applySince(
          supabase
            .from('chat_messages')
            .select('id, conversation_id, sender, body, status, created_at')
            .eq('sender', 'visitor')
            .order('created_at', { ascending: false })
            .limit(limit),
        ),
      ),
      safe(supabase.from('chat_conversations').select('id, visitor_name, page').limit(200)),
      safe(
        applySince(
          supabase
            .from('support_tickets')
            .select('id, reference_code, subject, customer_name, customer_email, status, created_at')
            .order('created_at', { ascending: false })
            .limit(limit),
        ),
      ),
      safe(
        applySince(
          supabase
            .from('profiles')
            .select('id, username, full_name, display_name, email, created_at')
            .order('created_at', { ascending: false })
            .limit(limit),
        ),
      ),
      Promise.all([
        safe(supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'NEW').is('deleted_at', null)),
        safe(supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new')),
        safe(
          supabase
            .from('chat_messages')
            .select('id', { count: 'exact', head: true })
            .eq('sender', 'visitor')
            .neq('status', 'read'),
        ),
        safe(
          supabase
            .from('support_tickets')
            .select('id', { count: 'exact', head: true })
            .in('status', ['OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER']),
        ),
        safe(supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', dayIso)),
      ]),
    ])

    const visitors = new Map((conversations?.data || []).map((c) => [c.id, c]))

    const items = [
      ...(leads.data || []).map((row) =>
        item(
          'lead',
          row.id,
          row.name,
          [row.project_type, row.status].filter(Boolean).join(' · '),
          row.created_at,
        ),
      ),
      ...(messages.data || []).map((row) =>
        item('message', row.id, row.name || row.email, row.subject || row.email, row.created_at, {
          unread: row.status === 'new',
        }),
      ),
      ...(chats.data || []).map((row) =>
        item(
          'chat',
          row.id,
          visitors.get(row.conversation_id)?.visitor_name || 'Ziyaretçi',
          row.body,
          row.created_at,
          { unread: row.status !== 'read' },
        ),
      ),
      ...(tickets.data || []).map((row) =>
        item(
          'ticket',
          row.id,
          row.subject,
          [row.reference_code, row.customer_email].filter(Boolean).join(' · '),
          row.created_at,
        ),
      ),
      ...(signups.data || []).map((row) =>
        item(
          'signup',
          row.id,
          row.full_name || row.display_name || row.username || row.email || 'Yeni üye',
          row.email || '',
          row.created_at,
        ),
      ),
    ]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit * 2)

    const c = counts || []
    const count = (i) => (c[i] && typeof c[i].count === 'number' ? c[i].count : 0)

    return json(res, 200, {
      server_time: new Date().toISOString(),
      counts: {
        new_leads: count(0),
        new_messages: count(1),
        unread_chat: count(2),
        open_tickets: count(3),
        signups_today: count(4),
        total: count(0) + count(1) + count(2) + count(3),
      },
      items,
    })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Live feed failed' })
  }
}
