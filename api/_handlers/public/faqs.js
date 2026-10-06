import { cors, getServiceClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('id, category, question, answer, sort_order')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error) return json(res, 200, { faqs: [], source: 'fallback' })
    return json(res, 200, { faqs: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { faqs: [], source: 'fallback' })
  }
}
