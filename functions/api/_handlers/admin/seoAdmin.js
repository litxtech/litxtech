import { json, readBody, writeAudit } from '../../_lib/supabaseAdmin.js'
import { clearSeoCache, getSeoContext } from '../../_lib/seoData.js'
import { buildHealth, buildRobotsTxt, buildSitemapXml, normalizePath } from '../../_lib/seoEngine.js'

const SETTING_KEYS = [
  'site_title',
  'site_description',
  'default_og_image',
  'default_robots',
  'google_verification',
  'bing_verification',
  'ga_measurement_id',
  'gtm_id',
  'meta_pixel_id',
  'sitemap_enabled',
]

function safeDestination(destination) {
  const value = String(destination || '')
  if (value.startsWith('/') && !value.startsWith('//')) return true
  return /^https?:\/\//i.test(value)
}

async function bodyOf(req) {
  if (req.body && typeof req.body === 'object') return req.body
  return readBody(req)
}

export async function handleSeoAdmin(req, res, supabase, admin) {
  if (req.method === 'GET') {
    const ctx = await getSeoContext()
    const { data: logs } = await supabase.from('seo_logs').select('*').order('created_at', { ascending: false }).limit(50)
    return json(res, 200, {
      health: buildHealth(ctx),
      items: ctx.pages || [],
      settings: ctx.settings || {},
      company: {
        company_name: ctx.company?.company_name || '',
        legal_name: ctx.company?.legal_name || '',
        description: ctx.company?.description || '',
        email: ctx.company?.email || '',
        phone: ctx.company?.phone || '',
        website: ctx.company?.website || '',
        logo_url: ctx.company?.logo_url || '',
        address: ctx.company?.address || '',
        city: ctx.company?.city || '',
        country: ctx.company?.country || '',
        social: ctx.company?.social || {},
      },
      redirects: ctx.redirects || [],
      logs: logs || [],
      robotsPreview: buildRobotsTxt(ctx).slice(0, 1500),
      sitemapUrls: (buildSitemapXml(ctx).match(/<loc>/g) || []).length,
    })
  }

  const body = await bodyOf(req)
  const action = body.action || (req.method === 'POST' ? 'save-meta' : '')

  if (action === 'save-meta') {
    if (!body.path || !body.title) return json(res, 400, { error: 'path and title required' })
    const path = normalizePath(body.path)
    const record = {
      path,
      title: body.title,
      description: body.description || null,
      canonical: body.canonical || null,
      og_title: body.og_title || null,
      og_description: body.og_description || null,
      og_image: body.og_image || null,
      robots: body.robots || 'index,follow',
      h1: body.h1 || null,
      focus_topic: body.focus_topic || null,
      schema_type: body.schema_type || null,
      status: body.status || 'published',
      include_in_sitemap: body.include_in_sitemap !== false,
      updated_at: new Date().toISOString(),
    }
    let result = await supabase.from('seo_metadata').upsert(record, { onConflict: 'path' }).select('*').single()
    if (result.error && /column/i.test(result.error.message || '')) {
      const basic = {
        path,
        title: body.title,
        description: body.description || null,
        canonical: body.canonical || null,
        og_title: body.og_title || null,
        og_description: body.og_description || null,
        og_image: body.og_image || null,
        robots: body.robots || 'index,follow',
        updated_at: new Date().toISOString(),
      }
      result = await supabase.from('seo_metadata').upsert(basic, { onConflict: 'path' }).select('*').single()
    }
    if (result.error) return json(res, 400, { error: result.error.message })
    clearSeoCache()
    await writeAudit(supabase, {
      actor_id: admin.id,
      actor_email: admin.email,
      action: 'SEO_METADATA_UPDATED',
      resource: 'seo_metadata',
      resource_id: path,
      new_value: { title: body.title, robots: body.robots || 'index,follow' },
    })
    await supabase.from('seo_logs').insert({
      event_type: 'metadata_update',
      path,
      detail: { title: body.title, robots: record.robots },
    })
    return json(res, 200, { item: result.data })
  }

  if (action === 'save-settings') {
    const { data: current } = await supabase.from('company_settings').select('default_seo, social').eq('id', 1).maybeSingle()
    const prev = current?.default_seo && typeof current.default_seo === 'object' ? current.default_seo : {}
    const next = { ...prev }
    for (const key of SETTING_KEYS) {
      if (body[key] !== undefined) next[key] = body[key]
    }
    const patch = { default_seo: next, updated_at: new Date().toISOString() }
    if (body.social && typeof body.social === 'object') patch.social = body.social
    const { data, error } = await supabase.from('company_settings').update(patch).eq('id', 1).select('default_seo, social').single()
    if (error) return json(res, 400, { error: error.message })
    clearSeoCache()
    await writeAudit(supabase, {
      actor_id: admin.id,
      actor_email: admin.email,
      action: 'SEO_SETTINGS_UPDATED',
      resource: 'company_settings',
      resource_id: '1',
      old_value: prev,
      new_value: next,
    })
    return json(res, 200, { settings: data.default_seo, social: data.social })
  }

  if (action === 'redirect') {
    if (!body.source || !body.destination) return json(res, 400, { error: 'source and destination required' })
    if (!safeDestination(body.destination)) return json(res, 400, { error: 'Destination must be a relative path or http(s) URL' })
    const status = [301, 302, 307, 308].includes(Number(body.status_code)) ? Number(body.status_code) : 301
    const { data, error } = await supabase
      .from('seo_redirects')
      .upsert(
        {
          source: normalizePath(body.source),
          destination: body.destination,
          status_code: status,
          enabled: body.enabled !== false,
        },
        { onConflict: 'source' },
      )
      .select('*')
      .single()
    if (error) return json(res, 400, { error: error.message })
    clearSeoCache()
    await writeAudit(supabase, {
      actor_id: admin.id,
      actor_email: admin.email,
      action: 'SEO_REDIRECT_SAVED',
      resource: 'seo_redirects',
      resource_id: data.source,
      new_value: { destination: data.destination, status_code: data.status_code },
    })
    return json(res, 200, { redirect: data })
  }

  if (action === 'delete-redirect') {
    if (!body.id && !body.source) return json(res, 400, { error: 'id required' })
    const query = supabase.from('seo_redirects').delete()
    const { error } = body.id ? await query.eq('id', body.id) : await query.eq('source', normalizePath(body.source))
    if (error) return json(res, 400, { error: error.message })
    clearSeoCache()
    return json(res, 200, { ok: true })
  }

  if (action === 'scan') {
    const ctx = await getSeoContext()
    const health = buildHealth(ctx)
    const sample = health.orphans.slice(0, 20)
    await supabase.from('seo_logs').insert({
      event_type: 'health_scan',
      path: '/',
      detail: { counts: health.counts, orphans: sample },
    })
    clearSeoCache()
    return json(res, 200, { health })
  }

  return json(res, 405, { error: 'Method not allowed' })
}
