import { Link } from 'react-router-dom'

const accent = '#0d9488'

export function ValoriaAppTerms() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: accent }}>Kullanım Şartları</p>
          <h1 className="text-3xl font-bold">Valoria Hotel Kullanım Şartları</h1>
          <p className="text-sm text-gray-500">(Terms of Service)</p>
          <p className="text-sm text-gray-500">Son Güncelleme: 20 Mart 2025</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. KAPSAM</h2>
          <p className="text-gray-700">
            Bu kullanım şartları, Valoria Hotel mobil uygulaması, web sitesi ve otel içi hizmetlerin kullanımına ilişkin hüküm ve koşulları içermektedir. Uygulamayı veya web sitesini kullanarak, bu şartları kabul etmiş sayılırsınız.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. HESAP OLUŞTURMA</h2>
          <h3 className="font-semibold">2.1. Telefon Numarası ile Giriş:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Telefon numaranız doğru ve güncel olmalıdır</li>
            <li>SMS ile gönderilen doğrulama kodu girilmelidir</li>
            <li>Hesabınız size özeldir, başkasına kullandıramazsınız</li>
            <li>Hesap güvenliğinden siz sorumlusunuz</li>
          </ul>
          <h3 className="font-semibold">2.2. Hesap Güvenliği:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Şifrenizi kimseyle paylaşmayın</li>
            <li>Telefonunuzu kaybederseniz hemen bildirin</li>
            <li>Şüpheli durumda hesabınızı dondururuz</li>
            <li>3 başarısız girişte hesap geçici kilitlenir</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. REZERVASYON VE CHECK-IN</h2>
          <h3 className="font-semibold">3.1. Rezervasyon:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Rezervasyon onaylandıktan sonra oda sizin için ayrılır</li>
            <li>Mücbir sebepler dışında iade yapılmaz</li>
            <li>Faturanız rezervasyon anında oluşturulur</li>
            <li>Giriş saati: 14:00 - Çıkış saati: 11:00</li>
            <li>Geç çıkışlarda ek ücret uygulanır</li>
          </ul>
          <h3 className="font-semibold">3.2. Check-in İşlemi:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>QR kod okutarak veya uygulamadan check-in yapılır</li>
            <li>Kimlik bilgileri eksiksiz girilmelidir</li>
            <li>Sözleşme okunup onaylanmalıdır</li>
            <li>İmza atılması zorunludur</li>
            <li>Admin onayından sonra odaya yerleşilir</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. KURALLAR VE YASAKLAR</h2>
          <h3 className="font-semibold">4.1. Kesinlikle Yasak Olanlar:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-red-100 bg-red-50 p-4">
            <li>Kesici, delici, patlayıcı maddeler sokmak</li>
            <li>Odada sigara içmek</li>
            <li>Düklü tencere, ocak, tüp kullanmak</li>
            <li>23:00-09:00 arası sessizlik kuralını ihlal etmek</li>
            <li>Personele saygısızlık, hakaret, tehdit</li>
            <li>Irkçı söylemler</li>
            <li>Uyuşturucu madde kullanımı</li>
          </ul>
          <h3 className="font-semibold">4.2. Uyarı ve Yaptırımlar:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>1. İhlal: Sözlü uyarı</li>
            <li>2. İhlal: Yazılı uyarı</li>
            <li>3. İhlal: Otelden çıkarılma (ücret iadesiz)</li>
            <li>Ağır ihlal: Direkt kolluk kuvvetlerine bildirim</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. ÖDEME VE FATURALANDIRMA</h2>
          <p className="font-medium">Ödeme Yöntemleri:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Kredi kartı (tek çekim)</li>
            <li>Havale/EFT</li>
            <li>Nakit (resepsiyonda)</li>
            <li>Kurumsal ödeme</li>
          </ul>
          <p className="font-medium">Fatura:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Fatura T.C. kanunlarına göre düzenlenir</li>
            <li>Fatura e-posta adresinize gönderilir</li>
            <li>Kurumsal faturalar için vergi levhası gereklidir</li>
            <li>Fatura itirazları 7 gün içinde yapılmalıdır</li>
          </ul>
          <p className="font-medium">İptal ve İade:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Mücbir sebep dışında iade yapılmaz</li>
            <li>Erken çıkışlarda ücret iadesi yok</li>
            <li>Mücbir sebepler: ölüm, doğal afet, resmi kurum kararı</li>
            <li>İade talepleri 14 gün içinde değerlendirilir</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. UYGULAMA KULLANIMI</h2>
          <p className="font-medium">Lisans:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Uygulama size kişisel kullanım için lisanslanmıştır</li>
            <li>Uygulamayı kopyalayamaz, değiştiremezsiniz</li>
            <li>Tersine mühendislik yapamazsınız</li>
            <li>Uygulama Valoria Hotel&apos;in mülkiyetindedir</li>
          </ul>
          <p className="font-medium">İçerik:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Tüm içerik (metin, resim, video) telif haklıdır</li>
            <li>İçeriği izinsiz kullanamazsınız</li>
            <li>Yorum ve değerlendirmeleriniz size aittir</li>
            <li>Uygunsuz içerik yayınlayamazsınız</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. DİJİTAL ANAHTAR VE KAPILAR</h2>
          <p className="font-medium">Dijital Anahtar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Telefonunuzdaki dijital anahtar fiziksel kart gibidir</li>
            <li>Anahtarınızı kimseyle paylaşmayın</li>
            <li>Telefonunuzu kaybederseniz hemen bildirin</li>
            <li>Check-out&apos;ta anahtar otomatik silinir</li>
          </ul>
          <p className="font-medium">Kapı Kullanımı:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Sadece yetkili olduğunuz kapıları açın</li>
            <li>Kapıyı açık bırakmayın</li>
            <li>Arıza durumunda resepsiyona bildirin</li>
            <li>Kayıt dışı kişileri içeri almayın</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. SORUMLULUK SINIRLAMALARI</h2>
          <p className="font-medium">Otelin Sorumlu Olmadığı Durumlar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Değerli eşya kaybı (kasaya koymadıysanız)</li>
            <li>Otoparkta araç hasarı</li>
            <li>Çocukların kontrolü (veli sorumluluğunda)</li>
            <li>Doğal afet, yangın, sel vb.</li>
            <li>İnternet kesintileri</li>
            <li>Üçüncü taraf hizmet sağlayıcı kaynaklı sorunlar</li>
          </ul>
          <p className="font-medium">Sorumluluğunuz:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Odaya vereceğiniz hasarlar size aittir</li>
            <li>Kurallara uymaktan siz sorumlusunuz</li>
            <li>Hesap güvenliğinden siz sorumlusunuz</li>
            <li>Diğer misafirleri rahatsız etmemekten sorumlusunuz</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. HESAP FESİH VE DONDURMA</h2>
          <p className="font-medium">Otel Tarafından Fesih:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Kuralları ihlal ederseniz hesabınız kapatılabilir</li>
            <li>Yanlış bilgi verirseniz hesabınız askıya alınır</li>
            <li>Yasal zorunluluklarda hesabınız silinebilir</li>
            <li>Ödeme yapmazsanız hizmet durdurulur</li>
          </ul>
          <p className="font-medium">Kullanıcı Tarafından Fesih:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Hesabınızı dilediğiniz zaman silebilirsiniz</li>
            <li>Silme talebi için e-posta gönderin</li>
            <li>Silinen hesapların verileri kanuni sürelerce saklanır</li>
            <li>Hesap silindikten sonra yeni hesap açabilirsiniz</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. UYUŞMAZLIK ÇÖZÜMÜ</h2>
          <p className="text-gray-700">Öncelikli çözüm: Herhangi bir uyuşmazlıkta önce otel yönetimi ile iletişime geçiniz. Sorunun çözümü için 7 gün içinde dönüş yapılır.</p>
          <p className="text-gray-700">Çözülemeyen uyuşmazlıklarda T.C. kanunları uygulanır. Yetkili mahkeme [İliniz] Mahkemeleridir. Tüketici hakem heyetine başvuru hakkınız vardır.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. DEĞİŞİKLİKLER</h2>
          <p className="text-gray-700">Bu kullanım şartları zaman zaman güncellenebilir. Önemli değişikliklerde e-posta bildirimi yapılır, uygulama bildirimi gönderilir ve web sitesinde duyurulur.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">12. İLETİŞİM</h2>
          <p className="text-gray-700">E-posta: support@valoriahotel.com | Telefon: +90 [Telefon Numaranız] | Adres: [Otel Adresiniz] | Web: www.valoriahotel.com/terms</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">13. ONAY</h2>
          <p className="text-gray-700">Bu kullanım şartlarını okuduğumu, anladığımı ve kabul ettiğimi onaylıyorum.</p>
        </section>

        <p className="text-sm text-gray-500 pt-4">© 2025 Valoria Hotel - Tüm hakları saklıdır.</p>

        <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
          <Link to="/valoria-app" className="font-medium hover:underline" style={{ color: accent }}>← Valoria App Tanıtım</Link>
          <Link to="/valoria-app-privacy" className="font-medium hover:underline" style={{ color: accent }}>Gizlilik Sözleşmesi</Link>
          <Link to="/valoria-app/delete-account" className="font-medium hover:underline" style={{ color: accent }}>Hesap Silme</Link>
          <Link to="/support/valoria-app" className="font-medium hover:underline" style={{ color: accent }}>Destek</Link>
        </div>
      </div>
    </div>
  )
}
