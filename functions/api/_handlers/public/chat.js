import { cors, getDbClient, getServiceClient, json, readBody } from '../../_lib/supabaseAdmin.js'
import { notifyAdmin } from '../../_lib/notify.js'

function tokenOk(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{12,80}$/.test(value)
}

function makeToken() {
  return `v_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})

  try {
    const supabase = getDbClient()

    if (req.method === 'GET') {
      const url = new URL(req.url || '/', 'http://localhost')
      const id = url.searchParams.get('id') || ''
      const visitor = url.searchParams.get('token') || ''
      if (!id || !tokenOk(visitor)) return json(res, 400, { error: 'Invalid token' })
      const { data: convo } = await supabase
        .from('chat_conversations')
        .select('id, status, visitor_name, admin_online')
        .eq('id', id)
        .eq('visitor_token', visitor)
        .maybeSingle()
      if (!convo) return json(res, 404, { error: 'Not found' })
      const { data: presence } = await supabase.from('support_presence').select('online').eq('id', 1).maybeSingle()
      const { data: messages } = await supabase
        .from('chat_messages')
        .select('id, sender, body, status, created_at')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true })
        .limit(200)
      return json(res, 200, {
        conversation: convo,
        messages: messages || [],
        admin_online: presence?.online ?? convo.admin_online,
      })
    }

    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' })
    const body = await readBody(req)
    if (body.company_website) return json(res, 200, { ok: true })

    if (body.action === 'start') {
      const name = String(body.name || 'Visitor').trim().slice(0, 80)
      const email = String(body.email || '').trim().slice(0, 160)
      const visitor = makeToken()
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          visitor_token: visitor,
          visitor_name: name,
          visitor_email: email || null,
          page: String(body.page || '').slice(0, 200),
          status: 'open',
        })
        .select('id, visitor_token')
        .single()
      if (error) return json(res, 500, { error: 'Could not open chat' })
      await notifyAdmin(supabase, {
        type: 'chat',
        title: 'New live chat',
        body: name,
        href: '/support/chat',
      })
      return json(res, 201, { conversation: data })
    }

    if (body.action === 'send') {
      const id = String(body.conversation_id || '')
      const visitor = String(body.visitor_token || '')
      const text = String(body.body || body.message || '').trim()
      if (!id || !tokenOk(visitor) || !text || text.length > 4000) {
        return json(res, 400, { error: 'Invalid message' })
      }
      const { data: convo } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('id', id)
        .eq('visitor_token', visitor)
        .maybeSingle()
      if (!convo) return json(res, 404, { error: 'Not found' })
      const since = new Date(Date.now() - 60_000).toISOString()
      const { count } = await supabase
        .from('chat_messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', id)
        .eq('sender', 'visitor')
        .gte('created_at', since)
      if ((count || 0) >= 8) return json(res, 429, { error: 'Slow down' })
      const { data: message, error } = await supabase
        .from('chat_messages')
        .insert({ conversation_id: id, sender: 'visitor', body: text, status: 'sent' })
        .select('id, sender, body, status, created_at')
        .single()
      if (error) return json(res, 500, { error: 'Could not send' })
      await supabase.from('chat_conversations').update({ updated_at: new Date().toISOString(), status: 'open' }).eq('id', id)
      return json(res, 201, { message })
    }

    return json(res, 400, { error: 'Unknown action' })
  } catch {
    return json(res, 500, { error: 'Chat unavailable' })
  }
}

export async function verifyUser(token) {
  if (!token) return null
  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data?.user) return null
    return data.user
  } catch {
    return null
  }
}
