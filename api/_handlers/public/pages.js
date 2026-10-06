import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const slug = String(req.platformRest || '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase()
    .replace(/[%_]/g, '')
  if (!slug) return json(res, 400, { error: 'slug required' })
  try {
    const supabase = getDbClient()
    const { data, error } = await supabase
      .from('cms_pages')
      .select('title, slug, excerpt, content, featured_image, seo_title, seo_description, og_image, no_index, status, updated_at')
      .eq('status', 'published')
      .ilike('slug', slug)
      .is('deleted_at', null)
      .limit(1)
    if (error) return json(res, 200, { page: null, warning: error.message })
    if (!data?.[0]) return json(res, 404, { error: 'Not found' })
    return json(res, 200, { page: data[0], source: 'cms' })
  } catch (e) {
    return json(res, 200, { page: null, warning: e.message })
  }
}
