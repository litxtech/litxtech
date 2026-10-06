import { cors, getServiceClient, json } from '../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('cms_applications')
      .select(
        'id, name, slug, short_description, description, logo_url, cover_image_url, platforms, ios_url, android_url, web_url, website_url, category, featured, sort_order, seo_title, seo_description',
      )
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })

    if (error) return json(res, 200, { applications: [], source: 'fallback' })
    return json(res, 200, { applications: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { applications: [], source: 'fallback' })
  }
}
