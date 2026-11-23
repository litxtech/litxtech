import { LegalPage } from '@/components/legal/LegalPage'
import { privacyPolicy } from '@/data/legal/privacyPolicy'
import { useLanguage } from '@/contexts/LanguageContext'

export function PrivacyPolicy() {
  const { language } = useLanguage()
  const doc = privacyPolicy[language]

  return (
    <LegalPage
      doc={doc}
      path="/privacy-policy"
      seoTitle={language === 'tr' ? 'Gizlilik Politikası | LitxTech LLC' : 'Privacy Policy | LitxTech LLC'}
      seoDescription={
        language === 'tr'
          ? 'LitxTech LLC; web sitesi, uygulamalar, yazılım satışları ve yazılım projelerinde kişisel verileri nasıl toplar, kullanır, paylaşır ve korur.'
          : 'How LitxTech LLC collects, uses, shares, retains and protects personal data across its website, applications, software sales and client projects.'
      }
    />
  )
}
