import { LegalPage } from '@/components/legal/LegalPage'
import { termsOfService } from '@/data/legal/termsOfService'
import { useLanguage } from '@/contexts/LanguageContext'

export function TermsOfService() {
  const { language } = useLanguage()
  const doc = termsOfService[language]

  return (
    <LegalPage
      doc={doc}
      path="/terms-of-service"
      seoTitle={language === 'tr' ? 'Kullanım Şartları | LitxTech' : 'Terms of Service | LitxTech'}
      seoDescription={
        language === 'tr'
          ? 'LitxTech web sitesi, uygulamalar, yazılım satışı ve lisansları ile kuruma özel yazılım projelerini kapsayan kullanım şartları.'
          : 'The terms that govern the LitxTech website, published applications, software sales and licences, and custom software development projects.'
      }
    />
  )
}
