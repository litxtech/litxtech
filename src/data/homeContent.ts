/** Türkçe ana sayfa metinleri ve listeler (veri odaklı düzen). */
export const homeContent = {
  hero: {
    title: 'İşinizi dijitale taşıyan güçlü yazılım çözümleri',
    subtitle: 'Otel, restoran, sosyal platform ve özel yazılım projeleri geliştiriyoruz',
    description:
      'LitxTech olarak işletmelere ve girişimlere özel web ve mobil yazılım çözümleri geliştiriyoruz. Otel yönetiminden restoran otomasyonuna, sosyal medya platformlarından şehir uygulamalarına kadar ölçeklenebilir sistemler üretiyoruz.',
    primaryCta: 'Projeleri İncele',
    secondaryCta: 'Teklif Al',
    tertiaryCta: 'İletişime Geç',
  },
  stats: [
    { value: '10+', label: 'Tamamlanan proje' },
    { value: '6', label: 'Çözüm alanı' },
    { value: '5', label: 'Adımlı teslim süreci' },
    { value: '7/7', label: 'Hızlı iletişim' },
  ],
  capabilities: {
    title: 'Neler geliştirebiliriz?',
    subtitle:
      'Mevcut ürünlerimizi sergilemekle kalmıyor; iş modelinize göre yeni ürünler de tasarlayıp hayata geçiriyoruz.',
    items: [
      'Restoranlar için tek panel işletme yönetimi',
      'Oteller için rezervasyon ve operasyon sistemleri',
      'Şehir rehberi ve yerel haber uygulamaları',
      'Arkadaşlık ve eşleşme uygulamaları',
      'Kurumsal yönetim panelleri',
      'Sosyal ağ ve topluluk platformları',
      'İşletmelere özel raporlama ve muhasebe sistemleri',
      'Kamera, ödeme, bildirim ve harita entegrasyonları',
      'Mobil uygulama + web panel birlikte çalışan sistemler',
    ],
  },
  process: {
    title: 'Çalışma süreci',
    subtitle: 'Şeffaf, ölçülebilir ve güven veren bir teslimat modeli.',
    steps: [
      { title: 'İhtiyaç analizi', desc: 'Hedefler, kapsam ve başarı ölçütlerini birlikte netleştiriyoruz.' },
      { title: 'Arayüz ve sistem planlama', desc: 'Kullanıcı akışları, mimari ve entegrasyonları tasarlıyoruz.' },
      { title: 'Yazılım geliştirme', desc: 'Modüler geliştirme ile erken değer ve düzenli teslimat sağlıyoruz.' },
      { title: 'Test ve yayınlama', desc: 'Kalite, güvenlik ve performans kontrolleri sonrası canlıya alıyoruz.' },
      { title: 'Destek ve geliştirme', desc: 'İzleme, iyileştirme ve yeni özelliklerle ürünü büyütüyoruz.' },
    ],
  },
  why: {
    title: 'Neden LitxTech?',
    items: [
      'İhtiyaca özel geliştirme',
      'Modern arayüzler',
      'Mobil uyumlu yapı',
      'Ölçeklenebilir yazılım altyapısı',
      'Hızlı iletişim ve destek',
      'Gerçek projeler ve uygulanabilir çözümler',
    ],
  },
  faq: {
    title: 'Sık sorulan sorular',
    items: [
      {
        q: 'Hangi sektörlere hizmet veriyorsunuz?',
        a: 'Otel ve konaklama, restoran ve yiyecek-içecek, sosyal platformlar, şehir uygulamaları ve kuruma özel yazılım projelerinde çalışıyoruz.',
      },
      {
        q: 'Proje süresi nasıl planlanıyor?',
        a: 'Kapsam, entegrasyonlar ve ekip yoğunluğuna göre haftalık sprint planı çıkarıyoruz; kilometre taşları yazılı olarak paylaşılır.',
      },
      {
        q: 'Destek ve bakım sunuyor musunuz?',
        a: 'Evet. Yayın sonrası izleme, hata giderme ve geliştirme talepleri için esnek destek modelleri sunuyoruz.',
      },
      {
        q: 'Teklif almak için ne gerekir?',
        a: 'Kısa bir ihtiyaç özeti, varsa mevcut sistemleriniz ve hedef tarih yeterli. İsterseniz WhatsApp veya iletişim formu üzerinden hızlıca başlayabilirsiniz.',
      },
    ],
  },
  finalCta: {
    title: 'Projenizi birlikte planlayalım.',
    subtitle: 'İhtiyacınızı dinleyelim, doğru mimariyi ve yol haritasını birlikte oluşturalım.',
    quote: 'Teklif Al',
    whatsapp: 'WhatsApp ile İletişim',
    demo: 'Demo Talep Et',
  },
  sections: {
    solutions: 'Çözüm alanlarımız',
    solutionsLead:
      'Ürünleri tek tek listelemek yerine, işinize değer katan çözüm kategorileriyle ilerliyoruz.',
    projects: 'Öne çıkan projeler',
    projectsLead: 'Gerçek ürünler ve yayında olan referanslarla güven oluşturuyoruz.',
  },
} as const
