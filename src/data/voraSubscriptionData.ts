export type VoraSubscriptionPlan = {
  id: string
  name: string
  price: string
  priceNote: string
  billingPeriod: string
  summary: string
  features: string[]
  highlighted?: boolean
}

export const voraSubscriptionPlans: VoraSubscriptionPlan[] = [
  {
    id: 'yearly',
    name: 'Vora Yıllık',
    price: '249,99 TL',
    priceNote: 'Yıllık tek seferlik abonelik ücreti',
    billingPeriod: '12 ay',
    summary:
      'Karadeniz topluluk platformunun temel premium özelliklerine 1 yıl boyunca erişim. Şehir kanalları, gelişmiş bildirimler ve topluluk araçları.',
    features: [
      'Tüm şehir ve topluluk kanallarına erişim',
      'Gelişmiş bildirim ve filtreleme',
      'Profil ve topluluk özellikleri',
      'Standart destek hattı'
    ]
  },
  {
    id: 'premium',
    name: 'Vora Premium Abonelik',
    price: '1.999,99 TL',
    priceNote: 'Otomatik yenilenen abonelik',
    billingPeriod: 'Abonelik dönemi satın alma ekranında belirtilir',
    summary:
      'Genişletilmiş premium paket; öncelikli destek, gelişmiş topluluk ve iletişim özellikleri. Faturalama periyodu App Store veya Google Play satın alma ekranında gösterilir.',
    features: [
      'Yıllık plandaki tüm özellikler',
      'Öncelikli müşteri desteği',
      'Gelişmiş topluluk ve mesajlaşma araçları',
      'Premium rozet ve görünürlük seçenekleri',
      'Yeni özelliklere erken erişim'
    ],
    highlighted: true
  }
]

export const voraSubscriptionLegalNotes = {
  cancellation24h:
    'Abonelik satın alımından itibaren 24 saat içinde, dijital hizmetten henüz yararlanmamış olmanız ve uygulama içi veya destek kanallarımız üzerinden yazılı iptal talebi iletmeniz halinde ücret iadesi talebiniz değerlendirilir. 24 saatlik süre, satın alma işleminin tamamlandığı andan itibaren işler.',
  autoRenew:
    'Abonelikler, iptal edilmediği sürece seçilen dönem sonunda otomatik olarak yenilenir. Yenileme ücreti, satın alma sırasında kullandığınız mağaza hesabından tahsil edilir.',
  cancelHow:
    'Aboneliğinizi istediğiniz zaman iptal edebilirsiniz. iOS: Ayarlar → Apple ID → Abonelikler → Vora. Android: Google Play → Abonelikler → Vora. İptal sonrası mevcut dönem sonuna kadar erişiminiz devam eder.',
  freeTier:
    'Vora\'nın temel topluluk özellikleri ücretsiz sunulabilir. Premium planlar isteğe bağlıdır; satın almadan önce uygulama içinde fiyat ve kapsam açıkça gösterilir.',
  paymentProcessor:
    'Uygulama içi satın almalar Apple App Store veya Google Play üzerinden işlenir. LitxTech tam kredi kartı bilgilerinizi sunucularında saklamaz.',
  contact: 'support@litxtech.com'
}
