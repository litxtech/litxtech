import { Link } from 'react-router-dom'
import { Mail, Smartphone, Clock, Shield } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Hesap Silme | LitxTech"
        description="Tamuso hesabınızı uygulama içinden veya e-posta ile nasıl silebileceğiniz."
        path="/tamuso/hesap-silme"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Tamuso · LitxTech</p>
          <h1 className="text-4xl font-bold">Hesabınızı silme</h1>
          <p className="text-lg text-gray-600">
            Tamuso hesabınızı kalıcı olarak kapatmak için uygulama içi yolu tercih edilir. Uygulamaya erişemiyorsanız e-posta ile talepte
            bulunabilirsiniz.
          </p>
        </header>

        <section className="space-y-6 border border-gray-200 bg-zinc-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 shrink-0 text-amber-700" />
            <h2 className="text-2xl font-semibold">Uygulama üzerinden silme</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Tamuso uygulamasını cihazınızda açın.</li>
            <li>
              <strong>Ayarlar → Hesap → Hesabımı sil</strong> (veya uygulamada gösterilen eşdeğer menü) bölümüne gidin.
            </li>
            <li>Uyarıları okuyup onaylayın; istenirse kimlik veya oturum doğrulaması yapın.</li>
          </ol>
          <p className="text-sm text-gray-500">Menü adları sürüme göre değişebilir.</p>
        </section>

        <section className="space-y-6 border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 shrink-0 text-amber-700" />
            <h2 className="text-2xl font-semibold">E-posta ile talep</h2>
          </div>
          <p className="text-gray-600">Uygulamaya giriş yapamıyorsanız, kayıtlı e-posta adresinizden yazın:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              Alıcı:{' '}
              <a href="mailto:support@litxtech.com" className="text-amber-700 underline">
                support@litxtech.com
              </a>
            </li>
            <li>
              Konu: <strong>Tamuso Hesap Silme</strong>
            </li>
            <li>İçerik: Adınız, kayıtlı e-posta ve kısa açıklama (isteğe bağlı).</li>
          </ul>
          <p className="text-sm text-gray-500">Güvenlik için ek doğrulama isteyebiliriz.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Silme sonrası</h3>
            <p className="text-gray-700">
              Veriler Gizlilik Politikası’nda açıklandığı gibi makul süre içinde silinir veya anonimleştirilir; yasal saklama zorunluluğu olan
              kayıtlar istisnadır.
            </p>
          </div>
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-amber-700" />
              <h3 className="text-xl font-semibold">Süre</h3>
            </div>
            <p className="text-gray-700">
              Uygulama içi silme genellikle kısa sürede tamamlanır. E-posta talepleri doğrulama sonrası işlenir; birkaç iş günü sürebilir.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 border border-amber-100 bg-amber-50/80 p-5">
          <Shield className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
          <p className="text-sm text-gray-700">
            Kişisel veri haklarınız için{' '}
            <Link to="/tamuso/gizlilik" className="font-semibold text-amber-700 underline">
              Gizlilik Politikası
            </Link>{' '}
            sayfasına bakın.
          </p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso tanıtım
          </Link>
          <Link to="/tamuso/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/tamuso/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
        </nav>
      </div>
    </div>
  )
}
