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
      const { data, error } = await supabase.from('company_settings').select('*').eq('id', 1).single()
      if (error) return json(res, 500, { error: 'Could not load settings' })
      return json(res, 200, { settings: data })
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
      ]
      const patch = { updated_at: new Date().toISOString(), updated_by: admin.id }
      for (const key of allowed) {
        if (body[key] !== undefined) patch[key] = body[key]
      }

      const { data: old } = await supabase.from('company_settings').select('*').eq('id', 1).single()
      const { data, error } = await supabase
        .from('company_settings')
        .update(patch)
        .eq('id', 1)
        .select('*')
        .single()
      if (error) return json(res, 500, { error: 'Update failed' })

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
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
