import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

export function NoctaAppChildSafety() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta – Çocuk Koruma Politikası | LitxTech"
        description="Nocta çocuk koruma politikası: kullanıcı güvenliği, sıfır tolerans, yaş sınırı, denetim, yaptırımlar ve yasal yükümlülükler."
        path="/nocta/child-safety"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Çocuk Koruma Politikası</p>
          <h1 className="text-3xl font-bold">Nocta – Çocuk Koruma Politikası</h1>
          <p className="text-sm text-gray-500">Last updated: May 2026</p>
          <p className="text-gray-700">
            Nocta, kullanıcılar arasında guvenli, saygili ve kontrollu bir iletisim ortami olusturmayi amaclayan bir dijital platformdur. Bu
            kapsamda Nocta, kullanici guvenligini, veri gizliligini ve yasal yukumlulukleri en ust duzeyde gozetir. Platformu kullanan her
            kullanici, asagida belirtilen kurallari, kosullari ve politikalari eksiksiz olarak kabul etmis sayilir.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Hizmetin Niteligi ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Nocta, kullanicilar tarafindan olusturulan iceriklerin paylasildigi bir iletisim platformudur. Platformda yer alan tum icerikler
            kullanicilar tarafindan olusturulmakta olup, Nocta bu iceriklerin dogrulugu, guvenilirligi veya uygunlugu konusunda garanti vermez.
            Kullanicilar, platform uzerinden kurduklari tum iletisimlerden tamamen kendileri sorumludur.
          </p>
          <p className="text-gray-700">
            Nocta, kullanicilar arasinda gerceklesen hicbir ozel konusma, anlasma veya etkilesimden dogabilecek dogrudan veya dolayli
            zararlardan sorumlu tutulamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Yas Siniri ve Kullanim Kosullari</h2>
          <p className="text-gray-700">
            Nocta yalnizca 18 yas ve uzeri bireylerin kullanimina aciktir. Kullanicilar, kayit sirasinda dogru bilgi vermekle yukumludur. Yas,
            kimlik veya diger bilgilerin yanlis beyan edilmesi durumunda, hesaplar herhangi bir bildirim yapilmaksizin kalici olarak
            kapatilabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Sifir Tolerans Politikasi</h2>
          <p className="text-gray-700">Nocta, asagidaki ihlallere karsi sifir tolerans uygular:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Cocuk istismari, cocuklara yonelik uygunsuz icerik veya davranis</li>
            <li>Taciz, tehdit, zorbalik veya nefret soylemi</li>
            <li>Cinsel icerikli mesajlasma veya uygunsuz davranislar</li>
            <li>Spam, dolandiricilik veya kullanicilari yaniltmaya yonelik girisimler</li>
            <li>Sahte kimlik kullanimi veya baska bir kullaniciyi taklit etme</li>
            <li>Platform disina yonlendirme ve supheli baglanti paylasimi</li>
            <li>Yasa disi faaliyetler veya tesvik edici davranislar</li>
          </ul>
          <p className="font-medium text-gray-800">
            Bu tur ihlaller tespit edildiginde kullanici hesabi derhal ve kalici olarak kapatilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Cocuk Guvenligi</h2>
          <p className="text-gray-700">
            Nocta, cocuklarin korunmasina yonelik sifir tolerans politikasi uygular. 18 yas altindaki bireylerle iletisim kurmaya yonelik
            supheli davranislar, icerikler veya girisimler derhal incelenir ve gerekli durumlarda kullanici kalici olarak platformdan
            uzaklastirilir. Nocta, bu tur durumlari ilgili yasal otoritelerle paylasma hakkini sakli tutar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Icerik ve Davranis Denetimi</h2>
          <p className="text-gray-700">
            Nocta, platform guvenligini saglamak amaciyla hem otomatik hem de manuel denetim sistemleri kullanir. Supheli davranislar tespit
            edildiginde kullanici hesaplari gecici olarak askiya alinabilir veya kalici olarak kapatilabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Bildirim (Report) ve Engelleme (Block) Mekanizmasi</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Kullanicilar, uygunsuz icerik veya davranislari dogrudan uygulama uzerinden bildirebilir.</li>
            <li>Tum bildirimler mumkun olan en kisa surede incelenir ve gerekli aksiyonlar alinir.</li>
            <li>Kullanicilar ayrica diger kullanicilari engelleyerek iletisimi tamamen kesebilir.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Yaptirimlar</h2>
          <p className="text-gray-700">Nocta, platform kurallarini ihlal eden kullanicilara karsi asagidaki yaptirimlari uygulayabilir:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Icerik silme</li>
            <li>Gecici hesap kisitlamasi</li>
            <li>Kalici hesap kapatma (ban)</li>
            <li>IP ve cihaz bazli erisim engelleme</li>
            <li>Yasal mercilere bildirim</li>
          </ul>
          <p className="text-gray-700">Nocta, gerekli gordugu durumlarda herhangi bir on uyari yapmaksizin islem uygulayabilir.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Veri Gizliligi ve Guvenlik</h2>
          <p className="text-gray-700">
            Nocta, kullanici verilerini korumak icin gerekli tum teknik ve idari onlemleri alir. Ancak kullanicilar, platform uzerinde
            paylastiklari bilgilerin sorumlulugunu kendileri tasir. Nocta, veri ihlallerini onlemek icin gerekli cabayi gosterse de, kullanici
            hatalarindan kaynaklanan veri paylasimlarindan sorumlu degildir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. Hizmetin Degistirilmesi ve Sonlandirilmasi</h2>
          <p className="text-gray-700">
            Nocta, hizmetlerini herhangi bir zamanda degistirme, guncelleme veya tamamen sonlandirma hakkini sakli tutar. Kullanicilar, bu tur
            degisiklikleri kabul etmis sayilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">10. Sorumlulugun Sinirlandirilmasi</h2>
          <p className="text-gray-700">
            Nocta, platform kullanimindan dogabilecek dogrudan, dolayli, tesadufi veya sonuc olarak ortaya cikan hicbir zarardan sorumlu
            degildir. Kullanicilar, platformu kendi riskleri dahilinde kullanir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">11. Kullanici Yukumlulukleri</h2>
          <p className="text-gray-700">
            Kullanicilar, platformu yalnizca yasal ve etik kurallar cercevesinde kullanmayi kabul eder. Platformun kotuye kullanimi, sistemlere
            zarar verme girisimi veya diger kullanicilarin deneyimini olumsuz etkileyecek davranislar kesinlikle yasaktir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">12. Iletisim</h2>
          <p className="text-gray-700">Her turlu ihlal, sikayet veya destek talebi icin asagidaki iletisim adresi kullanilabilir:</p>
          <p className="text-gray-700">
            <a href="mailto:support@nocta.app" className="font-medium text-indigo-600 underline">
              support@nocta.app
            </a>
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700">
          <p>
            Nocta, kullanici guvenligini ve platform butunlugunu korumak adina gerekli tum onlemleri alma hakkini sakli tutar ve bu konuda
            kararli bir yaklasim benimser.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Nocta App</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/nocta" className="font-medium hover:underline" style={{ color: accent }}>
            ← Nocta overview
          </Link>
          <Link to="/nocta/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Privacy Policy (TR)
          </Link>
          <Link to="/nocta/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Terms of Use (TR)
          </Link>
          <Link to="/nocta/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Support
          </Link>
        </nav>
      </div>
    </div>
  )
}
