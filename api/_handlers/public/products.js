import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

const PRODUCT_COLS =
  'id, name, slug, tagline, short_description, description, logo_url, cover_image_url, platforms, ios_url, android_url, web_url, website_url, privacy_policy_url, terms_url, support_url, category, features, screenshots, video_url, status, lifecycle, badges, featured, sort_order, seo_title, seo_description, og_image'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const slug = req.platformRest || ''
  try {
    const supabase = getDbClient()
    let query = supabase
      .from('cms_applications')
      .select(PRODUCT_COLS)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })
    if (slug) query = query.eq('slug', slug).limit(1)
    const { data, error } = await query
    if (error) return json(res, 200, { products: [], source: 'fallback' })
    if (slug) {
      if (!data?.[0]) return json(res, 404, { error: 'Not found' })
      return json(res, 200, { product: data[0], source: 'cms' })
    }
    return json(res, 200, { products: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { products: [], source: 'fallback' })
  }
}
