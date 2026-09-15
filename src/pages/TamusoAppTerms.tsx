import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppTerms() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Kullanım Şartları | LitxTech"
        description="Tamuso sesli oda platformu kullanım şartları: kurallar, güvenlik, yaptırımlar ve yasal uyum."
        path="/tamuso/kullanim-sartlari"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Kullanım Şartları</p>
          <h1 className="text-3xl font-bold">TAMUSO KULLANIM ŞARTLARI</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 15 Eylül 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Kullanım Şartları, Tamuso sesli oda uygulamasının kullanımıyla ilgili kuralları, yükümlülükleri, hakları ve yaptırımları
            belirler. Tamuso’yu kullanan her kullanıcı bu şartları okumuş, anlamış ve kabul etmiş sayılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hizmet Tanımı ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Tamuso, kullanıcıların canlı sesli odalar oluşturabildiği, konuşmacı veya dinleyici olarak katılabildiği bir dijital platformdur.
            Odadaki konuşmalar ve içerikler kullanıcılar tarafından üretilir; Tamuso bunların doğruluğu, güvenilirliği veya uygunluğu hakkında
            garanti vermez.
          </p>
          <p className="text-gray-700">
            Kullanıcılar, platform üzerinden kurdukları tüm iletişimlerden ve davranışlarından kendileri sorumludur. Tamuso, kullanıcılar
            arasında gerçekleşen konuşmalardan, anlaşmalardan veya doğabilecek zararlardan sorumlu tutulamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Yaş Sınırı</h2>
          <p className="text-gray-700">
            Tamuso yalnızca 18 yaş ve üzeri kullanıcılar içindir. Yaşını yanlış beyan eden, sahte kimlik kullanan veya başkasını taklit eden
            kullanıcıların hesapları derhal ve kalıcı olarak kapatılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Sesli Oda Kuralları</h2>
          <p className="text-gray-700">Aşağıdaki davranışlar kesin olarak yasaktır:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Taciz, tehdit, zorbalık veya aşağılayıcı konuşma</li>
            <li>Nefret söylemi, ayrımcılık veya şiddeti teşvik</li>
            <li>Cinsel içerikli veya rahatsız edici yayın</li>
            <li>Spam, dolandırıcılık, yanıltıcı vaatler veya şüpheli link paylaşımı</li>
            <li>Başkalarının kişisel bilgilerini izinsiz paylaşma</li>
            <li>Oda/moderasyon sistemini kötüye kullanma veya teknik zarar verme</li>
            <li>Telif veya yasa dışı içerik yayma</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Çocuk Güvenliği ve Sıfır Tolerans</h2>
          <p className="text-gray-700">
            Çocuklara yönelik her türlü istismar, grooming, uygunsuz içerik veya iletişim sıfır tolerans kapsamındadır ve kalıcı hesap
            kapatmaya yol açar. Gerekli hallerde yasal otoritelerle iş birliği yapılır. Ayrıntılar için{' '}
            <Link to="/tamuso/child-safety" className="font-medium text-amber-700 underline">
              Çocuk Koruma Politikası
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Moderasyon</h2>
          <p className="text-gray-700">
            Tamuso otomatik ve manuel denetim kullanabilir. Oda sahipleri odalarını yönetebilir; platform içerik kaldırma, hesap askıya alma veya
            kalıcı kapatma hakkını saklı tutar. Bildirimler mümkün olan en kısa sürede incelenir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Yaptırımlar</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>İçerik veya oda kapatma</li>
            <li>Geçici hesap kısıtlaması</li>
            <li>Kalıcı hesap kapatma (ban)</li>
            <li>IP / cihaz bazlı erişim engelleme</li>
            <li>Yasal mercilere bildirim</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hesap Silme</h2>
          <p className="text-gray-700">
            Kullanıcılar hesaplarını uygulama içinden veya destek kanalıyla silebilir. Detaylar:{' '}
            <Link to="/tamuso/hesap-silme" className="font-medium text-amber-700 underline">
              Hesap silme
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hizmet Değişiklikleri</h2>
          <p className="text-gray-700">
            Tamuso hizmetleri değiştirme, güncelleme veya sonlandırma hakkını saklı tutar. Platformu kullanmaya devam ederek güncel şartları
            kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Sorumluluğun Sınırlandırılması</h2>
          <p className="text-gray-700">
            Tamuso, platform kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu değildir. Kullanıcılar platformu kendi
            riskleriyle kullanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">İletişim</h2>
          <p className="text-gray-700">
            <a href="mailto:support@litxtech.com" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Tamuso</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso tanıtım
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/tamuso/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
          <Link to="/tamuso/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/tamuso/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
        </nav>
      </div>
    </div>
  )
}
