import { Link } from 'react-router-dom'
import { AlertCircle, CreditCard, RefreshCw, Shield } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#047857'

export function SafdasAppSubscription() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="SAFDAŞ Abonelik ve Fiyatlandırma | LitxTech"
        description="SAFDAŞ abonelik ve fiyatlandırma bilgisi. Ücretli özellik sunulursa fiyat, süre ve iptal koşulları satın alma öncesinde açıklanır."
        path="/safdas/abonelik"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">SAFDAŞ · Abonelik</p>
          <h1 className="text-3xl font-bold">Abonelik ve fiyatlandırma</h1>
          <p className="text-gray-600">
            SAFDAŞ’ın namaz vakitleri, kıble, Kur’an, dua, zikir ve topluluk özelliklerinin bir kısmı ücretsiz sunulabilir. Bu sayfa, App
            Store ve Google Play listeleri için kalıcı abonelik adresidir.
          </p>
          <p className="text-sm text-gray-500">Son güncelleme: 14 Ekim 2026</p>
        </header>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-semibold text-emerald-950">Yayımlanmış ücretli plan</h2>
          <p className="mt-3 text-emerald-950">
            Bu tarihte SAFDAŞ için kamuya açık, sabit fiyatlı bir abonelik planı yayımlanmamıştır. Ücretli bir özelliğin bulunmaması,
            kullanıcıdan ücret tahsil edileceği anlamına gelmez.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-700" />
            <h2 className="text-xl font-semibold">Ücretli özellik sunulursa</h2>
          </div>
          <p className="text-gray-700">
            Gelecekte abonelik, uygulama içi satın alma veya başka ücretli hizmetler kullanıma sunulabilir. Bu durumda aşağıdaki bilgiler
            satın alma öncesinde uygulama içinde ve bu sayfada açıklanır:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Ücret ve para birimi.</li>
            <li>Abonelik süresi.</li>
            <li>Yenileme koşulları.</li>
            <li>İptal yöntemi.</li>
            <li>Uygulanabilir iade ve tüketici hakları.</li>
            <li>Apple App Store ve Google Play ödeme kuralları.</li>
          </ul>
          <p className="text-gray-700">
            Uygulama içi satın almalar Apple App Store veya Google Play üzerinden işlenir. LITXTECH LLC tam kredi kartı bilgilerinizi
            sunucularında saklamaz. Satın almadan önce mağaza ekranında gösterilen güncel fiyat esas alınır.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-emerald-700" />
            <h2 className="text-xl font-semibold">Yenileme ve iptal</h2>
          </div>
          <p className="text-gray-700">
            Ücretli bir abonelik sunulduğunda, iptal edilmediği sürece seçilen dönem sonunda ilgili mağaza hesabından yenilenebilir. İptal
            sonrası mevcut dönem sonuna kadar erişim, mağaza kurallarına göre devam edebilir.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>iOS: Ayarlar → Apple ID → Abonelikler → SAFDAŞ.</li>
            <li>Android: Google Play → Ödemeler ve abonelikler → Abonelikler → SAFDAŞ.</li>
          </ul>
        </section>

        <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-amber-900">İptal ve iade talebi</h2>
              <p className="text-sm text-amber-950">
                Satın alma sonrası iptal veya iade taleplerinizi support@litxtech.com adresine “SAFDAŞ Abonelik” konulu e-posta ile veya{' '}
                <Link to="/safdas/destek" className="font-semibold underline">
                  Destek
                </Link>{' '}
                sayfasından iletebilirsiniz. App Store ve Google Play işlemlerinde ilgili mağazanın iade kuralları da geçerlidir. Tüketicilerin
                zorunlu kanuni hakları saklıdır.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-700" />
            <h2 className="text-xl font-semibold">İlgili metinler</h2>
          </div>
          <p className="text-gray-700">
            Ücretli hizmetler{' '}
            <Link to="/safdas/kullanim-sartlari" className="font-medium text-emerald-700 underline">
              Kullanım Koşulları
            </Link>{' '}
            ve{' '}
            <Link to="/safdas/gizlilik" className="font-medium text-emerald-700 underline">
              Gizlilik Politikası
            </Link>{' '}
            ile birlikte geçerlidir. Dini inançları ortaya çıkaran veriler, reklam hedeflemesi için özel veri koruma şartlarına tabidir.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© 2026 LITXTECH LLC — SAFDAŞ</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/safdas" className="font-medium hover:underline" style={{ color: accent }}>
            ← SAFDAŞ tanıtım
          </Link>
          <Link to="/safdas/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/safdas/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/safdas/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/safdas/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
        </nav>
      </div>
    </div>
  )
}
