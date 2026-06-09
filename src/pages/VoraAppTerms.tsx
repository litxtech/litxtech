import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#0d9488'

export function VoraAppTerms() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Vora Kullanım Şartları | LitxTech"
        description="Vora Kullanıcı Politikası: kurallar, güvenlik, yaptırımlar, veri gizliliği ve yasal uyum."
        path="/vora/kullanim-sartlari"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Kullanıcı Politikası</p>
          <h1 className="text-3xl font-bold">VORA KULLANICI POLİTİKASI</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 9 Haziran 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Kullanıcı Politikası, Vora uygulamasının kullanımıyla ilgili tüm kuralları, yükümlülükleri, hakları ve yaptırımları belirler.
            Vora&apos;yı kullanan her kullanıcı, bu politikayı okumuş, anlamış ve tüm maddelerini kabul etmiş sayılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hizmet Tanımı ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Vora, Karadeniz bölgesindeki şehirler için anlık haberleşme, topluluk akışı ve yerel içerik paylaşımı sunan bir dijital
            platformdur. Platformda yer alan içeriklerin tamamı kullanıcılar tarafından oluşturulmakta olup, Vora bu içeriklerin doğruluğu,
            güvenilirliği veya uygunluğu hakkında herhangi bir garanti vermez.
          </p>
          <p className="text-gray-700">
            Kullanıcılar, platform üzerinden kurdukları tüm iletişimlerden ve paylaştıkları içeriklerden tamamen kendileri sorumludur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Yaş Sınırı ve Uygunluk</h2>
          <p className="text-gray-700">
            Vora yalnızca 18 yaş ve üzeri kullanıcılar için uygundur. Kullanıcılar kayıt sırasında doğru bilgi vermekle yükümlüdür. Yaşını
            yanlış beyan eden, sahte kimlik kullanan veya başkasını taklit eden kullanıcıların hesapları derhal ve kalıcı olarak kapatılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Kullanıcı Davranış Kuralları</h2>
          <p className="text-gray-700">Vora, güvenli ve saygılı bir ortam sağlamak amacıyla aşağıdaki davranışları kesin olarak yasaklar:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Taciz, tehdit, zorbalık veya aşağılayıcı davranışlar</li>
            <li>Nefret söylemi, ayrımcılık veya şiddeti teşvik eden içerikler</li>
            <li>Cinsel içerikli, uygunsuz veya rahatsız edici mesajlaşma</li>
            <li>Spam, dolandırıcılık, yanıltıcı içerik veya sahte haber paylaşımı</li>
            <li>Kullanıcıları platform dışına yönlendirme (özellikle şüpheli bağlantılar)</li>
            <li>Başkalarının kişisel bilgilerini izinsiz paylaşma</li>
            <li>Platformu kötüye kullanma veya teknik sistemlere zarar verme girişimleri</li>
            <li>Şehir veya topluluk kanallarında yanıltıcı acil duyuru paylaşımı</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Çocuk Güvenliği ve Sıfır Tolerans</h2>
          <p className="text-gray-700">
            Vora, çocukların korunmasına yönelik sıfır tolerans politikası uygular. Aşağıdaki davranışlar en ağır ihlal kategorisine girer ve
            derhal kalıcı hesap kapatma ile sonuçlanır:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Çocuklara yönelik herhangi bir cinsel içerik veya ima</li>
            <li>Grooming (çocukları kandırma, manipüle etme)</li>
            <li>Çocuklardan fotoğraf, video veya kişisel bilgi isteme</li>
            <li>Çocukları platform dışına yönlendirme</li>
            <li>Çocuk kimliğiyle sahte hesap oluşturma</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">İçerik Denetimi ve Moderasyon</h2>
          <p className="text-gray-700">
            Vora, platform güvenliğini sağlamak amacıyla hem otomatik hem de manuel moderasyon sistemleri kullanır. Şüpheli içerikler ve
            davranışlar sürekli olarak izlenir. Vora, içerikleri kaldırma, hesapları askıya alma veya kalıcı olarak kapatma hakkını saklı
            tutar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Bildirim (Report) ve Engelleme (Block)</h2>
          <p className="text-gray-700">
            Kullanıcılar, uygunsuz içerik ve davranışları uygulama içinden bildirebilir. Tüm bildirimler en geç 24 saat içinde incelenir.
            Kullanıcılar ayrıca diğer kullanıcıları engelleyerek iletişimi tamamen kesebilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Yaptırımlar ve Hesap İşlemleri</h2>
          <p className="text-gray-700">Vora, platform kurallarını ihlal eden kullanıcılara karşı aşağıdaki yaptırımları uygulama hakkını saklı tutar:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>İçeriklerin kaldırılması</li>
            <li>Geçici hesap kısıtlaması</li>
            <li>Kalıcı hesap kapatma (ban)</li>
            <li>IP ve cihaz bazlı erişim engelleme</li>
            <li>Gerekli durumlarda yasal bildirim</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Veri Gizliliği ve Kullanıcı Sorumluluğu</h2>
          <p className="text-gray-700">
            Vora, kullanıcı verilerini korumak için gerekli tüm teknik önlemleri alır. Detaylar için{' '}
            <Link to="/vora/gizlilik" className="font-medium text-teal-600 underline">
              Gizlilik Politikası
            </Link>{' '}
            sayfasına bakın.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hesap Silme ve Veri Kontrolü</h2>
          <p className="text-gray-700">
            Kullanıcılar, uygulama içinden hesaplarını kalıcı olarak silebilir. Hesap silme işlemi, kullanıcı verilerinin geri döndürülemez
            şekilde kaldırılmasıyla sonuçlanır. Detaylar için{' '}
            <Link to="/vora/hesap-silme" className="font-medium text-teal-600 underline">
              Hesap silme
            </Link>{' '}
            sayfasına bakın.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Yasal Uyum ve İş Birliği</h2>
          <p className="text-gray-700">
            Vora, yürürlükteki yasalara ve düzenlemelere uymayı taahhüt eder. Gerekli durumlarda yetkili kurumlarla iş birliği yapılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">İletişim</h2>
          <p className="text-gray-700">Her türlü destek, ihlal bildirimi veya hukuki talepler için:</p>
          <p className="text-gray-700">
            <a href="mailto:support@litxtech.com" className="font-medium text-teal-600 underline">
              support@litxtech.com
            </a>
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Vora</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/vora" className="font-medium hover:underline" style={{ color: accent }}>
            ← Vora tanıtım
          </Link>
          <Link to="/vora/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik Politikası
          </Link>
          <Link to="/vora/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/vora/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/vora/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
        </nav>
      </div>
    </div>
  )
}
