import { Link } from 'react-router-dom'
import { AlertCircle, Check, CreditCard, RefreshCw, Shield } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'
import { voraSubscriptionLegalNotes, voraSubscriptionPlans } from '../data/voraSubscriptionData'

const accent = '#0d9488'

export function VoraAppSubscription() {
  const legal = voraSubscriptionLegalNotes

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Vora Abonelik ve Fiyatlandırma | LitxTech"
        description="Vora abonelik planları: Yıllık 249,99 TL ve Premium Abonelik 1.999,99 TL. Otomatik yenileme, iptal ve 24 saat cayma hakkı bilgileri."
        path="/vora/abonelik"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Vora · Abonelik</p>
          <h1 className="text-3xl font-bold">Abonelik Planları ve Fiyatlandırma</h1>
          <p className="text-gray-600">
            Vora premium hizmetleri isteğe bağlı aboneliklerle sunulur. Aşağıda plan fiyatları, kapsamları, otomatik yenileme koşulları ve
            iptal haklarınız açıkça yer almaktadır.
          </p>
          <p className="text-sm text-gray-500">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {voraSubscriptionPlans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-2xl border p-6 shadow-sm ${
                plan.highlighted ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-200' : 'border-gray-200 bg-white'
              }`}
            >
              {plan.highlighted && (
                <span className="mb-3 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                  Premium
                </span>
              )}
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-3xl font-bold text-teal-700">{plan.price}</p>
              <p className="text-sm text-gray-500">{plan.priceNote}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">Dönem: {plan.billingPeriod}</p>
              <p className="mt-4 text-sm text-gray-700">{plan.summary}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-amber-900">24 saat içinde iptal hakkı</h2>
              <p className="text-sm text-amber-950">{legal.cancellation24h}</p>
              <p className="text-sm text-amber-950">
                İptal ve iade talepleri için{' '}
                <a href={`mailto:${legal.contact}?subject=Vora%20Abonelik%20İptal`} className="font-semibold underline">
                  {legal.contact}
                </a>{' '}
                adresine &quot;Vora Abonelik İptal&quot; konulu e-posta gönderebilir veya{' '}
                <Link to="/vora/destek" className="font-semibold underline">
                  Destek
                </Link>{' '}
                sayfasını kullanabilirsiniz. App Store veya Google Play üzerinden yapılan işlemlerde mağaza iade politikaları da geçerlidir.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold">Otomatik yenileme</h2>
          </div>
          <p className="text-gray-700">{legal.autoRenew}</p>
          <p className="text-gray-700">{legal.cancelHow}</p>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold">Ödeme ve faturalama</h2>
          </div>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>{legal.paymentProcessor}</li>
            <li>{legal.freeTier}</li>
            <li>Fiyatlar Türk Lirası (TL) cinsinden ifade edilir; vergiler satın alma ekranında gösterilir.</li>
            <li>
              Fiyat ve plan değişiklikleri önceden uygulama içi bildirim veya bu sayfa üzerinden duyurulabilir; mevcut abonelik döneminiz
              etkilenmez.
            </li>
          </ul>
        </section>

        <section className="space-y-3 rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold">6502 sayılı Kanun — cayma hakkı bilgilendirmesi</h2>
          </div>
          <p className="text-gray-700">
            Mesafeli sözleşmeler kapsamında dijital içerik ve anında ifa edilen hizmetlerde, hizmetin ifasına açık onay vermeniz ve cayma
            hakkınızın sona ereceğine dair bilgilendirilmeniz halinde yasal cayma süresi uygulanmayabilir. Bununla birlikte yukarıdaki{' '}
            <strong>24 saatlik iptal hakkı</strong> politikamız, satın alma sonrası kısa süre içinde iletilen talepler için ayrıca
            değerlendirilir.
          </p>
          <p className="text-gray-700">
            Abonelik koşulları ayrıca{' '}
            <Link to="/vora/kullanim-sartlari" className="font-medium text-teal-600 underline">
              Kullanım Şartları
            </Link>{' '}
            ve{' '}
            <Link to="/vora/gizlilik" className="font-medium text-teal-600 underline">
              Gizlilik Politikası
            </Link>{' '}
            ile birlikte geçerlidir.
          </p>
        </section>

        <section className="rounded-xl bg-teal-50 p-5 text-sm text-gray-700">
          <p>
            <strong>Not:</strong> Satın almadan önce uygulama içinde gösterilen güncel fiyat, dönem ve plan adı esas alınır. App Store ve
            Google Play fiyatlandırması bölgesel kurallara göre değişiklik gösterebilir.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Vora</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/vora" className="font-medium hover:underline" style={{ color: accent }}>
            ← Vora tanıtım
          </Link>
          <Link to="/vora/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/vora/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/vora/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
        </nav>
      </div>
    </div>
  )
}
