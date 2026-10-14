import { Link } from 'react-router-dom'
import { Mail, Smartphone, Clock, Shield } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#047857'

export function SafdasAppAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="SAFDAŞ Hesap Silme | LitxTech"
        description="SAFDAŞ hesabınızı uygulama içinden veya support@litxtech.com üzerinden nasıl silebileceğiniz."
        path="/safdas/hesap-silme"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">SAFDAŞ · LitxTech</p>
          <h1 className="text-4xl font-bold">Hesabınızı silme</h1>
          <p className="text-lg text-gray-600">
            SAFDAŞ hesabınızı ve hesapla ilişkili kişisel verilerinizi silmek için uygulama içi yolu kullanmanız tercih edilir. Uygulamaya
            erişemiyorsanız aşağıdaki e-posta yöntemiyle talepte bulunabilirsiniz. Uygulamayı cihazdan kaldırmak, sunucudaki hesabı silmez.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 shrink-0 text-emerald-700" />
            <h2 className="text-2xl font-semibold">Uygulama üzerinden silme</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>SAFDAŞ uygulamasını cihazınızda açın.</li>
            <li>
              <strong>Ayarlar → Hesap → Hesabımı sil</strong> (veya uygulamada gösterilen eşdeğer menü) bölümüne gidin.
            </li>
            <li>Uyarıları okuyup onaylayın; istenirse kimlik veya oturum doğrulaması yapın.</li>
          </ol>
          <p className="text-sm text-gray-500">Menü adları sürüme göre değişebilir; güncel yol uygulama içi yardım metinlerinde yer alır.</p>
        </section>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 shrink-0 text-emerald-700" />
            <h2 className="text-2xl font-semibold">E-posta ile talep</h2>
          </div>
          <p className="text-gray-600">Uygulamaya giriş yapamıyorsanız, hesabınıza kayıtlı e-posta adresinden yazın:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              Alıcı:{' '}
              <a href="mailto:support@litxtech.com?subject=SAFDA%C5%9E%20Hesap%20Silme%20Talebi" className="text-emerald-700 underline">
                support@litxtech.com
              </a>
            </li>
            <li>
              Konu: <strong>SAFDAŞ Hesap Silme Talebi</strong>
            </li>
            <li>İçerik: Adınız, kullanıcı adınız, kayıtlı e-posta ve kısa açıklama.</li>
          </ul>
          <p className="text-sm text-gray-500">
            Hesabın size ait olduğunu doğrulamak için gerekli ve ölçülü bilgiler istenebilir. Yasal olarak saklanması zorunlu kayıtlar ilgili
            amaç ve süreyle sınırlı tutulur.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Silme sonrası</h3>
            <p className="text-gray-700">
              Gizlilik Politikası&apos;nda açıklandığı gibi, saklanması için geçerli hukuki gerekçe bulunmayan kişisel veriler silinir, yok
              edilir veya uygun şekilde anonim hâle getirilir. Yedeklerdeki veriler yedek saklama döngüsü kapsamında kaldırılır.
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-emerald-700" />
              <h3 className="text-xl font-semibold">Süre</h3>
            </div>
            <p className="text-gray-700">
              Uygulama içi silme işlemleri genellikle kısa sürede tamamlanır. E-posta talepleri kimlik doğrulamasından sonra işlenir; yoğunluğa
              göre birkaç iş günü sürebilir.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5">
          <Shield className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
          <p className="text-sm text-gray-700">
            Kişisel veri haklarınız için{' '}
            <Link to="/safdas/gizlilik" className="font-semibold text-emerald-700 underline">
              Gizlilik Politikası
            </Link>{' '}
            bölümüne bakın. Uygulama kimliği: com.litxtech.namazim.
          </p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
          <Link to="/safdas" className="font-medium hover:underline" style={{ color: accent }}>
            ← SAFDAŞ tanıtım
          </Link>
          <Link to="/safdas/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/safdas/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/safdas/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/safdas/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
          <Link to="/safdas/abonelik" className="font-medium hover:underline" style={{ color: accent }}>
            Abonelik
          </Link>
        </nav>
      </div>
    </div>
  )
}
