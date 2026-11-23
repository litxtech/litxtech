import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowUpRight, Smartphone } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { solutionsData } from '@/data/solutionsData'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/i18n/copy'
import { trackEvent } from '@/lib/publicCms'

type ProductText = { name: string; tagline: string; category: string }

type Product = {
  slug: string
  name?: string
  tagline?: string | null
  short_description?: string | null
  description?: string | null
  category?: string | null
  platforms?: string[] | null
  website_url?: string | null
  ios_url?: string | null
  android_url?: string | null
  features?: { title?: string; description?: string }[] | string[] | null
  lifecycle?: string | null
  badges?: string[] | null
  internalPath?: string
  text?: Record<Lang, ProductText>
}

const knownProducts: Product[] = [
  {
    slug: 'safdas',
    internalPath: '/safdas',
    text: {
      en: { name: 'SAFDAŞ', tagline: 'Prayer times, Quran, qibla and an Islamic social community.', category: 'Faith' },
      tr: { name: 'SAFDAŞ', tagline: 'Namaz vakitleri, Kur’an, kıble ve İslami sosyal topluluk.', category: 'İnanç' },
    },
  },
  {
    slug: 'vora',
    internalPath: '/vora',
    text: {
      en: { name: 'Vora', tagline: 'City channels and community messaging for the Black Sea region.', category: 'Community' },
      tr: { name: 'Vora', tagline: 'Karadeniz bölgesi için şehir kanalları ve topluluk mesajlaşması.', category: 'Topluluk' },
    },
  },
  {
    slug: 'tamuso',
    internalPath: '/tamuso',
    text: {
      en: { name: 'Tamuso', tagline: 'Live audio rooms with speaker and listener roles.', category: 'Social' },
      tr: { name: 'Tamuso', tagline: 'Konuşmacı ve dinleyici rollerine sahip canlı sesli odalar.', category: 'Sosyal' },
    },
  },
  {
    slug: 'nocta',
    internalPath: '/nocta',
    text: {
      en: { name: 'Nocta', tagline: 'A social discovery product with its own privacy and support pages.', category: 'Social' },
      tr: { name: 'Nocta', tagline: 'Kendi gizlilik ve destek sayfalarına sahip sosyal keşif ürünü.', category: 'Sosyal' },
    },
  },
  {
    slug: 'mytrabzon',
    internalPath: '/mytrabzon',
    text: {
      en: { name: 'MyTrabzon', tagline: 'A city guide and community app for Trabzon.', category: 'City' },
      tr: { name: 'MyTrabzon', tagline: 'Trabzon için şehir rehberi ve topluluk uygulaması.', category: 'Şehir' },
    },
  },
  {
    slug: 'valoria',
    internalPath: '/valoria-app',
    text: {
      en: { name: 'Valoria', tagline: 'A mobile guest experience for a hotel brand.', category: 'Hospitality' },
      tr: { name: 'Valoria', tagline: 'Bir otel markası için mobil misafir deneyimi.', category: 'Konaklama' },
    },
  },
  {
    slug: 'kbs-prime',
    website_url: 'https://kbsprime.com',
    internalPath: '/kbs-prime',
    text: {
      en: { name: 'KBS Prime', tagline: 'A live social product published by LitxTech.', category: 'Social' },
      tr: { name: 'KBS Prime', tagline: 'LitxTech tarafından yayınlanan canlı sosyal ürün.', category: 'Sosyal' },
    },
  },
]

function productHref(product: Product) {
  if (product.internalPath) return product.internalPath
  if (product.website_url && product.website_url.startsWith('/')) return product.website_url
  return `/products/${product.slug}`
}

function resolveProduct(product: Product, language: Lang): ProductText {
  if (product.text) return product.text[language]
  return {
    name: product.name || product.slug,
    tagline: product.tagline || product.short_description || '',
    category: product.category || '',
  }
}

function PhoneFrame({ name, lines }: { name: string; lines: string[] }) {
  return (
    <div className="mx-auto w-[240px] rounded-[2rem] border border-white/[0.12] bg-[#0a0f1a] p-3 shadow-2xl shadow-black/60">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/15" />
      <div className="rounded-[1.35rem] border border-white/[0.08] bg-[#0d1421] p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-sky-300">{name}</p>
        <div className="mt-4 space-y-2">
          {lines.slice(0, 4).map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-[11px] leading-snug text-slate-300"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductsPage() {
  const { language, t } = useLanguage()
  const c = t.catalog
  const [remote, setRemote] = useState<Product[]>([])

  useEffect(() => {
    void trackEvent('product_view', '/products')
    fetch('/api/public/products')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.products)) setRemote(d.products)
      })
      .catch(() => {})
  }, [])

  // CMS product rows are Turkish-authored; English uses the curated local set.
  const products = language === 'tr' && remote.length ? remote : knownProducts

  return (
    <MarketingChrome>
      <SeoHead title={c.productsMetaTitle} description={c.productsMetaDescription} path="/products" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <p className="ltx-eyebrow">{c.productsEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.productsTitle}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.productsLead}</p>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const text = resolveProduct(product, language)
            return (
              <Link
                key={product.slug}
                to={productHref(product)}
                className="ltx-card-interactive group flex flex-col p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-violet-500/10 text-sky-300 ring-1 ring-white/10">
                    <Smartphone className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-white" />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  {text.category || c.productsEyebrow}
                </p>
                <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
                  {text.name}
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{text.tagline}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const c = t.catalog
  const fallback = knownProducts.find((item) => item.slug === slug)
  const [product, setProduct] = useState<Product | null>(fallback || null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!slug) return
    void trackEvent('product_view', `/products/${slug}`)
    fetch(`/api/public/products/${slug}`)
      .then(async (r) => {
        const data = await r.json()
        if (!r.ok || !data.product) {
          if (!fallback) setMissing(true)
          return
        }
        setProduct(data.product)
      })
      .catch(() => {
        if (!fallback) setMissing(true)
      })
  }, [slug, fallback])

  if (missing || !product) {
    return (
      <MarketingChrome>
        <SeoHead title={`${c.notFoundTitle} | LitxTech`} path={`/products/${slug || ''}`} robots="noindex,follow" />
        <div className="ltx-container py-24 text-center">
          <h1 className="ltx-h2">{c.notFoundTitle}</h1>
          <Link to="/products" className="ltx-btn-secondary mt-7">
            {c.productsEyebrow}
          </Link>
        </div>
      </MarketingChrome>
    )
  }

  const text = resolveProduct(product, language)
  const featureLines = Array.isArray(product.features)
    ? product.features
        .map((feature) => (typeof feature === 'string' ? feature : feature.title || ''))
        .filter(Boolean)
    : [text.tagline]

  return (
    <MarketingChrome>
      <SeoHead
        title={`${text.name} | LitxTech`}
        description={text.tagline || `${text.name} by LitxTech.`}
        path={`/products/${product.slug}`}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container-wide relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="ltx-eyebrow">{text.category || c.productsEyebrow}</p>
            <h1 className="ltx-h1 mt-4">{text.name}</h1>
            <p className="mt-4 text-lg font-medium text-slate-300">{text.tagline}</p>
            {product.description && (
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-400">{product.description}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {(product.platforms || []).map((platform) => (
                <span key={platform} className="ltx-pill !py-1 !text-[11px]">
                  {platform}
                </span>
              ))}
              {product.lifecycle && (
                <span className="ltx-pill !border-sky-400/25 !bg-sky-400/10 !py-1 !text-[11px] !text-sky-200">
                  {product.lifecycle}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {product.internalPath && (
                <Link to={product.internalPath} className="ltx-btn-primary">
                  {t.projects.openProduct}
                </Link>
              )}
              {!product.internalPath && fallback?.internalPath && (
                <Link to={fallback.internalPath} className="ltx-btn-primary">
                  {t.projects.openProduct}
                </Link>
              )}
              {product.ios_url && (
                <a
                  href={product.ios_url}
                  className="ltx-btn-secondary"
                  onClick={() => trackEvent('app_store_click', `/products/${product.slug}`)}
                >
                  App Store
                </a>
              )}
              {product.android_url && (
                <a
                  href={product.android_url}
                  className="ltx-btn-secondary"
                  onClick={() => trackEvent('google_play_click', `/products/${product.slug}`)}
                >
                  Google Play
                </a>
              )}
              <Link to="/contact" className="ltx-btn-ghost">
                {t.nav.startProject}
              </Link>
            </div>
          </div>

          <PhoneFrame name={text.name} lines={featureLines.length ? featureLines : [text.name]} />
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ServicesPage() {
  const { language, t } = useLanguage()
  const c = t.catalog
  const services = useMemo(
    () =>
      solutionsData.map((item) => ({
        slug: item.slug,
        title: item.text[language].title,
        description: item.text[language].cardDescription,
      })),
    [language],
  )

  return (
    <MarketingChrome>
      <SeoHead title={c.servicesMetaTitle} description={c.servicesMetaDescription} path="/services" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <p className="ltx-eyebrow">{c.servicesEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.servicesTitle}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.servicesLead}</p>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="ltx-card-interactive group p-6">
              <h2 className="font-display text-[17px] font-semibold tracking-tight text-white">
                {service.title}
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-300">
                {c.explore}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const c = t.catalog
  const local = solutionsData.find((item) => item.slug === slug)
  const localText = local ? local.text[language] : null

  return (
    <MarketingChrome>
      {localText && local ? (
        <>
          <SeoHead
            title={localText.metaTitle}
            description={localText.metaDescription}
            path={`/services/${local.slug}`}
          />
          <section className="relative overflow-hidden border-b border-white/[0.07]">
            <div className="pointer-events-none absolute inset-0 ltx-aurora" />
            <div className="ltx-container relative py-16 sm:py-20">
              <p className="ltx-eyebrow">{c.servicesEyebrow}</p>
              <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{localText.title}</h1>
              <p className="ltx-lead mt-5 max-w-2xl">{localText.cardDescription}</p>
            </div>
          </section>

          <article className="ltx-container ltx-section">
            <p className="max-w-3xl text-[14.5px] leading-relaxed text-slate-400">{localText.problem}</p>
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {localText.features.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[13.5px] text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="ltx-btn-primary">
                {t.nav.startProject}
              </Link>
              <Link to={`/cozumler/${local.slug}`} className="ltx-btn-secondary">
                {t.solutions.cardCta}
              </Link>
            </div>
          </article>
        </>
      ) : (
        <>
          <SeoHead title={`${c.servicesMetaTitle}`} description={c.servicesMetaDescription} path={`/services/${slug}`} />
          <div className="ltx-container py-24 text-center">
            <h1 className="ltx-h2">{c.notFoundTitle}</h1>
            <Link to="/services" className="ltx-btn-secondary mt-7">
              {c.servicesEyebrow}
            </Link>
          </div>
        </>
      )}
    </MarketingChrome>
  )
}

const TECH_GROUPS = [
  {
    category: { en: 'Frontend', tr: 'Arayüz' },
    items: [
      { name: 'React', desc: { en: 'Component-based interfaces', tr: 'Bileşen tabanlı arayüzler' } },
      { name: 'TypeScript', desc: { en: 'Type-safe application code', tr: 'Tip güvenli uygulama kodu' } },
      { name: 'Tailwind CSS', desc: { en: 'Consistent design system', tr: 'Tutarlı tasarım sistemi' } },
      { name: 'Vite', desc: { en: 'Fast builds and dev server', tr: 'Hızlı derleme ve geliştirme sunucusu' } },
    ],
  },
  {
    category: { en: 'Backend & data', tr: 'Backend ve veri' },
    items: [
      { name: 'Node.js', desc: { en: 'API and edge functions', tr: 'API ve edge fonksiyonları' } },
      { name: 'PostgreSQL', desc: { en: 'Relational data model', tr: 'İlişkisel veri modeli' } },
      { name: 'Supabase', desc: { en: 'Auth, storage and realtime', tr: 'Kimlik, depolama ve gerçek zamanlı' } },
      { name: 'REST / Webhooks', desc: { en: 'System integrations', tr: 'Sistem entegrasyonları' } },
    ],
  },
  {
    category: { en: 'Mobile', tr: 'Mobil' },
    items: [
      { name: 'React Native', desc: { en: 'Cross-platform app delivery', tr: 'Platformlar arası uygulama' } },
      { name: 'iOS & Android', desc: { en: 'Store-ready releases', tr: 'Mağazaya hazır sürümler' } },
    ],
  },
  {
    category: { en: 'Infrastructure', tr: 'Altyapı' },
    items: [
      { name: 'Cloudflare', desc: { en: 'Global edge delivery', tr: 'Küresel edge dağıtımı' } },
      { name: 'Observability', desc: { en: 'Monitoring and alerting', tr: 'İzleme ve uyarı' } },
    ],
  },
]

export function TechnologyPage() {
  const { language, t } = useLanguage()
  const c = t.catalog

  return (
    <MarketingChrome>
      <SeoHead title={c.technologyMetaTitle} description={c.technologyMetaDescription} path="/technology" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <p className="ltx-eyebrow">{c.technologyEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.technologyTitle}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.technologyLead}</p>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-8 md:grid-cols-2">
          {TECH_GROUPS.map((group) => (
            <div key={group.category.en}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/80">
                {group.category[language]}
              </h2>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div key={item.name} className="ltx-card p-4">
                    <p className="text-[14px] font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{item.desc[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ProcessPage() {
  const { t } = useLanguage()
  const c = t.catalog
  const steps = t.homeLists.process

  return (
    <MarketingChrome>
      <SeoHead title={c.processMetaTitle} description={c.processMetaDescription} path="/process" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{c.processEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.processTitle}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.processLead}</p>
        </div>
      </section>

      <section className="ltx-container ltx-section">
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <span className="font-display text-sm font-semibold text-sky-300/80">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-white">{step.title}</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/contact" className="ltx-btn-primary mt-9">
          {c.talkCta}
        </Link>
      </section>
    </MarketingChrome>
  )
}

export function CaseStudiesPage() {
  const { t } = useLanguage()
  const c = t.catalog
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/public/cases')
      .then((r) => r.json())
      .then((d) => setItems(d.cases || []))
      .catch(() => {})
  }, [])

  return (
    <MarketingChrome>
      <SeoHead title={c.casesMetaTitle} description={c.casesMetaDescription} path="/case-studies" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{c.casesEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.casesTitle}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.casesLead}</p>
        </div>
      </section>

      <section className="ltx-container ltx-section">
        {!items.length && <p className="text-sm text-slate-500">{c.emptyState}</p>}
        <div className="grid gap-3">
          {items.map((item) => (
            <Link key={item.slug} to={`/case-studies/${item.slug}`} className="ltx-card-interactive p-6">
              <h2 className="font-display text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{item.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-300">
                {c.readCase}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const c = t.catalog
  const [item, setItem] = useState<any>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!slug) return
    void trackEvent('case_study_view', `/case-studies/${slug}`)
    fetch(`/api/public/cases/${slug}`)
      .then(async (r) => {
        const data = await r.json()
        if (!data.caseStudy) setMissing(true)
        else setItem(data.caseStudy)
      })
      .catch(() => setMissing(true))
  }, [slug])

  if (missing) {
    return (
      <MarketingChrome>
        <div className="ltx-container py-24 text-center">
          <h1 className="ltx-h2">{c.notFoundTitle}</h1>
          <Link to="/case-studies" className="ltx-btn-secondary mt-7">
            {c.casesEyebrow}
          </Link>
        </div>
      </MarketingChrome>
    )
  }

  if (!item) {
    return (
      <MarketingChrome>
        <div className="ltx-container py-24 text-center text-sm text-slate-400">{t.common.loading}</div>
      </MarketingChrome>
    )
  }

  const sections = [
    { label: language === 'tr' ? 'Zorluk' : 'Challenge', text: item.challenge },
    { label: language === 'tr' ? 'Yaklaşım' : 'Approach', text: item.approach },
    { label: language === 'tr' ? 'Çözüm' : 'Solution', text: item.solution },
    { label: language === 'tr' ? 'Sonuç' : 'Result', text: item.result },
  ].filter((row) => row.text)

  return (
    <MarketingChrome>
      <SeoHead
        title={`${item.title} | LitxTech`}
        description={item.summary || item.title}
        path={`/case-studies/${slug}`}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{c.casesEyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{item.title}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{item.summary}</p>
        </div>
      </section>

      <article className="ltx-container ltx-section space-y-9">
        {sections.map((row) => (
          <section key={row.label}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/80">
              {row.label}
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-300">{row.text}</p>
          </section>
        ))}
        <Link to="/contact" className="ltx-btn-primary">
          {c.talkCta}
        </Link>
      </article>
    </MarketingChrome>
  )
}

export function FeedPostPage() {
  const { slug } = useParams()
  const location = useLocation()
  const { t } = useLanguage()
  const [post, setPost] = useState<any>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!slug) return
    void trackEvent('feed_view', `/blog/${slug}`)
    fetch(`/api/public/feed/${slug}`)
      .then(async (r) => {
        const data = await r.json()
        if (!data.post) setMissing(true)
        else setPost(data.post)
      })
      .catch(() => setMissing(true))
  }, [slug])

  if (location.pathname.startsWith('/feed/')) {
    return <Navigate to={`/blog/${slug || ''}`} replace />
  }

  if (missing) {
    return (
      <MarketingChrome>
        <div className="ltx-container py-24 text-center">
          <h1 className="ltx-h2">{t.catalog.notFoundTitle}</h1>
          <Link to="/blog" className="ltx-btn-secondary mt-7">
            {t.nav.blog}
          </Link>
        </div>
      </MarketingChrome>
    )
  }

  if (!post) {
    return (
      <MarketingChrome>
        <div className="ltx-container py-24 text-center text-sm text-slate-400">{t.common.loading}</div>
      </MarketingChrome>
    )
  }

  return (
    <MarketingChrome>
      <SeoHead
        title={`${post.title} | LitxTech`}
        description={post.excerpt || post.title}
        path={`/blog/${slug}`}
        type="article"
      />
      <article className="ltx-container py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/80">{post.category}</p>
        <h1 className="ltx-h1 mt-3 max-w-3xl text-balance">{post.title}</h1>
        <p className="mt-3 text-[12.5px] text-slate-500">
          {post.author} · {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
        </p>
        <div className="mt-9 max-w-3xl whitespace-pre-wrap text-[14.5px] leading-relaxed text-slate-300">
          {post.body}
        </div>
        <Link to="/blog" className="ltx-link mt-10 inline-block text-sm">
          {t.nav.blog}
        </Link>
      </article>
    </MarketingChrome>
  )
}

export function CookiesPage() {
  const { language, t } = useLanguage()
  const body =
    language === 'tr'
      ? [
          'Zorunlu çerezler oturum açma ve yönetici oturumlarının çalışmasını sağlar. Analitik olaylar yalnızca çerez bildirimini kabul ettikten sonra saklanır.',
          'Kişisel verileri satmıyoruz. Bu sitedeki şirket iletişim bilgileri şirket ayarları kaydından gelir.',
        ]
      : [
          'Essential cookies keep sign-in and admin sessions working. Analytics events are stored only after you accept the cookie notice.',
          'We do not sell personal data. Company contact details on this site come from the company settings record.',
        ]

  return (
    <MarketingChrome>
      <SeoHead
        title={`${language === 'tr' ? 'Çerezler' : 'Cookies'} | LitxTech`}
        description={
          language === 'tr'
            ? 'LitxTech bu web sitesinde çerezleri nasıl kullanıyor?'
            : 'How LitxTech uses cookies on this website.'
        }
        path="/cookies"
      />
      <article className="ltx-container ltx-section max-w-3xl space-y-4">
        <h1 className="ltx-h1">{language === 'tr' ? 'Çerezler' : 'Cookies'}</h1>
        {body.map((paragraph) => (
          <p key={paragraph} className="text-[14.5px] leading-relaxed text-slate-300">
            {paragraph}
          </p>
        ))}
        <Link to="/privacy-policy" className="ltx-link inline-block text-sm">
          {t.footer.privacy}
        </Link>
      </article>
    </MarketingChrome>
  )
}

export function NotFoundPage() {
  const location = useLocation()
  const { t } = useLanguage()
  const [query, setQuery] = useState('')

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/cozumler', label: t.footer.solutions },
    { href: '/products', label: t.nav.products },
    { href: '/projeler', label: t.footer.projects },
    { href: '/about', label: t.footer.about },
    { href: '/blog', label: t.footer.blog },
    { href: '/destek', label: t.footer.support },
    { href: '/contact', label: t.footer.contact },
  ]

  const needle = query.trim().toLocaleLowerCase()
  const matches = needle
    ? links.filter((item) => item.label.toLocaleLowerCase().includes(needle))
    : links

  return (
    <MarketingChrome>
      <SeoHead
        title={`${t.catalog.notFoundTitle} | LitxTech`}
        description={t.catalog.notFoundLead}
        path={location.pathname}
        robots="noindex, follow"
      />
      <div className="ltx-container max-w-xl py-24">
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-sky-300">404</p>
        <h1 className="ltx-h2 mt-3">{t.catalog.notFoundTitle}</h1>
        <p className="mt-3 text-[14px] text-slate-400">{t.catalog.notFoundLead}</p>

        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault()
            if (query.trim().length > 1) void trackEvent('search', location.pathname, { q: query.trim() })
          }}
        >
          <label className="ltx-label" htmlFor="not-found-search">
            {t.nav.search}
          </label>
          <input
            id="not-found-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="ltx-field"
            placeholder={t.common.searchPlaceholder}
          />
        </form>

        <ul className="mt-6 space-y-2">
          {matches.map((item) => (
            <li key={item.href}>
              <Link className="ltx-link text-sm" to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
          {!matches.length && <li className="text-sm text-slate-500">{t.common.noResults}</li>}
        </ul>

        <Link to="/" className="ltx-btn-primary mt-8">
          {t.catalog.notFoundCta}
        </Link>
      </div>
    </MarketingChrome>
  )
}

export function ServerErrorPage() {
  const { t } = useLanguage()
  return (
    <MarketingChrome>
      <SeoHead title={`${t.catalog.serverErrorTitle} | LitxTech`} path="/500" robots="noindex,follow" />
      <div className="ltx-container max-w-xl py-28 text-center">
        <h1 className="ltx-h2">{t.catalog.serverErrorTitle}</h1>
        <p className="mt-3 text-[14px] text-slate-400">{t.catalog.serverErrorLead}</p>
        <Link to="/" className="ltx-btn-primary mt-8">
          {t.catalog.notFoundCta}
        </Link>
      </div>
    </MarketingChrome>
  )
}
