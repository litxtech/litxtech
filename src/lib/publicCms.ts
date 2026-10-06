import { siteConfig } from '@/data/siteConfig'

export type PublicCompanySettings = {
  company_name: string
  phone: string
  phone_tel: string
  email: string
  support_email?: string
  website?: string
  copyright?: string
  description?: string | null
  calendly_url?: string
  address?: string | null
  social?: Record<string, string>
  whatsapp: {
    enabled: boolean
    number: string
    message: string
    buttonText: string
    showDesktop: boolean
    showMobile: boolean
  }
}

export function fallbackCompanySettings(): PublicCompanySettings {
  return {
    company_name: siteConfig.brandName,
    phone: siteConfig.phone,
    phone_tel: siteConfig.phoneTel,
    email: siteConfig.email,
    support_email: siteConfig.email,
    website: 'https://www.litxtech.com',
    calendly_url: siteConfig.calendlyUrl,
    copyright: `© ${new Date().getFullYear()} LitxTech. Tüm hakları saklıdır.`,
    social: {},
    whatsapp: {
      enabled: true,
      number: siteConfig.whatsapp.number,
      message: siteConfig.whatsapp.defaultMessage,
      buttonText: 'WhatsApp',
      showDesktop: true,
      showMobile: true,
    },
  }
}

export async function fetchCompanySettings(): Promise<PublicCompanySettings> {
  try {
    const res = await fetch('/api/public/company')
    const data = await res.json()
    if (data?.settings) return data.settings as PublicCompanySettings
  } catch {
    // fallback
  }
  return fallbackCompanySettings()
}

export async function fetchPublishedApplications() {
  try {
    const res = await fetch('/api/public/applications')
    const data = await res.json()
    return Array.isArray(data.applications) ? data.applications : []
  } catch {
    return []
  }
}

export function getWhatsAppUrl(settings: PublicCompanySettings, message?: string) {
  const text = encodeURIComponent(message ?? settings.whatsapp.message)
  return `https://wa.me/${settings.whatsapp.number}?text=${text}`
}

export async function trackEvent(event_name: string, path?: string, meta?: Record<string, unknown>) {
  try {
    await fetch('/api/public/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_name, path, meta }),
    })
  } catch {
    // ignore
  }
}

export async function submitLead(payload: Record<string, unknown>) {
  const res = await fetch('/api/public/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Lead submit failed')
  return data as { ok: boolean; reference_code: string; message: string }
}
