import { cors, getDbClient, getServiceClient, json, readBody } from '../../_lib/supabaseAdmin.js'

const COLS =
  'id, slug, type, category, title, excerpt, body, cover, media, link_url, project_slug, tags, author, status, featured, published_at, seo, likes, views'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method === 'POST') return comment(req, res)
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const slug = req.platformRest || ''
  try {
    const supabase = getDbClient()
    const now = new Date().toISOString()
    let query = supabase
      .from('feed_posts')
      .select(COLS)
      .eq('status', 'published')
      .is('deleted_at', null)
      .or(`published_at.is.null,published_at.lte.${now}`)
      .order('published_at', { ascending: false })
    if (slug) query = query.eq('slug', slug).limit(1)
    else query = query.limit(50)
    const { data, error } = await query
    if (error) return json(res, 200, { posts: [], source: 'fallback', warning: error.message })
    if (slug) {
      const post = data?.[0]
      if (!post) return json(res, 404, { error: 'Not found' })
      return json(res, 200, { post, source: 'cms' })
    }
    return json(res, 200, { posts: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { posts: [], source: 'fallback' })
  }
}

async function comment(req, res) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) return json(res, 401, { error: 'Sign in required' })
    const auth = getServiceClient()
    const { data: userData, error: authError } = await auth.auth.getUser(token)
    if (authError || !userData?.user) return json(res, 401, { error: 'Sign in required' })
    const body = await readBody(req)
    const text = String(body.body || '').trim()
    if (!body.post_id || text.length < 1 || text.length > 2000) {
      return json(res, 400, { error: 'Invalid comment' })
    }
    const { error } = await auth.from('feed_comments').insert({
      post_id: body.post_id,
      user_id: userData.user.id,
      author_name: userData.user.email || 'User',
      body: text,
      status: 'visible',
    })
    if (error) return json(res, 400, { error: error.message })
    return json(res, 201, { ok: true })
  } catch {
    return json(res, 500, { error: 'Could not save comment' })
  }
}
