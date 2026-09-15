import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Privacy Policy / Gizlilik Politikası | LitxTech"
        description="Tamuso privacy policy for App Store and Google Play: data collection, voice rooms, retention, children, account deletion."
        path="/tamuso/gizlilik"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Tamuso · Privacy Policy</p>
          <h1 className="text-3xl font-bold">Tamuso — Gizlilik Politikası</h1>
          <p className="text-sm text-gray-500">Last updated: September 15, 2026</p>
          <p className="text-sm text-gray-600">
            Developer / Veri sorumlusu: <strong>LitxTech LLC</strong> ·{' '}
            <a href="mailto:support@litxtech.com" className="text-amber-700 underline">
              support@litxtech.com
            </a>
          </p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Gizlilik Politikası, Tamuso mobil uygulamasını (“Uygulama”) kullandığınızda kişisel verilerinizin nasıl toplandığını,
            işlendiğini, paylaşıldığını, saklandığını ve silindiğini açıklar. Tamuso; canlı sesli odalar, profil ve topluluk etkileşimi
            sunan bir kullanıcı üretimi içerik (UGC) platformudur. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>
          <p className="rounded-lg border border-amber-100 bg-amber-50/70 p-4 text-sm">
            <strong>App Store / Google Play notu:</strong> Bu sayfa mağaza listelerindeki Privacy Policy URL’si olarak kullanılmak üzere
            herkese açık yayımlanmıştır. Google Play Data Safety ve Apple Privacy Nutrition Labels beyanlarıyla uyumlu olacak şekilde
            hazırlanmıştır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Toplanan Veri Kategorileri</h2>
          <p className="text-gray-700">Hizmet sunumu için aşağıdaki kategoriler işlenebilir:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              <strong>Hesap bilgileri:</strong> e-posta, kullanıcı adı / görünen ad, profil fotoğrafı, biyografi, şifre veya kimlik doğrulama
              token’ları.
            </li>
            <li>
              <strong>Kullanıcı içeriği (UGC):</strong> sesli odalardaki canlı ses akışı; oda başlığı / açıklaması; profil metinleri; rapor
              (report) içerikleri.
            </li>
            <li>
              <strong>Ses verisi:</strong> Odadaki ses gerçek zamanlı iletilir. Kalıcı ses kaydı yalnızca uygulama içinde açıkça bildirilen bir
              özellik olarak sunulursa ve yasal zemine uygun şekilde yapılır; aksi halde canlı ses kalıcı olarak saklanmaz.
            </li>
            <li>
              <strong>Kullanım ve tanılama:</strong> oda katılımı, konuşmacı/dinleyici durumu, özellik kullanımı, çökme günlükleri, performans
              metrikleri.
            </li>
            <li>
              <strong>Cihaz ve teknik veriler:</strong> cihaz modeli, işletim sistemi, uygulama sürümü, IP adresi, dil, zaman dilimi, push
              bildirim token’ı.
            </li>
            <li>
              <strong>Destek iletişimi:</strong> e-posta, destek formu içeriği ve ek doğrulama bilgileri.
            </li>
            <li>
              <strong>Satın alma (varsa):</strong> App Store / Google Play üzerinden yapılan işlemlerde ödeme kartı bilgileri mağazalar
              tarafından işlenir; biz yalnızca abonelik/ürün durumu ve işlem tanımlayıcılarını alabiliriz.
            </li>
          </ul>
          <p className="text-gray-700">
            Konum: Tamuso temel özellik için sürekli hassas GPS konumu toplamaz. Yaklaşık konum yalnızca açıkça sunulan bir özellik için ve
            izin verildiğinde işlenebilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. İşleme Amaçları</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Hesap oluşturma, kimlik doğrulama, oturum ve güvenlik</li>
            <li>Sesli oda hizmetinin sağlanması ve iyileştirilmesi</li>
            <li>Moderasyon, dolandırıcılık / kötüye kullanım önleme, çocuk güvenliği</li>
            <li>Bildirim (push) gönderme (izin verdiğiniz ölçüde)</li>
            <li>Destek taleplerini yanıtlama</li>
            <li>Yasal yükümlülükler ve yetkili mercilerle iş birliği</li>
            <li>Analitik ve ürün geliştirme (kişisel veriyi satmadan)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Veri Paylaşımı ve Üçüncü Taraflar</h2>
          <p className="text-gray-700">
            <strong>Kişisel verilerinizi satmayız.</strong> Veriler yalnızca hizmet için gerekli olduğunda şu kategorilerdeki sağlayıcılarla
            paylaşılabilir:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Bulut barındırma ve veritabanı</li>
            <li>Gerçek zamanlı ses / iletişim altyapısı</li>
            <li>Analitik ve çökme raporlama</li>
            <li>Push bildirim hizmetleri</li>
            <li>Müşteri destek araçları</li>
            <li>Ödeme işlemleri için Apple / Google</li>
          </ul>
          <p className="text-gray-700">
            Yasal zorunluluk, mahkeme kararı, güvenlik tehdidi veya çocuk istismarı şüphesi halinde yetkili mercilerle paylaşım yapılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Saklama Süreleri</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Hesap verileri: hesap aktif olduğu sürece</li>
            <li>Hesap silme sonrası: makul süre içinde (genellikle <strong>30 gün</strong>) silinir veya anonimleştirilir</li>
            <li>Yasal saklama zorunluluğu, güvenlik incelemeleri veya ihtilaf kayıtları: daha uzun süre tutulabilir</li>
            <li>Canlı ses: kalıcı kayıt özelliği yoksa oturum bitince iletim sonlanır</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Güvenlik</h2>
          <p className="text-gray-700">
            Aktarımda şifreleme (ör. TLS), erişim kontrolleri ve idari önlemler uygulanır. Hiçbir sistem mutlak güvenli değildir; şüpheli
            hesap erişiminde derhal support@litxtech.com adresine yazın.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Çocuklar (COPPA / 18+)</h2>
          <p className="text-gray-700">
            Tamuso <strong>yalnızca 18 yaş ve üzeri</strong> kullanıcılar içindir; çocuklara yönelik tasarlanmamıştır ve bilerek 18 yaş
            altından kişisel veri toplamaz. 18 yaş altı hesap tespit edilirse kapatılır ve ilgili veriler silinir veya anonimleştirilir.
            Çocuk güvenliği standartları:{' '}
            <Link to="/tamuso/child-safety" className="font-medium text-amber-700 underline">
              /tamuso/child-safety
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Haklarınız ve Hesap Silme</h2>
          <p className="text-gray-700">
            KVKK / GDPR ve uygulanabilir mevzuat kapsamında erişim, düzeltme, silme, itiraz ve şikayet haklarınızı kullanabilirsiniz.
            Hesabınızı uygulama içinden veya web üzerinden silebilirsiniz:{' '}
            <Link to="/tamuso/hesap-silme" className="font-medium text-amber-700 underline">
              https://www.litxtech.com/tamuso/hesap-silme
            </Link>
            . Talepler: support@litxtech.com
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Uluslararası Aktarım</h2>
          <p className="text-gray-700">
            Hizmet global altyapı kullanabilir; verileriniz bulunduğunuz ülke dışındaki sunucularda işlenebilir. Uygulanabilir yasal koruma
            önlemleri alınır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. Değişiklikler</h2>
          <p className="text-gray-700">
            Bu politikayı güncelleyebiliriz. Önemli değişikliklerde uygulama içi veya bu sayfa üzerinden bilgilendirme yapılır. “Last
            updated” tarihi güncel sürümü gösterir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">10. İletişim</h2>
          <p className="text-gray-700">
            LitxTech LLC
            <br />
            E-posta:{' '}
            <a href="mailto:support@litxtech.com" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>
            <br />
            Destek:{' '}
            <Link to="/tamuso/destek" className="font-medium text-amber-700 underline">
              /tamuso/destek
            </Link>
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech LLC — Tamuso</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Terms
          </Link>
          <Link to="/tamuso/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Child Safety
          </Link>
          <Link to="/tamuso/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Account Deletion
          </Link>
          <Link to="/tamuso/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Support
          </Link>
        </nav>
      </div>
    </div>
  )
}
