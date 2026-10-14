import privacyDocument from '../data/safdas/privacy.txt?raw'
import { SafdasPolicyDocumentPage } from './SafdasPolicyDocumentPage'

export function SafdasAppPrivacy() {
  return (
    <SafdasPolicyDocumentPage
      title="SAFDAŞ Gizlilik Politikası"
      eyebrow="SAFDAŞ · Gizlilik Politikası"
      description="SAFDAŞ mobil uygulaması ve ilgili web hizmetleri için yayımlanan gizlilik politikası. Son güncelleme: 14 Ekim 2026."
      path="/safdas/gizlilik"
      document={privacyDocument}
    />
  )
}
