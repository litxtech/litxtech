import { p, sub, ul, type LegalDocSet } from './types'

const UPDATED_EN = '23 November 2026'
const UPDATED_TR = '23 Kasım 2026'

const en = {
  eyebrow: 'Privacy Policy',
  title: 'Privacy Policy',
  summary:
    'This policy explains how LitxTech LLC collects, uses, shares, retains and protects personal data when you visit our website, use our applications, buy our software products or work with us on a software project. It is written to be read without a legal background.',
  version: 'Version 3.0',
  effective: UPDATED_EN,
  updated: UPDATED_EN,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      blocks: [
        p(
          'LitxTech LLC ("LitxTech", "we", "us") is a software company registered in Wyoming, United States. We design, build, sell and operate websites, mobile applications, SaaS products and custom enterprise software. For the purposes of the EU General Data Protection Regulation (GDPR), the UK GDPR and the Turkish Personal Data Protection Law (KVKK), LitxTech LLC is the data controller for the processing described in this policy, except where we explicitly state that we act as a processor on behalf of a client.',
        ),
        p(
          'You can reach our privacy team at support@litxtech.com. Postal and billing enquiries can be sent to the same address, and we will forward them to the relevant department.',
        ),
        p(
          'We do not sell personal data, we do not use it for cross-context behavioural advertising, and we do not require you to create an account simply to read our website.',
        ),
      ],
    },
    {
      id: 'scope',
      title: 'Scope of this policy',
      blocks: [
        p('This policy applies to all personal data we process in connection with the following activities:'),
        ul(
          'Visiting and browsing litxtech.com, including our marketing pages, project case studies, pricing pages and support pages.',
          'Using any application, mobile app or digital product that we publish or operate.',
          'Purchasing software, licences, subscriptions, support plans or hosting capacity from us.',
          'Contacting us through our website forms, live chat, e-mail, WhatsApp or social media channels.',
          'Engaging us for a custom software project, from discovery and design through build, launch and maintenance.',
          'Applying for a role, a partnership or a vendor relationship with us.',
        ),
        p(
          'It does not apply to third-party websites, app stores or services that we link to but do not control. Those services publish their own privacy notices, and we recommend that you read them before providing personal data.',
        ),
      ],
    },
    {
      id: 'definitions',
      title: 'Key terms used in this policy',
      blocks: [
        ul(
          '"Personal data" means any information relating to an identified or identifiable natural person.',
          '"Processing" means any operation performed on personal data, such as collecting, storing, using, sharing, correcting or deleting it.',
          '"Controller" means the organisation that decides why and how personal data is processed. LitxTech LLC is the controller for this website and our own products.',
          '"Processor" means an organisation that processes personal data on behalf of, and on the instructions of, a controller. We act as a processor for client projects.',
          '"Subprocessor" means a third-party provider that we engage to help deliver our services, such as hosting, e-mail or payment processing.',
          '"Services" means our website, applications, software products, subscriptions and professional software development services.',
        ),
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      blocks: [
        p(
          'The categories of data we collect depend on how you interact with us. We try to collect only what is necessary for the purpose at hand.',
        ),
        sub(
          '1. Website visitors',
          ul(
            'Technical data such as IP address, browser type and version, operating system, device type, screen size, referring URL and the pages you requested.',
            'Approximate location derived from your IP address, at city or country level, used for language selection and abuse prevention.',
            'Your language preference (English or Turkish), which we store in a cookie and in your browser storage so the site opens in the language you chose.',
            'Cookie consent choices and analytics identifiers, only when you accept analytics cookies.',
            'Messages you send through contact forms, project request forms, live chat, WhatsApp links or e-mail.',
          ),
        ),
        sub(
          '2. Prospective and current clients',
          ul(
            'Name, surname, job title, company name, e-mail address, telephone number and country.',
            'Project requirements, budgets, timelines, technical constraints, reference documents and meeting notes.',
            'Contract details, billing contact, tax identifiers and purchase order references.',
            'Correspondence with our sales, delivery and support teams.',
          ),
        ),
        sub(
          '3. End users of our applications',
          ul(
            'Account information such as name, e-mail address, sign-in method (e-mail and password, Google or Apple) and profile picture.',
            'Content you create inside an application, such as posts, messages, photos, events, listings or preferences.',
            'Subscription and purchase status, without full payment card numbers.',
            'Notification tokens, device identifiers and app version, used to deliver push notifications and to diagnose crashes.',
            'Support requests, reports you submit and, where an application offers it, moderation related records.',
          ),
        ),
        sub(
          '4. Project and client data',
          p(
            'When we build or maintain software for a client, we may access data held in that client system, such as test accounts, imported sample records or production data required for a migration, an integration or a support case. In these situations the client is the controller and we act as the processor, only on documented instructions and under the terms of the applicable data processing agreement.',
          ),
        ),
        sub(
          '5. Candidates, partners and suppliers',
          ul(
            'CVs, portfolio links, references, interview notes and assessment results.',
            'Business contact details and due-diligence information for partners and vendors.',
          ),
        ),
        sub(
          '6. Data we do not want',
          p(
            'Please do not send us special category data (for example health data, religious beliefs, biometric data or trade union membership), government identifiers, or another person’s personal data unless we have specifically asked for it and you have a lawful basis to share it.',
          ),
        ),
      ],
    },
    {
      id: 'how-we-collect',
      title: 'How we collect information',
      blocks: [
        ul(
          'Directly from you, when you fill in a form, send an e-mail, talk to us on a call, message us on WhatsApp or interact with live chat.',
          'Automatically, through server logs, cookies and analytics when you browse our website or use our applications.',
          'From your device, such as push notification tokens, app version and crash reports.',
          'From third parties, such as Google or Apple when you choose social sign-in, payment providers when they confirm a transaction, and app stores when they report subscription status.',
          'From public or professional sources, such as your company website or a professional network, when we assess a business enquiry.',
        ),
        p(
          'We do not buy personal data from data brokers and we do not scrape personal profiles to build marketing lists.',
        ),
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal bases for processing',
      blocks: [
        p(
          'Where the GDPR, the UK GDPR or the KVKK applies, we rely on the following legal bases. We identify the basis that applies to each activity, and we do not reuse data for an incompatible purpose.',
        ),
        ul(
          'Contract: to prepare a proposal, deliver a project, provide software you purchased, operate your account and handle billing.',
          'Legitimate interests: to secure and improve our services, prevent fraud and abuse, respond to business enquiries and maintain business records, always balanced against your rights.',
          'Consent: to send marketing e-mails to individuals, to set non-essential cookies and to enable optional features such as analytics, when consent is required.',
          'Legal obligation: to keep invoices and tax records, to respond to lawful requests and to comply with consumer protection rules.',
          'Vital interests or public interest: only in the rare situations where the law requires us to act to protect someone.',
        ),
        p(
          'Where we rely on consent you can withdraw it at any time. Withdrawal does not affect processing that took place before the withdrawal.',
        ),
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use information',
      blocks: [
        ul(
          'Provide, operate and maintain our website, applications and products.',
          'Respond to enquiries, prepare proposals and manage projects from kick-off to launch and maintenance.',
          'Create and manage accounts, authenticate users and keep sessions secure.',
          'Process payments, issue invoices, manage subscriptions and handle refunds.',
          'Deliver push notifications, service messages and security alerts that you have enabled or that are necessary for the service.',
          'Monitor performance, diagnose errors, fix bugs and improve usability.',
          'Detect, investigate and prevent fraud, spam, abuse and security incidents.',
          'Comply with legal, tax, accounting and regulatory obligations, and enforce our terms.',
          'Send marketing communications where we have a lawful basis, and measure whether they are useful.',
        ),
        p(
          'We do not make decisions with legal or similarly significant effects about you through automated processing alone. Where an application offers AI-assisted features, those outputs are assistive and you remain in control of the final decision.',
        ),
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies, analytics and similar technologies',
      blocks: [
        p(
          'We use a small number of cookies and similar storage technologies. Strictly necessary cookies keep the site working and remember your language and session. Analytics cookies are optional and are only set when you accept them in our cookie banner.',
        ),
        ul(
          'Essential: language preference, session integrity, load balancing and security. These cannot be switched off without breaking the site.',
          'Analytics: aggregated page views and performance measurements that help us understand which content is useful. These are disabled until you consent.',
          'No advertising cookies: we do not run third-party advertising or cross-site tracking pixels on our website.',
        ),
        p(
          'You can clear or block cookies in your browser settings at any time. Blocking essential cookies may prevent parts of the site from working. You can also change your analytics choice through the cookie banner whenever it is shown.',
        ),
      ],
    },
    {
      id: 'payments',
      title: 'Payments and billing data',
      blocks: [
        p(
          'Payments are processed by regulated payment providers and, for mobile purchases, by the Apple App Store or Google Play. We receive confirmation that a payment succeeded, the amount, currency, the last four digits of the card or the store transaction identifier, and the billing country. We never receive or store full card numbers, security codes or bank credentials.',
        ),
        p(
          'We keep invoices and accounting records as required by tax law. Billing contact details may be shared with our accountants and with the payment provider strictly to process the transaction and to meet those obligations.',
        ),
      ],
    },
    {
      id: 'ai',
      title: 'Artificial intelligence features',
      blocks: [
        p(
          'Some of our products and internal tools include AI-assisted features, such as drafting text, summarising content or answering questions. When you use them, the content you submit may be sent to a model provider for processing.',
        ),
        ul(
          'We configure integrations to avoid using your data to train third-party foundation models where the provider offers that control.',
          'We minimise what is sent, prefer aggregated or redacted inputs, and avoid sending special category data.',
          'AI output can be inaccurate. It is assistive information, not professional advice, and it should be reviewed before you rely on it.',
          'Where an AI feature is optional, you can choose not to use it and continue with the rest of the product.',
        ),
      ],
    },
    {
      id: 'sharing',
      title: 'When we share information',
      blocks: [
        p(
          'We share personal data only where there is a clear need and appropriate safeguards. The categories of recipients are:',
        ),
        ul(
          'Hosting and infrastructure providers that run our website, databases and application back ends.',
          'E-mail, support desk and communication providers that deliver messages and manage tickets.',
          'Payment processors, app stores and accounting providers that handle billing.',
          'Analytics providers, only where you have accepted analytics cookies.',
          'AI model providers, only when you actively use an AI-assisted feature.',
          'Professional advisers such as lawyers, auditors and insurers, under confidentiality obligations.',
          'Group companies and contractors who help us deliver a project, bound by confidentiality and data protection terms.',
          'Authorities, courts or regulators, where we are legally required to disclose, or where disclosure is necessary to establish or defend a legal claim.',
        ),
        p(
          'A current list of the subprocessors we rely on is published on our Subprocessors page. We do not sell personal data, and we do not share it with advertisers or data brokers.',
        ),
        p(
          'If we are involved in a merger, acquisition, financing or sale of assets, personal data may be transferred as part of that transaction. We will require the recipient to honour this policy and we will notify you where the law requires it.',
        ),
      ],
    },
    {
      id: 'transfers',
      title: 'International data transfers',
      blocks: [
        p(
          'We are based in the United States and we work with providers and clients in several countries, including the United Kingdom, the European Union and Turkey. Personal data may therefore be processed outside the country where you live.',
        ),
        ul(
          'Where data leaves the European Economic Area or the United Kingdom, we rely on an adequacy decision or on Standard Contractual Clauses approved by the European Commission or the UK Information Commissioner.',
          'Where data is transferred from Turkey, we rely on the mechanisms recognised under the KVKK, including explicit consent where that is the applicable route.',
          'We review transfers periodically and apply additional technical measures, such as encryption and access controls, where a transfer risk assessment requires them.',
        ),
        p(
          'You can request more information about the safeguards that apply to a specific transfer by writing to support@litxtech.com.',
        ),
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      blocks: [
        p(
          'We keep personal data only as long as we need it for the purpose it was collected for, or as long as the law requires. Our standard retention periods are:',
        ),
        ul(
          'Website enquiries and proposals that do not become projects: up to 24 months from the last contact.',
          'Client project records, contracts and deliverables: for the duration of the relationship plus the statutory limitation period.',
          'Invoices and tax records: for the period required by applicable tax law, typically 7 to 10 years.',
          'Application account data: until you delete your account, then removed or anonymised within 30 days unless a legal exception applies.',
          'Support tickets and correspondence: up to 36 months after the case is closed.',
          'Server logs and security records: typically 30 to 180 days, longer where an investigation is ongoing.',
          'Recruitment records: up to 12 months after the process ends, unless you ask us to keep them longer.',
        ),
        p(
          'When a retention period ends, we delete the data or irreversibly anonymise it so that it can no longer be linked to you. Backups are rotated on a fixed schedule and are not used for any other purpose.',
        ),
      ],
    },
    {
      id: 'security',
      title: 'How we protect information',
      blocks: [
        p('We apply technical and organisational measures that are appropriate to the sensitivity of the data:'),
        ul(
          'Encryption in transit using TLS for all website, application and API traffic.',
          'Encryption at rest for databases, object storage and backups where the provider supports it.',
          'Role-based access control, the principle of least privilege and individual named accounts for our team.',
          'Multi-factor authentication on administrative and production systems.',
          'Separation of production, staging and development environments, with production access logged.',
          'Monitoring, alerting and periodic review of dependencies and security updates.',
          'Secure development practices, including code review, secret management and dependency scanning.',
          'Written confidentiality commitments for team members and contractors, and incident response procedures.',
        ),
        p(
          'No system can be completely secure. If a personal data breach is likely to result in a risk to your rights, we will notify the relevant supervisory authority and affected individuals without undue delay, as required by law. You should also protect your own account by using a strong, unique password and enabling two-factor authentication where it is offered.',
        ),
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      blocks: [
        p(
          'Depending on where you live, you may have some or all of the following rights. We honour these requests for everyone who contacts us, regardless of jurisdiction.',
        ),
        ul(
          'Access: confirm whether we process your personal data and receive a copy.',
          'Rectification: correct inaccurate or incomplete data.',
          'Erasure: ask us to delete data that we no longer have a lawful reason to keep.',
          'Restriction: ask us to limit processing while a question is resolved.',
          'Portability: receive structured, machine-readable data you provided to us, or have it sent to another provider where technically feasible.',
          'Objection: object to processing based on legitimate interests, and object at any time to direct marketing.',
          'Withdrawal of consent: withdraw consent for cookie-based analytics or marketing at any time.',
          'Non-discrimination: we will not treat you differently for exercising your rights.',
          'Authorised agents: in California and similar regimes, you may use an authorised agent to submit a request, subject to verification.',
        ),
        p(
          'To exercise a right, e-mail support@litxtech.com with enough detail for us to identify you and your request. We respond within 30 days and may extend that period once where a request is complex, telling you why. We may ask for limited verification information to protect your data, and we will never charge a fee for a reasonable request.',
        ),
        p(
          'If you are not satisfied with our response you can complain to your local supervisory authority, for example the Information Commissioner’s Office in the United Kingdom, your national data protection authority in the European Union, or the Personal Data Protection Authority (KVKK) in Turkey. We would appreciate the chance to resolve the issue with you first.',
        ),
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing communications',
      blocks: [
        p(
          'We send product news, case studies and occasional service updates. Where the law requires consent, we ask for it before adding you to a marketing list, and every message includes an unsubscribe link. We do not rent or sell our mailing list.',
        ),
        p(
          'Transactional and service messages, such as invoices, security alerts, password resets and essential product notices, are not marketing and cannot be unsubscribed from while you have an active account or contract.',
        ),
      ],
    },
    {
      id: 'children',
      title: 'Children’s privacy',
      blocks: [
        p(
          'Our website, business services and enterprise products are intended for organisations and adults. We do not knowingly collect personal data from children under 13, or under the higher minimum age that applies in your country, through our business services.',
        ),
        p(
          'Some of our consumer applications, such as community or city applications, may be used by teenagers. Those applications publish their own age requirements and parental guidance in the app store listing and in the application specific policy. If we learn that a child’s data was collected in breach of the applicable minimum age, we delete it and close the account. A parent or guardian can contact support@litxtech.com to request removal.',
        ),
      ],
    },
    {
      id: 'apps',
      title: 'Application-specific notices and app stores',
      blocks: [
        p(
          'Each application that we publish has a dedicated privacy notice that describes the exact permissions, data categories and retention rules for that product. Where a product notice conflicts with this policy, the product notice applies to that product. All product notices are linked from our Legal page.',
        ),
        ul(
          'Apple App Store and Google Play independently process data connected to downloads, purchases and store analytics under their own privacy policies.',
          'In-app purchases and subscriptions are billed by the store, and cancellation is managed in your store account settings.',
          'If you install an application on a device managed by your employer, your employer may have additional visibility and policies that we do not control.',
        ),
      ],
    },
    {
      id: 'client-data',
      title: 'Client and project data: our role as processor',
      blocks: [
        p(
          'When we deliver a software project we usually process data that belongs to our client and to that client’s users. In that role we act as a processor, and the client decides the purposes and the retention. We process that data only on documented instructions, apply the security measures described above, keep it confidential, and help the client respond to data subject requests.',
        ),
        p(
          'We sign data processing agreements, confidentiality agreements and, where required, standard contractual clauses. We do not use client production data for our own marketing, for model training or for any purpose unrelated to the project. On termination we return or delete client data in line with the contract, except for copies that must be retained by law.',
        ),
        p(
          'If you are a user of a product that we built for a client, the client is the controller of your data and you should contact them first. We will support them in handling your request.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        p(
          'We review this policy when our services, providers or legal obligations change. The current version is always published at litxtech.com/privacy-policy with its version number, effective date and last-updated date.',
        ),
        p(
          'If a change materially affects how we use personal data, we will provide reasonable notice, for example by e-mail to account holders or by a prominent notice on the website, before the change takes effect. Continuing to use our services after the effective date means you accept the updated policy.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      blocks: [
        p(
          'For any question about this policy, a data protection request, a security report or a complaint, contact LitxTech LLC at support@litxtech.com. Please include the product or project you are writing about so we can route your message quickly.',
        ),
        p(
          'We aim to acknowledge privacy requests within 3 business days and to resolve them within the statutory deadline. If you are a client with a signed agreement, the contact details in that agreement take precedence for contractual notices.',
        ),
      ],
    },
  ],
}

const tr = {
  eyebrow: 'Gizlilik Politikası',
  title: 'Gizlilik Politikası',
  summary:
    'Bu politika; LitxTech LLC’nin web sitemizi ziyaret ettiğinizde, uygulamalarımızı kullandığınızda, yazılım ürünlerimizi satın aldığınızda veya bizimle bir yazılım projesinde çalıştığınızda kişisel verileri nasıl topladığını, kullandığını, paylaştığını, sakladığını ve koruduğunu açıklar. Hukuk bilgisi gerektirmeden anlaşılacak şekilde yazılmıştır.',
  version: 'Sürüm 3.0',
  effective: UPDATED_TR,
  updated: UPDATED_TR,
  sections: [
    {
      id: 'who-we-are',
      title: 'Biz kimiz',
      blocks: [
        p(
          'LitxTech LLC ("LitxTech", "biz"), Amerika Birleşik Devletleri’nin Wyoming eyaletinde kurulmuş bir yazılım şirketidir. Web siteleri, mobil uygulamalar, SaaS ürünleri ve kuruma özel kurumsal yazılımlar tasarlıyor, geliştiriyor, satıyor ve işletiyoruz. Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR), Birleşik Krallık GDPR ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) bakımından, açıkça bir müşteri adına veri işleyen taraf olduğumuzu belirtmediğimiz sürece bu politikada anlatılan işlemeler için veri sorumlusu LitxTech LLC’dir.',
        ),
        p(
          'Gizlilik ekibimize support@litxtech.com adresinden ulaşabilirsiniz. Posta ve faturalama talepleriniz için de aynı adresi kullanabilirsiniz; ilgili birime iletiyoruz.',
        ),
        p(
          'Kişisel verileri satmıyoruz, bağlamlar arası davranışsal reklamcılık için kullanmıyoruz ve yalnızca web sitemizi okumanız için sizden hesap oluşturmanızı istemiyoruz.',
        ),
      ],
    },
    {
      id: 'scope',
      title: 'Politikanın kapsamı',
      blocks: [
        p('Bu politika, aşağıdaki faaliyetlerle bağlantılı olarak işlediğimiz tüm kişisel veriler için geçerlidir:'),
        ul(
          'litxtech.com sitesini ziyaret etmek ve gezmek; tanıtım sayfaları, proje örnekleri, paket ve fiyat sayfaları ile destek sayfaları dahil.',
          'Yayınladığımız veya işlettiğimiz herhangi bir uygulamayı, mobil uygulamayı veya dijital ürünü kullanmak.',
          'Bizden yazılım, lisans, abonelik, destek paketi veya barındırma kapasitesi satın almak.',
          'Web sitemizdeki formlar, canlı destek, e-posta, WhatsApp veya sosyal medya kanalları üzerinden bizimle iletişime geçmek.',
          'Keşif ve tasarımdan geliştirme, yayına alma ve bakıma kadar bizimle özel bir yazılım projesinde çalışmak.',
          'Bizde bir pozisyon, iş ortaklığı veya tedarikçi ilişkisi için başvurmak.',
        ),
        p(
          'Bağlantı verdiğimiz ancak kontrol etmediğimiz üçüncü taraf web siteleri, uygulama mağazaları veya hizmetler bu politikanın kapsamı dışındadır. Bu hizmetler kendi gizlilik bildirimlerini yayınlar; kişisel veri paylaşmadan önce onları okumanızı öneririz.',
        ),
      ],
    },
    {
      id: 'definitions',
      title: 'Bu politikadaki temel kavramlar',
      blocks: [
        ul(
          '"Kişisel veri", kimliği belirli veya belirlenebilir bir gerçek kişiyle ilişkili her türlü bilgidir.',
          '"İşleme", kişisel veriler üzerinde gerçekleştirilen toplama, saklama, kullanma, paylaşma, düzeltme veya silme gibi her türlü işlemdir.',
          '"Veri sorumlusu", kişisel verilerin neden ve nasıl işleneceğine karar veren kuruluştur. Bu web sitesi ve kendi ürünlerimiz için veri sorumlusu LitxTech LLC’dir.',
          '"Veri işleyen", kişisel verileri bir veri sorumlusu adına ve onun talimatlarıyla işleyen kuruluştur. Müşteri projelerinde veri işleyen taraf biziz.',
          '"Alt işleyen", hizmetlerimizi sunmamıza yardımcı olmak için anlaştığımız barındırma, e-posta veya ödeme gibi üçüncü taraf sağlayıcıdır.',
          '"Hizmetler", web sitemizi, uygulamalarımızı, yazılım ürünlerimizi, aboneliklerimizi ve profesyonel yazılım geliştirme hizmetlerimizi ifade eder.',
        ),
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Topladığımız bilgiler',
      blocks: [
        p(
          'Topladığımız veri kategorileri bizimle nasıl etkileşim kurduğunuza göre değişir. Yalnızca eldeki amaç için gerekli olan verileri toplamaya özen gösteriyoruz.',
        ),
        sub(
          '1. Web sitesi ziyaretçileri',
          ul(
            'IP adresi, tarayıcı türü ve sürümü, işletim sistemi, cihaz türü, ekran boyutu, yönlendiren adres ve talep ettiğiniz sayfalar gibi teknik veriler.',
            'Dil seçimi ve kötüye kullanımın önlenmesi amacıyla IP adresinizden türetilen, şehir veya ülke düzeyinde yaklaşık konum.',
            'Seçtiğiniz dilde açılması için çerezde ve tarayıcı depolamasında sakladığımız dil tercihiniz (İngilizce veya Türkçe).',
            'Yalnızca analiz çerezlerini kabul ettiğinizde kullanılan çerez onayı tercihleri ve analiz tanımlayıcıları.',
            'İletişim formları, proje talep formları, canlı destek, WhatsApp bağlantıları veya e-posta yoluyla gönderdiğiniz mesajlar.',
          ),
        ),
        sub(
          '2. Potansiyel ve mevcut müşteriler',
          ul(
            'Ad, soyad, görev unvanı, şirket adı, e-posta adresi, telefon numarası ve ülke.',
            'Proje gereksinimleri, bütçe, takvim, teknik kısıtlar, referans belgeler ve toplantı notları.',
            'Sözleşme bilgileri, fatura iletişimi, vergi kimlik bilgileri ve satın alma siparişi referansları.',
            'Satış, proje ve destek ekiplerimizle yazışmalar.',
          ),
        ),
        sub(
          '3. Uygulamalarımızın son kullanıcıları',
          ul(
            'Ad, e-posta adresi, giriş yöntemi (e-posta ve şifre, Google veya Apple) ve profil fotoğrafı gibi hesap bilgileri.',
            'Uygulama içinde oluşturduğunuz gönderiler, mesajlar, fotoğraflar, etkinlikler, ilanlar veya tercihler gibi içerikler.',
            'Tam kart numarası olmaksızın abonelik ve satın alma durumu.',
            'Bildirim göndermek ve çökmeleri teşhis etmek için kullanılan bildirim belirteçleri, cihaz tanımlayıcıları ve uygulama sürümü.',
            'Destek talepleri, gönderdiğiniz bildirimler ve uygulamanın sunduğu durumlarda moderasyonla ilgili kayıtlar.',
          ),
        ),
        sub(
          '4. Proje ve müşteri verileri',
          p(
            'Bir müşteri için yazılım geliştirdiğimizde veya bakımını yaptığımızda, o müşteri sistemindeki test hesapları, aktarılan örnek kayıtlar veya taşıma, entegrasyon ya da destek için gereken canlı veriler gibi verilere erişebiliriz. Bu durumlarda veri sorumlusu müşteridir; biz yalnızca yazılı talimatlarla ve yürürlükteki veri işleme sözleşmesi hükümlerine göre veri işleyen olarak hareket ederiz.',
          ),
        ),
        sub(
          '5. Adaylar, iş ortakları ve tedarikçiler',
          ul(
            'Özgeçmişler, portföy bağlantıları, referanslar, görüşme notları ve değerlendirme sonuçları.',
            'İş ortakları ve tedarikçiler için ticari iletişim bilgileri ve durum tespiti bilgileri.',
          ),
        ),
        sub(
          '6. Toplamak istemediğimiz veriler',
          p(
            'Özellikle talep etmediğimiz ve paylaşmak için hukuki bir dayanağınız yoksa lütfen bize özel nitelikli kişisel veri (sağlık, dini inanç, biyometrik veri veya sendika üyeliği gibi), resmi kimlik numarası ya da başka bir kişinin kişisel verilerini göndermeyin.',
          ),
        ),
      ],
    },
    {
      id: 'how-we-collect',
      title: 'Bilgileri nasıl topluyoruz',
      blocks: [
        ul(
          'Doğrudan sizden: bir form doldurduğunuzda, e-posta gönderdiğinizde, bizimle telefonla görüştüğünüzde, WhatsApp’tan yazdığınızda veya canlı destekle etkileşime girdiğinizde.',
          'Otomatik olarak: web sitemizde gezinirken veya uygulamalarımızı kullanırken sunucu kayıtları, çerezler ve analiz araçları aracılığıyla.',
          'Cihazınızdan: bildirim belirteçleri, uygulama sürümü ve çökme raporları gibi bilgiler aracılığıyla.',
          'Üçüncü taraflardan: sosyal giriş seçtiğinizde Google veya Apple’dan, bir işlemi onayladığında ödeme sağlayıcısından, abonelik durumunu bildirdiğinde uygulama mağazalarından.',
          'Kamusal veya mesleki kaynaklardan: bir iş talebini değerlendirirken şirket web siteniz veya mesleki bir ağ gibi kaynaklardan.',
        ),
        p(
          'Veri simsarlarından kişisel veri satın almıyoruz ve pazarlama listesi oluşturmak için kişisel profilleri kazımıyoruz.',
        ),
      ],
    },
    {
      id: 'legal-bases',
      title: 'İşlemenin hukuki dayanakları',
      blocks: [
        p(
          'GDPR, Birleşik Krallık GDPR veya KVKK’nın uygulandığı durumlarda aşağıdaki hukuki dayanaklara başvuruyoruz. Her faaliyet için geçerli dayanağı belirliyor ve verileri bununla bağdaşmayan bir amaç için yeniden kullanmıyoruz.',
        ),
        ul(
          'Sözleşme: teklif hazırlamak, proje yürütmek, satın aldığınız yazılımı sunmak, hesabınızı işletmek ve faturalamayı yürütmek için.',
          'Meşru menfaat: hizmetlerimizi güvenli ve iyileştirilmiş tutmak, sahtekârlık ve kötüye kullanımı önlemek, iş taleplerine yanıt vermek ve ticari kayıtları tutmak için; her zaman haklarınızla dengelenerek.',
          'Açık rıza: gerçek kişilere pazarlama e-postası göndermek, zorunlu olmayan çerezleri yerleştirmek ve rıza gerektiğinde analiz gibi isteğe bağlı özellikleri etkinleştirmek için.',
          'Hukuki yükümlülük: fatura ve vergi kayıtlarını tutmak, hukuka uygun taleplere yanıt vermek ve tüketici koruma kurallarına uymak için.',
          'Hayati menfaat veya kamu yararı: yalnızca kanunun birini korumak için harekete geçmemizi gerektirdiği ender durumlarda.',
        ),
        p(
          'Rızaya dayandığımız durumlarda rızanızı her zaman geri çekebilirsiniz. Geri çekme, geri çekmeden önce gerçekleşen işlemeyi etkilemez.',
        ),
      ],
    },
    {
      id: 'how-we-use',
      title: 'Bilgileri nasıl kullanıyoruz',
      blocks: [
        ul(
          'Web sitemizi, uygulamalarımızı ve ürünlerimizi sunmak, işletmek ve sürdürmek.',
          'Talepleri yanıtlamak, teklif hazırlamak ve projeleri başlangıçtan yayına ve bakıma kadar yönetmek.',
          'Hesap oluşturmak ve yönetmek, kullanıcıları doğrulamak ve oturumları güvenli tutmak.',
          'Ödemeleri işlemek, fatura kesmek, abonelikleri yönetmek ve iadeleri gerçekleştirmek.',
          'Etkinleştirdiğiniz veya hizmet için gerekli olan bildirimleri, hizmet mesajlarını ve güvenlik uyarılarını iletmek.',
          'Performansı izlemek, hataları teşhis etmek, düzeltmek ve kullanılabilirliği iyileştirmek.',
          'Sahtekârlık, spam, kötüye kullanım ve güvenlik olaylarını tespit etmek, incelemek ve önlemek.',
          'Vergi, muhasebe ve düzenleyici yükümlülükler ile sözleşmelerimizi uygulamak dahil hukuki yükümlülüklere uymak.',
          'Hukuki dayanağımız olduğu durumlarda pazarlama iletişimi göndermek ve bunun faydalı olup olmadığını ölçmek.',
        ),
        p(
          'Sizin hakkınızda yalnızca otomatik işlemeye dayanarak hukuki veya benzer şekilde önemli sonuçlar doğuran kararlar almıyoruz. Bir uygulama yapay zekâ destekli özellikler sunduğunda bu çıktılar yardımcı niteliktedir ve nihai karar sizde kalır.',
        ),
      ],
    },
    {
      id: 'cookies',
      title: 'Çerezler, analiz ve benzeri teknolojiler',
      blocks: [
        p(
          'Az sayıda çerez ve benzeri depolama teknolojisi kullanıyoruz. Zorunlu çerezler sitenin çalışmasını sağlar, dilinizi ve oturumunuzu hatırlar. Analiz çerezleri isteğe bağlıdır ve yalnızca çerez bildiriminde kabul ettiğinizde yerleştirilir.',
        ),
        ul(
          'Zorunlu: dil tercihi, oturum bütünlüğü, yük dengeleme ve güvenlik. Siteyi bozmadan kapatılamazlar.',
          'Analiz: hangi içeriğin faydalı olduğunu anlamamıza yardımcı olan toplu sayfa görüntüleme ve performans ölçümleri. Onay verene kadar kapalıdır.',
          'Reklam çerezi yok: web sitemizde üçüncü taraf reklam veya siteler arası izleme pikseli kullanmıyoruz.',
        ),
        p(
          'Tarayıcı ayarlarınızdan çerezleri istediğiniz zaman temizleyebilir veya engelleyebilirsiniz. Zorunlu çerezleri engellemek sitenin bazı bölümlerinin çalışmasını engelleyebilir. Çerez bildirimi her gösterildiğinde analiz tercihinizi değiştirebilirsiniz.',
        ),
      ],
    },
    {
      id: 'payments',
      title: 'Ödeme ve faturalama verileri',
      blocks: [
        p(
          'Ödemeler düzenlemeye tabi ödeme sağlayıcıları ve mobil satın alımlarda Apple App Store veya Google Play tarafından işlenir. Bize ödemenin başarılı olduğu bilgisi, tutar, para birimi, kartın son dört hanesi veya mağaza işlem kimliği ve fatura ülkesi ulaşır. Tam kart numarası, güvenlik kodu veya banka bilgilerini hiçbir zaman almayız veya saklamayız.',
        ),
        p(
          'Fatura ve muhasebe kayıtlarını vergi hukukunun gerektirdiği şekilde saklarız. Fatura iletişim bilgileri, yalnızca işlemi gerçekleştirmek ve bu yükümlülükleri yerine getirmek amacıyla mali müşavirlerimiz ve ödeme sağlayıcısıyla paylaşılabilir.',
        ),
      ],
    },
    {
      id: 'ai',
      title: 'Yapay zekâ özellikleri',
      blocks: [
        p(
          'Bazı ürünlerimizde ve iç araçlarımızda metin taslağı oluşturma, içerik özetleme veya soruları yanıtlama gibi yapay zekâ destekli özellikler bulunur. Bunları kullandığınızda gönderdiğiniz içerik işlenmek üzere bir model sağlayıcısına iletilebilir.',
        ),
        ul(
          'Sağlayıcı bu kontrolü sunduğunda, verilerinizin üçüncü taraf temel modelleri eğitmek için kullanılmamasını sağlayacak şekilde yapılandırıyoruz.',
          'Gönderilen veriyi en aza indiriyor, toplulaştırılmış veya maskelenmiş girdileri tercih ediyor ve özel nitelikli veri göndermekten kaçınıyoruz.',
          'Yapay zekâ çıktısı hatalı olabilir. Profesyonel tavsiye değil, yardımcı bilgidir; dayanmadan önce gözden geçirilmelidir.',
          'Yapay zekâ özelliği isteğe bağlıysa kullanmamayı seçebilir ve ürünün geri kalanıyla devam edebilirsiniz.',
        ),
      ],
    },
    {
      id: 'sharing',
      title: 'Bilgileri ne zaman paylaşıyoruz',
      blocks: [
        p(
          'Kişisel verileri yalnızca açık bir ihtiyaç ve uygun güvenceler olduğunda paylaşıyoruz. Alıcı kategorileri şunlardır:',
        ),
        ul(
          'Web sitemizi, veritabanlarımızı ve uygulama arka uçlarını çalıştıran barındırma ve altyapı sağlayıcıları.',
          'Mesajları ileten ve destek taleplerini yöneten e-posta, destek masası ve iletişim sağlayıcıları.',
          'Faturalamayı yürüten ödeme işleyicileri, uygulama mağazaları ve muhasebe sağlayıcıları.',
          'Yalnızca analiz çerezlerini kabul ettiğinizde analiz sağlayıcıları.',
          'Yalnızca yapay zekâ destekli bir özelliği etkin olarak kullandığınızda model sağlayıcıları.',
          'Gizlilik yükümlülükleri altında avukatlar, denetçiler ve sigortacılar gibi profesyonel danışmanlar.',
          'Gizlilik ve veri koruma hükümleriyle bağlı olarak proje teslimine yardımcı olan grup şirketleri ve yükleniciler.',
          'Kanunen açıklamak zorunda olduğumuzda veya bir hukuki talebi tesis etmek ya da savunmak için gerekli olduğunda yetkili makamlar, mahkemeler veya düzenleyiciler.',
        ),
        p(
          'Kullandığımız alt işleyenlerin güncel listesi Alt İşleyenler sayfamızda yayınlanır. Kişisel verileri satmıyor, reklamverenler veya veri simsarlarıyla paylaşmıyoruz.',
        ),
        p(
          'Bir birleşme, devralma, finansman veya varlık satışı durumunda kişisel veriler bu işlemin parçası olarak aktarılabilir. Alıcıya bu politikaya uyma yükümlülüğü getirir ve kanunun gerektirdiği durumlarda sizi bilgilendiririz.',
        ),
      ],
    },
    {
      id: 'transfers',
      title: 'Uluslararası veri aktarımları',
      blocks: [
        p(
          'Merkezimiz Amerika Birleşik Devletleri’ndedir ve Birleşik Krallık, Avrupa Birliği ve Türkiye dahil birçok ülkede sağlayıcılar ve müşterilerle çalışıyoruz. Bu nedenle kişisel veriler yaşadığınız ülkenin dışında işlenebilir.',
        ),
        ul(
          'Veriler Avrupa Ekonomik Alanı veya Birleşik Krallık dışına çıktığında yeterlilik kararına ya da Avrupa Komisyonu veya Birleşik Krallık Bilgi Komiserliği tarafından onaylanan Standart Sözleşme Hükümlerine dayanıyoruz.',
          'Türkiye’den aktarımlarda KVKK kapsamında tanınan mekanizmalara, geçerli yolun açık rıza olduğu durumlarda açık rızaya dayanıyoruz.',
          'Aktarımları düzenli olarak gözden geçiriyor ve aktarım risk değerlendirmesi gerektirdiğinde şifreleme ve erişim kontrolleri gibi ek teknik önlemler uyguluyoruz.',
        ),
        p(
          'Belirli bir aktarıma uygulanan güvenceler hakkında daha fazla bilgiyi support@litxtech.com adresine yazarak talep edebilirsiniz.',
        ),
      ],
    },
    {
      id: 'retention',
      title: 'Bilgileri ne kadar süre saklıyoruz',
      blocks: [
        p(
          'Kişisel verileri yalnızca toplandıkları amaç için gerekli olduğu sürece veya kanunun gerektirdiği kadar saklıyoruz. Standart saklama sürelerimiz şunlardır:',
        ),
        ul(
          'Projeye dönüşmeyen web sitesi talepleri ve teklifler: son iletişimden itibaren en fazla 24 ay.',
          'Müşteri proje kayıtları, sözleşmeler ve teslimatlar: ilişki süresi boyunca ve yasal zamanaşımı süresi kadar.',
          'Faturalar ve vergi kayıtları: yürürlükteki vergi hukukunun gerektirdiği süre, genellikle 7 ila 10 yıl.',
          'Uygulama hesap verileri: hesabınızı silene kadar; ardından yasal bir istisna yoksa 30 gün içinde silinir veya anonim hale getirilir.',
          'Destek talepleri ve yazışmalar: dosya kapandıktan sonra en fazla 36 ay.',
          'Sunucu kayıtları ve güvenlik kayıtları: genellikle 30 ila 180 gün; soruşturma sürüyorsa daha uzun.',
          'İşe alım kayıtları: süreç bittikten sonra en fazla 12 ay; daha uzun saklamamızı istemediğiniz sürece.',
        ),
        p(
          'Saklama süresi dolduğunda veriyi siler veya artık sizinle ilişkilendirilemeyecek şekilde geri döndürülemez biçimde anonimleştiririz. Yedekler belirlenmiş bir takvime göre döndürülür ve başka bir amaçla kullanılmaz.',
        ),
      ],
    },
    {
      id: 'security',
      title: 'Bilgileri nasıl koruyoruz',
      blocks: [
        p('Verinin hassasiyetine uygun teknik ve idari önlemler uyguluyoruz:'),
        ul(
          'Tüm web sitesi, uygulama ve API trafiğinde TLS ile aktarım sırasında şifreleme.',
          'Sağlayıcının desteklediği durumlarda veritabanları, nesne depolama ve yedekler için bekleme sırasında şifreleme.',
          'Rol tabanlı erişim kontrolü, en az yetki ilkesi ve ekibimiz için kişiye özel hesaplar.',
          'Yönetici ve üretim sistemlerinde çok faktörlü kimlik doğrulama.',
          'Üretim, test ve geliştirme ortamlarının ayrılması ve üretim erişiminin kayıt altına alınması.',
          'İzleme, uyarı mekanizmaları ve bağımlılıklar ile güvenlik güncellemelerinin düzenli gözden geçirilmesi.',
          'Kod incelemesi, sır yönetimi ve bağımlılık taraması dahil güvenli geliştirme uygulamaları.',
          'Ekip üyeleri ve yükleniciler için yazılı gizlilik taahhütleri ve olay müdahale prosedürleri.',
        ),
        p(
          'Hiçbir sistem tamamen güvenli olamaz. Haklarınız için risk oluşturması muhtemel bir kişisel veri ihlali durumunda, kanunun gerektirdiği şekilde gecikmeksizin ilgili denetim makamını ve etkilenen kişileri bilgilendiririz. Güçlü ve benzersiz bir şifre kullanarak ve sunulduğu yerlerde iki faktörlü kimlik doğrulamayı açarak kendi hesabınızı da korumalısınız.',
        ),
      ],
    },
    {
      id: 'your-rights',
      title: 'Haklarınız ve tercihleriniz',
      blocks: [
        p(
          'Yaşadığınız yere göre aşağıdaki hakların bazılarına veya tamamına sahip olabilirsiniz. Yargı bölgesinden bağımsız olarak bize başvuran herkes için bu talepleri karşılıyoruz.',
        ),
        ul(
          'Erişim: kişisel verilerinizi işleyip işlemediğimizi öğrenmek ve bir kopyasını almak.',
          'Düzeltme: yanlış veya eksik verilerin düzeltilmesini istemek.',
          'Silme: yasal olarak saklamak için dayanağımız kalmayan verilerin silinmesini istemek.',
          'Kısıtlama: bir soru çözülene kadar işlemenin sınırlandırılmasını istemek.',
          'Taşınabilirlik: bize sağladığınız verileri yapılandırılmış, makine tarafından okunabilir biçimde almak veya teknik olarak mümkün olduğunda başka bir sağlayıcıya iletilmesini istemek.',
          'İtiraz: meşru menfaate dayalı işlemeye itiraz etmek ve doğrudan pazarlamaya her zaman itiraz etmek.',
          'Rızanın geri çekilmesi: çerez tabanlı analiz veya pazarlama için verdiğiniz rızayı her zaman geri çekmek.',
          'Ayrımcılık yapılmaması: haklarınızı kullandığınız için size farklı davranmayız.',
          'Yetkili temsilci: Kaliforniya ve benzeri rejimlerde, doğrulamaya tabi olarak bir yetkili temsilci aracılığıyla talep gönderebilirsiniz.',
        ),
        p(
          'Bir hakkınızı kullanmak için sizi ve talebinizi tanımlamamıza yetecek ayrıntıyla support@litxtech.com adresine e-posta gönderin. 30 gün içinde yanıt veririz ve talep karmaşıksa bu süreyi bir kez uzatarak nedenini bildiririz. Verilerinizi korumak için sınırlı doğrulama bilgisi isteyebiliriz ve makul bir talep için hiçbir zaman ücret almıyoruz.',
        ),
        p(
          'Yanıtımızdan memnun kalmazsanız yerel denetim makamına şikâyette bulunabilirsiniz; örneğin Birleşik Krallık’ta Bilgi Komiserliği Ofisi’ne, Avrupa Birliği’nde ulusal veri koruma makamınıza veya Türkiye’de Kişisel Verileri Koruma Kurumu’na. Konuyu önce sizinle çözme fırsatını bize tanımanızı isteriz.',
        ),
      ],
    },
    {
      id: 'marketing',
      title: 'Pazarlama iletişimi',
      blocks: [
        p(
          'Ürün haberleri, vaka çalışmaları ve zaman zaman hizmet güncellemeleri gönderiyoruz. Kanunun rıza gerektirdiği durumlarda sizi pazarlama listesine eklemeden önce rızanızı alıyoruz ve her mesajda abonelikten çıkma bağlantısı bulunuyor. E-posta listemizi kiralamıyor veya satmıyoruz.',
        ),
        p(
          'Fatura, güvenlik uyarısı, şifre sıfırlama ve temel ürün bildirimleri gibi işlemsel ve hizmet mesajları pazarlama kapsamında değildir; aktif bir hesabınız veya sözleşmeniz olduğu sürece bu mesajların aboneliğinden çıkılamaz.',
        ),
      ],
    },
    {
      id: 'children',
      title: 'Çocukların gizliliği',
      blocks: [
        p(
          'Web sitemiz, iş hizmetlerimiz ve kurumsal ürünlerimiz kuruluşlara ve yetişkinlere yöneliktir. İş hizmetlerimiz aracılığıyla 13 yaşından küçük çocuklardan veya ülkenizde geçerli olan daha yüksek asgari yaşın altındaki kişilerden bilerek kişisel veri toplamıyoruz.',
        ),
        p(
          'Topluluk veya şehir uygulamaları gibi bazı tüketici uygulamalarımızı gençler kullanabilir. Bu uygulamalar yaş koşullarını ve ebeveyn rehberliğini uygulama mağazası sayfasında ve uygulamaya özel politikada yayınlar. Bir çocuğun verisinin geçerli asgari yaşa aykırı şekilde toplandığını öğrenirsek veriyi siler ve hesabı kapatırız. Ebeveyn veya vasi, kaldırma talebi için support@litxtech.com adresine yazabilir.',
        ),
      ],
    },
    {
      id: 'apps',
      title: 'Uygulamaya özel bildirimler ve uygulama mağazaları',
      blocks: [
        p(
          'Yayınladığımız her uygulamanın, o ürüne özgü izinleri, veri kategorilerini ve saklama kurallarını açıklayan ayrı bir gizlilik bildirimi vardır. Bir ürün bildirimi bu politikayla çeliştiğinde o ürün için ürün bildirimi geçerlidir. Tüm ürün bildirimlerine Yasal sayfamızdan ulaşılabilir.',
        ),
        ul(
          'Apple App Store ve Google Play; indirmeler, satın almalar ve mağaza analizleriyle bağlantılı verileri kendi gizlilik politikaları çerçevesinde bağımsız olarak işler.',
          'Uygulama içi satın alımlar ve abonelikler mağaza tarafından faturalanır; iptal işlemleri mağaza hesabı ayarlarınızdan yönetilir.',
          'Bir uygulamayı işvereninizin yönettiği bir cihaza kurarsanız, işvereninizin kontrol etmediğimiz ek görünürlüğü ve politikaları olabilir.',
        ),
      ],
    },
    {
      id: 'client-data',
      title: 'Müşteri ve proje verileri: veri işleyen rolümüz',
      blocks: [
        p(
          'Bir yazılım projesi teslim ettiğimizde genellikle müşterimize ve o müşterinin kullanıcılarına ait verileri işleriz. Bu rolde veri işleyen tarafız ve amaçlar ile saklama süresini müşteri belirler. Bu verileri yalnızca yazılı talimatlarla işler, yukarıda açıklanan güvenlik önlemlerini uygular, gizli tutar ve müşterinin veri sahibi taleplerine yanıt vermesine yardımcı oluruz.',
        ),
        p(
          'Veri işleme sözleşmeleri, gizlilik sözleşmeleri ve gerektiğinde standart sözleşme hükümleri imzalıyoruz. Müşteri üretim verilerini kendi pazarlamamız için, model eğitimi için veya projeyle ilgisiz herhangi bir amaç için kullanmıyoruz. Sözleşme sona erdiğinde, kanunen saklanması gereken kopyalar dışında müşteri verilerini sözleşmeye uygun olarak iade eder veya sileriz.',
        ),
        p(
          'Bir müşteri için geliştirdiğimiz ürünün kullanıcısıysanız, verilerinizin veri sorumlusu o müşteridir ve önce onlarla iletişime geçmelisiniz. Talebinizin işlenmesinde onlara destek oluruz.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Politikadaki değişiklikler',
      blocks: [
        p(
          'Hizmetlerimiz, sağlayıcılarımız veya yasal yükümlülüklerimiz değiştiğinde bu politikayı gözden geçiririz. Güncel sürüm, sürüm numarası, yürürlük tarihi ve son güncelleme tarihiyle birlikte her zaman litxtech.com/privacy-policy adresinde yayınlanır.',
        ),
        p(
          'Bir değişiklik kişisel verileri kullanma biçimimizi esaslı olarak etkiliyorsa, yürürlüğe girmeden önce makul bir bildirim yaparız; örneğin hesap sahiplerine e-posta göndererek veya web sitesinde belirgin bir duyuru yayınlayarak. Yürürlük tarihinden sonra hizmetlerimizi kullanmaya devam etmeniz güncellenmiş politikayı kabul ettiğiniz anlamına gelir.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'Bize ulaşın',
      blocks: [
        p(
          'Bu politikayla ilgili her türlü soru, veri koruma talebi, güvenlik bildirimi veya şikâyet için LitxTech LLC’ye support@litxtech.com adresinden ulaşabilirsiniz. Mesajınızı hızlı yönlendirebilmemiz için hangi ürün veya proje hakkında yazdığınızı belirtin.',
        ),
        p(
          'Gizlilik taleplerini 3 iş günü içinde teyit etmeyi ve yasal süre içinde sonuçlandırmayı hedefliyoruz. İmzalı sözleşmesi olan bir müşteriyseniz, sözleşmesel bildirimler için o sözleşmedeki iletişim bilgileri geçerlidir.',
        ),
      ],
    },
  ],
}

export const privacyPolicy: LegalDocSet = { en, tr }
