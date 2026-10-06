import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const part = req.platformRest || 'sections'
  try {
    const supabase = getDbClient()
    if (part === 'process') {
      const { data, error } = await supabase
        .from('cms_process_steps')
        .select('id, step_number, title, description, sort_order')
        .eq('active', true)
        .order('sort_order', { ascending: true })
      if (error) return json(res, 200, { steps: [], source: 'fallback' })
      return json(res, 200, { steps: data || [], source: 'cms' })
    }
    if (part === 'technology') {
      const { data, error } = await supabase
        .from('cms_technologies')
        .select('id, name, slug, category, description, logo_url, sort_order')
        .eq('active', true)
        .order('sort_order', { ascending: true })
      if (error) return json(res, 200, { technologies: [], source: 'fallback' })
      return json(res, 200, { technologies: data || [], source: 'cms' })
    }
    if (part === 'trust') {
      const [apps, projects, services] = await Promise.all([
        supabase.from('cms_applications').select('id', { count: 'exact', head: true }).eq('status', 'published').is('deleted_at', null),
        supabase.from('cms_projects').select('id', { count: 'exact', head: true }).eq('status', 'published').is('deleted_at', null),
        supabase.from('cms_services').select('id', { count: 'exact', head: true }).eq('status', 'published').is('deleted_at', null),
      ])
      const { data: settings } = await supabase.from('company_settings').select('trust_stats').eq('id', 1).maybeSingle()
      const live = [
        { key: 'products', value: String(apps.count ?? 0), label: 'Published products' },
        { key: 'projects', value: String(projects.count ?? 0), label: 'Published projects' },
        { key: 'services', value: String(services.count ?? 0), label: 'Published services' },
      ].filter((row) => row.value !== '0')
      const extra = Array.isArray(settings?.trust_stats) ? settings.trust_stats : []
      const verified = extra.filter((row) => row && row.value && row.label && row.verified === true)
      return json(res, 200, { stats: [...live, ...verified], source: 'cms' })
    }
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('id, section_key, active, sort_order, title, subtitle, description, media, cta_label, cta_href, theme')
      .eq('active', true)
      .order('sort_order', { ascending: true })
    if (error) return json(res, 200, { sections: [], source: 'fallback' })
    return json(res, 200, { sections: data || [], source: 'cms' })
  } catch {
    return json(res, 200, { sections: [], source: 'fallback' })
  }
}
