import { cors, getServiceClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('cms_homepage')
      .select('status, content, published_at, updated_at')
      .eq('id', 1)
      .eq('status', 'published')
      .maybeSingle()
    if (error || !data) return json(res, 200, { content: null, source: 'fallback' })
    return json(res, 200, { content: data.content, source: 'cms', published_at: data.published_at })
  } catch {
    return json(res, 200, { content: null, source: 'fallback' })
  }
}
