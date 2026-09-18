import childSafetyDocument from '../data/tamuso/child-safety.txt?raw'
import { TamusoPolicyDocumentPage } from './TamusoPolicyDocumentPage'

export function TamusoAppChildSafety() {
  return (
    <TamusoPolicyDocumentPage
      title="Tamuso Çocuk Güvenliği ve Koruma Politikası"
      eyebrow="Tamuso · Child Safety & Protection"
      description="Tamuso ve Litxtech LLC adına kamuya açık CSAE/CSAM standardı, raporlama ve çocuk güvenliği iletişim noktası."
      path="/tamuso/child-safety"
      document={childSafetyDocument}
    />
  )
}