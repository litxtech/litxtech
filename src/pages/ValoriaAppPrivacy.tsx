import { Link } from 'react-router-dom'

const accent = '#0d9488'

export function ValoriaAppPrivacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: accent }}>Gizlilik Sözleşmesi</p>
          <h1 className="text-3xl font-bold">Valoria Hotel Gizlilik Sözleşmesi</h1>
          <p className="text-sm text-gray-500">(KVKK & GDPR Uyumlu)</p>
          <p className="text-sm text-gray-500">Son Güncelleme: 20 Mart 2025</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. VERİ SORUMLUSU</h2>
          <p className="text-gray-700">
            Valoria Hotel olarak, kişisel verilerinizin güvenliğine önem veriyoruz. Bu gizlilik sözleşmesi, otelimizi ziyaret ettiğinizde, uygulamamızı kullandığınızda veya web sitemizi ziyaret ettiğinizde toplanan kişisel verilerinizin işlenmesine ilişkin bilgilendirme ve onayınızı içermektedir.
          </p>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700">
            <p><strong>Veri Sorumlusu:</strong></p>
            <p>Valoria Hotel</p>
            <p>Adres: [Otel Adresiniz]</p>
            <p>E-posta: privacy@valoriahotel.com</p>
            <p>Telefon: +90 [Telefon Numaranız]</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. TOPLANAN KİŞİSEL VERİLER</h2>
          <h3 className="font-semibold">2.1. Kimlik Bilgileri:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Ad Soyad</li>
            <li>TC Kimlik Numarası / Pasaport No</li>
            <li>Doğum Tarihi</li>
            <li>Uyruk</li>
            <li>Cinsiyet</li>
            <li>İmza (dijital imza)</li>
          </ul>
          <h3 className="font-semibold">2.2. İletişim Bilgileri:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Telefon Numarası</li>
            <li>E-posta Adresi</li>
            <li>Adres</li>
          </ul>
          <h3 className="font-semibold">2.3. Konaklama Bilgileri:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Giriş-Çıkış Tarihleri</li>
            <li>Oda Numarası</li>
            <li>Özel İstekler</li>
            <li>Konaklama Geçmişi</li>
            <li>Fatura Bilgileri</li>
          </ul>
          <h3 className="font-semibold">2.4. Teknik Veriler:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>IP Adresi</li>
            <li>Cihaz Bilgileri (marka, model, işletim sistemi)</li>
            <li>Konum Bilgisi (GPS - izin verirseniz)</li>
            <li>Çerezler (cookies)</li>
            <li>Log Kayıtları</li>
          </ul>
          <h3 className="font-semibold">2.5. Güvenlik Verileri:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Güvenlik Kamerası Kayıtları (ortak alanlar)</li>
            <li>Kartlı Geçiş Kayıtları (hangi kapı, ne zaman)</li>
            <li>Acil Durum İletişimleri</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. VERİ TOPLAMA YÖNTEMLERİ</h2>
          <p className="text-gray-700">Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:</p>
          <div className="space-y-2">
            <p className="font-medium">Mobil Uygulama:</p>
            <ul className="list-disc list-inside text-gray-700 pl-4">
              <li>QR kod ile check-in işlemi sırasında</li>
              <li>Hesap oluştururken</li>
              <li>Oda servisi taleplerinde</li>
            </ul>
            <p className="font-medium">Web Sitesi:</p>
            <ul className="list-disc list-inside text-gray-700 pl-4">
              <li>Rezervasyon yaparken</li>
              <li>İletişim formu doldururken</li>
              <li>Bülten aboneliğinde</li>
            </ul>
            <p className="font-medium">Otel İçi:</p>
            <ul className="list-disc list-inside text-gray-700 pl-4">
              <li>Resepsiyonda check-in/out sırasında</li>
              <li>Güvenlik kameraları ile</li>
              <li>Kartlı geçiş sisteminde</li>
              <li>Oda içi taleplerde</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. VERİ İŞLEME AMAÇLARI</h2>
          <p className="font-medium">Zorunlu Amaçlar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Rezervasyon ve check-in işlemleri</li>
            <li>Otel kurallarının onaylanması</li>
            <li>Kimlik doğrulama (kanuni zorunluluk)</li>
            <li>Faturalandırma ve ödeme işlemleri</li>
            <li>Güvenlik (kamera kayıtları)</li>
            <li>Yetkisiz girişlerin engellenmesi</li>
            <li>Acil durum iletişimi</li>
          </ul>
          <p className="font-medium">İsteğe Bağlı Amaçlar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Pazarlama ve kampanya bilgilendirmeleri</li>
            <li>Memnuniyet anketleri</li>
            <li>Özel teklifler ve indirimler</li>
            <li>Doğum günü kutlamaları</li>
            <li>Konaklama geçmişi ve tercihlerin kaydı</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. VERİLERİN AKTARILMASI</h2>
          <p className="font-medium">Yasal Zorunluluklar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Kolluk kuvvetleri (emniyet, jandarma)</li>
            <li>Mahkeme kararı ile</li>
            <li>Vergi denetimi (maliye)</li>
            <li>Turizm Bakanlığı bildirimleri</li>
          </ul>
          <p className="font-medium">Hizmet Sağlayıcılar:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Ödeme sistemleri (kredi kartı işlemleri)</li>
            <li>Bulut hizmet sağlayıcıları (Supabase, Vercel)</li>
            <li>SMS/WhatsApp servisleri (doğrulama kodları)</li>
            <li>E-posta servisleri</li>
            <li>Kilit sistemi sağlayıcısı (kapı açma kayıtları)</li>
          </ul>
          <p className="font-medium text-red-700">ASLA Paylaşılmaz:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-red-100 bg-red-50 p-4">
            <li>Pazarlama amaçlı üçüncü taraflarla</li>
            <li>Reklam şirketleriyle</li>
            <li>Veri brokerleriyle</li>
            <li>İzniniz olmadan hiçbir ticari kuruluşla</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. VERİ GÜVENLİĞİ</h2>
          <p className="font-medium">Teknik Önlemler:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>SSL sertifikası (şifreli iletişim)</li>
            <li>Veritabanı şifreleme</li>
            <li>Güvenlik duvarı</li>
            <li>Düzenli güvenlik güncellemeleri</li>
            <li>Yetki katmanları (admin, personel, misafir)</li>
            <li>2 faktörlü kimlik doğrulama (admin için)</li>
          </ul>
          <p className="font-medium">Organizasyonel Önlemler:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Personel gizlilik sözleşmeleri</li>
            <li>Periyodik güvenlik eğitimleri</li>
            <li>Yetki sınırlandırmaları</li>
            <li>İşten ayrılan personelin yetkilerinin derhal iptali</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. ÇEREZLER (COOKIES)</h2>
          <p className="font-medium">Zorunlu Çerezler:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Oturum yönetimi</li>
            <li>Dil tercihi</li>
            <li>Güvenlik token&apos;ları</li>
            <li>Oturum açma bilgileri</li>
          </ul>
          <p className="font-medium">İsteğe Bağlı Çerezler:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Analitik çerezler (Google Analytics)</li>
            <li>Performans çerezleri</li>
            <li>Reklam çerezleri (varsa)</li>
          </ul>
          <p className="text-gray-700">Çerezleri tarayıcı ayarlarınızdan kontrol edebilirsiniz.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. KİŞİSEL VERİ SAHİBİNİN HAKLARI</h2>
          <p className="text-gray-700">KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Bilgi talep etme</strong> → Hangi verileriniz işleniyor?</li>
            <li><strong>Düzeltme talep etme</strong> → Yanlış veri varsa düzeltelim</li>
            <li><strong>Silme talep etme</strong> → Verilerinizi silelim (kanuni zorunluluklar hariç)</li>
            <li><strong>İtiraz etme</strong> → İşlenmesine itiraz edebilirsiniz</li>
            <li><strong>Şikayet etme</strong> → KVKK Kurulu&apos;na şikayet hakkı</li>
          </ul>
          <p className="text-gray-700">Başvuru için: privacy@valoriahotel.com | Telefon: +90 [Telefon Numaranız]</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. VERİ SAKLAMA SÜRELERİ</h2>
          <p className="font-medium">Misafir Bilgileri:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Kimlik bilgileri: 10 yıl (kanuni zorunluluk)</li>
            <li>Konaklama kayıtları: 5 yıl</li>
            <li>Fatura bilgileri: 10 yıl (vergi mevzuatı)</li>
            <li>İmza kayıtları: 5 yıl</li>
          </ul>
          <p className="font-medium">Güvenlik Kayıtları:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>Kamera kayıtları: 30 gün</li>
            <li>Kapı açma logları: 2 yıl</li>
            <li>Yetkisiz giriş denemeleri: 5 yıl</li>
          </ul>
          <p className="font-medium">Pazarlama Verileri:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <li>E-posta izni: İptal edene kadar</li>
            <li>SMS izni: İptal edene kadar</li>
            <li>Çerezler: 1 yıl</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. ÖZEL DURUMLAR</h2>
          <p className="text-gray-700"><strong>10.1. 18 Yaş Altı Çocuklar:</strong> 18 yaşından küçük bireylerin kişisel verileri, yasal veli izni olmadan işlenmez.</p>
          <p className="text-gray-700"><strong>10.2. Acil Durumlar:</strong> Acil sağlık durumlarında, hayati önem taşıyan bilgiler (alerji, kan grubu vb.) sağlık personeliyle paylaşılabilir.</p>
          <p className="text-gray-700"><strong>10.3. Kolluk Kuvvetleri:</strong> Adli soruşturma durumunda, yetkili mercilerin talebiyle gerekli bilgiler paylaşılır.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. DEĞİŞİKLİKLER</h2>
          <p className="text-gray-700">Bu gizlilik sözleşmesi zaman zaman güncellenebilir. Önemli değişikliklerde e-posta bildirimi yapılır, uygulama bildirimi gönderilir ve web sitesinde duyurulur.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">12. İLETİŞİM</h2>
          <p className="text-gray-700">E-posta: privacy@valoriahotel.com | Telefon: +90 [Telefon Numaranız] | Adres: [Otel Adresiniz] | Web: www.valoriahotel.com/privacy</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">13. ONAY</h2>
          <p className="text-gray-700">Bu gizlilik sözleşmesini okuduğumu, anladığımı ve kişisel verilerimin yukarıda belirtilen şartlarda işlenmesine izin verdiğimi onaylıyorum.</p>
        </section>

        <p className="text-sm text-gray-500 pt-4">© 2025 Valoria Hotel - Tüm hakları saklıdır.</p>

        <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
          <Link to="/valoria-app" className="font-medium hover:underline" style={{ color: accent }}>← Valoria App Tanıtım</Link>
          <Link to="/valoria-app-terms" className="font-medium hover:underline" style={{ color: accent }}>Kullanım Şartları</Link>
          <Link to="/valoria-app/delete-account" className="font-medium hover:underline" style={{ color: accent }}>Hesap Silme</Link>
          <Link to="/support/valoria-app" className="font-medium hover:underline" style={{ color: accent }}>Destek</Link>
        </div>
      </div>
    </div>
  )
}
