import {
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  writeAudit,
} from '../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('cms_faqs')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) return json(res, 500, { error: 'Could not load FAQs' })
      return json(res, 200, { faqs: data || [] })
    }

    if (req.method === 'POST') {
      const body = await readBody(req)
      if (!body.question || !body.answer) return json(res, 400, { error: 'question and answer required' })
      const { data, error } = await supabase
        .from('cms_faqs')
        .insert({
          category: body.category || 'Genel',
          question: body.question,
          answer: body.answer,
          sort_order: body.sort_order || 0,
          published: body.published !== false,
        })
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Create failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'FAQ_CREATED',
        resource: 'cms_faqs',
        resource_id: data.id,
      })
      return json(res, 201, { faq: data })
    }

    if (req.method === 'PUT') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const { id, ...rest } = body
      const { data, error } = await supabase
        .from('cms_faqs')
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })
      return json(res, 200, { faq: data })
    }

    if (req.method === 'DELETE') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const { error } = await supabase.from('cms_faqs').delete().eq('id', body.id)
      if (error) return json(res, 500, { error: 'Delete failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'FAQ_DELETED',
        resource: 'cms_faqs',
        resource_id: body.id,
      })
      return json(res, 200, { ok: true })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
