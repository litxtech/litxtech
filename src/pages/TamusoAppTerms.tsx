import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppTerms() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Terms of Use / Kullanım Şartları | LitxTech"
        description="Tamuso terms of use for App Store and Google Play: UGC rules, 18+, moderation, reporting, account deletion."
        path="/tamuso/kullanim-sartlari"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Tamuso · Terms of Use</p>
          <h1 className="text-3xl font-bold">Tamuso — Kullanım Şartları</h1>
          <p className="text-sm text-gray-500">Last updated: September 15, 2026</p>
        </header>

        <section className="space-y-3 text-gray-700">
          <p>
            Bu Kullanım Şartları (“Şartlar”), LitxTech LLC tarafından sunulan Tamuso sesli oda uygulamasının kullanımını düzenler.
            Uygulamayı indirerek, hesap oluşturarak veya kullanarak Şartları kabul etmiş sayılırsınız. Kabul etmiyorsanız Uygulamayı
            kullanmayın.
          </p>
          <p className="rounded-lg border border-amber-100 bg-amber-50/70 p-4 text-sm">
            Tamuso; kullanıcıların canlı sesli odalar oluşturduğu / katıldığı bir UGC (user-generated content) platformudur. Apple App Store
            Guideline 1.2 ve Google Play kullanıcı içeriği kuralları kapsamında bildirim, engelleme ve moderasyon mekanizmaları sunulur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Hizmet Tanımı ve Sorumluluk Reddi</h2>
          <p className="text-gray-700">
            Tamuso; sesli odalar, profil ve topluluk etkileşimi sağlar. Odadaki konuşmalar ve içerikler kullanıcılar tarafından üretilir.
            LitxTech LLC içeriklerin doğruluğu, güvenilirliği veya uygunluğu hakkında garanti vermez. Kullanıcılar kendi iletişim ve
            davranışlarından sorumludur. Kullanıcılar arası anlaşma veya zararlardan LitxTech sorumlu tutulamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Yaş Sınırı (18+)</h2>
          <p className="text-gray-700">
            Tamuso yalnızca <strong>18 yaş ve üzeri</strong> kullanıcılar içindir. Yaşını yanlış beyan eden, sahte kimlik kullanan veya
            başkasını taklit eden hesaplar derhal ve kalıcı olarak kapatılır. Hizmet çocuklara yönelik değildir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Hesap ve Güvenlik</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Doğru ve güncel bilgi vermekle yükümlüsünüz.</li>
            <li>Hesap güvenliğinden (şifre, cihaz erişimi) siz sorumlusunuz.</li>
            <li>Yetkisiz kullanımı derhal bildirmelisiniz.</li>
            <li>Hesabı başkasına devredemezsiniz.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Kullanıcı İçeriği ve Sesli Oda Kuralları</h2>
          <p className="text-gray-700">Aşağıdakiler kesin olarak yasaktır:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Taciz, tehdit, zorbalık, stalking</li>
            <li>Nefret söylemi, ayrımcılık, şiddet teşviki</li>
            <li>Cinsel içerikli / pornografik canlı yayın veya sohbet</li>
            <li>Çocuk istismarı, grooming, CSAM veya çocuklara yönelik her türlü uygunsuz içerik</li>
            <li>Spam, dolandırıcılık, phishing, yanıltıcı vaatler</li>
            <li>Şüpheli bağlantı / platform dışı yönlendirme ile kötüye kullanım</li>
            <li>Başkalarının kişisel verilerini izinsiz paylaşma (doxxing)</li>
            <li>Telif / marka ihlali, yasa dışı faaliyet</li>
            <li>Oda moderasyonunu veya teknik sistemleri kötüye kullanma</li>
          </ul>
          <p className="text-gray-700">
            Uygulamaya içerik yükleyerek / canlı yayın yaparak, hizmeti işletmek, güvenliği sağlamak ve yasal yükümlülükleri yerine getirmek
            için bu içeriği kullanmamıza dünya çapında, münhasır olmayan, telifsiz bir lisans verirsiniz. İçerik üzerindeki haklarınız
            saklıdır; yasaklı içerik kaldırılabilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Çocuk Güvenliği — Sıfır Tolerans</h2>
          <p className="text-gray-700">
            Çocuklara yönelik istismar ve sömürüye sıfır tolerans uygulanır. İhlaller kalıcı ban ve yasal mercilere bildirimle sonuçlanabilir.
            Standartlar:{' '}
            <Link to="/tamuso/child-safety" className="font-medium text-amber-700 underline">
              Child Safety Standards
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Moderasyon, Report ve Block</h2>
          <p className="text-gray-700">
            Tamuso otomatik ve/veya manuel moderasyon kullanabilir. Oda sahipleri mute / çıkarma yapabilir. Kullanıcılar uygunsuz içerik veya
            davranışı <strong>uygulama içinden bildirebilir (Report)</strong> ve diğer kullanıcıları <strong>engelleyebilir (Block)</strong>.
          </p>
          <p className="text-gray-700">
            Bildirimler önceliklendirilir; çocuk güvenliği ve ciddi güvenlik ihlalleri en yüksek önceliktedir. Mümkün olduğunca{' '}
            <strong>24 saat içinde</strong> inceleme başlatılır / aksiyon alınır (yoğunluk ve karmaşıklığa göre süre değişebilir).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Yaptırımlar</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>İçerik veya oda kaldırma / kapatma</li>
            <li>Geçici hesap kısıtlaması</li>
            <li>Kalıcı hesap kapatma (ban)</li>
            <li>IP / cihaz bazlı erişim engelleme</li>
            <li>Yetkili mercilere bildirim</li>
          </ul>
          <p className="text-gray-700">Ciddi ihlallerde önceden uyarı yapılmaksızın işlem uygulanabilir.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Satın Almalar (Varsa)</h2>
          <p className="text-gray-700">
            Uygulama içi satın alma veya abonelikler Apple App Store / Google Play üzerinden işlenir. İptal, yenileme ve iade kuralları ilgili
            mağazanın politikalarına tabidir. Dijital içeriklerde yerel tüketici hakları saklıdır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. Fikri Mülkiyet</h2>
          <p className="text-gray-700">
            Uygulama, marka, logo ve yazılım LitxTech LLC’ye aittir. İzinsiz kopyalama, tersine mühendislik veya ticari kullanım yasaktır
            (yasal izinler hariç).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">10. Hesap Silme</h2>
          <p className="text-gray-700">
            Hesabınızı istediğiniz zaman silebilirsiniz. Prosedür:{' '}
            <Link to="/tamuso/hesap-silme" className="font-medium text-amber-700 underline">
              Account Deletion
            </Link>
            . Gizlilik ayrıntıları:{' '}
            <Link to="/tamuso/gizlilik" className="font-medium text-amber-700 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">11. Hizmet Değişiklikleri ve Sonlandırma</h2>
          <p className="text-gray-700">
            Hizmeti değiştirme, askıya alma veya sonlandırma hakkımız saklıdır. Şartları ihlal eden hesapları sonlandırabiliriz. Kullanmaya
            devam ederek güncel Şartları kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">12. Sorumluluğun Sınırlandırılması</h2>
          <p className="text-gray-700">
            Yasaların izin verdiği ölçüde LitxTech LLC; dolaylı, arızi veya sonuç zararlarından; kullanıcı içeriklerinden; veya hizmet
            kesintilerinden sorumlu değildir. Uygulamayı kendi riskinizle kullanırsınız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">13. Uygulanacak Hukuk</h2>
          <p className="text-gray-700">
            Zorunlu tüketici hakları saklı kalmak kaydıyla, bu Şartlar LitxTech LLC’nin kuruluş yeri hukukuna tabi olarak yorumlanır.
            Uyuşmazlıklarda yetkili merciler / mahkemeler devreye girer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">14. İletişim</h2>
          <p className="text-gray-700">
            <a href="mailto:support@litxtech.com" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>{' '}
            ·{' '}
            <Link to="/tamuso/destek" className="font-medium text-amber-700 underline">
              Destek
            </Link>
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech LLC — Tamuso</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Privacy
          </Link>
          <Link to="/tamuso/child-safety" className="font-medium hover:underline" style={{ color: accent }}>
            Child Safety
          </Link>
          <Link to="/tamuso/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Account Deletion
          </Link>
        </nav>
      </div>
    </div>
  )
}
