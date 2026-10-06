import { MessageCircle } from 'lucide-react'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

export function WhatsAppFloat() {
  const company = useCompanySettings()
  if (company.whatsapp?.enabled === false) return null

  return (
    <a
      href={getWhatsAppUrl(company)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', window.location.pathname)}
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 md:bottom-8 md:right-8"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
