import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#0d9488'

export function VoraAppChildSafety() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Vora – Çocuk Koruma Politikası | LitxTech"
        description="Vora çocuk koruma politikası: kullanıcı güvenliği, sıfır tolerans, yaş sınırı, denetim, yaptırımlar ve yasal yükümlülükler."
        path="/vora/child-safety"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Çocuk Koruma Politikası</p>
          <h1 className="text-3xl font-bold">Vora – Çocuk Koruma Politikası</h1>
          <p className="text-sm text-gray-500">Son güncelleme: Haziran 2026</p>
          <p className="text-gray-700">
            Vora, Karadeniz bölgesindeki şehirler için anlık haberleşme ve topluluk deneyimi sunan bir dijital platformdur. Kullanıcı
            güvenliğini, veri gizliliğini ve yasal yükümlülükleri en üst düzeyde gözetir. Platformu kullanan her kullanıcı, aşağıda
            belirtilen kuralları eksiksiz olarak kabul etmiş sayılır.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Hizmetin Niteliği ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Vora, kullanıcılar tarafından oluşturulan içeriklerin paylaşıldığı bir iletişim ve topluluk platformudur. Platformda yer alan
            tüm içerikler kullanıcılar tarafından oluşturulmakta olup, Vora bu içeriklerin doğruluğu, güvenilirliği veya uygunluğu konusunda
            garanti vermez. Kullanıcılar, platform üzerinden kurdukları tüm iletişimlerden tamamen kendileri sorumludur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Yaş Sınırı ve Kullanım Koşulları</h2>
          <p className="text-gray-700">
            Vora yalnızca 18 yaş ve üzeri bireylerin kullanımına açıktır. Kullanıcılar, kayıt sırasında doğru bilgi vermekle yükümlüdür. Yaş,
            kimlik veya diğer bilgilerin yanlış beyan edilmesi durumunda, hesaplar herhangi bir bildirim yapılmaksızın kalıcı olarak
            kapatılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Sıfır Tolerans Politikası</h2>
          <p className="text-gray-700">Vora, aşağıdaki ihlallere karşı sıfır tolerans uygular:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Çocuk istismarı, çocuklara yönelik uygunsuz içerik veya davranış</li>
            <li>Taciz, tehdit, zorbalık veya nefret söylemi</li>
            <li>Cinsel içerikli mesajlaşma veya uygunsuz davranışlar</li>
            <li>Spam, dolandırıcılık veya kullanıcıları yanıltmaya yönelik girişimler</li>
            <li>Sahte kimlik kullanımı veya başka bir kullanıcıyı taklit etme</li>
            <li>Platform dışına yönlendirme ve şüpheli bağlantı paylaşımı</li>
            <li>Yasa dışı faaliyetler veya teşvik edici davranışlar</li>
          </ul>
          <p className="font-medium text-gray-800">
            Bu tür ihlaller tespit edildiğinde kullanıcı hesabı derhal ve kalıcı olarak kapatılır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Çocuk Güvenliği</h2>
          <p className="text-gray-700">
            Vora, çocukların korunmasına yönelik sıfır tolerans politikası uygular. 18 yaş altındaki bireylerle iletişim kurmaya yönelik
            şüpheli davranışlar, içerikler veya girişimler derhal incelenir ve gerekli durumlarda kullanıcı kalıcı olarak platformdan
            uzaklaştırılır. Vora, bu tür durumları ilgili yasal otoritelerle paylaşma hakkını saklı tutar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. İçerik ve Davranış Denetimi</h2>
          <p className="text-gray-700">
            Vora, platform güvenliğini sağlamak amacıyla hem otomatik hem de manuel denetim sistemleri kullanır. Şüpheli davranışlar tespit
            edildiğinde kullanıcı hesapları geçici olarak askıya alınabilir veya kalıcı olarak kapatılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Bildirim (Report) ve Engelleme (Block) Mekanizması</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Kullanıcılar, uygunsuz içerik veya davranışları doğrudan uygulama üzerinden bildirebilir.</li>
            <li>Tüm bildirimler mümkün olan en kısa sürede incelenir ve gerekli aksiyonlar alınır.</li>
            <li>Kullanıcılar ayrıca diğer kullanıcıları engelleyerek iletişimi tamamen kesebilir.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Yaptırımlar</h2>
          <p className="text-gray-700">Vora, platform kurallarını ihlal eden kullanıcılara karşı aşağıdaki yaptırımları uygulayabilir:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>İçerik silme</li>
            <li>Geçici hesap kısıtlaması</li>
            <li>Kalıcı hesap kapatma (ban)</li>
            <li>IP ve cihaz bazlı erişim engelleme</li>
            <li>Yasal mercilere bildirim</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Veri Gizliliği ve Güvenlik</h2>
          <p className="text-gray-700">
            Vora, kullanıcı verilerini korumak için gerekli tüm teknik ve idari önlemleri alır. Ancak kullanıcılar, platform üzerinde
            paylaştıkları bilgilerin sorumluluğunu kendileri taşır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. İletişim</h2>
          <p className="text-gray-700">Her türlü ihlal, şikayet veya destek talebi için:</p>
          <p className="text-gray-700">
            <a href="mailto:support@litxtech.com" className="font-medium text-teal-600 underline">
              support@litxtech.com
            </a>
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700">
          <p>
            Vora, kullanıcı güvenliğini ve platform bütünlüğünü korumak adına gerekli tüm önlemleri alma hakkını saklı tutar ve bu konuda
            kararlı bir yaklaşım benimser.
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
          <Link to="/vora/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/vora/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
          <Link to="/vora/abonelik" className="font-medium hover:underline" style={{ color: accent }}>
            Abonelik
          </Link>
        </nav>
      </div>
    </div>
  )
}
