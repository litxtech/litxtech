import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  FileText,
  Linkedin,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/i18n/copy'
import type { LegalBlock, LegalDoc } from '@/data/legal/types'

export const FOUNDER_LINKEDIN =
  'https://www.linkedin.com/in/soner-toprak-ba4597449'

const chrome = {
  en: {
    onThisPage: 'On this page',
    version: 'Version',
    effective: 'Effective',
    updated: 'Last updated',
    related: 'Related documents',
    relatedLead: 'The documents below complete this one. Where a signed agreement exists, that agreement prevails.',
    contactTitle: 'Questions about this document?',
    contactLead: 'Write to our team and we will reply within three business days.',
    contactCta: 'Contact support',
    hub: 'All legal documents',
    backHome: 'Back to home',
    founder: 'Founder, LitxTech LLC',
    founderCta: 'Company owner on LinkedIn',
    documents: [
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms-of-service', label: 'Terms of Service' },
      { to: '/commercial-agreement', label: 'Commercial Agreement' },
      { to: '/refund-policy', label: 'Refund Policy' },
      { to: '/data-security-policy', label: 'Data Security' },
      { to: '/subprocessors', label: 'Subprocessors' },
      { to: '/account-deletion-policy', label: 'Account Deletion' },
      { to: '/legal', label: 'Legal index' },
    ],
    contents: 'Contents',
  },
  tr: {
    onThisPage: 'Bu sayfada',
    version: 'Sürüm',
    effective: 'Yürürlük',
    updated: 'Son güncelleme',
    related: 'İlgili belgeler',
    relatedLead: 'Aşağıdaki belgeler bu metni tamamlar. İmzalı bir sözleşme varsa, o sözleşme geçerlidir.',
    contactTitle: 'Bu belgeyle ilgili sorunuz mu var?',
    contactLead: 'Ekibimize yazın, üç iş günü içinde yanıt verelim.',
    contactCta: 'Destek ile iletişime geç',
    hub: 'Tüm yasal belgeler',
    backHome: 'Ana sayfaya dön',
    founder: 'Kurucu, LitxTech LLC',
    founderCta: 'Şirket sahibi LinkedIn’de',
    documents: [
      { to: '/privacy-policy', label: 'Gizlilik Politikası' },
      { to: '/terms-of-service', label: 'Kullanım Şartları' },
      { to: '/commercial-agreement', label: 'Ticari Sözleşme' },
      { to: '/refund-policy', label: 'İade Politikası' },
      { to: '/data-security-policy', label: 'Veri Güvenliği' },
      { to: '/subprocessors', label: 'Alt İşleyenler' },
      { to: '/account-deletion-policy', label: 'Hesap Silme' },
      { to: '/legal', label: 'Yasal dizin' },
    ],
    contents: 'İçindekiler',
  },
} as const satisfies Record<Lang, unknown>

const LINK_PATTERN = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g

function RichText({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN).filter((part) => part !== '')

  return (
    <>
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          const label = part.replace(/^https?:\/\//, '').replace(/\/$/, '')
          return (
            <a
              key={`${part}-${index}`}
              href={part}
              className="font-medium text-sky-300 underline decoration-sky-400/30 underline-offset-4 transition hover:text-sky-200"
            >
              {label}
            </a>
          )
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
          return (
            <a
              key={`${part}-${index}`}
              href={`mailto:${part}`}
              className="font-medium text-sky-300 underline decoration-sky-400/30 underline-offset-4 transition hover:text-sky-200"
            >
              {part}
            </a>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'p') {
          return (
            <p key={index} className="text-[14.5px] leading-[1.85] text-slate-400">
              <RichText text={block.text} />
            </p>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="space-y-2.5">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[14px] leading-[1.8] text-slate-400 before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gradient-to-br before:from-sky-400 before:to-violet-400"
                >
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )
        }

        return (
          <div
            key={index}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
          >
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-200">
              {block.title}
            </h4>
            <div className="mt-3 space-y-3">
              <Blocks blocks={block.blocks} />
            </div>
          </div>
        )
      })}
    </>
  )
}

type LegalPageProps = {
  doc: LegalDoc
  path: string
  seoTitle: string
  seoDescription: string
}

export function LegalPage({ doc, path, seoTitle, seoDescription }: LegalPageProps) {
  const { language } = useLanguage()
  const location = useLocation()
  const c = chrome[language]

  useEffect(() => {
    if (!location.hash) return
    const target = document.getElementById(location.hash.slice(1))
    if (!target) return
    const frame = requestAnimationFrame(() =>
      target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    )
    return () => cancelAnimationFrame(frame)
  }, [location.hash, doc])

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoTitle,
      description: seoDescription,
      inLanguage: language === 'tr' ? 'tr' : 'en',
      isPartOf: { '@type': 'WebSite', name: 'LitxTech', url: 'https://www.litxtech.com' },
      publisher: { '@type': 'Organization', name: 'LitxTech LLC' },
      dateModified: doc.updated,
    }),
    [doc.updated, language, seoDescription, seoTitle],
  )

  return (
    <MarketingChrome>
      <SeoHead title={seoTitle} description={seoDescription} path={path} type="article" jsonLd={jsonLd} />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-[0.35]" />
        <div className="ltx-container-wide relative py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="ltx-pill">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-sky-400/15">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-300" />
              </span>
              {doc.eyebrow}
            </div>
            <h1 className="ltx-h1 mt-5 text-balance">{doc.title}</h1>
            <p className="mt-5 text-[15px] leading-[1.8] text-slate-400">{doc.summary}</p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="ltx-chip gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                {doc.version}
              </span>
              <span className="ltx-chip gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-sky-300" />
                {c.updated}: {doc.updated}
              </span>
              <span className="ltx-chip gap-1.5">
                <FileText className="h-3.5 w-3.5 text-violet-300" />
                {c.effective}: {doc.effective}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:support@litxtech.com" className="ltx-btn-primary">
                <Mail className="h-4 w-4" />
                {c.contactCta}
              </a>
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="ltx-btn-secondary"
              >
                <Linkedin className="h-4 w-4 text-sky-400" />
                {c.founderCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <details className="ltx-card p-5 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-semibold text-white [&::-webkit-details-marker]:hidden">
                {c.contents}
                <span className="text-lg leading-none text-slate-500">+</span>
              </summary>
              <ol className="mt-4 space-y-2">
                {doc.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-2 text-[13px] leading-snug text-slate-400 transition hover:text-white"
                    >
                      <span className="tabular-nums text-slate-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="hidden lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {c.onThisPage}
              </p>
              <nav className="mt-4 border-l border-white/[0.08]">
                <ol className="space-y-0.5">
                  {doc.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex gap-2.5 border-l-2 border-transparent py-1.5 pl-3.5 text-[12.5px] leading-snug text-slate-500 transition hover:border-sky-400/60 hover:text-slate-200"
                      >
                        <span className="tabular-nums text-slate-600 group-hover:text-sky-400/80">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Document body */}
          <div className="min-w-0">
            <div className="space-y-10">
              {doc.sections.map((section, index) => (
                <article key={section.id} id={section.id} className="scroll-mt-28">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[13px] font-semibold tabular-nums text-sky-400/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-[19px] font-semibold tracking-tight text-white sm:text-xl">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4 border-l border-white/[0.06] pl-3 sm:pl-5">
                    <Blocks blocks={section.blocks} />
                  </div>
                </article>
              ))}
            </div>

            {/* Related documents */}
            <div className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
              <h2 className="font-display text-lg font-semibold text-white">{c.related}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{c.relatedLead}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.documents
                  .filter((item) => item.to !== path)
                  .map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 opacity-60" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Contact */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b14] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_90%_0%,rgba(56,189,248,0.14),transparent_65%)]" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{c.contactTitle}</h2>
                  <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate-400">
                    {c.contactLead}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
                  <a href="mailto:support@litxtech.com" className="ltx-btn-primary">
                    <Mail className="h-4 w-4" />
                    support@litxtech.com
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12.5px] font-medium text-slate-400 transition hover:text-white"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-sky-400" />
                    {c.founder}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <Link to="/legal" className="font-medium text-sky-300 transition hover:text-sky-200">
                {c.hub}
              </Link>
              <Link to="/" className="text-slate-500 transition hover:text-slate-300">
                {c.backHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingChrome>
  )
}
