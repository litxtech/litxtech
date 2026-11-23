import { LegalPage } from '@/components/legal/LegalPage'
import { refundPolicy } from '@/data/legal/refundPolicy'
import { useLanguage } from '@/contexts/LanguageContext'

export function RefundPolicy() {
  const { language } = useLanguage()
  const doc = refundPolicy[language]

  return (
    <LegalPage
      doc={doc}
      path="/refund-policy"
      seoTitle={language === 'tr' ? 'İade Politikası | LitxTech' : 'Refund Policy | LitxTech'}
      seoDescription={
        language === 'tr'
          ? 'LitxTech projeleri, lisansları, abonelikleri ve uygulama mağazası satın alımları için iade ve iptal koşulları.'
          : 'Refund and cancellation terms for LitxTech projects, licences, subscriptions and app store purchases.'
      }
    />
  )
}
