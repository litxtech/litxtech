import { cors, getDbClient, json } from '../../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  try {
    const supabase = getDbClient()
    const { data, error } = await supabase.from('company_settings').select('*').eq('id', 1).maybeSingle()
    if (error || !data) {
      return json(res, 200, {
        settings: null,
        source: 'fallback',
      })
    }

    // Never expose internal fields
    return json(res, 200, {
      source: 'cms',
      settings: {
        company_name: data.company_name,
        legal_name: data.legal_name,
        description: data.description,
        phone: data.phone,
        phone_tel: data.phone_tel,
        email: data.email,
        support_email: data.support_email,
        sales_email: data.sales_email,
        website: data.website,
        logo_url: data.logo_url,
        copyright: data.copyright,
        social: data.social,
        calendly_url: data.calendly_url,
        whatsapp: {
          enabled: data.whatsapp_enabled,
          number: data.whatsapp_number,
          countryCode: data.whatsapp_country_code || '',
          display: data.whatsapp_display || data.phone || '',
          message: data.whatsapp_message,
          buttonText: data.whatsapp_button_text,
          showDesktop: data.whatsapp_show_desktop,
          showMobile: data.whatsapp_show_mobile,
        },
        address: data.address,
        city: data.city,
        country: data.country,
        working_hours: data.working_hours || data.business_hours || null,
        updated_at: data.updated_at,
      },
    })
  } catch {
    return json(res, 200, { settings: null, source: 'fallback' })
  }
}
