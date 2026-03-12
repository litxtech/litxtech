import { Link } from 'react-router-dom'

export function KbsPrimePrivacyPolicyTR() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Gizlilik Politikası</p>
          <h1 className="text-3xl font-bold">
            LITXTECH LLC – MYKBS Uygulaması
          </h1>
          <p className="text-sm text-gray-500">Son Güncelleme: Mart 2026</p>
          <p>
            MYKBS, LITXTECH LLC tarafından geliştirilen ve işletilen bir konaklama uyumluluk ve kimlik doğrulama uygulamasıdır.
            Bu Gizlilik Politikası, hangi bilgileri topladığımızı, nasıl kullanıldığını ve nasıl korunduğunu açıklar.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Giriş</h2>
          <p className="text-gray-700">
            MYKBS, LITXTECH LLC tarafından geliştirilen ve işletilen bir konaklama uyumluluk ve kimlik doğrulama uygulamasıdır.
            Uygulama, konaklama işletmelerinin yasal olarak zorunlu misafir kimlik kayıtlarını yönetmesine ve yasada öngörüldüğü durumlarda gerekli bilgileri resmi sistemlere iletmesine yardımcı olmak üzere tasarlanmıştır.
            LITXTECH LLC kullanıcıların gizliliğine saygı gösterir ve geçerli yasalara ve platform politikalarına uygun olarak kişisel verilerin korunmasına bağlıdır.
            Bu Gizlilik Politikası, hangi bilgileri topladığımızı, nasıl kullanıldığını ve nasıl korunduğunu açıklar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Topladığımız Bilgiler</h2>
          <p className="text-gray-700">MYKBS aşağıdaki bilgi kategorilerini işleyebilir:</p>
          <div>
            <h3 className="font-semibold">Kimlik Bilgileri</h3>
            <p className="text-gray-700 mb-2">Konaklama işletmeleri yerel düzenlemelere göre misafir kaydı yaptığında aşağıdaki bilgiler işlenebilir:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Ad soyad</li>
              <li>TC kimlik veya pasaport numarası</li>
              <li>Doğum tarihi</li>
              <li>Uyruk</li>
              <li>Pasaport veya kimlik belgesi verileri (taranan MRZ verileri dahil)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">İletişim Bilgileri</h3>
            <p className="text-gray-700">Konaklama işletmesi tarafından sağlanırsa:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Telefon numarası</li>
              <li>E-posta adresi</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">İşletme Bilgileri</h3>
            <p className="text-gray-700">Kayıtlı konaklama işletmeleri için:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>İşletme adı</li>
              <li>Şube bilgileri</li>
              <li>KBS kayıt kodları veya tesis tanımlayıcıları</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Cihaz Bilgileri</h3>
            <p className="text-gray-700 mb-2">Sistem güvenliği ve kararlılığı için sınırlı teknik veri toplanabilir:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Cihaz modeli</li>
              <li>İşletim sistemi sürümü</li>
              <li>Uygulama sürümü</li>
              <li>Hata günlükleri</li>
            </ul>
            <p className="text-gray-700 mt-2">Bu bilgiler yalnızca sistem güvenilirliği ve güvenliği için kullanılır.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Bilgileri Nasıl Kullanıyoruz</h2>
          <p className="text-gray-700">MYKBS aracılığıyla toplanan bilgiler şu amaçlarla kullanılır:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Konaklama mevzuatına göre zorunlu misafir kimlik bilgilerinin kaydı</li>
            <li>Geçerli olduğu durumlarda yasal bildirimlerin resmi sistemlere iletilmesi</li>
            <li>Konaklama şube kayıtlarının yönetimi</li>
            <li>Sistem güvenliğinin sağlanması ve kötüye kullanımın önlenmesi</li>
            <li>Uygulama kararlılığı ve performansının iyileştirilmesi</li>
          </ul>
          <p className="font-semibold text-gray-800">LITXTECH LLC kişisel verileri üçüncü taraflara satmaz veya kiralamaz.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. İşlemenin Hukuki Dayanağı</h2>
          <p className="text-gray-700">
            MYKBS kapsamında işlenen kişisel veriler, konaklama işletmelerine uygulanan yerel konaklama ve kimlik bildirimi mevzuatına uyum için gerekli olabilir.
            Uygulama, işletmelerin yasal bildirim yükümlülüklerini yerine getirmesini sağlayan teknik bir platform işlevi görür.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Veri Saklama ve Güvenlik</h2>
          <p className="text-gray-700">
            LITXTECH LLC, verileri yetkisiz erişim, değişiklik, ifşa veya imhadan korumak için sektör standardı teknik ve idari önlemler uygular.
            Bu önlemler şunları içerir:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Şifreli iletişim (HTTPS)</li>
            <li>Güvenli altyapı</li>
            <li>Erişim kontrol sistemleri</li>
            <li>Günlükleme ve izleme</li>
          </ul>
          <p className="text-gray-700">Saklanan verilere yalnızca yetkili sistemler ve hizmetler erişebilir.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Veri Paylaşımı</h2>
          <p className="text-gray-700">Kişisel veriler yalnızca aşağıdaki durumlarda paylaşılabilir:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Konaklama mevzuatı gereği yasal olarak zorunlu olduğunda resmi devlet sistemleriyle</li>
            <li>Altyapı, barındırma veya güvenlik işlemlerini sıkı gizlilik yükümlülükleri altında destekleyen hizmet sağlayıcılarla</li>
          </ul>
          <p className="text-gray-700">Kişisel veriler reklam veya pazarlama amaçlarıyla paylaşılmaz.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Veri Saklama Süresi</h2>
          <p className="text-gray-700">
            Kişisel veriler yalnızca konaklama bildirim sisteminin yasal yükümlülüklerini ve işletim gereksinimlerini karşılamak için gerekli olduğu sürece saklanır.
            Saklama süreleri geçerli yasal gerekliliklere göre değişiklik gösterebilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Kullanıcı Hakları</h2>
          <p className="text-gray-700">Geçerli yasalara göre kişiler aşağıdaki haklara sahip olabilir:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Kişisel verilerine erişim talep etmek</li>
            <li>Yanlış bilgilerin düzeltilmesini talep etmek</li>
            <li>Yasada izin verildiği ölçüde silme talep etmek</li>
            <li>Verilerinin nasıl işlendiği hakkında bilgi talep etmek</li>
          </ul>
          <p className="text-gray-700">Talepler aşağıdaki iletişim bilgileri kullanılarak iletilebilir.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Çocukların Gizliliği</h2>
          <p className="text-gray-700">
            MYKBS, kayıtlı konaklama işletmeleri ve yetkili personel tarafından kullanılmak üzere tasarlanmıştır.
            Uygulama çocuklar tarafından kullanılmak amacıyla tasarlanmamıştır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Bu Politikanın Değişiklikleri</h2>
          <p className="text-gray-700">
            LITXTECH LLC bu Gizlilik Politikasını işletimsel veya yasal değişiklikleri yansıtmak amacıyla zaman zaman güncelleyebilir.
            Güncel sürümler uygulama veya ilgili web sitelerinde yayımlanacaktır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. İletişim Bilgileri</h2>
          <p className="text-gray-700">
            Bu Gizlilik Politikası hakkında sorularınız için:
          </p>
          <p className="text-gray-700">
            <strong>LITXTECH LLC</strong><br />
            E-posta: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
          <Link to="/kbs-prime" className="text-blue-600 hover:text-blue-800 font-medium">← KBS Prime</Link>
          <Link to="/kbs-prime-privacy" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy (EN)</Link>
          <Link to="/kbs-prime-terms" className="text-blue-600 hover:text-blue-800 font-medium">Terms</Link>
        </div>
      </div>
    </div>
  )
}
