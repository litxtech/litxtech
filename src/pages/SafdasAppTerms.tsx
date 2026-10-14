import termsDocument from '../data/safdas/terms.txt?raw'
import { SafdasPolicyDocumentPage } from './SafdasPolicyDocumentPage'

export function SafdasAppTerms() {
  return (
    <SafdasPolicyDocumentPage
      title="SAFDAŞ Kullanım Koşulları"
      eyebrow="SAFDAŞ · Kullanım Koşulları"
      description="SAFDAŞ mobil uygulaması, web hizmetleri ve topluluk özellikleri için yayımlanan kullanım koşulları. Yürürlük: 14 Ekim 2026."
      path="/safdas/kullanim-sartlari"
      document={termsDocument}
    />
  )
}
