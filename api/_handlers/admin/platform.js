import {
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  writeAudit,
} from '../../_lib/supabaseAdmin.js'
import { handleSeoAdmin } from './seoAdmin.js'

function parts(req) {
  return String(req.platformPath || '').split('/').filter(Boolean)
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()
  const [resource, id] = parts(req)

  try {
    if (resource === 'users') return users(req, res, supabase, id)
    if (resource === 'feed') return feed(req, res, supabase, admin, id)
    if (resource === 'services') return services(req, res, supabase, admin)
    if (resource === 'media') return media(req, res, supabase, admin, id)
    if (resource === 'chat') return chat(req, res, supabase, admin, id)
    if (resource === 'analytics') return analytics(req, res, supabase)
    if (resource === 'seo') return seo(req, res, supabase, admin)
    if (resource === 'ctas') return listTable(res, supabase, 'site_ctas', 'items')
    if (resource === 'notifications') return notifications(req, res, supabase, id)
    if (resource === 'roles') return roles(res, supabase)
    if (resource === 'health') return health(res, supabase)
    if (resource === 'errors') return listTable(res, supabase, 'system_errors', 'items')
    if (resource === 'pages') return pages(req, res, supabase, admin)
    if (resource === 'navigation') return navigation(req, res, supabase, admin)
    if (resource === 'email') return email(req, res, supabase, admin)
    if (resource === 'search') return search(req, res, supabase)
    if (resource === 'cases') return crud(req, res, supabase, admin, 'cms_case_studies', id)
    if (resource === 'process') return crud(req, res, supabase, admin, 'cms_process_steps', id)
    if (resource === 'technology') return crud(req, res, supabase, admin, 'cms_technologies', id)
    if (resource === 'sections') return crud(req, res, supabase, admin, 'homepage_sections', id)
    return json(res, 404, { error: 'Unknown resource' })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Server error' })
  }
}

async function search(req, res, supabase) {
  const url = new URL(req.url || '/', 'http://localhost')
  const q = String(url.searchParams.get('q') || '').trim()
  if (q.length < 2) return json(res, 200, { results: [] })
  const like = `%${q.replace(/[%_]/g, '')}%`
  const jobs = [
    ['leads', '/leads', supabase.from('leads').select('id, name, email').ilike('name', like).limit(5)],
    ['products', '/applications', supabase.from('cms_applications').select('id, name, slug').ilike('name', like).limit(5)],
    ['feed', '/content/feed', supabase.from('feed_posts').select('id, title, slug').ilike('title', like).limit(5)],
    ['services', '/content/services', supabase.from('cms_services').select('id, title, slug').ilike('title', like).limit(5)],
    ['tickets', '/support/tickets', supabase.from('support_tickets').select('id, subject, reference_code').ilike('subject', like).limit(5)],
  ]
  const results = []
  const nav = [
    ['WhatsApp', '/settings/company'],
    ['Company', '/settings/company'],
    ['Leads', '/leads'],
    ['Feed', '/content/feed'],
    ['Analytics', '/analytics'],
    ['Live chat', '/support/chat'],
    ['Audit', '/security/audit-log'],
  ]
  for (const [label, href] of nav) {
    if (label.toLowerCase().includes(q.toLowerCase())) results.push({ type: 'navigate', href, label })
  }
  for (const [type, href, query] of jobs) {
    try {
      const { data, error } = await query
      if (error) continue
      for (const row of data || []) {
        results.push({
          type,
          href,
          label: row.name || row.title || row.subject || row.email,
        })
      }
    } catch {
      // table may not exist until the migration is applied
    }
  }
  return json(res, 200, { results })
}

async function users(req, res, supabase, id) {
  if (req.method === 'PATCH' && id) {
    const body = await readBody(req)
    const { error } = await supabase
      .from('user_presence')
      .update({ blocked: !!body.blocked, is_active: body.is_active !== false })
      .eq('user_id', id)
    if (error) return json(res, 400, { error: error.message })
    return json(res, 200, { ok: true })
  }
  const { data, error } = await supabase.from('user_presence').select('*').order('last_seen', { ascending: false }).limit(200)
  if (error) return json(res, 200, { users: [] })
  return json(res, 200, {
    users: (data || []).map((row) => ({ ...row, id: row.user_id })),
  })
}

async function feed(req, res, supabase, admin, id) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('feed_posts').select('*').is('deleted_at', null).order('created_at', { ascending: false }).limit(100)
    if (error) return json(res, 200, { posts: [], warning: error.message })
    return json(res, 200, { posts: data || [] })
  }
  const body = await readBody(req)
  if (req.method === 'POST') {
    const title = String(body.title || '').trim()
    if (!title) return json(res, 400, { error: 'Title required' })
    const row = {
      title,
      body: body.body || '',
      category: body.category || 'Company',
      type: body.type || 'article',
      status: body.status || 'draft',
      slug: body.slug || slugify(title) || `post-${Date.now()}`,
      excerpt: body.excerpt || null,
      author: admin.email,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    }
    const { data, error } = await supabase.from('feed_posts').insert(row).select('*').single()
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'FEED_CREATED', resource: 'feed_posts', resource_id: data.id, new_value: { title } })
    return json(res, 201, { post: data })
  }
  if ((req.method === 'PATCH' || req.method === 'PUT') && id) {
    const patch = {}
    for (const key of ['title', 'body', 'category', 'type', 'status', 'featured', 'excerpt', 'cover', 'slug']) {
      if (body[key] !== undefined) patch[key] = body[key]
    }
    if (patch.status === 'published') patch.published_at = new Date().toISOString()
    patch.updated_at = new Date().toISOString()
    const { data, error } = await supabase.from('feed_posts').update(patch).eq('id', id).select('*').single()
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'FEED_UPDATED', resource: 'feed_posts', resource_id: id, new_value: { status: data.status } })
    return json(res, 200, { post: data })
  }
  if (req.method === 'DELETE' && id) {
    const { error } = await supabase.from('feed_posts').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'FEED_DELETED', resource: 'feed_posts', resource_id: id })
    return json(res, 200, { ok: true })
  }
  return json(res, 405, { error: 'Method not allowed' })
}

async function services(req, res, supabase, admin) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    const items = Array.isArray(body.items) ? body.items : [body]
    const rows = items
      .filter((item) => item.slug && item.title)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        short_description: item.short_description || null,
        detailed_description: item.detailed_description || null,
        benefits: item.benefits || [],
        status: item.status || 'draft',
        sort_order: item.sort_order || 0,
        cta_label: item.cta_label || null,
        cta_url: item.cta_url || null,
      }))
    if (!rows.length) return json(res, 400, { error: 'Nothing to save' })
    const { error } = await supabase.from('cms_services').upsert(rows, { onConflict: 'slug' })
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'SERVICES_SAVED', resource: 'cms_services', new_value: { count: rows.length } })
    return json(res, 200, { ok: true })
  }
  const { data, error } = await supabase.from('cms_services').select('*').is('deleted_at', null).order('sort_order', { ascending: true })
  if (error) return json(res, 200, { services: [] })
  return json(res, 200, { services: data || [] })
}

async function media(req, res, supabase, admin, id) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    const url = String(body.url || '')
    if (!/^https?:\/\//.test(url)) return json(res, 400, { error: 'A public http(s) URL is required' })
    const { data, error } = await supabase
      .from('cms_media')
      .insert({
        filename: body.filename || 'media',
        storage_path: body.storage_path || url,
        url,
        mime_type: body.mime_type || null,
        alt: body.alt || null,
        caption: body.caption || null,
        folder: body.folder || 'general',
        uploaded_by: admin.id,
      })
      .select('*')
      .single()
    if (error) return json(res, 400, { error: error.message })
    return json(res, 201, { item: data })
  }
  if (req.method === 'DELETE' && id) {
    const { error } = await supabase.from('cms_media').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    if (error) return json(res, 400, { error: error.message })
    return json(res, 200, { ok: true })
  }
  const { data, error } = await supabase.from('cms_media').select('*').is('deleted_at', null).order('created_at', { ascending: false }).limit(200)
  if (error) return json(res, 200, { media: [] })
  return json(res, 200, { media: data || [] })
}

async function chat(req, res, supabase, admin, id) {
  if (id === 'presence' && req.method === 'POST') {
    const body = await readBody(req)
    await supabase.from('support_presence').upsert({ id: 1, online: !!body.online, updated_at: new Date().toISOString() })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'CHAT_PRESENCE', resource: 'support_presence', new_value: { online: !!body.online } })
    return json(res, 200, { ok: true })
  }
  if (req.method === 'GET' && id) {
    const { data: messages } = await supabase.from('chat_messages').select('*').eq('conversation_id', id).order('created_at', { ascending: true })
    await supabase.from('chat_messages').update({ status: 'read' }).eq('conversation_id', id).eq('sender', 'visitor')
    return json(res, 200, { messages: messages || [] })
  }
  if (req.method === 'POST' && id) {
    const body = await readBody(req)
    const text = String(body.body || '').trim()
    if (!text) return json(res, 400, { error: 'Empty message' })
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ conversation_id: id, sender: 'admin', body: text.slice(0, 4000), status: 'sent' })
      .select('*')
      .single()
    if (error) return json(res, 400, { error: error.message })
    await supabase.from('chat_conversations').update({ updated_at: new Date().toISOString() }).eq('id', id)
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'CHAT_REPLY', resource: 'chat_conversations', resource_id: id })
    return json(res, 201, { message: data })
  }
  const [{ data: conversations }, { data: presence }] = await Promise.all([
    supabase.from('chat_conversations').select('*').order('updated_at', { ascending: false }).limit(100),
    supabase.from('support_presence').select('online').eq('id', 1).maybeSingle(),
  ])
  return json(res, 200, { conversations: conversations || [], presence: presence || { online: false } })
}

async function analytics(req, res, supabase) {
  const from = new Date(Date.now() - 30 * 86400000).toISOString()
  const [events, views] = await Promise.all([
    supabase.from('analytics_events').select('event_name, path, created_at').gte('created_at', from).limit(4000),
    supabase.from('page_views').select('path, visitor_id, session_id, country, city, device, created_at').gte('created_at', from).limit(4000),
  ])
  return json(res, 200, { events: events.data || [], views: views.data || [] })
}

async function seo(req, res, supabase, admin) {
  return handleSeoAdmin(req, res, supabase, admin)
}

async function notifications(req, res, supabase, id) {
  if (req.method === 'PATCH' && id) {
    await supabase.from('admin_notifications').update({ read_at: new Date().toISOString() }).eq('id', id)
    return json(res, 200, { ok: true })
  }
  return listTable(res, supabase, 'admin_notifications', 'items')
}

async function roles(res, supabase) {
  const { data, error } = await supabase.from('admin_users').select('id, email, full_name, role, is_active').order('email')
  if (error) return json(res, 200, { admins: [] })
  return json(res, 200, { admins: data || [] })
}

async function health(res, supabase) {
  const checks = []
  const probe = async (name, fn) => {
    try {
      await fn()
      checks.push({ id: name, name, status: 'ok' })
    } catch (e) {
      checks.push({ id: name, name, status: 'error', detail: String(e?.message || e).slice(0, 160) })
    }
  }
  await probe('Database', async () => {
    const { error } = await supabase.from('company_settings').select('id').limit(1)
    if (error) throw error
  })
  await probe('Authentication', async () => {
    const { error } = await supabase.from('admin_users').select('id').limit(1)
    if (error) throw error
  })
  await probe('Analytics', async () => {
    const { error } = await supabase.from('analytics_events').select('id').limit(1)
    if (error) throw error
  })
  await probe('Live chat', async () => {
    const { error } = await supabase.from('chat_conversations').select('id').limit(1)
    if (error) throw error
  })
  checks.push({
    id: 'email',
    name: 'Email provider',
    status: process.env.SMTP_PASSWORD || process.env.RESEND_API_KEY ? 'ok' : 'not_configured',
  })
  return json(res, 200, { checks })
}

async function pages(req, res, supabase, admin) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    if (!body.title || !body.slug) return json(res, 400, { error: 'title and slug required' })
    const { data, error } = await supabase
      .from('cms_pages')
      .insert({ title: body.title, slug: body.slug, status: body.status || 'draft', content: body.content || [] })
      .select('*')
      .single()
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'PAGE_CREATED', resource: 'cms_pages', resource_id: data.id })
    return json(res, 201, { page: data })
  }
  const { data, error } = await supabase.from('cms_pages').select('*').is('deleted_at', null).order('updated_at', { ascending: false })
  if (error) return json(res, 200, { pages: [] })
  return json(res, 200, { pages: data || [] })
}

async function navigation(req, res, supabase, admin) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    if (!body.label || !body.url) return json(res, 400, { error: 'label and url required' })
    const { data, error } = await supabase
      .from('cms_navigation')
      .insert({
        label: body.label,
        url: body.url,
        location: body.location || 'header',
        visible: body.visible !== false,
        sort_order: body.sort_order || 0,
      })
      .select('*')
      .single()
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'NAV_CREATED', resource: 'cms_navigation', resource_id: data.id })
    return json(res, 201, { item: data })
  }
  const { data, error } = await supabase.from('cms_navigation').select('*').order('sort_order', { ascending: true })
  if (error) return json(res, 200, { items: [] })
  return json(res, 200, { items: data || [] })
}

async function email(req, res, supabase, admin) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    const patch = {
      from_name: body.from_name,
      from_email: body.from_email,
      reply_to: body.reply_to,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase.from('email_settings').update(patch).eq('id', 1)
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'EMAIL_SETTINGS', resource: 'email_settings', new_value: { from_email: body.from_email } })
    return json(res, 200, { ok: true })
  }
  const [{ data: settings }, { data: templates }] = await Promise.all([
    supabase.from('email_settings').select('from_name, from_email, reply_to, provider, configured').eq('id', 1).maybeSingle(),
    supabase.from('email_templates').select('key, subject, body').order('key'),
  ])
  return json(res, 200, {
    settings: settings || null,
    templates: templates || [],
    smtp_configured: Boolean(process.env.SMTP_PASSWORD || process.env.RESEND_API_KEY),
  })
}

async function listTable(res, supabase, table, key) {
  const { data, error } = await supabase.from(table).select('*').limit(100)
  if (error) return json(res, 200, { [key]: [] })
  return json(res, 200, { [key]: data || [] })
}

async function crud(req, res, supabase, admin, table, id) {
  if (req.method === 'POST') {
    const body = await readBody(req)
    const { data, error } = await supabase.from(table).insert(body).select('*').single()
    if (error) return json(res, 400, { error: error.message })
    await writeAudit(supabase, { actor_id: admin.id, actor_email: admin.email, action: 'CONTENT_CREATED', resource: table, resource_id: data.id })
    return json(res, 201, { item: data })
  }
  if ((req.method === 'PATCH' || req.method === 'PUT') && id) {
    const body = await readBody(req)
    delete body.id
    const { data, error } = await supabase.from(table).update({ ...body, updated_at: new Date().toISOString() }).eq('id', id).select('*').single()
    if (error) return json(res, 400, { error: error.message })
    return json(res, 200, { item: data })
  }
  const { data, error } = await supabase.from(table).select('*').limit(200)
  if (error) return json(res, 200, { items: [] })
  return json(res, 200, { items: data || [] })
}
