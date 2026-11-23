import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

const COLS =
  'id, slug, title, short_description, detailed_description, icon, hero_image, gallery, benefits, technologies, process, cta_label, cta_url, seo, status, sort_order'

async function listPublished() {
  const supabase = getDbClient()
  const { data, error } = await supabase
    .from('cms_services')
    .select(COLS)
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true })
  if (error) return []
  return data || []
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const slug = req.platformRest || ''
  try {
    const rows = await listPublished()
    if (!slug) return json(res, 200, { services: rows, source: rows.length ? 'cms' : 'empty' })
    const one = rows.find((row) => row.slug === slug)
    if (!one) return json(res, 404, { error: 'Not found' })
    return json(res, 200, { service: one, source: 'cms' })
  } catch {
    return json(res, 200, { services: [], source: 'fallback' })
  }
}
