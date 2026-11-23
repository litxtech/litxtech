import {
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  writeAudit,
} from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})

  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('cms_applications')
        .select('*')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
      if (error) return json(res, 500, { error: 'Could not load applications' })
      return json(res, 200, { applications: data || [] })
    }

    if (req.method === 'POST') {
      const body = await readBody(req)
      if (!body.name || !body.slug) return json(res, 400, { error: 'name and slug required' })
      const row = {
        name: body.name,
        slug: body.slug,
        short_description: body.short_description || null,
        description: body.description || null,
        logo_url: body.logo_url || null,
        cover_image_url: body.cover_image_url || null,
        platforms: body.platforms || [],
        ios_url: body.ios_url || null,
        android_url: body.android_url || null,
        web_url: body.web_url || null,
        website_url: body.website_url || null,
        privacy_policy_url: body.privacy_policy_url || null,
        terms_url: body.terms_url || null,
        support_url: body.support_url || null,
        category: body.category || null,
        features: body.features || [],
        screenshots: body.screenshots || [],
        status: body.status || 'draft',
        featured: !!body.featured,
        sort_order: body.sort_order || 0,
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
        published_at: body.status === 'published' ? new Date().toISOString() : null,
      }
      const { data, error } = await supabase.from('cms_applications').insert(row).select('*').single()
      if (error) return json(res, 500, { error: error.message || 'Create failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'APP_CREATED',
        resource: 'cms_applications',
        resource_id: data.id,
        new_value: { name: data.name, slug: data.slug },
      })
      return json(res, 201, { application: data })
    }

    if (req.method === 'PUT') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const patch = { ...body, updated_at: new Date().toISOString() }
      delete patch.id
      if (patch.status === 'published' && !patch.published_at) {
        patch.published_at = new Date().toISOString()
      }
      const { data, error } = await supabase
        .from('cms_applications')
        .update(patch)
        .eq('id', body.id)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'APP_UPDATED',
        resource: 'cms_applications',
        resource_id: body.id,
      })
      return json(res, 200, { application: data })
    }

    if (req.method === 'DELETE') {
      const body = await readBody(req)
      if (!body.id) return json(res, 400, { error: 'id required' })
      const { error } = await supabase
        .from('cms_applications')
        .update({ deleted_at: new Date().toISOString(), status: 'archived' })
        .eq('id', body.id)
      if (error) return json(res, 500, { error: 'Delete failed' })
      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'APP_DELETED',
        resource: 'cms_applications',
        resource_id: body.id,
      })
      return json(res, 200, { ok: true })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
