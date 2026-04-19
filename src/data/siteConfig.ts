/** Site-wide marketing settings (contact channels, CTA defaults). */
export const siteConfig = {
  brandName: 'LitxTech',
  tagline: 'İşletmeler ve girişimler için modern, ölçeklenebilir ve kullanıcı odaklı yazılım çözümleri geliştiriyoruz.',
  phone: '+1 307 271 5151',
  phoneTel: '+13072715151',
  email: 'support@litxtech.com',
  /** WhatsApp click-to-chat (same number as phone; adjust if you use a dedicated WA business number). */
  whatsapp: {
    number: '13072715151',
    defaultMessage:
      'Merhaba, LitxTech web sitesinden yazıyorum. Projem için bilgi almak istiyorum.',
  },
  calendlyUrl: 'https://calendly.com/litxtech/consultation',
  demoUrl: 'https://www.litxtech.com/demo',
} as const

export function getWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.defaultMessage)
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`
}
