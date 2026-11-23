import { p, sub, ul, type LegalDocSet } from './types'

const UPDATED_EN = '23 November 2026'
const UPDATED_TR = '23 Kasım 2026'

const en = {
  eyebrow: 'Billing',
  title: 'Refund Policy',
  summary:
    'This policy explains how payments, invoices, deposits, subscriptions and refunds work across LitxTech projects and software products, including purchases made through app stores. It forms part of our Terms of Service.',
  version: 'Version 3.0',
  effective: UPDATED_EN,
  updated: UPDATED_EN,
  sections: [
    {
      id: 'scope',
      title: 'Scope',
      blocks: [
        p(
          'This policy applies to fees paid to LitxTech LLC for custom software projects, software licences, subscriptions, support plans and hosting. It does not replace your statutory rights, and it does not govern purchases from third parties whose own policies apply.',
        ),
        p(
          'Where a signed statement of work or order form sets different payment or cancellation terms, that signed document prevails for that engagement.',
        ),
      ],
    },
    {
      id: 'payments',
      title: 'How payments are processed',
      blocks: [
        ul(
          'Project and licence invoices are paid by bank transfer or by the payment provider named on the invoice.',
          'Subscriptions are billed in advance through our payment provider or, for mobile products, through the Apple App Store or Google Play.',
          'We never receive or store full card numbers, security codes or bank credentials.',
          'All amounts are shown in the currency stated on the invoice and exclude applicable taxes unless stated otherwise.',
        ),
      ],
    },
    {
      id: 'projects',
      title: 'Projects and deposits',
      blocks: [
        p(
          'Custom development is delivered against milestones. A deposit reserves team capacity and is credited against the project total.',
        ),
        sub(
          'Before work starts',
          p(
            'If you cancel before we begin billable work, we refund the deposit in full, less any third-party costs we have already committed on your behalf and less any bank or payment provider fees that are not recoverable.',
          ),
        ),
        sub(
          'After work starts',
          p(
            'If you cancel a project in progress, you pay for work performed and for non-cancellable commitments up to the cancellation date, and any unused prepaid amount is refunded. We provide a written summary of the work completed and the calculation used.',
          ),
        ),
        sub(
          'Delivered milestones',
          p(
            'Fees for milestones that have been delivered and accepted are non-refundable, but the warranty in our Terms of Service still applies and we will correct genuine defects at no additional cost.',
          ),
        ),
      ],
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions, trials and renewals',
      blocks: [
        ul(
          'Subscriptions renew automatically unless cancelled before the renewal date.',
          'Cancellation stops future charges. It does not automatically refund the current period, because access remains available until the period ends.',
          'Free trials convert to a paid plan at the end of the trial unless cancelled; we remind you before conversion where required.',
          'If a paid subscription is cancelled within 14 days of the first purchase and the product has not been materially used, we refund the unused portion on request.',
          'Annual plans cancelled mid-term are not refunded pro rata unless required by law or agreed in writing.',
        ),
      ],
    },
    {
      id: 'stores',
      title: 'App store purchases',
      blocks: [
        p(
          'Purchases made inside an iOS or Android application are processed by Apple or Google. Their refund rules and timelines apply, and we cannot issue a store refund directly.',
        ),
        ul(
          'Apple: request a refund through the App Store purchase history or Apple Support.',
          'Google Play: request a refund through the Play Store order history within the window Google allows.',
          'If a store refund is approved, access to the paid feature ends when the store confirms the refund.',
        ),
        p(
          'If you believe a store charge is wrong because of a defect in our product, contact us first at support@litxtech.com and we will investigate and support your request.',
        ),
      ],
    },
    {
      id: 'eligible',
      title: 'When we issue a refund',
      blocks: [
        p('We approve refunds in the following situations:'),
        ul(
          'A duplicate or clearly accidental payment.',
          'A payment for a service that we could not deliver and cannot reasonably substitute.',
          'A verified technical defect that prevents use of the purchased feature and that we cannot fix within a reasonable time.',
          'A billing error on our side, such as an incorrect amount or a charge after a valid cancellation.',
          'Any situation where the law requires a refund, including statutory consumer cancellation rights.',
        ),
      ],
    },
    {
      id: 'non-refundable',
      title: 'What is not refundable',
      blocks: [
        ul(
          'Work that has been delivered and accepted, except for defects covered by warranty.',
          'Subscription periods that have already been used or partially used, except where the law provides otherwise.',
          'Accounts suspended or terminated for a breach of our Terms or acceptable use rules.',
          'Third-party costs already incurred, such as app store fees, cloud consumption, paid APIs, licensed assets or domain registrations.',
          'Custom design or development work that has already been produced and handed over.',
          'Change-of-mind requests made after a statutory cancellation window has closed.',
        ),
      ],
    },
    {
      id: 'request',
      title: 'How to request a refund',
      blocks: [
        p(
          'E-mail billing@litxtech.com or support@litxtech.com with the invoice number, payment date, amount, the product or project concerned and a short description of the reason. If the request relates to a technical problem, include screenshots or the steps that reproduce it.',
        ),
        ul(
          'We acknowledge requests within 3 business days.',
          'We aim to decide within 10 business days of receiving the information we need.',
          'Approved refunds are returned to the original payment method within 5 to 10 business days, depending on your bank.',
          'We may ask for identity verification to prevent fraud; we will not ask for more than is necessary.',
        ),
      ],
    },
    {
      id: 'chargebacks',
      title: 'Chargebacks and payment disputes',
      blocks: [
        p(
          'Please contact us before raising a chargeback with your bank. Most issues are resolved faster directly. If a chargeback is raised, we may suspend the affected account or service while the dispute is investigated.',
        ),
        p(
          'We may recover chargeback fees and related costs where the dispute was not caused by our error or by a genuine billing mistake.',
        ),
      ],
    },
    {
      id: 'rights',
      title: 'Your statutory rights',
      blocks: [
        p(
          'Nothing in this policy limits a right that cannot be excluded by contract. Consumers in the European Union, the United Kingdom and Turkey may have a statutory right to cancel within a defined period for distance contracts, and consumer law may require a remedy where a digital product is faulty.',
        ),
        p(
          'Where a statutory cancellation right applies to a digital service that begins immediately, we may ask you to acknowledge that you lose the cancellation right once delivery has started, as the law allows.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        p(
          'Billing questions: billing@litxtech.com. General support: support@litxtech.com. Please include your invoice or order reference so we can find the transaction quickly.',
        ),
      ],
    },
  ],
}

const tr = {
  eyebrow: 'Faturalama',
  title: 'İade Politikası',
  summary:
    'Bu politika; LitxTech projeleri ve yazılım ürünlerinde ödeme, fatura, ön ödeme, abonelik ve iadelerin nasıl işlediğini, uygulama mağazalarından yapılan satın alımlar dahil açıklar. Kullanım Şartlarımızın bir parçasıdır.',
  version: 'Sürüm 3.0',
  effective: UPDATED_TR,
  updated: UPDATED_TR,
  sections: [
    {
      id: 'scope',
      title: 'Kapsam',
      blocks: [
        p(
          'Bu politika; kuruma özel yazılım projeleri, yazılım lisansları, abonelikler, destek paketleri ve barındırma için LitxTech LLC’ye ödenen ücretler için geçerlidir. Yasal haklarınızın yerine geçmez ve kendi politikaları geçerli olan üçüncü taraflardan yapılan satın alımları düzenlemez.',
        ),
        p(
          'İmzalı bir iş tanımı veya sipariş formu farklı ödeme ya da iptal koşulları belirliyorsa, o iş için imzalı belge geçerlidir.',
        ),
      ],
    },
    {
      id: 'payments',
      title: 'Ödemeler nasıl işlenir',
      blocks: [
        ul(
          'Proje ve lisans faturaları banka havalesiyle veya faturada belirtilen ödeme sağlayıcısı aracılığıyla ödenir.',
          'Abonelikler, ödeme sağlayıcımız aracılığıyla veya mobil ürünlerde Apple App Store ya da Google Play üzerinden peşin faturalanır.',
          'Tam kart numarası, güvenlik kodu veya banka bilgilerini hiçbir zaman almayız veya saklamayız.',
          'Tüm tutarlar faturada belirtilen para biriminde gösterilir ve aksi belirtilmedikçe uygulanabilir vergiler hariçtir.',
        ),
      ],
    },
    {
      id: 'projects',
      title: 'Projeler ve ön ödemeler',
      blocks: [
        p(
          'Kuruma özel geliştirme, kilometre taşlarına göre teslim edilir. Ön ödeme ekip kapasitesi ayırır ve proje toplamından düşülür.',
        ),
        sub(
          'İş başlamadan önce',
          p(
            'Faturalanabilir işe başlamadan iptal ederseniz, sizin adınıza taahhüt ettiğimiz üçüncü taraf maliyetleri ve geri alınamayan banka ya da ödeme sağlayıcı masrafları düşülerek ön ödemeyi tam olarak iade ederiz.',
          ),
        ),
        sub(
          'İş başladıktan sonra',
          p(
            'Devam eden bir projeyi iptal ederseniz, iptal tarihine kadar gerçekleştirilen işler ve iptal edilemeyen taahhütler için ödeme yaparsınız; kullanılmayan peşin tutar iade edilir. Tamamlanan işlerin ve hesaplamanın yazılı özetini sunarız.',
          ),
        ),
        sub(
          'Teslim edilen kilometre taşları',
          p(
            'Teslim edilen ve kabul edilen kilometre taşlarının ücretleri iade edilmez; ancak Kullanım Şartlarımızdaki garanti geçerlidir ve gerçek hataları ek ücret almadan düzeltiriz.',
          ),
        ),
      ],
    },
    {
      id: 'subscriptions',
      title: 'Abonelikler, denemeler ve yenilemeler',
      blocks: [
        ul(
          'Abonelikler, yenileme tarihinden önce iptal edilmediği sürece otomatik yenilenir.',
          'İptal, gelecekteki ücretleri durdurur. Mevcut dönem için otomatik iade sağlamaz; çünkü erişim dönem sonuna kadar açık kalır.',
          'Ücretsiz denemeler, iptal edilmediği sürece deneme sonunda ücretli plana dönüşür; gerektiğinde dönüşümden önce sizi hatırlatırız.',
          'Ücretli bir abonelik ilk satın almadan sonraki 14 gün içinde iptal edilir ve ürün esaslı olarak kullanılmamışsa, talep üzerine kullanılmayan kısmı iade ederiz.',
          'Yıllık planların dönem ortasında iptali, kanun gerektirmedikçe veya yazılı olarak anlaşılmadıkça oransal olarak iade edilmez.',
        ),
      ],
    },
    {
      id: 'stores',
      title: 'Uygulama mağazası satın alımları',
      blocks: [
        p(
          'iOS veya Android uygulaması içinde yapılan satın alımlar Apple veya Google tarafından işlenir. Onların iade kuralları ve süreleri geçerlidir; mağaza iadesini doğrudan gerçekleştiremeyiz.',
        ),
        ul(
          'Apple: App Store satın alma geçmişi veya Apple Destek üzerinden iade talep edin.',
          'Google Play: Google’ın izin verdiği süre içinde Play Store sipariş geçmişinden iade talep edin.',
          'Mağaza iadesi onaylanırsa, mağaza iadeyi teyit ettiğinde ücretli özelliğe erişim sona erer.',
        ),
        p(
          'Bir mağaza ücretinin ürünümüzdeki bir hata nedeniyle yanlış olduğunu düşünüyorsanız, önce support@litxtech.com adresinden bize ulaşın; inceleyip talebinizi destekleriz.',
        ),
      ],
    },
    {
      id: 'eligible',
      title: 'Hangi durumlarda iade yapıyoruz',
      blocks: [
        p('Aşağıdaki durumlarda iadeyi onaylıyoruz:'),
        ul(
          'Mükerrer veya açıkça yanlışlıkla yapılmış ödeme.',
          'Teslim edemediğimiz ve makul şekilde ikame edemediğimiz bir hizmet için yapılan ödeme.',
          'Satın alınan özelliğin kullanımını engelleyen ve makul sürede düzeltemediğimiz doğrulanmış teknik hata.',
          'Bizim tarafımızdaki faturalama hatası; örneğin yanlış tutar veya geçerli bir iptalden sonra yapılan tahsilat.',
          'Kanunun iade gerektirdiği her durum; yasal tüketici cayma hakları dahil.',
        ),
      ],
    },
    {
      id: 'non-refundable',
      title: 'İade edilmeyen durumlar',
      blocks: [
        ul(
          'Teslim edilen ve kabul edilen işler; garanti kapsamındaki hatalar hariç.',
          'Kullanılmış veya kısmen kullanılmış abonelik dönemleri; kanun aksini öngörmedikçe.',
          'Şartlarımızı veya kabul edilebilir kullanım kurallarını ihlal nedeniyle askıya alınan ya da sona erdirilen hesaplar.',
          'Uygulama mağazası ücretleri, bulut tüketimi, ücretli API’ler, lisanslı varlıklar veya alan adı tescili gibi halihazırda oluşmuş üçüncü taraf maliyetleri.',
          'Üretilmiş ve teslim edilmiş özel tasarım veya geliştirme işleri.',
          'Yasal cayma süresi dolduktan sonra yapılan fikir değişikliği talepleri.',
        ),
      ],
    },
    {
      id: 'request',
      title: 'Nasıl iade talep edilir',
      blocks: [
        p(
          'Fatura numarası, ödeme tarihi, tutar, ilgili ürün veya proje ve nedenin kısa açıklamasıyla billing@litxtech.com veya support@litxtech.com adresine e-posta gönderin. Talep teknik bir sorunla ilgiliyse sorunu yeniden üreten adımları veya ekran görüntülerini ekleyin.',
        ),
        ul(
          'Talepleri 3 iş günü içinde teyit ederiz.',
          'İhtiyaç duyduğumuz bilgileri aldıktan sonra 10 iş günü içinde karar vermeyi hedefleriz.',
          'Onaylanan iadeler, bankanıza bağlı olarak 5 ila 10 iş günü içinde orijinal ödeme yöntemine yapılır.',
          'Sahtekârlığı önlemek için kimlik doğrulaması isteyebiliriz; gerekenden fazlasını istemeyiz.',
        ),
      ],
    },
    {
      id: 'chargebacks',
      title: 'Ters ibrazlar ve ödeme uyuşmazlıkları',
      blocks: [
        p(
          'Bankanızda ters ibraz (chargeback) başlatmadan önce lütfen bizimle iletişime geçin. Sorunların çoğu doğrudan daha hızlı çözülür. Ters ibraz başlatılırsa, uyuşmazlık incelenirken ilgili hesabı veya hizmeti askıya alabiliriz.',
        ),
        p(
          'Uyuşmazlık bizim hatamızdan veya gerçek bir faturalama hatasından kaynaklanmadıysa, ters ibraz masraflarını ve ilgili maliyetleri talep edebiliriz.',
        ),
      ],
    },
    {
      id: 'rights',
      title: 'Yasal haklarınız',
      blocks: [
        p(
          'Bu politikadaki hiçbir hüküm, sözleşmeyle ortadan kaldırılamayacak bir hakkı sınırlamaz. Avrupa Birliği, Birleşik Krallık ve Türkiye’deki tüketiciler, mesafeli sözleşmelerde belirli bir süre içinde cayma hakkına ve dijital ürünün ayıplı olması halinde tüketici hukukunun öngördüğü bir çözüme sahip olabilir.',
        ),
        p(
          'Hemen başlayan bir dijital hizmette yasal cayma hakkı geçerliyse, kanunun izin verdiği ölçüde, teslimat başladığında cayma hakkını kaybettiğinizi kabul etmenizi isteyebiliriz.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'İletişim',
      blocks: [
        p(
          'Faturalama soruları: billing@litxtech.com. Genel destek: support@litxtech.com. İşlemi hızlı bulabilmemiz için fatura veya sipariş referansınızı ekleyin.',
        ),
      ],
    },
  ],
}

export const refundPolicy: LegalDocSet = { en, tr }
