import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Baby,
  Ban,
  BookLock,
  Cookie,
  CreditCard,
  Database,
  FileText,
  KeyRound,
  Linkedin,
  Mail,
  ServerCog,
  Shield,
  ShieldCheck,
} from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { FOUNDER_LINKEDIN } from '@/components/legal/LegalPage'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/i18n/copy'
import type { LucideIcon } from 'lucide-react'

type DocCard = {
  to: string
  title: string
  description: string
  icon: LucideIcon
}

type AppPolicy = {
  name: string
  summary: string
  privacy: string
  terms: string
  accent: string
}

const content: Record<
  Lang,
  {
    eyebrow: string
    title: string
    lead: string
    coreTitle: string
    coreLead: string
    appTitle: string
    appLead: string
    appPrivacy: string
    appTerms: string
    founderTitle: string
    founderLead: string
    founderCta: string
    contactTitle: string
    contactLead: string
    contactCta: string
    noteTitle: string
    noteBody: string
  }
> = {
  en: {
    eyebrow: 'Legal & compliance',
    title: 'Legal documents',
    lead: 'Every policy that governs the LitxTech website, our published applications, the software we sell and the projects we deliver — written in plain language and kept up to date.',
    coreTitle: 'Company policies',
    coreLead: 'These documents apply to visitors, clients, licence holders and partners of LitxTech LLC.',
    appTitle: 'Product and application policies',
    appLead: 'Each published application has its own privacy notice and terms, describing its permissions, data categories and store requirements.',
    appPrivacy: 'Privacy',
    appTerms: 'Terms',
    founderTitle: 'Who is responsible',
    founderLead:
      'LitxTech LLC is a Wyoming company. The founder is directly reachable for legal, compliance and data protection matters.',
    founderCta: 'Connect on LinkedIn',
    contactTitle: 'Need something in writing?',
    contactLead:
      'We can provide a data processing agreement, a security summary, a completed vendor questionnaire or a signed copy of any document on this page.',
    contactCta: 'Request a document',
    noteTitle: 'How to read these documents',
    noteBody:
      'If you have signed a statement of work, master services agreement or data processing agreement with LitxTech, that signed document takes precedence over the general policies below where the two differ. A product-specific notice prevails over the general privacy policy for that product.',
  },
  tr: {
    eyebrow: 'Yasal ve uyum',
    title: 'Yasal belgeler',
    lead: 'LitxTech web sitesini, yayınladığımız uygulamaları, sattığımız yazılımları ve teslim ettiğimiz projeleri düzenleyen tüm politikalar — anlaşılır bir dille yazılmış ve güncel tutulmuştur.',
    coreTitle: 'Şirket politikaları',
    coreLead: 'Bu belgeler LitxTech LLC’nin ziyaretçileri, müşterileri, lisans sahipleri ve iş ortakları için geçerlidir.',
    appTitle: 'Ürün ve uygulama politikaları',
    appLead: 'Yayınlanan her uygulamanın izinlerini, veri kategorilerini ve mağaza gereksinimlerini açıklayan kendi gizlilik bildirimi ve şartları vardır.',
    appPrivacy: 'Gizlilik',
    appTerms: 'Şartlar',
    founderTitle: 'Kim sorumlu',
    founderLead:
      'LitxTech LLC bir Wyoming şirketidir. Kurucuya hukuk, uyum ve veri koruma konularında doğrudan ulaşılabilir.',
    founderCta: 'LinkedIn’de bağlantı kur',
    contactTitle: 'Yazılı bir belgeye mi ihtiyacınız var?',
    contactLead:
      'Veri işleme sözleşmesi, güvenlik özeti, doldurulmuş tedarikçi formu veya bu sayfadaki herhangi bir belgenin imzalı kopyasını sağlayabiliriz.',
    contactCta: 'Belge talep et',
    noteTitle: 'Bu belgeler nasıl okunmalı',
    noteBody:
      'LitxTech ile imzalı bir iş tanımı, ana hizmet sözleşmesi veya veri işleme sözleşmeniz varsa, çelişki halinde bu imzalı belge aşağıdaki genel politikalardan önce gelir. Ürüne özel bildirim, o ürün için genel gizlilik politikasından önce gelir.',
  },
}

const coreDocs: Record<Lang, DocCard[]> = {
  en: [
    {
      to: '/privacy-policy',
      title: 'Privacy Policy',
      description:
        'What personal data we collect across the website, applications and client projects, why we collect it, and the rights you can exercise.',
      icon: ShieldCheck,
    },
    {
      to: '/terms-of-service',
      title: 'Terms of Service',
      description:
        'The agreement for using the website, buying software or licences, subscribing to a product and commissioning a development project.',
      icon: FileText,
    },
    {
      to: '/commercial-agreement',
      title: 'Commercial Agreement',
      description:
        'Commercial terms for engagements: scope, delivery, acceptance, payment, ownership and commercial responsibilities.',
      icon: CreditCard,
    },
    {
      to: '/refund-policy',
      title: 'Refund Policy',
      description:
        'When refunds and cancellations apply to projects, licences, subscriptions and store purchases, and how to request one.',
      icon: BookLock,
    },
    {
      to: '/data-security-policy',
      title: 'Data Security',
      description:
        'The technical and organisational measures we apply: encryption, access control, monitoring, backups and incident response.',
      icon: Shield,
    },
    {
      to: '/subprocessors',
      title: 'Subprocessors',
      description:
        'The hosting, messaging, payment and analytics providers we rely on, with their purpose and location.',
      icon: ServerCog,
    },
    {
      to: '/account-deletion-policy',
      title: 'Account Deletion',
      description:
        'How to delete an account, what is removed, what must be retained and how long the process takes.',
      icon: KeyRound,
    },
    {
      to: '/cookies',
      title: 'Cookies',
      description:
        'The cookies and local storage keys we use, which ones are essential and how to change your analytics choice.',
      icon: Cookie,
    },
    {
      to: '/child-safety-policy',
      title: 'Child Safety',
      description:
        'Minimum ages, safeguards for younger users and the reporting route for content that endangers a child.',
      icon: Baby,
    },
    {
      to: '/community-policy',
      title: 'Community Policy',
      description:
        'Acceptable use rules for our social products: prohibited content, moderation and enforcement.',
      icon: Ban,
    },
    {
      to: '/privacy-policy#retention',
      title: 'Data Retention',
      description:
        'How long we keep enquiries, project records, invoices, account data, logs and recruitment files.',
      icon: Database,
    },
  ],
  tr: [
    {
      to: '/privacy-policy',
      title: 'Gizlilik Politikası',
      description:
        'Web sitesi, uygulamalar ve müşteri projelerinde hangi kişisel verileri, neden topladığımızı ve kullanabileceğiniz hakları açıklar.',
      icon: ShieldCheck,
    },
    {
      to: '/terms-of-service',
      title: 'Kullanım Şartları',
      description:
        'Web sitesini kullanma, yazılım veya lisans satın alma, ürün aboneliği ve yazılım projesi için geçerli sözleşme.',
      icon: FileText,
    },
    {
      to: '/commercial-agreement',
      title: 'Ticari Sözleşme',
      description:
        'Kapsam, teslimat, kabul, ödeme, mülkiyet ve ticari sorumluluklar dahil çalışma koşulları.',
      icon: CreditCard,
    },
    {
      to: '/refund-policy',
      title: 'İade Politikası',
      description:
        'Projeler, lisanslar, abonelikler ve mağaza satın alımlarında iade ve iptalin hangi durumlarda geçerli olduğu.',
      icon: BookLock,
    },
    {
      to: '/data-security-policy',
      title: 'Veri Güvenliği',
      description:
        'Uyguladığımız teknik ve idari önlemler: şifreleme, erişim kontrolü, izleme, yedekleme ve olay müdahalesi.',
      icon: Shield,
    },
    {
      to: '/subprocessors',
      title: 'Alt İşleyenler',
      description:
        'Kullandığımız barındırma, mesajlaşma, ödeme ve analiz sağlayıcıları; amaçları ve bulundukları ülkeler.',
      icon: ServerCog,
    },
    {
      to: '/account-deletion-policy',
      title: 'Hesap Silme',
      description:
        'Hesabın nasıl silineceği, nelerin kaldırılacağı, nelerin saklanması gerektiği ve sürecin ne kadar sürdüğü.',
      icon: KeyRound,
    },
    {
      to: '/cookies',
      title: 'Çerezler',
      description:
        'Kullandığımız çerezler ve yerel depolama anahtarları, hangilerinin zorunlu olduğu ve analiz tercihinizi nasıl değiştireceğiniz.',
      icon: Cookie,
    },
    {
      to: '/child-safety-policy',
      title: 'Çocuk Güvenliği',
      description:
        'Asgari yaşlar, genç kullanıcılar için koruma önlemleri ve çocuğu tehlikeye atan içeriği bildirme yolu.',
      icon: Baby,
    },
    {
      to: '/community-policy',
      title: 'Topluluk Politikası',
      description:
        'Sosyal ürünlerimiz için kabul edilebilir kullanım kuralları: yasak içerik, moderasyon ve yaptırımlar.',
      icon: Ban,
    },
    {
      to: '/privacy-policy#retention',
      title: 'Veri Saklama',
      description:
        'Talepleri, proje kayıtlarını, faturaları, hesap verilerini, kayıtları ve işe alım dosyalarını ne kadar sakladığımız.',
      icon: Database,
    },
  ],
}

const appPolicies: Record<Lang, AppPolicy[]> = {
  en: [
    {
      name: 'KBS Prime',
      summary: 'Live-card and community social platform',
      privacy: '/kbs-prime-privacy',
      terms: '/kbs-prime-terms',
      accent: 'from-violet-500/20 to-blue-500/10',
    },
    {
      name: 'Valoria Hotel',
      summary: 'Guest communication and mobile experience for hotels',
      privacy: '/valoria-app-privacy',
      terms: '/valoria-app-terms',
      accent: 'from-amber-500/20 to-orange-500/10',
    },
    {
      name: 'Vora',
      summary: 'City news, community and instant communication',
      privacy: '/vora/gizlilik',
      terms: '/vora/kullanim-sartlari',
      accent: 'from-sky-500/20 to-indigo-500/10',
    },
    {
      name: 'SAFDAŞ',
      summary: 'Prayer times, Quran, qibla and Islamic community',
      privacy: '/safdas/gizlilik',
      terms: '/safdas/kullanim-sartlari',
      accent: 'from-emerald-500/20 to-teal-500/10',
    },
    {
      name: 'Tamuso',
      summary: 'Live voice rooms and audio community',
      privacy: '/tamuso/gizlilik',
      terms: '/tamuso/kullanim-sartlari',
      accent: 'from-fuchsia-500/20 to-purple-500/10',
    },
    {
      name: 'Nocta',
      summary: 'Night-life discovery and social planning',
      privacy: '/nocta/gizlilik',
      terms: '/nocta/kullanim-sartlari',
      accent: 'from-indigo-500/20 to-slate-500/10',
    },
  ],
  tr: [
    {
      name: 'KBS Prime',
      summary: 'Canlı kart ve topluluk odaklı sosyal platform',
      privacy: '/kbs-prime-privacy',
      terms: '/kbs-prime-terms',
      accent: 'from-violet-500/20 to-blue-500/10',
    },
    {
      name: 'Valoria Hotel',
      summary: 'Oteller için konuk iletişimi ve mobil deneyim',
      privacy: '/valoria-app-privacy',
      terms: '/valoria-app-terms',
      accent: 'from-amber-500/20 to-orange-500/10',
    },
    {
      name: 'Vora',
      summary: 'Şehir haberleri, topluluk ve anlık haberleşme',
      privacy: '/vora/gizlilik',
      terms: '/vora/kullanim-sartlari',
      accent: 'from-sky-500/20 to-indigo-500/10',
    },
    {
      name: 'SAFDAŞ',
      summary: 'Namaz vakitleri, Kur’an, kıble ve İslami topluluk',
      privacy: '/safdas/gizlilik',
      terms: '/safdas/kullanim-sartlari',
      accent: 'from-emerald-500/20 to-teal-500/10',
    },
    {
      name: 'Tamuso',
      summary: 'Canlı sesli odalar ve sesli topluluk',
      privacy: '/tamuso/gizlilik',
      terms: '/tamuso/kullanim-sartlari',
      accent: 'from-fuchsia-500/20 to-purple-500/10',
    },
    {
      name: 'Nocta',
      summary: 'Gece hayatı keşfi ve sosyal planlama',
      privacy: '/nocta/gizlilik',
      terms: '/nocta/kullanim-sartlari',
      accent: 'from-indigo-500/20 to-slate-500/10',
    },
  ],
}

export function LegalDocumentPage() {
  const { language } = useLanguage()
  const c = content[language]
  const docs = coreDocs[language]
  const apps = appPolicies[language]

  return (
    <MarketingChrome>
      <SeoHead
        title={language === 'tr' ? 'Yasal Belgeler | LitxTech' : 'Legal Documents | LitxTech'}
        description={
          language === 'tr'
            ? 'LitxTech LLC tarafından yayınlanan tüm yasal belgeler: gizlilik, kullanım şartları, veri güvenliği, iade ve uygulama politikaları.'
            : 'Every legal document published by LitxTech LLC: privacy, terms of service, data security, refund and application-specific policies.'
        }
        path="/legal"
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-[0.35]" />
        <div className="ltx-container-wide relative py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="ltx-pill">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-sky-400/15">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-300" />
              </span>
              {c.eyebrow}
            </div>
            <h1 className="ltx-h1 mt-5 text-balance">{c.title}</h1>
            <p className="mt-5 text-[15px] leading-[1.8] text-slate-400">{c.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/privacy-policy" className="ltx-btn-primary">
                <ShieldCheck className="h-4 w-4" />
                {docs[0].title}
              </Link>
              <Link to="/terms-of-service" className="ltx-btn-secondary">
                <FileText className="h-4 w-4" />
                {docs[1].title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="ltx-card p-6 sm:p-7">
          <h2 className="font-display text-base font-semibold text-white">{c.noteTitle}</h2>
          <p className="mt-2 max-w-4xl text-[13.5px] leading-relaxed text-slate-400">{c.noteBody}</p>
        </div>

        <div className="mt-14">
          <p className="ltx-eyebrow">{c.coreTitle}</p>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-400">{c.coreLead}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => {
              const Icon = doc.icon
              return (
                <Link
                  key={`${doc.to}-${doc.title}`}
                  to={doc.to}
                  className="group ltx-card flex flex-col gap-3 p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-sky-300" />
                  </span>
                  <span className="flex items-center gap-1.5 font-display text-[15px] font-semibold text-white">
                    {doc.title}
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-sky-300" />
                  </span>
                  <span className="text-[13px] leading-relaxed text-slate-500">{doc.description}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-16">
          <p className="ltx-eyebrow">{c.appTitle}</p>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-400">{c.appLead}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <div
                key={app.name}
                className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${app.accent} p-5`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[#06080f]/70" />
                <div className="relative">
                  <h3 className="font-display text-[15px] font-semibold text-white">{app.name}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{app.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to={app.privacy}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.05] px-2.5 py-1.5 text-[12px] font-medium text-slate-200 transition hover:border-white/25 hover:text-white"
                    >
                      {c.appPrivacy}
                      <ArrowUpRight className="h-3 w-3 opacity-60" />
                    </Link>
                    <Link
                      to={app.terms}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.05] px-2.5 py-1.5 text-[12px] font-medium text-slate-200 transition hover:border-white/25 hover:text-white"
                    >
                      {c.appTerms}
                      <ArrowUpRight className="h-3 w-3 opacity-60" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14] p-6 sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_100%_0%,rgba(56,189,248,0.14),transparent_65%)]" />
            <div className="relative">
              <h2 className="font-display text-lg font-semibold text-white">{c.founderTitle}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{c.founderLead}</p>
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-sky-400/25 bg-sky-500/10 px-4 py-2.5 text-[13px] font-medium text-sky-100 transition hover:border-sky-300/40 hover:bg-sky-500/15 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                Soner Toprak
                <span className="text-sky-300/60">·</span>
                <span className="text-sky-200/80">{c.founderCta}</span>
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
            <h2 className="font-display text-lg font-semibold text-white">{c.contactTitle}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{c.contactLead}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href="mailto:support@litxtech.com" className="ltx-btn-primary ltx-btn-sm">
                <Mail className="h-4 w-4" />
                {c.contactCta}
              </a>
              <Link to="/destek" className="ltx-btn-secondary ltx-btn-sm">
                {language === 'tr' ? 'Destek merkezi' : 'Support centre'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingChrome>
  )
}
