import termsDocument from '../data/tamuso/terms.txt?raw'
import { TamusoPolicyDocumentPage } from './TamusoPolicyDocumentPage'

export function TamusoAppTerms() {
  return (
    <TamusoPolicyDocumentPage
      title="Tamuso Kullanım Koşulları"
      eyebrow="Tamuso · Terms of Service"
      description="Tamuso mobil uygulaması, internet sitesi ve bağlantılı hizmetleri için yayımlanan tam kullanım koşulları."
      path="/tamuso/kullanim-sartlari"
      document={termsDocument}
    />
  )
}