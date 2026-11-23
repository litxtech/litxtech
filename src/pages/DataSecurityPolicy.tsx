import { LegalPage } from '@/components/legal/LegalPage'
import { dataSecurityPolicy } from '@/data/legal/dataSecurityPolicy'
import { useLanguage } from '@/contexts/LanguageContext'

export function DataSecurityPolicy() {
  const { language } = useLanguage()
  const doc = dataSecurityPolicy[language]

  return (
    <LegalPage
      doc={doc}
      path="/data-security-policy"
      seoTitle={language === 'tr' ? 'Veri Güvenliği | LitxTech' : 'Data Security | LitxTech'}
      seoDescription={
        language === 'tr'
          ? 'LitxTech LLC’nin web sitesi, ürünleri ve müşteri projelerinde uyguladığı teknik ve idari veri güvenliği önlemleri.'
          : 'The technical and organisational measures LitxTech LLC applies to protect data across its website, products and client projects.'
      }
    />
  )
}
