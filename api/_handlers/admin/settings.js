import {
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  writeAudit,
} from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})

  const admin = await requireAdmin(req, res)
  if (!admin) return
  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle()
      if (error) return json(res, 500, { error: `Could not load settings: ${error.message}` })
      if (data) return json(res, 200, { settings: data })
      const created = await supabase
        .from('company_settings')
        .insert({ id: 1 })
        .select('*')
        .single()
      if (created.error) return json(res, 500, { error: created.error.message })
      return json(res, 200, { settings: created.data })
    }

    if (req.method === 'PUT') {
      const body = await readBody(req)
      const allowed = [
        'company_name',
        'legal_name',
        'description',
        'address',
        'country',
        'city',
        'phone',
        'phone_tel',
        'mobile',
        'email',
        'support_email',
        'business_email',
        'sales_email',
        'website',
        'logo_url',
        'favicon_url',
        'copyright',
        'business_hours',
        'social',
        'whatsapp_enabled',
        'whatsapp_number',
        'whatsapp_message',
        'whatsapp_button_text',
        'whatsapp_show_desktop',
        'whatsapp_show_mobile',
        'calendly_url',
        'whatsapp_country_code',
        'whatsapp_display',
        'working_hours',
        'default_seo',
        'analytics_ids',
        'cookie_text',
        'trust_stats',
      ]
      const patch = { updated_at: new Date().toISOString(), updated_by: admin.id }
      for (const key of allowed) {
        if (body[key] !== undefined) patch[key] = body[key]
      }

      // JSONB columns must receive valid objects/arrays, never raw editor text.
      for (const key of ['social', 'default_seo', 'analytics_ids', 'business_hours', 'trust_stats']) {
        if (patch[key] === undefined) continue
        if (typeof patch[key] === 'string') {
          try {
            patch[key] = JSON.parse(patch[key])
          } catch {
            delete patch[key]
          }
        }
      }
      if (patch.company_name !== undefined && !String(patch.company_name || '').trim()) {
        return json(res, 400, { error: 'Company name is required' })
      }

      const { data: old } = await supabase.from('company_settings').select('*').eq('id', 1).single()
      let { data, error } = await supabase
        .from('company_settings')
        .update(patch)
        .eq('id', 1)
        .select('*')
        .single()

      // Self-healing: if the live table is missing a column we write, drop the
      // unknown keys and retry once so a single legacy column never blocks the
      // whole save.
      if (error) {
        const missing = /column "?([a-z0-9_]+)"? .*does not exist/i.exec(error.message || '')
        if (missing?.[1]) {
          delete patch[missing[1]]
          delete patch.updated_by
          const retry = await supabase
            .from('company_settings')
            .update(patch)
            .eq('id', 1)
            .select('*')
            .single()
          data = retry.data
          error = retry.error
        }
      }

      if (error) {
        return json(res, 500, {
          error: `Update failed: ${error.message || 'unknown database error'}`,
          code: error.code || null,
          hint: error.hint || null,
        })
      }

      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'SETTINGS_UPDATED',
        resource: 'company_settings',
        resource_id: '1',
        old_value: { phone: old?.phone, whatsapp_number: old?.whatsapp_number, email: old?.email },
        new_value: {
          phone: data.phone,
          whatsapp_number: data.whatsapp_number,
          email: data.email,
        },
      })

      return json(res, 200, { settings: data })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Server error' })
  }
}
