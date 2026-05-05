import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

export function NoctaAppPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta Kullanıcı Güvenliği ve Gizlilik Politikası | LitxTech"
        description="Nocta kullanıcı güvenliği, içerik politikası, veri gizliliği ve hizmet koşulları."
        path="/nocta/gizlilik"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Nocta Politikaları</p>
          <h1 className="text-3xl font-bold">NOCTA - KULLANICI GUVENLIGI, ICERIK POLITIKASI VE HIZMET KOSULLARI</h1>
          <p className="text-sm text-gray-500">Tarih: 05.05.2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Nocta, kullanıcılar arasında güvenli, saygılı ve kontrollü bir iletişim ortamı oluşturmayı amaçlayan bir dijital platformdur. Bu
            kapsamda Nocta, kullanıcı güvenliğini, veri gizliliğini ve yasal yükümlülükleri en üst düzeyde gözetir. Platformu kullanan her kullanıcı,
            aşağıda belirtilen kuralları, koşulları ve politikaları eksiksiz olarak kabul etmiş sayılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Hizmetin Niteliği ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Nocta, kullanıcılar tarafından oluşturulan içeriklerin paylaşıldığı bir iletişim platformudur. Platformda yer alan tüm içerikler
            kullanıcılar tarafından oluşturulmakta olup, Nocta bu içeriklerin doğruluğu, güvenilirliği veya uygunluğu konusunda garanti vermez.
            Kullanıcılar, platform üzerinden kurdukları tüm iletişimlerden tamamen kendileri sorumludur.
          </p>
          <p className="text-gray-700">
            Nocta, kullanıcılar arasında gerçekleşen hiçbir özel konuşma, anlaşma veya etkileşimden doğabilecek doğrudan veya dolaylı zararlardan
            sorumlu tutulamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Yaş Sınırı ve Kullanım Koşulları</h2>
          <p className="text-gray-700">
            Nocta yalnızca 18 yaş ve üzeri bireylerin kullanımına açıktır. Kullanıcılar, kayıt sırasında doğru bilgi vermekle yükümlüdür. Yaş, kimlik
            veya diğer bilgilerin yanlış beyan edilmesi durumunda, hesaplar herhangi bir bildirim yapılmaksızın kalıcı olarak kapatılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Sıfır Tolerans Politikası</h2>
          <p className="text-gray-700">
            Nocta, aşağıdaki ihlallere karşı sıfır tolerans uygular. Bu tür ihlaller tespit edildiğinde kullanıcı hesabı derhal ve kalıcı olarak
            kapatılır:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Çocuk istismarı, çocuklara yönelik uygunsuz içerik veya davranış.</li>
            <li>Taciz, tehdit, zorbalık veya nefret söylemi.</li>
            <li>Cinsel içerikli mesajlaşma veya uygunsuz davranışlar.</li>
            <li>Spam, dolandırıcılık veya kullanıcıları yanıltmaya yönelik girişimler.</li>
            <li>Sahte kimlik kullanımı veya başka bir kullanıcıyı taklit etme.</li>
            <li>Platform dışına yönlendirme ve şüpheli bağlantı paylaşımı.</li>
            <li>Yasa dışı faaliyetler veya teşvik edici davranışlar.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Çocuk Güvenliği</h2>
          <p className="text-gray-700">
            Nocta, çocukların korunmasına yönelik sıfır tolerans politikası uygular. 18 yaş altındaki bireylerle iletişim kurmaya yönelik şüpheli
            davranışlar, içerikler veya girişimler derhal incelenir ve gerekli durumlarda kullanıcı kalıcı olarak platformdan uzaklaştırılır. Nocta, bu
            tür durumları ilgili yasal otoritelerle paylaşma hakkını saklı tutar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. İçerik ve Davranış Denetimi</h2>
          <p className="text-gray-700">
            Nocta, platform güvenliğini sağlamak amacıyla hem otomatik hem de manuel denetim sistemleri kullanır. Şüpheli davranışlar tespit edildiğinde
            kullanıcı hesapları geçici olarak askıya alınabilir veya kalıcı olarak kapatılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Bildirim (Report) ve Engelleme (Block) Mekanizması</h2>
          <p className="text-gray-700">
            Kullanıcılar, uygunsuz içerik veya davranışları doğrudan uygulama üzerinden bildirebilir. Tüm bildirimler en geç 24 saat içerisinde
            incelenir ve gerekli aksiyonlar alınır. Kullanıcılar ayrıca diğer kullanıcıları engelleyerek iletişimi tamamen kesebilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Yaptırımlar</h2>
          <p className="text-gray-700">Nocta, platform kurallarını ihlal eden kullanıcılara karşı aşağıdaki yaptırımları uygulama hakkını saklı tutar:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>İçerik silme.</li>
            <li>Geçici hesap kısıtlaması.</li>
            <li>Kalıcı hesap kapatma (ban).</li>
            <li>IP ve cihaz bazlı erişim engelleme.</li>
            <li>Yasal mercilere bildirim.</li>
          </ul>
          <p className="text-gray-700">Nocta, gerekli gördüğü durumlarda herhangi bir ön uyarı yapmaksızın işlem uygulayabilir.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Veri Gizliliği ve Güvenlik</h2>
          <p className="text-gray-700">
            Nocta, kullanıcı verilerini korumak için gerekli tüm teknik ve idari önlemleri alır. Ancak kullanıcılar, platform üzerinde paylaştıkları
            bilgilerin sorumluluğunu kendileri taşır. Nocta, veri ihlallerini önlemek için gerekli çabayı gösterse de, kullanıcı hatalarından
            kaynaklanan veri paylaşımlarından sorumlu değildir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. Hizmetin Değiştirilmesi ve Sonlandırılması</h2>
          <p className="text-gray-700">
            Nocta, hizmetlerini herhangi bir zamanda değiştirme, güncelleme veya tamamen sonlandırma hakkını saklı tutar. Kullanıcılar, bu tür
            değişiklikleri kabul etmiş sayılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">10. Sorumluluğun Sınırlandırılması</h2>
          <p className="text-gray-700">
            Nocta, platform kullanımından doğabilecek doğrudan, dolaylı, tesadüfi veya sonuç olarak ortaya çıkan hiçbir zarardan sorumlu değildir.
            Kullanıcılar, platformu kendi riskleri dahilinde kullanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">11. Kullanıcı Yükümlülükleri</h2>
          <p className="text-gray-700">
            Kullanıcılar, platformu yalnızca yasal ve etik kurallar çerçevesinde kullanmayı kabul eder. Platformun kötüye kullanımı, sistemlere zarar
            verme girişimi veya diğer kullanıcıların deneyimini olumsuz etkileyecek davranışlar kesinlikle yasaktır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">12. İletişim</h2>
          <p className="text-gray-700">
            Her türlü ihlal, şikayet veya destek talebi için aşağıdaki iletişim adresi kullanılabilir:
          </p>
          <p className="text-gray-700">
            <a href="mailto:support@litxtech.com" className="font-medium text-indigo-600 underline">
              support@litxtech.com
            </a>
          </p>
          <p className="text-gray-700">
            Nocta, kullanıcı güvenliğini ve platform bütünlüğünü korumak adına gerekli tüm önlemleri alma hakkını saklı tutar ve bu konuda kararlı bir
            yaklaşım benimser.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Nocta</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/nocta" className="font-medium hover:underline" style={{ color: accent }}>
            ← Nocta tanıtım
          </Link>
          <Link to="/nocta/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/nocta/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/nocta/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/nocta/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Child safety (EN)
          </Link>
        </nav>
      </div>
    </div>
  )
}
