import { p, ul, type LegalDocSet } from './types'

const UPDATED_EN = '23 November 2026'
const UPDATED_TR = '23 Kasım 2026'

const en = {
  eyebrow: 'Security',
  title: 'Data Security',
  summary:
    'This document describes the technical and organisational measures LitxTech LLC applies to protect the data in our website, products and client projects. It is written for clients, security reviewers and end users who need to understand how we secure information.',
  version: 'Version 3.0',
  effective: UPDATED_EN,
  updated: UPDATED_EN,
  sections: [
    {
      id: 'governance',
      title: 'Scope and governance',
      blocks: [
        p(
          'Security is owned at management level. Our team is responsible for implementing this policy, reviewing it at least annually, and reporting material incidents to leadership. Access to production systems is restricted to named individuals with a documented business need.',
        ),
        p(
          'This document covers our website, our published applications, the infrastructure that runs them and the environments used to deliver client projects. It complements our Privacy Policy and our Terms of Service.',
        ),
      ],
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure and hosting',
      blocks: [
        ul(
          'We run our services on reputable cloud providers with independently audited controls, including managed PostgreSQL, object storage, edge networking and serverless functions.',
          'Production environments are separated from staging and development. Test data is not copied into development unless it has been de-identified.',
          'Infrastructure is defined in configuration, reviewed before deployment, and changes to production follow a controlled release process.',
          'Static assets and the marketing website are delivered through a global content delivery network with TLS termination at the edge.',
        ),
      ],
    },
    {
      id: 'encryption',
      title: 'Encryption',
      blocks: [
        ul(
          'All traffic to our website, applications and APIs is protected with TLS. Plain HTTP requests are redirected to HTTPS.',
          'Data at rest is encrypted by our database and object storage providers using AES-based encryption.',
          'Backups are encrypted and stored in a separate location from the primary database.',
          'Passwords are hashed with a modern, salted algorithm and are never stored or logged in plain text. We never store full payment card numbers.',
          'Secrets and API keys are stored in a managed secret store or encrypted environment configuration, not in source control.',
        ),
      ],
    },
    {
      id: 'access',
      title: 'Access control',
      blocks: [
        ul(
          'Every team member uses an individual named account; shared credentials are not permitted for administrative systems.',
          'Multi-factor authentication is required for source control, cloud consoles and production administration.',
          'Role-based access control and the principle of least privilege limit what each role can read or change.',
          'Production access is granted on request, time-bound where practical, and recorded in an audit log.',
          'Access is removed promptly when a team member or contractor leaves a project.',
          'Administrative actions in our products are logged with the actor, time and affected resource.',
        ),
      ],
    },
    {
      id: 'development',
      title: 'Secure development',
      blocks: [
        ul(
          'Code changes go through peer review before merging, with automated checks for dependency vulnerabilities and basic static analysis.',
          'Third-party packages are pinned, reviewed before adoption and updated when security releases are published.',
          'Environments are configured through managed pipelines; developers do not hold standing production credentials.',
          'Authentication, authorisation, input validation and output encoding are treated as design requirements, not afterthoughts.',
          'Security requirements are included in project discovery for client engagements, including threat modelling for sensitive systems.',
        ),
      ],
    },
    {
      id: 'application',
      title: 'Application security',
      blocks: [
        ul(
          'Authentication supports strong password rules, optional social sign-in and session expiration. Sensitive actions require re-authentication where appropriate.',
          'Authorisation is enforced on the server, not only in the interface. Row-level security isolates tenant and user data in the database.',
          'File uploads are validated by type and size, stored in private buckets and served through expiring signed URLs.',
          'Rate limiting, abuse detection and spam controls protect public endpoints and messaging features.',
          'Media and personal data are never exposed through public storage buckets.',
        ),
      ],
    },
    {
      id: 'backups',
      title: 'Backups and resilience',
      blocks: [
        ul(
          'Databases are backed up on an automated schedule with a defined retention window.',
          'Restore procedures are documented and tested periodically; a backup is only considered valid after a successful restore test.',
          'Critical services are designed to tolerate the failure of a single component, using managed failover where the provider supports it.',
          'Capacity and error rates are monitored so that growth or degradation is noticed before it affects users.',
        ),
      ],
    },
    {
      id: 'monitoring',
      title: 'Monitoring, logging and detection',
      blocks: [
        ul(
          'Application and infrastructure logs are centralised, with alerts for error spikes, authentication anomalies and unusual administrative activity.',
          'Access logs are retained for an appropriate period and protected from modification.',
          'Dependency and configuration vulnerabilities are tracked and remediated according to severity.',
          'We run periodic reviews of exposed endpoints, permissions and third-party integrations.',
        ),
      ],
    },
    {
      id: 'vendors',
      title: 'Vendors and subprocessors',
      blocks: [
        p(
          'We assess providers before adopting them, favour providers with independent security certifications, and require confidentiality and data protection commitments in writing. Our current subprocessors and their purposes are listed on the Subprocessors page.',
        ),
        p(
          'When a provider suffers an incident that affects our data, we treat it as our own incident for notification purposes and inform affected clients without undue delay.',
        ),
      ],
    },
    {
      id: 'incident',
      title: 'Incident response',
      blocks: [
        p(
          'We maintain a documented incident response process: detect, triage, contain, eradicate, recover, and learn. A named owner coordinates the response and communication.',
        ),
        ul(
          'Suspected incidents are investigated immediately and severity is assessed against impact on confidentiality, integrity and availability.',
          'Where a personal data breach is likely to result in a risk to individuals, we notify the competent supervisory authority without undue delay and within the statutory deadline.',
          'Affected individuals and clients are notified where required by law or contract, with a description of what happened and what we are doing about it.',
          'After resolution we complete a post-incident review and apply corrective actions with owners and deadlines.',
        ),
        p(
          'Security reports are welcome at security@litxtech.com. We will acknowledge a report, investigate in good faith and avoid pursuing good-faith researchers who act responsibly.',
        ),
      ],
    },
    {
      id: 'responsibilities',
      title: 'Client and user responsibilities',
      blocks: [
        ul(
          'Choose strong, unique credentials and enable multi-factor authentication where available.',
          'Do not share accounts, API keys or access tokens, and rotate credentials if exposure is suspected.',
          'Keep devices, browsers and operating systems updated.',
          'Do not upload malware, unlawful content or data you are not authorised to process.',
          'Report suspected vulnerabilities or unauthorised access to security@litxtech.com promptly.',
          'For client projects, define data classification and retention requirements during discovery so that controls match the sensitivity of the data.',
        ),
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance and assurance',
      blocks: [
        p(
          'Our controls are designed to support the security requirements of the GDPR, the UK GDPR, the KVKK, the CCPA/CPRA and the technical requirements of the Apple App Store and Google Play.',
        ),
        p(
          'On request, and under a confidentiality agreement, we can provide a security summary, answer a vendor security questionnaire, describe our data flows and subprocessors, or support a client audit with evidence of the controls described here. We do not claim certifications we do not hold.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        p(
          'Security questions: security@litxtech.com. Privacy and data protection: support@litxtech.com. We aim to acknowledge security reports within 2 business days.',
        ),
      ],
    },
  ],
}

const tr = {
  eyebrow: 'Güvenlik',
  title: 'Veri Güvenliği',
  summary:
    'Bu belge, LitxTech LLC’nin web sitesi, ürünleri ve müşteri projelerindeki verileri korumak için uyguladığı teknik ve idari önlemleri açıklar. Bilgilerin nasıl güvence altına alındığını anlamak isteyen müşteriler, güvenlik denetçileri ve son kullanıcılar için yazılmıştır.',
  version: 'Sürüm 3.0',
  effective: UPDATED_TR,
  updated: UPDATED_TR,
  sections: [
    {
      id: 'governance',
      title: 'Kapsam ve yönetişim',
      blocks: [
        p(
          'Güvenliğin sahibi yönetimdir. Ekibimiz bu politikayı uygulamak, en az yılda bir gözden geçirmek ve esaslı olayları yönetime bildirmekle sorumludur. Üretim sistemlerine erişim, belgelenmiş iş ihtiyacı olan ve adı belirli kişilerle sınırlıdır.',
        ),
        p(
          'Bu belge; web sitemizi, yayınladığımız uygulamaları, bunları çalıştıran altyapıyı ve müşteri projelerinin tesliminde kullanılan ortamları kapsar. Gizlilik Politikamızı ve Kullanım Şartlarımızı tamamlar.',
        ),
      ],
    },
    {
      id: 'infrastructure',
      title: 'Altyapı ve barındırma',
      blocks: [
        ul(
          'Hizmetlerimizi, bağımsız olarak denetlenmiş kontrollere sahip güvenilir bulut sağlayıcılarında çalıştırıyoruz; yönetilen PostgreSQL, nesne depolama, uç ağ ve sunucusuz fonksiyonlar dahil.',
          'Üretim ortamları test ve geliştirme ortamlarından ayrıdır. Test verileri, kimlikleri gizlenmedikçe geliştirme ortamına kopyalanmaz.',
          'Altyapı yapılandırma olarak tanımlanır, dağıtımdan önce gözden geçirilir ve üretim değişiklikleri kontrollü bir sürüm sürecini izler.',
          'Statik varlıklar ve tanıtım sitesi, TLS sonlandırması uçta yapılan küresel bir içerik dağıtım ağı üzerinden sunulur.',
        ),
      ],
    },
    {
      id: 'encryption',
      title: 'Şifreleme',
      blocks: [
        ul(
          'Web sitemize, uygulamalarımıza ve API’lerimize tüm trafik TLS ile korunur. Düz HTTP istekleri HTTPS’e yönlendirilir.',
          'Bekleyen veriler, veritabanı ve nesne depolama sağlayıcılarımız tarafından AES tabanlı şifreleme ile şifrelenir.',
          'Yedekler şifrelenir ve birincil veritabanından ayrı bir konumda saklanır.',
          'Şifreler modern ve tuzlanmış bir algoritmayla özetlenir; düz metin olarak asla saklanmaz veya kaydedilmez. Tam ödeme kartı numarası saklamayız.',
          'Sırlar ve API anahtarları yönetilen bir sır deposunda veya şifreli ortam yapılandırmasında tutulur, kaynak kod deposunda tutulmaz.',
        ),
      ],
    },
    {
      id: 'access',
      title: 'Erişim kontrolü',
      blocks: [
        ul(
          'Her ekip üyesi kişiye özel bir hesap kullanır; yönetici sistemlerde paylaşılan giriş bilgilerine izin verilmez.',
          'Kaynak kod yönetimi, bulut konsolları ve üretim yönetimi için çok faktörlü kimlik doğrulama zorunludur.',
          'Rol tabanlı erişim kontrolü ve en az yetki ilkesi, her rolün okuyabileceği veya değiştirebileceği şeyleri sınırlar.',
          'Üretim erişimi talep üzerine, mümkün olduğunda süreli olarak verilir ve denetim kaydına yazılır.',
          'Bir ekip üyesi veya yüklenici projeden ayrıldığında erişim derhal kaldırılır.',
          'Ürünlerimizdeki yönetici işlemleri; işlemi yapan, zaman ve etkilenen kaynakla birlikte kaydedilir.',
        ),
      ],
    },
    {
      id: 'development',
      title: 'Güvenli geliştirme',
      blocks: [
        ul(
          'Kod değişiklikleri birleştirmeden önce akran incelemesinden geçer; bağımlılık güvenlik açıkları ve temel statik analiz için otomatik kontroller çalışır.',
          'Üçüncü taraf paketler sabitlenir, kullanılmadan önce incelenir ve güvenlik sürümleri yayınlandığında güncellenir.',
          'Ortamlar yönetilen süreçlerle yapılandırılır; geliştiriciler kalıcı üretim kimlik bilgilerine sahip olmaz.',
          'Kimlik doğrulama, yetkilendirme, girdi doğrulama ve çıktı kodlama sonradan eklenen unsurlar değil, tasarım gereksinimleri olarak ele alınır.',
          'Müşteri projelerinde keşif aşamasında güvenlik gereksinimleri, hassas sistemler için tehdit modellemesi dahil, tanımlanır.',
        ),
      ],
    },
    {
      id: 'application',
      title: 'Uygulama güvenliği',
      blocks: [
        ul(
          'Kimlik doğrulama güçlü şifre kurallarını, isteğe bağlı sosyal girişi ve oturum süresinin dolmasını destekler. Hassas işlemler uygun olduğunda yeniden kimlik doğrulama gerektirir.',
          'Yetkilendirme yalnızca arayüzde değil sunucuda uygulanır. Satır düzeyi güvenlik, veritabanında kiracı ve kullanıcı verilerini izole eder.',
          'Dosya yüklemeleri tür ve boyut açısından doğrulanır, özel kovalarda saklanır ve süresi dolan imzalı URL’lerle sunulur.',
          'Hız sınırlama, kötüye kullanım tespiti ve spam kontrolleri herkese açık uç noktaları ve mesajlaşma özelliklerini korur.',
          'Medya ve kişisel veriler herkese açık depolama kovaları üzerinden asla sunulmaz.',
        ),
      ],
    },
    {
      id: 'backups',
      title: 'Yedekleme ve dayanıklılık',
      blocks: [
        ul(
          'Veritabanları otomatik bir takvimle ve tanımlı bir saklama penceresiyle yedeklenir.',
          'Geri yükleme prosedürleri belgelenir ve düzenli olarak test edilir; bir yedek ancak başarılı geri yükleme testinden sonra geçerli sayılır.',
          'Kritik hizmetler tek bir bileşenin arızasını tolere edecek şekilde tasarlanır; sağlayıcı desteklediğinde yönetilen yedekleme kullanılır.',
          'Kapasite ve hata oranları izlenir; böylece büyüme veya bozulma kullanıcıları etkilemeden fark edilir.',
        ),
      ],
    },
    {
      id: 'monitoring',
      title: 'İzleme, kayıt ve tespit',
      blocks: [
        ul(
          'Uygulama ve altyapı kayıtları merkezileştirilir; hata artışları, kimlik doğrulama anormallikleri ve olağandışı yönetici etkinlikleri için uyarılar tanımlanır.',
          'Erişim kayıtları uygun bir süre saklanır ve değiştirilmeye karşı korunur.',
          'Bağımlılık ve yapılandırma güvenlik açıkları izlenir ve önem derecesine göre giderilir.',
          'Açık uç noktalar, izinler ve üçüncü taraf entegrasyonlar için düzenli incelemeler yaparız.',
        ),
      ],
    },
    {
      id: 'vendors',
      title: 'Tedarikçiler ve alt işleyenler',
      blocks: [
        p(
          'Sağlayıcıları kullanmadan önce değerlendirir, bağımsız güvenlik sertifikaları olanları tercih eder ve gizlilik ile veri koruma taahhütlerini yazılı olarak talep ederiz. Güncel alt işleyenler ve amaçları Alt İşleyenler sayfasında listelenir.',
        ),
        p(
          'Bir sağlayıcı verilerimizi etkileyen bir olay yaşarsa, bildirim açısından bunu kendi olayımız olarak ele alır ve etkilenen müşterileri gecikmeksizin bilgilendiririz.',
        ),
      ],
    },
    {
      id: 'incident',
      title: 'Olay müdahalesi',
      blocks: [
        p(
          'Belgelenmiş bir olay müdahale sürecimiz vardır: tespit, triyaj, sınırlama, giderme, kurtarma ve öğrenme. Müdahaleyi ve iletişimi belirlenmiş bir sorumlu koordine eder.',
        ),
        ul(
          'Şüpheli olaylar derhal incelenir ve önem derecesi gizlilik, bütünlük ve erişilebilirlik üzerindeki etkiye göre değerlendirilir.',
          'Kişisel veri ihlalinin kişiler için risk doğurması muhtemelse, yetkili denetim makamını gecikmeksizin ve yasal süre içinde bilgilendiririz.',
          'Etkilenen kişiler ve müşteriler kanun veya sözleşmenin gerektirdiği durumlarda neler olduğu ve ne yaptığımızın açıklamasıyla bilgilendirilir.',
          'Çözüm sonrası bir olay sonrası inceleme tamamlar ve sorumlu ile tarih atanmış düzeltici adımlar uygularız.',
        ),
        p(
          'Güvenlik bildirimleri security@litxtech.com adresine memnuniyetle kabul edilir. Bildirimi teyit eder, iyi niyetle inceler ve sorumlu davranan iyi niyetli araştırmacıların peşine düşmeyiz.',
        ),
      ],
    },
    {
      id: 'responsibilities',
      title: 'Müşteri ve kullanıcı sorumlulukları',
      blocks: [
        ul(
          'Güçlü ve benzersiz giriş bilgileri seçin ve mümkün olduğunda çok faktörlü kimlik doğrulamayı açın.',
          'Hesapları, API anahtarlarını veya erişim belirteçlerini paylaşmayın; açığa çıktığından şüphelenirseniz bunları yenileyin.',
          'Cihazları, tarayıcıları ve işletim sistemlerini güncel tutun.',
          'Kötü amaçlı yazılım, hukuka aykırı içerik veya işleme yetkiniz olmayan verileri yüklemeyin.',
          'Şüpheli güvenlik açıklarını veya yetkisiz erişimi derhal security@litxtech.com adresine bildirin.',
          'Müşteri projelerinde, kontrollerin veri hassasiyetine uygun olması için keşif aşamasında veri sınıflandırması ve saklama gereksinimlerini tanımlayın.',
        ),
      ],
    },
    {
      id: 'compliance',
      title: 'Uyum ve güvence',
      blocks: [
        p(
          'Kontrollerimiz; GDPR, Birleşik Krallık GDPR, KVKK, CCPA/CPRA güvenlik gereksinimlerini ve Apple App Store ile Google Play’in teknik gereksinimlerini destekleyecek şekilde tasarlanmıştır.',
        ),
        p(
          'Talep üzerine ve gizlilik sözleşmesi kapsamında güvenlik özeti sağlayabilir, tedarikçi güvenlik formunu yanıtlayabilir, veri akışlarımızı ve alt işleyenlerimizi açıklayabilir veya burada anlatılan kontrollerin kanıtlarıyla müşteri denetimini destekleyebiliriz. Sahip olmadığımız sertifikaları iddia etmiyoruz.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'İletişim',
      blocks: [
        p(
          'Güvenlik soruları: security@litxtech.com. Gizlilik ve veri koruma: support@litxtech.com. Güvenlik bildirimlerini 2 iş günü içinde teyit etmeyi hedefliyoruz.',
        ),
      ],
    },
  ],
}

export const dataSecurityPolicy: LegalDocSet = { en, tr }
