import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res, kind = 'navigation') {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const supabase = getDbClient()
  try {
    if (kind === 'services') {
      const { data, error } = await supabase
        .from('cms_services')
        .select('*')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order')
      if (error) return json(res, 200, { services: [], warning: error.message })
      return json(res, 200, { services: data || [] })
    }
    if (kind === 'projects') {
      const slug = String(req.platformRest || '').toLowerCase().replace(/[%_]/g, '')
      let query = supabase.from('cms_projects').select('*').eq('status', 'published').is('deleted_at', null).order('sort_order')
      if (slug) query = query.ilike('slug', slug).limit(1)
      const { data, error } = await query
      if (error) return json(res, 200, { projects: [], warning: error.message })
      if (slug) {
        if (!data?.[0]) return json(res, 404, { error: 'Not found' })
        return json(res, 200, { project: data[0], source: 'cms' })
      }
      return json(res, 200, { projects: data || [] })
    }
    const { data, error } = await supabase.from('cms_navigation').select('*').eq('visible', true).order('sort_order')
    if (error) return json(res, 200, { items: [], warning: error.message })
    return json(res, 200, { items: data || [] })
  } catch (e) {
    return json(res, 200, { warning: e.message })
  }
}
