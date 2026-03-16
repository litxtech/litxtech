import { Shield, Mail, Smartphone, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const accent = '#0d9488'

export function ValoriaAppAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>Valoria App / Valoria Hotel</p>
          <h1 className="text-4xl font-bold">Valoria App hesabınızı silme</h1>
          <p className="text-lg text-gray-600">
            Bu sayfa, Valoria Hotel uygulaması hesabınızı kalıcı olarak nasıl silebileceğinizi, verilerinize ne olacağını ve uygulamaya erişiminiz yoksa destek ile nasıl iletişime geçeceğinizi açıklar.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Uygulama üzerinden silme</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Valoria App&apos;i cihazınızda (iOS veya Android) açın.</li>
            <li><strong>Ayarlar → Hesap → Hesabımı sil</strong> (veya eşdeğer menü) bölümüne gidin.</li>
            <li>Uyarıyı onaylayın ve istenirse kimlik doğrulaması yapın.</li>
            <li>Hesabınız silinmek üzere planlanacak ve onay alacaksınız.</li>
          </ol>
          <p className="text-sm text-gray-500">
            İşletme veya e-posta hesabıyla giriş yaptıysanız, silme talebini onaylarken aynı bilgileri kullanın.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">E-posta ile silme talebi</h2>
          </div>
          <p className="text-gray-600">
            Uygulama yüklü değilse veya giriş yapamıyorsanız, Valoria App hesabınıza bağlı e-posta adresinden bize yazın:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Alıcı: <a href="mailto:privacy@valoriahotel.com" className="text-blue-600 underline">privacy@valoriahotel.com</a> veya <a href="mailto:support@valoriahotel.com" className="text-blue-600 underline">support@valoriahotel.com</a></li>
            <li>Konu: <strong>&quot;Valoria App Hesap Silme&quot;</strong> veya <strong>&quot;Hesabımı silmek istiyorum&quot;</strong></li>
            <li>İçerik: Adınız, kayıtlı telefon veya e-posta ve silme nedeniniz (isteğe bağlı).</li>
          </ul>
          <p className="text-sm text-gray-500">
            Güvenlik nedeniyle talebi işlemeden önce ek doğrulama isteyebiliriz.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Neler silinir?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Hesap ve profil bilgileri</li>
              <li>Rezervasyon ve konaklama geçmişi (yasal saklama süresi dışında)</li>
              <li>Uygulama tercihleri ve ayarlar</li>
              <li>Dijital anahtar ve oturum bilgileri</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Geçici olarak ne saklanabilir?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Yasal veya düzenleyici zorunluluklar (misafir kayıtları, fatura vb.)</li>
              <li>Güvenlik ve denetim logları (sınırlı süre)</li>
              <li>Yedekler (saklama politikamıza göre temizlenir)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Süre ve onay</h2>
          </div>
          <p className="text-gray-700">
            Uygulama içinden tetiklenen silmeler genellikle kısa sürede işlenir. E-posta talepleri kimliğinizi doğruladıktan sonra 30 gün içinde ele alınır. Silme tamamlandığında onay e-postası gönderilir. İşlem geri alınamaz.
          </p>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Yardım</h2>
          </div>
          <p className="text-gray-700 mt-2">
            Valoria App, Valoria Hotel tarafından işletilmektedir. Gizlilik veya destek talebi için aşağıdaki linkleri kullanabilirsiniz.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link to="/valoria-app-privacy" className="text-blue-600 underline">Gizlilik Sözleşmesi</Link>
            <Link to="/valoria-app-terms" className="text-blue-600 underline">Kullanım Şartları</Link>
            <Link to="/support/valoria-app" className="text-blue-600 underline">Destek</Link>
            <Link to="/valoria-app" className="text-blue-600 underline">Valoria App Tanıtım</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
