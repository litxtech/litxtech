import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

export function NoctaAppPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta Gizlilik Politikası | LitxTech"
        description="Nocta mobil uygulaması gizlilik politikası. Kişisel verilerin toplanması, işlenmesi ve haklarınız (KVKK)."
        path="/nocta/gizlilik"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Gizlilik Politikası</p>
          <h1 className="text-3xl font-bold">GİZLİLİK POLİTİKASI</h1>
          <p className="text-sm text-gray-500">Son güncelleme: 6 Nisan 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Gizlilik Politikası, Nocta mobil uygulamasını (&quot;Uygulama&quot;) kullandığınızda kişisel verilerinizin nasıl toplandığını,
            işlendiğini, saklandığını ve korunduğunu açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Veri sorumlusu ve iletişim</h2>
          <p className="text-gray-700">
            Hizmet sağlayıcı olarak kişisel verilerinizden sorumlu tarafla ilgili iletişim bilgileri uygulama içi &quot;Destek&quot; bölümünden veya
            hesap ayarlarından paylaşılan kanallar üzerinden size bildirilir. Yasal talepler ve KVKK kapsamındaki başvurular için aynı kanallar
            kullanılabilir.
          </p>
          <p className="text-sm text-gray-600">
            Web üzerinden iletişim için ayrıca{' '}
            <a href="mailto:support@litxtech.com" className="font-medium text-indigo-600 underline">
              support@litxtech.com
            </a>{' '}
            adresine yazabilirsiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Toplanan veri kategorileri</h2>
          <h3 className="font-semibold text-gray-800">2.1 Hesap ve kimlik</h3>
          <p className="text-gray-700">
            E-posta adresi, şifre (yalnızca güvenli biçimde hash&apos;lenmiş olarak saklanır), görünen ad/rumuz.
          </p>
          <h3 className="font-semibold text-gray-800">2.2 Profil</h3>
          <p className="text-gray-700">
            Yaş, şehir, cinsiyet, biyografi, meslek, ilgi alanları, dil bilgisi, telefon (isteğe bağlı olarak verdiğiniz takdirde), profil
            fotoğrafları.
          </p>
          <h3 className="font-semibold text-gray-800">2.3 Kullanım ve cihaz</h3>
          <p className="text-gray-700">
            Oturum/teknik günlükler, çökme raporları, yaklaşık cihaz ve işletim sistemi bilgisi, Uygulama içi etkileşimler (ör. keşfet, eşleşme,
            mesajlaşma, bildirimler).
          </p>
          <h3 className="font-semibold text-gray-800">2.4 İletişim ve içerik</h3>
          <p className="text-gray-700">
            Gönderdiğiniz mesajlar, arama/çağrı talepleri ve bunlarla ilişkili meta veriler (süre, durum, ücretlendirme ile ilgili kayıtlar).
          </p>
          <h3 className="font-semibold text-gray-800">2.5 Ödeme ve cüzdan</h3>
          <p className="text-gray-700">
            Bakiye, işlem geçmişi ve hizmetin gerektirdiği ölçüde ödeme/hesap hareketleri (ödeme sağlayıcısı üzerinden işlenen veriler ilgili
            sağlayıcının politikasına tabidir).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">İşleme amaçları</h2>
          <p className="text-gray-700">
            Verileriniz şu amaçlarla işlenir: hesap oluşturma ve doğrulama; profilinizi gösterme ve eşleştirme; mesajlaşma ve sesli/görüntülü arama
            hizmeti sunma; güvenlik, dolandırıcılık ve kötüye kullanımın önlenmesi; yasal yükümlülüklerin yerine getirilmesi; hizmeti geliştirme ve
            destek sağlama; tercih ettiğiniz ölçüde kişiselleştirme.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Hukuki dayanak (özet)</h2>
          <p className="text-gray-700">
            KVKK ve ilgili mevzuat çerçevesinde; sözleşmenin kurulması/ifası, meşru menfaat (güvenlik ve hizmet iyileştirme), açık rıza (gerektiğinde
            ve ayrıca istenildiğinde) ve açıkça öngörülen yasal zorunluluklar başı çeken dayanaklardır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Saklama süreleri</h2>
          <p className="text-gray-700">
            Veriler, hesabınız açık olduğu sürece ve hizmetin gerektirdiği makul süre boyunca saklanır. Yasal saklama yükümlülükleri veya uyuşmazlık
            çözümü için gerekli süreler ayrıca uygulanır. Hesabınızı sildiğinizde verileriniz makul süre içinde silinir veya anonimleştirilir; yasal
            olarak saklanması zorunlu olanlar istisnadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Üçüncü taraflar ve aktarım</h2>
          <p className="text-gray-700">
            Hizmet; barındırma, veritabanı, kimlik doğrulama, analitik, bildirim ve ödeme gibi altyapı sağlayıcıları ile çalışabilir. Bu taraflar
            yalnızca hizmetin sunumu için gerekli ölçüde ve sözleşmesel güvencelerle veriye erişir. Yurt dışına aktarım söz konusuysa KVKK&apos;nın
            öngördüğü şartlar ve bilgilendirme yükümlülükleri dikkate alınır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Çerezler ve benzeri teknolojiler</h2>
          <p className="text-gray-700">
            Web sürümü veya gömülü görünümler varsa oturum ve tercih yönetimi için çerez veya yerel depolama kullanılabilir. Mobil uygulamada benzeri
            amaçlarla cihaz depolaması ve güvenli token&apos;lar kullanılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Güvenlik</h2>
          <p className="text-gray-700">
            Şifreleme, erişim kontrolleri, ayrıcalık sınırlaması ve düzenli güncellemeler gibi teknik ve idari tedbirler uygulanır. İnternet üzerinden
            hiçbir iletimin %100 güvenli olmadığını unutmayın.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Haklarınız (KVKK kapsamında özet)</h2>
          <p className="text-gray-700">
            Kanunların izin verdiği ölçüde: verilerinize erişim, düzeltme, silme, işlemenin kısıtlanması, itiraz ve işlem güvenliği ile ilgili
            taleplerde başvuru hakkınız bulunabilir. Talepleriniz makul sürede yanıtlanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Çocuklar</h2>
          <p className="text-gray-700">
            Uygulama, reşit olmayanlar için tasarlanmamıştır. Reşit olmayan bir kullanıcıdan bilgi toplandığını fark edersek gerekli adımları atarız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Politika değişiklikleri</h2>
          <p className="text-gray-700">
            Bu politika güncellenebilir. Önemli değişikliklerde uygulama içi bildirim veya e-posta ile bilgilendirme yapılabilir. Güncel sürüm her zaman
            uygulama içinde &quot;Gizlilik Politikası&quot; bölümünde yayımlanır.
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
