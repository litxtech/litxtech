import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

export function NoctaAppTerms() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta Kullanım Şartları | LitxTech"
        description="Nocta mobil uygulaması kullanım şartları. Hizmet kapsamı, kurallar ve sorumluluklar."
        path="/nocta/kullanim-sartlari"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Kullanım Şartları</p>
          <h1 className="text-3xl font-bold">KULLANIM ŞARTLARI</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 6 Nisan 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Kullanım Şartları (&quot;Şartlar&quot;), Nocta mobil uygulamasını (&quot;Uygulama&quot;) kullanımınızı düzenler. Uygulamayı indirerek,
            hesap oluşturarak veya kullanarak bu Şartları okuduğunuzu ve kabul ettiğinizi beyan edersiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hizmetin tanımı</h2>
          <p className="text-gray-700">
            Nocta; kullanıcıların profil oluşturmasına, keşfetmesine, eşleşmesine, mesajlaşmasına ve tanımlanan kapsamda sesli/görüntülü arama ve
            ilgili özelliklere erişmesine imkân veren bir platformdur. Özellikler zaman içinde değişebilir veya bölgesel olarak farklılık
            gösterebilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Uygunluk ve hesap</h2>
          <p className="text-gray-700">
            <strong>2.1</strong> Hizmeti kullanmak için yürürlükteki yerel yasalara göre reşit olmanız ve hesap bilgilerinizin doğru olması gerekir.
          </p>
          <p className="text-gray-700">
            <strong>2.2</strong> Hesap güvenliğinden (şifre ve cihaz erişimi) siz sorumlusunuz. Yetkisiz kullanımı derhal bildirmeniz beklenir.
          </p>
          <p className="text-gray-700">
            <strong>2.3</strong> Bir kişi, politikalarımızın izin verdiği ölçüde birden fazla hesap oluşturamaz veya başkasının kimliğine
            bürünemez.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Kabul edilen davranışlar ve yasaklar</h2>
          <p className="text-gray-700">Aşağıdakiler (sınırlı olmamak kaydıyla) yasaktır:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Yasadışı, zararlı, taciz edici, nefret söylemi içeren veya şiddeti teşvik eden içerik veya davranış.</li>
            <li>Başka kullanıcıları tehdit etmek, stalking, dolandırıcılık veya kimlik avı.</li>
            <li>Spam, istenmeyen ticari ileti, otomatik bot veya sistemi manipüle etmeye yönelik araçlar.</li>
            <li>Başkalarının kişisel verilerini izinsiz toplamak veya yayınlamak.</li>
            <li>Telif hakkı veya gizlilik ihlali oluşturan içerik paylaşımı.</li>
            <li>Hizmetin güvenliğini veya altyapısını bozmaya yönelik girişimler.</li>
          </ul>
          <p className="text-gray-700">
            Hizmet sağlayıcı, ihlal bildirimleri veya tespit edilen kurallara aykırılıklar doğrultusunda içerik kaldırma, özellik kısıtlama, hesap
            askıya alma veya sonlandırma hakkını saklı tutar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Ücretlendirme, cüzdan ve aramalar</h2>
          <p className="text-gray-700">
            <strong>4.1</strong> Uygulama içi ücretli özellikler, paketler veya dakika/durum bazlı ücretlendirme sunulabilir. Fiyatlar ve koşullar
            ilgili ekranda gösterilir.
          </p>
          <p className="text-gray-700">
            <strong>4.2</strong> Ödemeler üçüncü taraf ödeme sağlayıcıları üzerinden işlenebilir; ödeme koşulları ilgili sağlayıcının kurallarına
            tabidir.
          </p>
          <p className="text-gray-700">
            <strong>4.3</strong> İade, iptal ve anlaşmazlıklar için uygulama içi destek veya yürürlükteki tüketici mevzuatı uygulanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Fikri mülkiyet</h2>
          <p className="text-gray-700">
            Uygulama logosu, tasarım, metin ve yazılım bileşenleri üzerindeki haklar hizmet sağlayıcıya veya lisans verenlere aittir. İzinsiz kopyalama,
            dağıtım veya tersine mühendislik yasaktır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Üçüncü taraf bağlantılar ve içerikler</h2>
          <p className="text-gray-700">
            Uygulama üçüncü taraf sitelere veya hizmetlere bağlantı verebilir. Bu üçüncü tarafların gizlilik uygulamaları ve şartları kendi
            sorumluluğundadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hizmetin değiştirilmesi ve kesintiler</h2>
          <p className="text-gray-700">
            Hizmet &quot;olduğu gibi&quot; sunulur. Bakım, güncelleme, teknik sorunlar veya mücbir sebepler nedeniyle kesintiler olabilir. Mümkün
            olduğunca önceden bilgilendirme yapılır; ancak garanti verilmez.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Sorumluluğun sınırlandırılması</h2>
          <p className="text-gray-700">
            Yürürlükteki kanunun izin verdiği azami ölçüde; dolaylı zararlar, kayıp kâr, veri kaybı veya üçüncü kullanıcıların davranışlarından
            kaynaklanan zararlardan hizmet sağlayıcı sorumlu tutulmaz. Bazı yargı bölgelerinde bazı sınırlamalar geçerli olmayabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Tazminat</h2>
          <p className="text-gray-700">
            Hizmetin kötüye kullanımın veya bu Şartların ihlalinin size veya üçüncü kişilere verdiği zararlar için, yürürlükteki hukuk çerçevesinde
            gerekli tazminatları üstlenmeyi kabul edersiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hesabın sonlandırılması</h2>
          <p className="text-gray-700">
            İstediğiniz zaman hesabınızı silebilir veya destek üzerinden kapatma talebinde bulunabilirsiniz. Ciddi ihlallerde hizmet sağlayıcı
            hesabınızı askıya alabilir veya sonlandırabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Uyuşmazlık çözümü ve uygulanacak hukuk</h2>
          <p className="text-gray-700">
            Bu Şartlar, Türkiye Cumhuriyeti kanunlarına tabi olacak şekilde yorumlanır (aksi açıkça yazılmadıkça). Tüketici iseniz, zorunlu tüketici
            hakları saklıdır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Şartlarda değişiklik</h2>
          <p className="text-gray-700">
            Şartlar güncellenebilir. Önemli değişikliklerde uygulama içi bildirim veya e-posta ile bilgilendirme yapılabilir. Güncel sürüm her zaman
            uygulama içinde &quot;Kullanım Şartları&quot; bölümünde yayımlanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">İletişim</h2>
          <p className="text-gray-700">
            Sorularınız için uygulama içi &quot;Destek&quot; veya hesap ayarlarında belirtilen iletişim kanallarını kullanabilirsiniz.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Nocta</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/nocta" className="font-medium hover:underline" style={{ color: accent }}>
            ← Nocta tanıtım
          </Link>
          <Link to="/nocta/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik Politikası
          </Link>
          <Link to="/nocta/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/nocta/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
        </nav>
      </div>
    </div>
  )
}
