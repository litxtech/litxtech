import { getDbClient } from './supabaseAdmin.js'

let cache = { at: 0, ctx: null }

async function rows(query) {
  try {
    const { data, error } = await query
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export function clearSeoCache() {
  cache = { at: 0, ctx: null }
}

export async function getSeoContext() {
  if (cache.ctx && Date.now() - cache.at < 20000) return cache.ctx
  const ctx = {
    pages: [],
    redirects: [],
    posts: [],
    services: [],
    cases: [],
    faqs: [],
    company: {},
    settings: {},
  }
  try {
    const supabase = getDbClient()
    const [company, meta, redirects, posts, services, cases, faqs] = await Promise.all([
      rows(supabase.from('company_settings').select('*').eq('id', 1).limit(1)),
      rows(supabase.from('seo_metadata').select('*')),
      rows(supabase.from('seo_redirects').select('*').eq('enabled', true)),
      rows(
        supabase
          .from('feed_posts')
          .select('slug, title, excerpt, cover, author, status, published_at, updated_at, seo')
          .eq('status', 'published')
          .is('deleted_at', null),
      ),
      rows(
        supabase
          .from('cms_services')
          .select('slug, title, short_description, seo, status, updated_at')
          .eq('status', 'published')
          .is('deleted_at', null),
      ),
      rows(
        supabase
          .from('cms_case_studies')
          .select('slug, title, summary, status, updated_at')
          .eq('status', 'published'),
      ),
      rows(supabase.from('cms_faqs').select('question, answer, published').eq('published', true)),
    ])
    const companyRow = company[0]
    if (companyRow) {
      ctx.company = companyRow
      ctx.settings =
        companyRow.default_seo && typeof companyRow.default_seo === 'object' ? companyRow.default_seo : {}
    }
    ctx.pages = meta
    ctx.redirects = redirects
    ctx.posts = posts
    ctx.services = services
    ctx.cases = cases
    ctx.faqs = faqs
  } catch {
    /* static catalog still resolves */
  }
  cache = { at: Date.now(), ctx }
  return ctx
}
