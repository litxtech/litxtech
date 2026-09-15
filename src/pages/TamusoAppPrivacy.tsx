import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Gizlilik Politikası | LitxTech"
        description="Tamuso sesli oda platformu gizlilik politikası: veri işleme, güvenlik, yaş sınırı ve kullanıcı hakları."
        path="/tamuso/gizlilik"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Tamuso Politikaları</p>
          <h1 className="text-3xl font-bold">TAMUSO — GİZLİLİK POLİTİKASI</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 15 Eylül 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Tamuso, kullanıcıların canlı sesli odalarda buluştuğu bir dijital iletişim platformudur. Bu Gizlilik Politikası, Tamuso mobil
            uygulamasını (“Uygulama”) kullandığınızda kişisel verilerinizin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu
            açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>
          <p>
            Veri sorumlusu LitxTech LLC’dir. Talepleriniz için{' '}
            <a href="mailto:support@litxtech.com" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>{' '}
            adresini kullanabilirsiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Toplanan Veriler</h2>
          <p className="text-gray-700">Hizmet sunumu kapsamında şu kategoriler işlenebilir:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Hesap bilgileri: ad/kullanıcı adı, e-posta, profil fotoğrafı, biyografi.</li>
            <li>Kullanım verileri: oda katılımı, konuşmacı/dinleyici durumu, etkileşim ve cihaz bilgileri.</li>
            <li>Ses verisi: canlı odalarda gerçek zamanlı iletilen ses; kalıcı kayıt yalnızca açıkça bildirilen özelliklerde yapılır.</li>
            <li>Teknik veriler: IP adresi, cihaz modeli, işletim sistemi, uygulama sürümü, çökme günlükleri.</li>
            <li>İletişim: destek talepleri ve bildirim (report) içerikleri.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. İşleme Amaçları</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Hesap oluşturma, kimlik doğrulama ve oturum yönetimi.</li>
            <li>Sesli oda hizmetinin sunulması ve iyileştirilmesi.</li>
            <li>Güvenlik, dolandırıcılık önleme, moderasyon ve yasal yükümlülükler.</li>
            <li>Destek taleplerinin yanıtlanması.</li>
            <li>Yasal zorunluluklar kapsamında saklama ve bildirim.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Yaş Sınırı</h2>
          <p className="text-gray-700">
            Tamuso yalnızca 18 yaş ve üzeri bireyler içindir. 18 yaş altı kullanıcılar için hizmet sunulmaz; bu tür hesaplar tespit
            edildiğinde kapatılır ve ilgili veriler silinir veya anonimleştirilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Paylaşım</h2>
          <p className="text-gray-700">
            Verileriniz; barındırma, analitik, bildirim ve ses altyapısı gibi hizmet sağlayıcılarla sözleşmesel sınırlar içinde paylaşılabilir.
            Yasal zorunluluk veya güvenlik ihlali hallerinde yetkili mercilerle paylaşım yapılabilir. Verilerinizi satmayız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Saklama ve Güvenlik</h2>
          <p className="text-gray-700">
            Veriler, amaç için gerekli süre ve yasal zorunluluklar kadar saklanır. Hesap silme sonrası veriler makul süre içinde silinir veya
            anonimleştirilir; yasal saklama zorunluluğu olan kayıtlar istisnadır. Teknik ve idari güvenlik önlemleri uygulanır; mutlak güvenlik
            garanti edilemez.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Haklarınız</h2>
          <p className="text-gray-700">
            KVKK ve uygulanabilir mevzuat kapsamında erişim, düzeltme, silme, itiraz ve şikayet haklarınızı support@litxtech.com üzerinden
            kullanabilirsiniz. Hesap silme prosedürü için{' '}
            <Link to="/tamuso/hesap-silme" className="font-medium text-amber-700 underline">
              Hesap silme
            </Link>{' '}
            sayfasına bakın.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Değişiklikler</h2>
          <p className="text-gray-700">
            Bu politikayı güncelleyebiliriz. Önemli değişikliklerde uygulama içi veya web üzerinden bilgilendirme yapılır. Güncel metin bu
            sayfada yayımlanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. İletişim</h2>
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
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
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
