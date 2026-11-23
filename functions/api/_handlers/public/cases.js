import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const slug = req.platformRest || ''
  try {
    const supabase = getDbClient()
    let query = supabase
      .from('cms_case_studies')
      .select('*')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })
    if (slug) query = query.eq('slug', slug).limit(1)
    const { data, error } = await query
    if (error) return json(res, 200, { cases: [], source: 'fallback' })
    if (slug) {
      if (!data?.[0]) return json(res, 404, { error: 'Not found' })
      return json(res, 200, { caseStudy: data[0], source: 'cms' })
    }
    return json(res, 200, { cases: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { cases: [], source: 'fallback' })
  }
}
