import { Link } from 'react-router-dom'
import { Mail, Smartphone, Clock, Shield } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#0d9488'

export function VoraAppAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Vora Hesap Silme | LitxTech"
        description="Vora hesabınızı uygulama içinden veya e-posta ile nasıl silebileceğiniz."
        path="/vora/hesap-silme"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Vora · LitxTech</p>
          <h1 className="text-4xl font-bold">Hesabınızı silme</h1>
          <p className="text-lg text-gray-600">
            Vora hesabınızı kalıcı olarak kapatmak için uygulama içi yolu kullanmanız tercih edilir. Uygulamaya erişemiyorsanız aşağıdaki
            e-posta yöntemiyle talepte bulunabilirsiniz.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 shrink-0 text-teal-600" />
            <h2 className="text-2xl font-semibold">Uygulama üzerinden silme</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Vora uygulamasını cihazınızda açın.</li>
            <li>
              <strong>Ayarlar → Hesap → Hesabımı sil</strong> (veya uygulamada gösterilen eşdeğer menü) bölümüne gidin.
            </li>
            <li>Uyarıları okuyup onaylayın; istenirse kimlik veya oturum doğrulaması yapın.</li>
          </ol>
          <p className="text-sm text-gray-500">Menü adları sürüme göre değişebilir; güncel yol uygulama içi yardım metinlerinde yer alır.</p>
        </section>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 shrink-0 text-teal-600" />
            <h2 className="text-2xl font-semibold">E-posta ile talep</h2>
          </div>
          <p className="text-gray-600">
            Uygulamaya giriş yapamıyorsanız, hesabınıza kayıtlı olduğunu düşündüğünüz e-posta adresinden yazın:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              Alıcı:{' '}
              <a href="mailto:support@litxtech.com" className="text-teal-600 underline">
                support@litxtech.com
              </a>
            </li>
            <li>
              Konu: <strong>Vora Hesap Silme</strong>
            </li>
            <li>İçerik: Adınız, kayıtlı e-posta ve kısa açıklama (isteğe bağlı).</li>
          </ul>
          <p className="text-sm text-gray-500">Güvenlik için talebi işlemeden önce ek doğrulama isteyebiliriz.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Silme sonrası</h3>
            <p className="text-gray-700">
              Gizlilik Politikası&apos;nda açıklandığı gibi veriler makul süre içinde silinir veya anonimleştirilir; yasal olarak saklanması
              zorunlu kayıtlar istisnadır.
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-teal-600" />
              <h3 className="text-xl font-semibold">Süre</h3>
            </div>
            <p className="text-gray-700">
              Uygulama içi silme işlemleri genellikle kısa sürede tamamlanır. E-posta talepleri kimlik doğrulamasından sonra işlenir; yoğunluğa
              göre birkaç iş günü sürebilir.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-teal-100 bg-teal-50/80 p-5">
          <Shield className="mt-0.5 h-6 w-6 shrink-0 text-teal-600" />
          <p className="text-sm text-gray-700">
            Kişisel veri haklarınız için{' '}
            <Link to="/vora/gizlilik" className="font-semibold text-teal-600 underline">
              Gizlilik Politikası
            </Link>{' '}
            bölümüne bakın.
          </p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
          <Link to="/vora" className="font-medium hover:underline" style={{ color: accent }}>
            ← Vora tanıtım
          </Link>
          <Link to="/vora/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/vora/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/vora/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/vora/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
          <Link to="/vora/abonelik" className="font-medium hover:underline" style={{ color: accent }}>
            Abonelik
          </Link>
        </nav>
      </div>
    </div>
  )
}
