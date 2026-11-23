import { p, ul, type LegalDocSet } from './types'

const UPDATED_EN = '23 November 2026'
const UPDATED_TR = '23 Kasım 2026'

const en = {
  eyebrow: 'Terms of Service',
  title: 'Terms of Service',
  summary:
    'These terms govern your use of the LitxTech website, our published applications, the software and licences we sell, and the custom software development services we provide. They set out what we deliver, what we expect from you, how payments and ownership work, and how disputes are handled.',
  version: 'Version 3.0',
  effective: UPDATED_EN,
  updated: UPDATED_EN,
  sections: [
    {
      id: 'agreement',
      title: 'Agreement and parties',
      blocks: [
        p(
          'These Terms of Service ("Terms") form a binding agreement between you and LitxTech LLC, a company registered in Wyoming, United States ("LitxTech", "we", "us"). They apply when you browse litxtech.com, create an account, download or use one of our applications, purchase a licence or subscription, or engage us to design and build software.',
        ),
        p(
          'If you accept these Terms on behalf of a company or another legal entity, you confirm that you have authority to bind that entity. In that case "you" refers to the entity, and the individual accepting remains responsible for compliance.',
        ),
        p(
          'A signed statement of work, order form, master services agreement or data processing agreement takes precedence over these Terms where the documents conflict. If a mandatory local consumer law gives you stronger rights than these Terms, that law prevails to the extent of the conflict.',
        ),
        p(
          'If you do not agree with these Terms, please do not use our services. You can contact support@litxtech.com if you would like to discuss an alternative arrangement before accepting.',
        ),
      ],
    },
    {
      id: 'definitions',
      title: 'Definitions',
      blocks: [
        ul(
          '"Services" means the website, applications, software products, subscriptions, support plans, hosting and professional development services provided by LitxTech.',
          '"Platform" means the infrastructure, APIs, dashboards and back-end systems that operate a product.',
          '"Deliverables" means the software, source code, designs, documentation and other materials we create for a project and identify in a statement of work.',
          '"Customer Content" means data, text, images, files or other materials that you or your users upload to, or process with, the Services.',
          '"Statement of Work" or "SOW" means a document that describes the scope, timeline, milestones, fees and acceptance criteria for a project.',
          '"Subscription" means a recurring right to access a product or service for a defined period in exchange for periodic fees.',
          '"Third-Party Service" means software, infrastructure or content supplied by a provider other than LitxTech.',
        ),
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility and accounts',
      blocks: [
        p(
          'You must be at least 18 years old to enter a contract with us. Our consumer applications may set their own minimum age in the app store listing, and we do not permit use below the age required by the app or by local law.',
        ),
        ul(
          'Provide accurate, current and complete registration information, and keep it updated.',
          'Keep your credentials confidential and do not share an account between people.',
          'Tell us promptly at support@litxtech.com if you suspect unauthorised access or a security incident.',
          'You are responsible for activity carried out through your account, unless it results from our own failure to apply reasonable security.',
        ),
        p(
          'We may suspend an account where we reasonably believe it is being used for fraud, abuse, a legal violation or a threat to the security of other users. Where the situation allows, we will tell you why and how to resolve it.',
        ),
      ],
    },
    {
      id: 'services',
      title: 'Our services',
      blocks: [
        p('LitxTech provides four broad categories of service:'),
        ul(
          'Custom software development: discovery, product design, web and mobile development, integrations, migrations, quality assurance, launch support and maintenance, delivered as a project or an ongoing engagement.',
          'Published products: applications and platforms that we operate and make available to end users, either directly or through app stores.',
          'Software sales and licensing: commercial licences, subscriptions, support plans and hosting capacity for software that we own or are authorised to distribute.',
          'Advisory work: technical audits, architecture reviews, feasibility studies and product strategy engagements.',
        ),
        p(
          'We deliver projects in iterations so that you can review progress early. Unless a statement of work says otherwise, we work with a defined scope, and any material change to that scope is handled through a written change request that records the impact on timeline and fees.',
        ),
        p(
          'Product descriptions, screenshots and case studies on our website are illustrative. Features may evolve between releases, and a specific feature is only guaranteed where it is named in a signed document or in the product documentation that applies to your subscription.',
        ),
      ],
    },
    {
      id: 'orders',
      title: 'Quotes, proposals and statements of work',
      blocks: [
        p(
          'A quote or proposal is an invitation to contract and is valid for the period stated on it, or for 30 days if no period is stated. A contract is formed when you accept the proposal in writing, pay a deposit where one is required, or sign a statement of work, whichever applies.',
        ),
        ul(
          'Statements of work record the scope, assumptions, dependencies, milestones, acceptance criteria and fees for a project.',
          'Estimates of effort and timeline are made in good faith based on the information available at the time and are not a guarantee unless we explicitly label them as fixed.',
          'Client-side delays, late feedback, unavailable stakeholders or third-party dependencies can move the timeline; we will notify you and agree a revised plan.',
          'Acceptance is deemed to occur when you confirm in writing that a milestone is accepted, or when you put a delivered milestone into productive use without raising a material defect within the agreed review period.',
        ),
      ],
    },
    {
      id: 'fees',
      title: 'Fees and taxes',
      blocks: [
        p(
          'Fees are stated in the currency shown on the order or invoice and exclude applicable taxes, duties and bank charges, which you are responsible for unless the law says otherwise.',
        ),
        ul(
          'Project fees are typically invoiced against milestones or monthly for time-based engagements.',
          'Subscription fees are billed in advance for the billing period you selected.',
          'Third-party costs, such as app store fees, cloud consumption, licensed fonts, paid APIs or paid assets, are passed through at cost unless we agree a fixed allowance in writing.',
          'We may adjust subscription pricing with at least 30 days’ notice before your next renewal. Project fees are fixed for the scope in the signed document.',
        ),
        p(
          'If you are a business customer and the law requires self-assessment or reverse-charge treatment, you are responsible for accounting for the tax in your own jurisdiction.',
        ),
      ],
    },
    {
      id: 'payment',
      title: 'Payment terms',
      blocks: [
        p(
          'Unless the invoice says otherwise, invoices are payable within 14 days of the invoice date for project work and on the due date for subscriptions. Payment is made by the method shown on the invoice or through the payment provider we designate.',
        ),
        ul(
          'Payments are treated as made when the funds are received in cleared form.',
          'We may charge statutory interest and reasonable recovery costs on overdue business invoices.',
          'If an invoice remains unpaid after a written reminder, we may suspend delivery, hosting or support until the balance is settled.',
          'We may require a deposit or staged payments before starting a new project, and we may decline further work where a previous balance is outstanding.',
        ),
        p(
          'You are responsible for any chargeback or failed payment fees imposed by your bank or payment provider where the chargeback was not caused by our error.',
        ),
      ],
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions, trials and renewals',
      blocks: [
        p(
          'Subscriptions renew automatically at the end of each billing period unless you cancel before the renewal date. Where a purchase is made through the Apple App Store or Google Play, renewal and cancellation are managed by the store under its own rules, and we cannot cancel a store subscription on your behalf.',
        ),
        ul(
          'Free trials convert into a paid subscription at the end of the trial unless cancelled. We will remind you before a trial ends where the law or the store rules require it.',
          'Cancellation stops future renewals but does not automatically trigger a refund for the current period, except where a refund policy or mandatory law provides one.',
          'Downgrading a plan may reduce features, storage or usage limits at the next renewal.',
          'We may suspend or terminate a subscription for non-payment, abuse or a legal requirement, after reasonable notice where practicable.',
        ),
      ],
    },
    {
      id: 'refunds',
      title: 'Refunds and cancellation',
      blocks: [
        p(
          'Our detailed refund rules, including the situations that qualify and how to request a refund, are set out in our Refund Policy. That policy forms part of these Terms.',
        ),
        ul(
          'Completed and delivered project work is generally non-refundable, but we will always address a genuine defect in line with the agreed warranty.',
          'Deposits secure capacity and are refundable only where we have not started work and the statement of work allows it.',
          'Store purchases are refunded by the store that processed the payment, in accordance with its rules.',
          'Nothing in this section limits a statutory right to cancel that cannot be excluded by agreement.',
        ),
      ],
    },
    {
      id: 'customer',
      title: 'Your responsibilities',
      blocks: [
        ul(
          'Provide timely access to the people, systems, accounts, content and approvals we need to deliver.',
          'Ensure that any content or data you supply is lawful, that you have the rights to use it, and that we may process it for the project.',
          'Maintain your own backups of business-critical data unless a signed document states that we are responsible for backup and restore.',
          'Keep your infrastructure, devices and credentials reasonably secure and apply available updates.',
          'Nominate a decision-maker who can approve milestones and changes on your behalf.',
          'Comply with all laws that apply to your use of the Services, including consumer, privacy and export rules.',
        ),
      ],
    },
    {
      id: 'third-party',
      title: 'Third-party services and integrations',
      blocks: [
        p(
          'Our products and projects often rely on third-party services, such as cloud hosting, app stores, payment providers, mapping services, messaging providers and AI model providers. Those services are governed by their own terms and privacy policies.',
        ),
        ul(
          'We select providers with care, but we do not control their availability, pricing or policy decisions.',
          'A change or outage at a third-party provider may affect the Services, and we will work with you in good faith on mitigation and alternatives.',
          'You are responsible for your own accounts with third-party providers and for any fees you incur directly with them.',
          'Where a provider requires you to accept its terms before an integration can be enabled, you authorise us to configure the integration but you remain the account holder.',
        ),
      ],
    },
    {
      id: 'ip',
      title: 'Intellectual property and ownership',
      blocks: [
        p(
          'Each party keeps ownership of the intellectual property it brings to a project. Our pre-existing tools, frameworks, design systems, internal libraries and know-how remain our property.',
        ),
        ul(
          'On full payment for the relevant milestone or project, we assign to you the rights in the custom Deliverables that were created specifically for you and identified in the statement of work, excluding our pre-existing materials.',
          'Where Deliverables incorporate our pre-existing materials, we grant you a perpetual, worldwide, non-exclusive, royalty-free licence to use, modify and maintain them as part of the delivered solution.',
          'Open-source components remain governed by their own licences, which we identify in the project documentation.',
          'Case studies, screenshots and a general description of the work may be used in our portfolio unless the statement of work includes a confidentiality restriction.',
          'Nothing in this section transfers ownership of a product that we publish and operate, or of a licence we sell, beyond the rights expressly granted.',
        ),
        p(
          'You must not remove copyright notices, licence files or attribution notices from Deliverables or products.',
        ),
      ],
    },
    {
      id: 'license',
      title: 'Software licence and restrictions',
      blocks: [
        p(
          'Where you purchase a licence to software we own, we grant you a non-exclusive, non-transferable, revocable licence to use that software for the term and scope recorded in your order. Unless the order says otherwise, the licence covers your internal business use only.',
        ),
        p('You must not, and must not permit anyone else to:'),
        ul(
          'Copy, resell, sublicense, rent, lease or distribute the software except as expressly permitted in writing.',
          'Reverse engineer, decompile or disassemble the software, except to the extent that this restriction is prohibited by law.',
          'Circumvent licence keys, usage limits, access controls or metering.',
          'Remove proprietary notices, or use the software to build a competing product.',
          'Use the software in a way that breaks the law, infringes rights or endangers safety.',
        ),
        p(
          'A licence terminates automatically if you materially breach these Terms and do not remedy the breach within 14 days of notice. On termination you must stop use and delete or return copies, except for archival copies required by law.',
        ),
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      blocks: [
        p('You may not use our Services, or allow anyone else to use them, to:'),
        ul(
          'Break any applicable law, regulation, court order or sanctions regime.',
          'Infringe intellectual property, privacy, publicity or other rights of a third party.',
          'Publish or distribute malware, phishing content, spyware or code designed to disrupt systems.',
          'Attempt to gain unauthorised access to our systems, other customers’ environments or another person’s account.',
          'Conduct denial-of-service attacks, automated scraping that degrades the service, or load tests without written consent.',
          'Distribute harassment, hate speech, sexual exploitation material, or content that endangers a child.',
          'Send unsolicited bulk messages, operate deceptive schemes or misrepresent your identity.',
          'Use the Services to train a competing model or product on data you do not own.',
        ),
        p(
          'We may investigate suspected violations, remove content, throttle traffic, suspend accounts and report unlawful activity to the authorities. Where the situation allows, we will give you notice and an opportunity to respond before taking permanent action.',
        ),
      ],
    },
    {
      id: 'content',
      title: 'Customer content and applications',
      blocks: [
        p(
          'You keep ownership of Customer Content. You grant us a limited licence to host, copy, transmit, display and process Customer Content solely to provide and support the Services, to secure them, and to comply with law.',
        ),
        ul(
          'You are responsible for the accuracy, quality and legality of Customer Content and for the notices and consents it requires.',
          'We may remove content that breaches these Terms, the applicable product policy or the law, and we will inform you where reasonable.',
          'If you operate an application that serves end users, you are responsible for your own end-user terms, privacy notice and lawful basis for processing.',
          'Aggregated and de-identified statistics about service performance may be used to operate, benchmark and improve our products, provided that they cannot reasonably identify you or an individual.',
        ),
      ],
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      blocks: [
        p(
          'Each party may receive information that the other treats as confidential, such as business plans, source code, pricing, security details or personal data. The receiving party will use that information only for the purposes of the agreement, protect it with reasonable care, and limit access to people who need it.',
        ),
        p(
          'Confidentiality obligations do not apply to information that is publicly available without breach, was already lawfully known, is independently developed, or must be disclosed by law. Where disclosure is compelled, the receiving party will give prompt notice where legally permitted so that protective measures can be sought.',
        ),
        p('These obligations survive termination for five years, and indefinitely for trade secrets and personal data.'),
      ],
    },
    {
      id: 'data-protection',
      title: 'Data protection',
      blocks: [
        p(
          'Our Privacy Policy explains how we handle personal data as a controller. Where we process personal data on your behalf in a project, we act as a processor and will enter into a data processing agreement that reflects the applicable law.',
        ),
        ul(
          'We implement appropriate technical and organisational measures and assist you with data subject requests, impact assessments and breach notifications.',
          'We engage subprocessors only under written terms, and we publish a list of the subprocessors we rely on.',
          'We notify you without undue delay after becoming aware of a personal data breach affecting your data.',
          'On termination we return or delete personal data in line with your instructions and applicable retention obligations.',
        ),
      ],
    },
    {
      id: 'warranty',
      title: 'Warranties and disclaimers',
      blocks: [
        p(
          'We warrant that we will perform professional services with reasonable skill and care, in line with generally accepted industry standards, and that Deliverables will materially conform to the agreed specification for 30 days after acceptance unless a different period is stated in the statement of work.',
        ),
        p(
          'Your exclusive remedy for a breach of that warranty is, at our option, correction of the defect, re-performance of the affected work, or a refund of the fees paid for the non-conforming element. The warranty does not cover defects caused by modifications you or a third party made, by use outside the documented environment, or by third-party services.',
        ),
        p(
          'Except as expressly stated, the Services are provided "as is" and "as available". We do not warrant uninterrupted or error-free operation, compatibility with every device or browser, or that third-party services will remain available. Published products may change, and features may be added, modified or retired as the product evolves.',
        ),
        p(
          'Nothing in these Terms excludes a warranty or right that cannot be excluded under mandatory consumer law.',
        ),
      ],
    },
    {
      id: 'support',
      title: 'Support, maintenance and service levels',
      blocks: [
        p(
          'Support and maintenance are included only where your order, subscription or statement of work says so. Where included, support covers incident triage, defect correction and reasonable configuration assistance during business hours.',
        ),
        ul(
          'Support does not include new features, major redesigns, content entry, third-party service administration or work caused by unauthorised modification.',
          'Response targets, availability commitments and service credits are defined in the applicable support plan or service level agreement.',
          'Scheduled maintenance may temporarily interrupt service. We aim to schedule it outside peak hours and to give advance notice for material windows.',
          'Emergency security maintenance may be performed without prior notice where delay would increase risk.',
        ),
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        p(
          'To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, lost revenue, lost goodwill, loss of data or business interruption, even if the possibility was known.',
        ),
        p(
          'Our total aggregate liability arising out of or in connection with the agreement is limited to the greater of (a) the fees paid or payable by you for the Services in the twelve months preceding the event giving rise to the claim, or (b) one thousand US dollars. For a free product or a website visit, our liability is limited to the extent required by law.',
        ),
        p(
          'These limits do not apply to fraud, wilful misconduct, death or personal injury caused by negligence, breach of confidentiality, infringement of intellectual property, or any liability that cannot lawfully be limited.',
        ),
        p(
          'Each party must take reasonable steps to mitigate its losses and must notify the other of a claim within a reasonable time.',
        ),
      ],
    },
    {
      id: 'indemnity',
      title: 'Indemnification',
      blocks: [
        p(
          'You will indemnify and hold LitxTech harmless against third-party claims, damages, fines and reasonable legal costs arising from Customer Content, from your unlawful use of the Services, or from your breach of these Terms, provided that we notify you promptly and allow you to participate in the defence.',
        ),
        p(
          'We will defend you against a third-party claim that a Deliverable we created infringes that party’s copyright or trade secret, and we will pay damages finally awarded or agreed in a settlement, provided that you notify us promptly, give us control of the defence and cooperate reasonably. If such a claim arises, we may procure the right to continue use, modify the affected element, or refund the fees paid for it.',
        ),
        p(
          'This indemnity does not apply where the claim results from your content, your modifications, your combination of the Deliverable with third-party materials, or your use outside the agreed scope.',
        ),
      ],
    },
    {
      id: 'term',
      title: 'Term, suspension and termination',
      blocks: [
        p(
          'These Terms apply while you use the Services. A project agreement runs for the period stated in the statement of work. A subscription runs for the billing period and renews as described above.',
        ),
        ul(
          'Either party may terminate for material breach that is not remedied within 30 days of written notice, or immediately where the breach cannot be remedied.',
          'Either party may terminate immediately if the other becomes insolvent, enters administration or ceases to operate.',
          'We may suspend the Services immediately where necessary to prevent harm, to comply with law or to protect the security of our systems and other customers.',
          'You may stop using a free product at any time; this does not remove obligations that already arose.',
        ),
        p(
          'On termination you must pay all fees due for work performed and commitments made up to the effective date. We will provide reasonable transition assistance, which may be chargeable, and we will make available the deliverables and data you are entitled to receive. Sections that by their nature should survive, including ownership, confidentiality, liability and governing law, continue to apply.',
        ),
      ],
    },
    {
      id: 'beta',
      title: 'Beta and preview features',
      blocks: [
        p(
          'We may offer beta, preview, experimental or early-access features. These are provided for evaluation, may change or be withdrawn without notice, may contain defects, and are excluded from warranties and service level commitments unless we state otherwise in writing.',
        ),
        p(
          'You should not rely on a beta feature for business-critical processes, and you should keep independent backups of any data you place in it.',
        ),
      ],
    },
    {
      id: 'ai',
      title: 'AI-assisted features',
      blocks: [
        p(
          'Some products include AI-assisted capabilities. Output is generated probabilistically and may be inaccurate, incomplete or unsuitable for a particular purpose. You are responsible for reviewing output before relying on it, especially in legal, medical, financial or safety-related contexts.',
        ),
        ul(
          'Do not submit sensitive personal data, trade secrets or regulated content to an AI feature unless the feature and your agreement explicitly permit it.',
          'You are responsible for the prompts, inputs and instructions you provide, and for how you use the output.',
          'We may apply usage limits, rate limits and content filters to protect the service and other users.',
          'We do not guarantee that output is unique or that it does not resemble material generated for another user.',
        ),
      ],
    },
    {
      id: 'appstores',
      title: 'App store terms',
      blocks: [
        p(
          'If you download an application through the Apple App Store or Google Play, you also agree to that store’s terms. The store is not a party to this agreement and is not responsible for the application or for support, except as its own terms provide.',
        ),
        ul(
          'Apple and Google may process purchase and download data under their own privacy policies.',
          'Maintenance, support and warranty obligations for an application are ours and not the store’s, to the extent permitted by the store’s rules.',
          'If an application fails to conform to an applicable warranty, you may notify the store, which may refund the purchase price in line with its policy.',
          'The store provider is a third-party beneficiary of the relevant provisions and may enforce them against you.',
        ),
      ],
    },
    {
      id: 'law',
      title: 'Governing law and disputes',
      blocks: [
        p(
          'These Terms are governed by the laws of the State of Wyoming, United States, without regard to conflict-of-law rules. This choice does not deprive a consumer of the protection of mandatory rules in the consumer’s country of residence.',
        ),
        p(
          'Before starting formal proceedings, both parties agree to attempt to resolve a dispute in good faith by written notice describing the issue and a proposed resolution, followed by a discussion within 30 days. Most concerns can be resolved this way quickly.',
        ),
        p(
          'If informal resolution fails, disputes will be brought before the state or federal courts located in Wyoming, unless mandatory law in your country gives you the right to bring a claim in your local courts. Claims must be brought within the period allowed by applicable law.',
        ),
      ],
    },
    {
      id: 'general',
      title: 'General provisions',
      blocks: [
        ul(
          'Assignment: you may not assign the agreement without our written consent; we may assign it to an affiliate or in connection with a merger or sale of assets.',
          'Force majeure: neither party is liable for delay caused by events beyond its reasonable control, provided it notifies the other and resumes performance as soon as practicable.',
          'Notices: formal notices must be in writing and sent to support@litxtech.com and to the e-mail address on your account or order.',
          'Severability: if a provision is found unenforceable, it will be limited to the minimum extent necessary and the remaining provisions stay in force.',
          'No waiver: a failure to enforce a provision is not a waiver of the right to enforce it later.',
          'Entire agreement: these Terms, together with the applicable order, statement of work and policies referenced here, are the entire agreement between us.',
          'Language: these Terms are published in English and Turkish. If the versions differ, the English version prevails, except where local law requires otherwise.',
          'Publicity: neither party will use the other’s name or logos in public materials without prior written consent, except as permitted in the intellectual property section.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: [
        p(
          'We may update these Terms to reflect changes in our services, technology or legal requirements. The current version is always available at litxtech.com/terms-of-service with its version and effective date.',
        ),
        p(
          'For material changes we will give reasonable advance notice, for example by e-mail to account holders or by a notice on the website. If you do not accept a change, you may stop using the Services before it takes effect; continuing to use them afterwards means you accept the updated Terms. Changes do not retroactively alter rights already accrued under a signed statement of work.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        p(
          'Questions about these Terms, licensing, invoicing or a specific project should be sent to support@litxtech.com. Include your company name, the product or project concerned, and any order or invoice reference so that we can respond quickly.',
        ),
        p(
          'LitxTech LLC is registered in Wyoming, United States. Our correspondence address and tax details are provided on invoices and can be requested by e-mail.',
        ),
      ],
    },
  ],
}

const tr = {
  eyebrow: 'Kullanım Şartları',
  title: 'Kullanım Şartları',
  summary:
    'Bu şartlar; LitxTech web sitesini, yayınladığımız uygulamaları, sattığımız yazılım ve lisansları ve sunduğumuz kuruma özel yazılım geliştirme hizmetlerini kullanımınızı düzenler. Ne teslim ettiğimizi, sizden ne beklediğimizi, ödeme ve mülkiyetin nasıl işlediğini ve uyuşmazlıkların nasıl çözüleceğini açıklar.',
  version: 'Sürüm 3.0',
  effective: UPDATED_TR,
  updated: UPDATED_TR,
  sections: [
    {
      id: 'agreement',
      title: 'Sözleşme ve taraflar',
      blocks: [
        p(
          'Bu Kullanım Şartları ("Şartlar"), sizinle Amerika Birleşik Devletleri’nin Wyoming eyaletinde tescil edilmiş LitxTech LLC ("LitxTech", "biz") arasında bağlayıcı bir sözleşme oluşturur. litxtech.com sitesini gezdiğinizde, hesap oluşturduğunuzda, uygulamalarımızdan birini indirdiğinizde veya kullandığınızda, lisans ya da abonelik satın aldığınızda veya yazılım tasarlayıp geliştirmemiz için bizimle çalıştığınızda bu şartlar geçerlidir.',
        ),
        p(
          'Bu Şartları bir şirket veya başka bir tüzel kişi adına kabul ediyorsanız, o kişiyi bağlama yetkiniz olduğunu teyit edersiniz. Bu durumda "siz" ifadesi tüzel kişiyi ifade eder ve kabul eden gerçek kişi uyumdan sorumlu kalmaya devam eder.',
        ),
        p(
          'İmzalı bir iş tanımı, sipariş formu, ana hizmet sözleşmesi veya veri işleme sözleşmesi, belgeler çeliştiğinde bu Şartların önüne geçer. Yürürlükteki zorunlu tüketici hukuku size bu Şartlardan daha güçlü haklar tanıyorsa, çelişki oranında o hukuk uygulanır.',
        ),
        p(
          'Bu Şartları kabul etmiyorsanız lütfen hizmetlerimizi kullanmayın. Kabul etmeden önce alternatif bir düzenlemeyi görüşmek isterseniz support@litxtech.com adresine yazabilirsiniz.',
        ),
      ],
    },
    {
      id: 'definitions',
      title: 'Tanımlar',
      blocks: [
        ul(
          '"Hizmetler", LitxTech tarafından sunulan web sitesini, uygulamaları, yazılım ürünlerini, abonelikleri, destek paketlerini, barındırmayı ve profesyonel geliştirme hizmetlerini ifade eder.',
          '"Platform", bir ürünü çalıştıran altyapı, API’ler, paneller ve arka uç sistemlerini ifade eder.',
          '"Teslimatlar", bir proje için oluşturduğumuz ve iş tanımında belirtilen yazılım, kaynak kodu, tasarımlar, dokümantasyon ve diğer materyalleri ifade eder.',
          '"Müşteri İçeriği", Hizmetlere yüklediğiniz veya Hizmetlerle işlediğiniz veri, metin, görsel, dosya ya da diğer materyalleri ifade eder.',
          '"İş Tanımı" veya "SOW", bir projenin kapsamını, takvimini, kilometre taşlarını, ücretlerini ve kabul kriterlerini açıklayan belgeyi ifade eder.',
          '"Abonelik", belirli bir dönem için düzenli ücret karşılığında bir ürün veya hizmete erişim hakkını ifade eder.',
          '"Üçüncü Taraf Hizmeti", LitxTech dışında bir sağlayıcı tarafından sunulan yazılım, altyapı veya içeriği ifade eder.',
        ),
      ],
    },
    {
      id: 'eligibility',
      title: 'Uygunluk ve hesaplar',
      blocks: [
        p(
          'Bizimle sözleşme yapmak için en az 18 yaşında olmalısınız. Tüketici uygulamalarımız kendi asgari yaşını uygulama mağazası sayfasında belirleyebilir; uygulamanın veya yerel hukukun gerektirdiği yaşın altında kullanıma izin vermiyoruz.',
        ),
        ul(
          'Doğru, güncel ve eksiksiz kayıt bilgileri verin ve bunları güncel tutun.',
          'Giriş bilgilerinizi gizli tutun ve bir hesabı kişiler arasında paylaşmayın.',
          'Yetkisiz erişim veya bir güvenlik olayından şüphelenirseniz derhal support@litxtech.com adresinden bize bildirin.',
          'Makul güvenlik önlemlerini uygulamadaki kendi kusurumuzdan kaynaklanmadıkça, hesabınız üzerinden gerçekleştirilen faaliyetlerden siz sorumlusunuz.',
        ),
        p(
          'Bir hesabın sahtekârlık, kötüye kullanım, hukuka aykırılık veya diğer kullanıcıların güvenliğine tehdit için kullanıldığına makul olarak inandığımızda hesabı askıya alabiliriz. Durum elverdiğinde nedenini ve nasıl çözüleceğini size bildiririz.',
        ),
      ],
    },
    {
      id: 'services',
      title: 'Hizmetlerimiz',
      blocks: [
        p('LitxTech dört ana hizmet kategorisi sunar:'),
        ul(
          'Kuruma özel yazılım geliştirme: keşif, ürün tasarımı, web ve mobil geliştirme, entegrasyonlar, taşıma işlemleri, kalite güvencesi, yayın desteği ve bakım; proje veya sürekli bir çalışma olarak teslim edilir.',
          'Yayınlanan ürünler: doğrudan veya uygulama mağazaları aracılığıyla son kullanıcılara sunduğumuz, işlettiğimiz uygulamalar ve platformlar.',
          'Yazılım satışı ve lisanslama: sahibi olduğumuz veya dağıtım yetkisine sahip olduğumuz yazılımlar için ticari lisanslar, abonelikler, destek paketleri ve barındırma kapasitesi.',
          'Danışmanlık: teknik denetimler, mimari incelemeleri, fizibilite çalışmaları ve ürün stratejisi çalışmaları.',
        ),
        p(
          'Projeleri ilerlemeyi erken görebilmeniz için iterasyonlarla teslim ediyoruz. İş tanımında aksi belirtilmedikçe tanımlı bir kapsamla çalışırız; bu kapsamdaki esaslı her değişiklik, takvim ve ücretlere etkisini kaydeden yazılı bir değişiklik talebiyle yönetilir.',
        ),
        p(
          'Web sitemizdeki ürün açıklamaları, ekran görüntüleri ve vaka çalışmaları örnek niteliğindedir. Özellikler sürümler arasında gelişebilir; belirli bir özellik yalnızca imzalı bir belgede veya aboneliğinize uygulanan ürün dokümantasyonunda adı geçtiğinde garanti edilir.',
        ),
      ],
    },
    {
      id: 'orders',
      title: 'Teklifler, öneriler ve iş tanımları',
      blocks: [
        p(
          'Teklif veya öneri bir sözleşme daveti niteliğindedir ve üzerinde belirtilen süre boyunca, süre belirtilmemişse 30 gün geçerlidir. Sözleşme; öneriyi yazılı olarak kabul ettiğinizde, gerekiyorsa ön ödemeyi yaptığınızda veya iş tanımını imzaladığınızda kurulur.',
        ),
        ul(
          'İş tanımları; kapsamı, varsayımları, bağımlılıkları, kilometre taşlarını, kabul kriterlerini ve proje ücretlerini kaydeder.',
          'Efor ve takvim tahminleri, o sırada mevcut bilgilere dayanarak iyi niyetle yapılır ve açıkça sabit olarak belirtilmedikçe garanti değildir.',
          'Müşteri tarafındaki gecikmeler, geç geri bildirim, ulaşılamayan paydaşlar veya üçüncü taraf bağımlılıkları takvimi kaydırabilir; sizi bilgilendirir ve revize plan üzerinde anlaşırız.',
          'Bir kilometre taşını kabul ettiğinizi yazılı olarak teyit ettiğinizde veya teslim edilen bir kilometre taşını, anlaşılan inceleme süresi içinde esaslı bir hata bildirmeden üretimde kullanmaya başladığınızda kabul gerçekleşmiş sayılır.',
        ),
      ],
    },
    {
      id: 'fees',
      title: 'Ücretler ve vergiler',
      blocks: [
        p(
          'Ücretler sipariş veya faturada gösterilen para biriminde belirtilir ve kanun aksini söylemedikçe uygulanabilir vergiler, harçlar ve banka masrafları hariçtir; bunlardan siz sorumlusunuz.',
        ),
        ul(
          'Proje ücretleri genellikle kilometre taşlarına göre veya zamana dayalı çalışmalarda aylık olarak faturalanır.',
          'Abonelik ücretleri, seçtiğiniz fatura dönemi için peşin faturalanır.',
          'Uygulama mağazası ücretleri, bulut tüketimi, lisanslı yazı tipleri, ücretli API’ler veya ücretli varlıklar gibi üçüncü taraf maliyetleri, yazılı olarak sabit bir ödenek üzerinde anlaşmadıkça maliyet bedeliyle yansıtılır.',
          'Abonelik fiyatlarını bir sonraki yenilemeden en az 30 gün önce bildirerek güncelleyebiliriz. Proje ücretleri, imzalı belgedeki kapsam için sabittir.',
        ),
        p(
          'Ticari bir müşteriyseniz ve kanun kendi kendine vergilendirme veya ters ibraz uygulamasını gerektiriyorsa, vergiyi kendi yargı bölgenizde hesaplamak sizin sorumluluğunuzdadır.',
        ),
      ],
    },
    {
      id: 'payment',
      title: 'Ödeme koşulları',
      blocks: [
        p(
          'Faturada aksi belirtilmedikçe proje işlerinde faturalar düzenlenme tarihinden itibaren 14 gün içinde, aboneliklerde vade tarihinde ödenir. Ödeme, faturada gösterilen yöntemle veya belirlediğimiz ödeme sağlayıcısı aracılığıyla yapılır.',
        ),
        ul(
          'Ödemeler, tutar nakden hesabımıza geçtiğinde yapılmış sayılır.',
          'Vadesi geçen ticari faturalarda yasal faiz ve makul tahsilat masrafları talep edebiliriz.',
          'Yazılı bir hatırlatmadan sonra fatura ödenmezse, bakiye kapanana kadar teslimatı, barındırmayı veya desteği askıya alabiliriz.',
          'Yeni bir projeye başlamadan önce ön ödeme veya aşamalı ödeme talep edebilir, önceki bakiyesi açıkken yeni iş kabul etmeyebiliriz.',
        ),
        p(
          'Ters ibrazın (chargeback) bizim hatamızdan kaynaklanmadığı durumlarda, bankanızın veya ödeme sağlayıcınızın uyguladığı ters ibraz veya başarısız ödeme masraflarından siz sorumlusunuz.',
        ),
      ],
    },
    {
      id: 'subscriptions',
      title: 'Abonelikler, denemeler ve yenilemeler',
      blocks: [
        p(
          'Abonelikler, yenileme tarihinden önce iptal etmediğiniz sürece her fatura döneminin sonunda otomatik yenilenir. Apple App Store veya Google Play üzerinden yapılan satın alımlarda yenileme ve iptal, mağazanın kendi kuralları çerçevesinde mağaza tarafından yönetilir; mağaza aboneliğini sizin adınıza iptal edemeyiz.',
        ),
        ul(
          'Ücretsiz denemeler, iptal edilmediği sürece deneme sonunda ücretli aboneliğe dönüşür. Kanun veya mağaza kuralları gerektirdiğinde deneme bitmeden önce sizi hatırlatırız.',
          'İptal, gelecekteki yenilemeleri durdurur ancak bir iade politikası veya zorunlu hukuk aksini öngörmedikçe mevcut dönem için otomatik iade doğurmaz.',
          'Plan düşürmek, bir sonraki yenilemede özellikleri, depolamayı veya kullanım limitlerini azaltabilir.',
          'Ödeme yapılmaması, kötüye kullanım veya hukuki bir zorunluluk durumunda, makul olduğu ölçüde önceden bildirimde bulunarak aboneliği askıya alabilir veya sona erdirebiliriz.',
        ),
      ],
    },
    {
      id: 'refunds',
      title: 'İadeler ve iptal',
      blocks: [
        p(
          'Hangi durumların iadeye hak kazandığı ve nasıl talep edileceği dahil ayrıntılı iade kurallarımız İade Politikamızda yer alır. Bu politika, bu Şartların bir parçasını oluşturur.',
        ),
        ul(
          'Tamamlanmış ve teslim edilmiş proje işleri genellikle iade edilemez; ancak anlaşılan garanti kapsamında gerçek bir hatayı her zaman ele alırız.',
          'Ön ödemeler kapasite ayırır ve yalnızca işe başlamadığımız ve iş tanımının izin verdiği durumlarda iade edilir.',
          'Mağaza üzerinden yapılan satın alımlar, ödemeyi işleyen mağaza tarafından kendi kurallarına göre iade edilir.',
          'Bu bölümdeki hiçbir hüküm, sözleşmeyle ortadan kaldırılamayacak yasal bir cayma hakkını sınırlamaz.',
        ),
      ],
    },
    {
      id: 'customer',
      title: 'Sorumluluklarınız',
      blocks: [
        ul(
          'Teslimat için ihtiyaç duyduğumuz kişilere, sistemlere, hesaplara, içeriğe ve onaylara zamanında erişim sağlayın.',
          'Sağladığınız her türlü içeriğin veya verinin hukuka uygun olduğunu, kullanım haklarına sahip olduğunuzu ve proje için işlememize izin verdiğinizi garanti edin.',
          'İmzalı bir belge yedekleme ve geri yüklemeden sorumlu olduğumuzu belirtmedikçe iş açısından kritik verilerinizin kendi yedeklerini tutun.',
          'Altyapınızı, cihazlarınızı ve giriş bilgilerinizi makul ölçüde güvenli tutun ve mevcut güncellemeleri uygulayın.',
          'Kilometre taşlarını ve değişiklikleri sizin adınıza onaylayabilecek bir karar verici belirleyin.',
          'Tüketici, gizlilik ve ihracat kuralları dahil, Hizmetleri kullanımınıza uygulanan tüm kanunlara uyun.',
        ),
      ],
    },
    {
      id: 'third-party',
      title: 'Üçüncü taraf hizmetler ve entegrasyonlar',
      blocks: [
        p(
          'Ürünlerimiz ve projelerimiz sıklıkla bulut barındırma, uygulama mağazaları, ödeme sağlayıcıları, harita hizmetleri, mesajlaşma sağlayıcıları ve yapay zekâ model sağlayıcıları gibi üçüncü taraf hizmetlere dayanır. Bu hizmetler kendi şartları ve gizlilik politikalarıyla yönetilir.',
        ),
        ul(
          'Sağlayıcıları özenle seçiyoruz ancak kullanılabilirlikleri, fiyatlandırmaları veya politika kararları üzerinde kontrolümüz yoktur.',
          'Bir üçüncü taraf sağlayıcıdaki değişiklik veya kesinti Hizmetleri etkileyebilir; hafifletme ve alternatifler konusunda iyi niyetle birlikte çalışırız.',
          'Üçüncü taraf sağlayıcılarla kendi hesaplarınızdan ve doğrudan onlara ödediğiniz ücretlerden siz sorumlusunuz.',
          'Bir entegrasyonun etkinleştirilmesi için sağlayıcı şartlarını kabul etmeniz gerektiğinde, entegrasyonu yapılandırma yetkisi verirsiniz ancak hesap sahibi siz olmaya devam edersiniz.',
        ),
      ],
    },
    {
      id: 'ip',
      title: 'Fikri mülkiyet ve sahiplik',
      blocks: [
        p(
          'Her taraf projeye getirdiği fikri mülkiyetin sahibi olmaya devam eder. Önceden var olan araçlarımız, çerçevelerimiz, tasarım sistemlerimiz, iç kütüphanelerimiz ve bilgi birikimimiz mülkiyetimizde kalır.',
        ),
        ul(
          'İlgili kilometre taşı veya proje için tam ödeme yapıldığında, sizin için özel olarak oluşturulan ve iş tanımında belirtilen Teslimatların haklarını, önceden var olan materyallerimiz hariç olmak üzere size devrederiz.',
          'Teslimatlar önceden var olan materyallerimizi içerdiğinde, bunları teslim edilen çözümün parçası olarak kullanmanız, değiştirmeniz ve bakımını yapmanız için süresiz, dünya çapında, münhasır olmayan, telifsiz bir lisans veririz.',
          'Açık kaynak bileşenler kendi lisanslarına tabi kalır ve bunları proje dokümantasyonunda belirtiriz.',
          'İş tanımında bir gizlilik kısıtı yoksa vaka çalışmaları, ekran görüntüleri ve işin genel bir tanımı portföyümüzde kullanılabilir.',
          'Bu bölümdeki hiçbir hüküm, yayınladığımız ve işlettiğimiz bir ürünün veya sattığımız bir lisansın mülkiyetini, açıkça verilen hakların ötesinde devretmez.',
        ),
        p(
          'Teslimatlardan veya ürünlerden telif bildirimlerini, lisans dosyalarını ya da atıf bildirimlerini kaldırmamalısınız.',
        ),
      ],
    },
    {
      id: 'license',
      title: 'Yazılım lisansı ve kısıtlamalar',
      blocks: [
        p(
          'Sahibi olduğumuz bir yazılım için lisans satın aldığınızda, bu yazılımı siparişinizde kayıtlı süre ve kapsamda kullanmanız için münhasır olmayan, devredilemez ve geri alınabilir bir lisans veriyoruz. Sipariş aksini belirtmedikçe lisans yalnızca kendi iç iş kullanımınızı kapsar.',
        ),
        p('Aşağıdakileri yapamazsınız ve başkalarının yapmasına izin veremezsiniz:'),
        ul(
          'Yazılımı, yazılı olarak açıkça izin verilmedikçe kopyalamak, yeniden satmak, alt lisanslamak, kiralamak veya dağıtmak.',
          'Yazılımı tersine mühendislik yapmak, kaynak koda dönüştürmek veya parçalarına ayırmak; ancak bu kısıtlamanın kanunla yasaklandığı ölçüde hariç.',
          'Lisans anahtarlarını, kullanım limitlerini, erişim kontrollerini veya ölçümlemeyi atlatmak.',
          'Tescilli bildirimleri kaldırmak veya yazılımı rakip bir ürün geliştirmek için kullanmak.',
          'Yazılımı hukuku ihlal edecek, hakları çiğneyecek veya güvenliği tehlikeye atacak şekilde kullanmak.',
        ),
        p(
          'Bu Şartları esaslı olarak ihlal eder ve bildirimden itibaren 14 gün içinde ihlali gidermezseniz lisans otomatik olarak sona erer. Sona erme durumunda kullanımı durdurmalı ve kanunun gerektirdiği arşiv kopyaları dışında kopyaları silmeli veya iade etmelisiniz.',
        ),
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Kabul edilebilir kullanım',
      blocks: [
        p('Hizmetlerimizi veya başkalarının bunları kullanmasına izin vermeyi aşağıdaki amaçlarla kullanamazsınız:'),
        ul(
          'Yürürlükteki herhangi bir kanunu, düzenlemeyi, mahkeme kararını veya yaptırım rejimini ihlal etmek.',
          'Üçüncü bir tarafın fikri mülkiyet, gizlilik, tanıtım veya diğer haklarını çiğnemek.',
          'Kötü amaçlı yazılım, oltalama içeriği, casus yazılım veya sistemleri bozmaya yönelik kod yayınlamak veya dağıtmak.',
          'Sistemlerimize, diğer müşterilerin ortamlarına veya başka bir kişinin hesabına yetkisiz erişim sağlamaya çalışmak.',
          'Hizmeti yavaşlatan otomatik kazıma, yazılı izin olmadan yük testi veya hizmet engelleme saldırıları yapmak.',
          'Taciz, nefret söylemi, cinsel sömürü materyali veya bir çocuğu tehlikeye atan içerik yaymak.',
          'İstenmeyen toplu mesaj göndermek, aldatıcı planlar yürütmek veya kimliğinizi yanlış tanıtmak.',
          'Sahibi olmadığınız verilerle rakip bir model veya ürün eğitmek için Hizmetleri kullanmak.',
        ),
        p(
          'Şüpheli ihlalleri inceleyebilir, içeriği kaldırabilir, trafiği sınırlandırabilir, hesapları askıya alabilir ve hukuka aykırı faaliyeti yetkili makamlara bildirebiliriz. Durum elverdiğinde, kalıcı işlem yapmadan önce size bildirimde bulunur ve yanıt verme fırsatı tanırız.',
        ),
      ],
    },
    {
      id: 'content',
      title: 'Müşteri içeriği ve uygulamalar',
      blocks: [
        p(
          'Müşteri İçeriğinin sahibi sizsiniz. Hizmetleri sunmak ve desteklemek, güvenliğini sağlamak ve hukuka uymak amacıyla Müşteri İçeriğini barındırmak, kopyalamak, iletmek, göstermek ve işlemek için bize sınırlı bir lisans verirsiniz.',
        ),
        ul(
          'Müşteri İçeriğinin doğruluğundan, kalitesinden ve hukuka uygunluğundan, ayrıca gerektirdiği bildirim ve rızalardan siz sorumlusunuz.',
          'Bu Şartları, geçerli ürün politikasını veya hukuku ihlal eden içeriği kaldırabiliriz; makul olduğunda sizi bilgilendiririz.',
          'Son kullanıcılara hizmet veren bir uygulama işletiyorsanız, kendi son kullanıcı şartlarınızdan, gizlilik bildiriminizden ve işleme için hukuki dayanağınızdan siz sorumlusunuz.',
          'Hizmet performansına ilişkin toplulaştırılmış ve kimliği gizlenmiş istatistikler, sizi veya bir kişiyi makul olarak tanımlayamadığı sürece ürünlerimizi işletmek, kıyaslamak ve iyileştirmek için kullanılabilir.',
        ),
      ],
    },
    {
      id: 'confidentiality',
      title: 'Gizlilik',
      blocks: [
        p(
          'Her taraf, diğerinin gizli saydığı iş planları, kaynak kodu, fiyatlandırma, güvenlik ayrıntıları veya kişisel veriler gibi bilgileri alabilir. Bilgiyi alan taraf bunu yalnızca sözleşmenin amaçları için kullanır, makul özenle korur ve erişimi ihtiyacı olan kişilerle sınırlar.',
        ),
        p(
          'Gizlilik yükümlülükleri; ihlal olmaksızın kamuya açık hale gelen, zaten hukuka uygun şekilde bilinen, bağımsız olarak geliştirilen veya kanunen açıklanması gereken bilgiler için geçerli değildir. Açıklama zorunlu olduğunda, bilgiyi alan taraf hukuken izin verildiği ölçüde derhal bildirimde bulunur.',
        ),
        p('Bu yükümlülükler sona ermeden sonra beş yıl, ticari sırlar ve kişisel veriler için süresiz olarak devam eder.'),
      ],
    },
    {
      id: 'data-protection',
      title: 'Veri koruma',
      blocks: [
        p(
          'Gizlilik Politikamız, kişisel verileri veri sorumlusu olarak nasıl işlediğimizi açıklar. Bir projede kişisel verileri sizin adınıza işlediğimizde veri işleyen olarak hareket eder ve yürürlükteki hukuku yansıtan bir veri işleme sözleşmesi yaparız.',
        ),
        ul(
          'Uygun teknik ve idari önlemleri uygular; veri sahibi taleplerinde, etki değerlendirmelerinde ve ihlal bildirimlerinde size yardımcı oluruz.',
          'Alt işleyenlerle yalnızca yazılı şartlar altında çalışırız ve kullandığımız alt işleyenlerin listesini yayınlarız.',
          'Verilerinizi etkileyen bir kişisel veri ihlalini öğrendikten sonra gecikmeksizin sizi bilgilendiririz.',
          'Sona ermede kişisel verileri talimatlarınıza ve geçerli saklama yükümlülüklerine uygun olarak iade eder veya sileriz.',
        ),
      ],
    },
    {
      id: 'warranty',
      title: 'Garantiler ve sorumluluk reddi',
      blocks: [
        p(
          'Profesyonel hizmetleri makul beceri ve özenle, genel kabul görmüş sektör standartlarına uygun olarak sunacağımızı ve Teslimatların kabulden sonraki 30 gün boyunca anlaşılan şartnameye esaslı olarak uyacağını garanti ederiz; iş tanımında farklı bir süre belirtilmişse o süre geçerlidir.',
        ),
        p(
          'Bu garantiye aykırılık durumunda tek çözümünüz, bizim tercihimizle hatanın düzeltilmesi, etkilenen işin yeniden yapılması veya uygunsuz unsur için ödenen ücretin iadesidir. Garanti; sizin veya üçüncü bir tarafın yaptığı değişikliklerden, belgelenen ortam dışında kullanımdan veya üçüncü taraf hizmetlerinden kaynaklanan hataları kapsamaz.',
        ),
        p(
          'Açıkça belirtilenler dışında Hizmetler "olduğu gibi" ve "mevcut olduğu şekilde" sunulur. Kesintisiz veya hatasız çalışma, her cihaz ya da tarayıcıyla uyumluluk veya üçüncü taraf hizmetlerin erişilebilir kalması garanti edilmez. Yayınlanan ürünler değişebilir; özellikler ürün geliştikçe eklenebilir, değiştirilebilir veya kaldırılabilir.',
        ),
        p('Bu Şartlardaki hiçbir hüküm, zorunlu tüketici hukuku kapsamında ortadan kaldırılamayacak bir garanti veya hakkı dışlamaz.'),
      ],
    },
    {
      id: 'support',
      title: 'Destek, bakım ve hizmet seviyeleri',
      blocks: [
        p(
          'Destek ve bakım yalnızca siparişiniz, aboneliğiniz veya iş tanımınız bunu öngörüyorsa dahildir. Dahil olduğunda destek; mesai saatleri içinde olay triyajı, hata düzeltme ve makul yapılandırma yardımını kapsar.',
        ),
        ul(
          'Destek; yeni özellikleri, kapsamlı yeniden tasarımları, içerik girişini, üçüncü taraf hizmet yönetimini veya yetkisiz değişiklikten kaynaklanan işleri kapsamaz.',
          'Yanıt hedefleri, kullanılabilirlik taahhütleri ve hizmet kredileri ilgili destek planında veya hizmet seviyesi sözleşmesinde tanımlanır.',
          'Planlı bakım hizmeti geçici olarak kesebilir. Yoğun saatler dışında planlamaya ve esaslı pencereler için önceden bildirim yapmaya çalışırız.',
          'Gecikmenin riski artıracağı durumlarda acil güvenlik bakımı önceden bildirim yapılmadan gerçekleştirilebilir.',
        ),
      ],
    },
    {
      id: 'liability',
      title: 'Sorumluluğun sınırlandırılması',
      blocks: [
        p(
          'Kanunun izin verdiği azami ölçüde, hiçbir taraf dolaylı, arızi, özel, sonuçsal veya cezai zararlardan ya da kâr kaybı, gelir kaybı, itibar kaybı, veri kaybı veya iş kesintisinden, olasılığı bilinse dahi sorumlu değildir.',
        ),
        p(
          'Sözleşmeden doğan veya sözleşmeyle bağlantılı toplam sorumluluğumuz, (a) talebe yol açan olaydan önceki on iki ayda Hizmetler için ödediğiniz veya ödemeniz gereken ücretler ile (b) bin ABD doları arasından yüksek olanla sınırlıdır. Ücretsiz bir ürün veya web sitesi ziyareti için sorumluluğumuz kanunun gerektirdiği ölçüyle sınırlıdır.',
        ),
        p(
          'Bu sınırlar; sahtekârlık, kasıtlı kötü davranış, ihmal sonucu ölüm veya bedensel yaralanma, gizlilik ihlali, fikri mülkiyet ihlali veya kanunen sınırlandırılamayacak herhangi bir sorumluluk için geçerli değildir.',
        ),
        p('Her taraf zararını azaltmak için makul adımlar atmalı ve talebi makul bir süre içinde diğer tarafa bildirmelidir.'),
      ],
    },
    {
      id: 'indemnity',
      title: 'Tazminat',
      blocks: [
        p(
          'Müşteri İçeriğinden, Hizmetleri hukuka aykırı kullanımınızdan veya bu Şartları ihlalinizden kaynaklanan üçüncü taraf talepleri, zararlar, cezalar ve makul hukuki masraflar için LitxTech’i tazmin eder ve zarar görmekten korursunuz; yeter ki bize derhal bildirimde bulunun ve savunmaya katılmamıza izin verin.',
        ),
        p(
          'Oluşturduğumuz bir Teslimatın üçüncü tarafın telif hakkını veya ticari sırrını ihlal ettiği iddiasına karşı sizi savunur ve kesinleşen ya da uzlaşmayla kararlaştırılan zararları öderiz; yeter ki bize derhal bildirimde bulunun, savunma kontrolünü verin ve makul şekilde işbirliği yapın. Böyle bir talep ortaya çıkarsa kullanıma devam hakkı sağlayabilir, etkilenen unsuru değiştirebilir veya onun için ödenen ücreti iade edebiliriz.',
        ),
        p(
          'Bu tazminat; talebin sizin içeriğinizden, değişikliklerinizden, Teslimatı üçüncü taraf materyalleriyle birleştirmenizden veya anlaşılan kapsam dışında kullanmanızdan kaynaklandığı durumlarda geçerli değildir.',
        ),
      ],
    },
    {
      id: 'term',
      title: 'Süre, askıya alma ve sona erme',
      blocks: [
        p(
          'Bu Şartlar, Hizmetleri kullandığınız sürece geçerlidir. Proje sözleşmesi iş tanımında belirtilen süre boyunca, abonelik fatura dönemi boyunca geçerlidir ve yukarıda açıklandığı şekilde yenilenir.',
        ),
        ul(
          'Her taraf, yazılı bildirimden itibaren 30 gün içinde giderilmeyen esaslı ihlal nedeniyle veya ihlalin giderilemediği durumlarda derhal sözleşmeyi feshedebilir.',
          'Her taraf, diğerinin ödeme güçlüğüne düşmesi, kayyım sürecine girmesi veya faaliyetini durdurması halinde derhal feshedebilir.',
          'Zararı önlemek, hukuka uymak veya sistemlerimizin ve diğer müşterilerin güvenliğini korumak için gerekli olduğunda Hizmetleri derhal askıya alabiliriz.',
          'Ücretsiz bir ürünü istediğiniz zaman kullanmayı bırakabilirsiniz; bu, doğmuş yükümlülükleri ortadan kaldırmaz.',
        ),
        p(
          'Sona ermede, yürürlük tarihine kadar gerçekleştirilen işler ve yapılan taahhütler için ödenmesi gereken tüm ücretleri ödemelisiniz. Ücretlendirilebilecek makul geçiş desteği sağlar ve hak kazandığınız teslimatları ve verileri erişilebilir kılarız. Niteliği gereği devam etmesi gereken mülkiyet, gizlilik, sorumluluk ve uygulanacak hukuk bölümleri yürürlükte kalır.',
        ),
      ],
    },
    {
      id: 'beta',
      title: 'Beta ve önizleme özellikleri',
      blocks: [
        p(
          'Beta, önizleme, deneysel veya erken erişim özellikleri sunabiliriz. Bunlar değerlendirme amacıyla sağlanır, bildirim olmaksızın değişebilir veya kaldırılabilir, hata içerebilir ve yazılı olarak aksini belirtmedikçe garanti ve hizmet seviyesi taahhütlerinin dışındadır.',
        ),
        p(
          'Bir beta özelliğine iş açısından kritik süreçler için güvenmemelisiniz ve içine yerleştirdiğiniz verilerin bağımsız yedeklerini tutmalısınız.',
        ),
      ],
    },
    {
      id: 'ai',
      title: 'Yapay zekâ destekli özellikler',
      blocks: [
        p(
          'Bazı ürünler yapay zekâ destekli yetenekler içerir. Çıktı olasılıksal olarak üretilir ve hatalı, eksik veya belirli bir amaca uygun olmayabilir. Özellikle hukuki, tıbbi, finansal veya güvenlikle ilgili bağlamlarda çıktıya dayanmadan önce gözden geçirmek sizin sorumluluğunuzdadır.',
        ),
        ul(
          'Özellik ve sözleşmeniz açıkça izin vermedikçe yapay zekâ özelliğine hassas kişisel veri, ticari sır veya düzenlemeye tabi içerik göndermeyin.',
          'Sağladığınız komutlardan, girdilerden ve talimatlardan ve çıktıyı nasıl kullandığınızdan siz sorumlusunuz.',
          'Hizmeti ve diğer kullanıcıları korumak için kullanım limitleri, hız limitleri ve içerik filtreleri uygulayabiliriz.',
          'Çıktının benzersiz olduğunu veya başka bir kullanıcı için üretilen materyale benzemediğini garanti etmiyoruz.',
        ),
      ],
    },
    {
      id: 'appstores',
      title: 'Uygulama mağazası şartları',
      blocks: [
        p(
          'Bir uygulamayı Apple App Store veya Google Play üzerinden indirirseniz o mağazanın şartlarını da kabul etmiş olursunuz. Mağaza bu sözleşmenin tarafı değildir ve kendi şartlarının öngördüğü haller dışında uygulamadan veya destekten sorumlu değildir.',
        ),
        ul(
          'Apple ve Google, satın alma ve indirme verilerini kendi gizlilik politikaları çerçevesinde işleyebilir.',
          'Bir uygulama için bakım, destek ve garanti yükümlülükleri, mağaza kurallarının izin verdiği ölçüde mağazanın değil bizim sorumluluğumuzdadır.',
          'Bir uygulama geçerli bir garantiye uymazsa mağazayı bilgilendirebilirsiniz; mağaza kendi politikasına uygun olarak satın alma bedelini iade edebilir.',
          'Mağaza sağlayıcısı ilgili hükümlerin üçüncü taraf lehtarıdır ve bunları size karşı uygulayabilir.',
        ),
      ],
    },
    {
      id: 'law',
      title: 'Uygulanacak hukuk ve uyuşmazlıklar',
      blocks: [
        p(
          'Bu Şartlar, kanunlar ihtilafı kuralları dikkate alınmaksızın Amerika Birleşik Devletleri’nin Wyoming eyaleti kanunlarına tabidir. Bu seçim, bir tüketiciyi ikamet ettiği ülkedeki zorunlu kuralların korumasından yoksun bırakmaz.',
        ),
        p(
          'Resmi bir süreç başlatmadan önce her iki taraf, sorunu ve önerilen çözümü açıklayan yazılı bildirimle ve ardından 30 gün içinde yapılacak bir görüşmeyle uyuşmazlığı iyi niyetle çözmeye çalışmayı kabul eder. Endişelerin çoğu bu yolla hızlıca çözülebilir.',
        ),
        p(
          'Gayri resmi çözüm başarısız olursa uyuşmazlıklar, ülkenizdeki zorunlu hukuk yerel mahkemelerinizde dava açma hakkı vermedikçe Wyoming’deki eyalet veya federal mahkemelerde görülür. Talepler yürürlükteki hukukun izin verdiği süre içinde ileri sürülmelidir.',
        ),
      ],
    },
    {
      id: 'general',
      title: 'Genel hükümler',
      blocks: [
        ul(
          'Devir: yazılı onayımız olmadan sözleşmeyi devredemezsiniz; biz bir iştirakimize veya birleşme ya da varlık satışıyla bağlantılı olarak devredebiliriz.',
          'Mücbir sebep: makul kontrolü dışındaki olaylardan kaynaklanan gecikmeden hiçbir taraf sorumlu değildir; yeter ki diğer tarafa bildirimde bulunulsun ve ifa mümkün olur olmaz sürdürülsün.',
          'Bildirimler: resmi bildirimler yazılı olmalı ve support@litxtech.com ile hesabınızdaki veya siparişinizdeki e-posta adresine gönderilmelidir.',
          'Bölünebilirlik: bir hüküm uygulanamaz bulunursa gerekli asgari ölçüde sınırlandırılır ve kalan hükümler yürürlükte kalır.',
          'Feragat yokluğu: bir hükmün uygulanmaması, ileride uygulama hakkından feragat anlamına gelmez.',
          'Bütünlük: bu Şartlar, geçerli sipariş, iş tanımı ve burada atıf yapılan politikalarla birlikte aramızdaki tüm sözleşmeyi oluşturur.',
          'Dil: bu Şartlar İngilizce ve Türkçe yayınlanır. Sürümler farklıysa, yerel hukukun aksini gerektirdiği haller dışında İngilizce sürüm geçerlidir.',
          'Tanıtım: fikri mülkiyet bölümünde izin verilen haller dışında hiçbir taraf, önceden yazılı onay olmaksızın diğerinin adını veya logolarını kamuya açık materyallerde kullanmaz.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Bu şartlardaki değişiklikler',
      blocks: [
        p(
          'Hizmetlerimizdeki, teknolojimizdeki veya yasal gerekliliklerdeki değişiklikleri yansıtmak için bu Şartları güncelleyebiliriz. Güncel sürüm, sürüm numarası ve yürürlük tarihiyle birlikte her zaman litxtech.com/terms-of-service adresinde bulunur.',
        ),
        p(
          'Esaslı değişiklikler için makul bir ön bildirim yaparız; örneğin hesap sahiplerine e-posta göndererek veya web sitesinde duyuru yayınlayarak. Bir değişikliği kabul etmiyorsanız yürürlüğe girmeden önce Hizmetleri kullanmayı bırakabilirsiniz; sonrasında kullanmaya devam etmeniz güncellenmiş Şartları kabul ettiğiniz anlamına gelir. Değişiklikler, imzalı bir iş tanımı kapsamında edinilmiş hakları geriye dönük olarak değiştirmez.',
        ),
      ],
    },
    {
      id: 'contact',
      title: 'İletişim',
      blocks: [
        p(
          'Bu Şartlar, lisanslama, faturalama veya belirli bir projeyle ilgili sorularınızı support@litxtech.com adresine gönderin. Hızlı yanıt verebilmemiz için şirket adınızı, ilgili ürün veya projeyi ve varsa sipariş ya da fatura referansını ekleyin.',
        ),
        p(
          'LitxTech LLC, Amerika Birleşik Devletleri’nin Wyoming eyaletinde tescillidir. Yazışma adresimiz ve vergi bilgilerimiz faturalarda yer alır ve e-posta ile talep edilebilir.',
        ),
      ],
    },
  ],
}

export const termsOfService: LegalDocSet = { en, tr }
