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
      const { data, error } = await supabase.from('cms_homepage').select('*').eq('id', 1).single()
      if (error) return json(res, 500, { error: 'Could not load homepage' })
      return json(res, 200, { homepage: data })
    }

    if (req.method === 'PUT') {
      const body = await readBody(req)
      const patch = {
        content: body.content ?? {},
        status: body.status || 'draft',
        updated_at: new Date().toISOString(),
        updated_by: admin.id,
      }
      if (patch.status === 'published') patch.published_at = new Date().toISOString()

      const { data, error } = await supabase
        .from('cms_homepage')
        .update(patch)
        .eq('id', 1)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })

      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: patch.status === 'published' ? 'HOMEPAGE_PUBLISHED' : 'HOMEPAGE_UPDATED',
        resource: 'cms_homepage',
        resource_id: '1',
      })
      return json(res, 200, { homepage: data })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
