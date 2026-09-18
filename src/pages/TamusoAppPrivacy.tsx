import privacyDocument from '../data/tamuso/privacy.txt?raw'
import { TamusoPolicyDocumentPage } from './TamusoPolicyDocumentPage'

export function TamusoAppPrivacy() {
  return (
    <TamusoPolicyDocumentPage
      title="Tamuso Gizlilik Politikası"
      eyebrow="Tamuso · Privacy Policy"
      description="Tamuso mobil uygulaması ve bağlantılı hizmetler için yayımlanan tam gizlilik politikası."
      path="/tamuso/gizlilik"
      document={privacyDocument}
    />
  )
}
