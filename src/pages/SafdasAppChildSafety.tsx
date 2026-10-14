import childSafetyDocument from '../data/safdas/child-safety.txt?raw'
import { SafdasPolicyDocumentPage } from './SafdasPolicyDocumentPage'

export function SafdasAppChildSafety() {
  return (
    <SafdasPolicyDocumentPage
      title="SAFDAŞ Çocuk Koruma ve Güvenliği Politikası"
      eyebrow="SAFDAŞ · Child Protection and Safety Policy"
      description="SAFDAŞ çocuk koruma politikası: sıfır tolerans, yaş sınırı, şikâyet, moderasyon ve yetkili bildirimler."
      path="/safdas/child-safety"
      document={childSafetyDocument}
    />
  )
}
