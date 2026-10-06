import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { solutionsData } from '@/data/solutionsData'
import { trackEvent } from '@/lib/publicCms'

type Product = {
  slug: string
  name: string
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
}

const knownProducts: Product[] = [
  {
    slug: 'vora',
    name: 'Vora',
    tagline: 'City channels and community messaging for the Black Sea region.',
    category: 'Community',
    platforms: ['iOS', 'Android'],
    internalPath: '/vora',
  },
  {
    slug: 'tamuso',
    name: 'Tamuso',
    tagline: 'Live audio rooms with speaker and listener roles.',
    category: 'Social',
    platforms: ['iOS', 'Android'],
    internalPath: '/tamuso',
  },
  {
    slug: 'nocta',
    name: 'Nocta',
    tagline: 'A social discovery product with its own privacy and support pages.',
    category: 'Social',
    platforms: ['iOS', 'Android'],
    internalPath: '/nocta',
  },
  {
    slug: 'mytrabzon',
    name: 'MyTrabzon',
    tagline: 'A city guide and community app for Trabzon.',
    category: 'City',
    internalPath: '/mytrabzon',
  },
  {
    slug: 'valoria',
    name: 'Valoria',
    tagline: 'A mobile guest experience for a hotel brand.',
    category: 'Hospitality',
    internalPath: '/valoria-app',
  },
  {
    slug: 'kbs-prime',
    name: 'KBS Prime',
    tagline: 'A live social product published by LitxTech.',
    category: 'Social',
    website_url: 'https://kbsprime.com',
    internalPath: '/kbs-prime',
  },
]

function productHref(product: Product) {
  if (product.internalPath) return product.internalPath
  if (product.website_url && product.website_url.startsWith('/')) return product.website_url
  return `/products/${product.slug}`
}

function Frame({ name, lines }: { name: string; lines: string[] }) {
  return (
    <div className="mx-auto w-[220px] rounded-[2rem] border border-white/15 bg-[#0c1220] p-3 shadow-2xl shadow-cyan-950/40">
      <div className="mb-3 h-5 rounded-full bg-white/10" />
      <div className="rounded-2xl border border-white/10 bg-[#101828] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{name}</p>
        <div className="mt-4 space-y-2">
          {lines.slice(0, 4).map((line) => (
            <div key={line} className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(knownProducts)
  useEffect(() => {
    void trackEvent('product_view', '/products')
    fetch('/api/public/products')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.products) && d.products.length) setProducts(d.products)
      })
      .catch(() => {})
  }, [])
  return (
    <MarketingChrome>
      <SeoHead
        title="Dijital Ürünler ve Yazılım Platformları | LitxTech"
        description="LitxTech dijital ürünleri ve yazılım platformları: Vora, Tamuso, Nocta, MyTrabzon, Valoria ve KBS Prime."
        path="/products"
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Products</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-white md:text-5xl">
          Software we have actually shipped.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          These are LitxTech products. Descriptions stay tied to the product record, and empty fields stay empty until they are filled in admin.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.slug}
              to={productHref(product)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">{product.category || 'Product'}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{product.name}</h2>
              <p className="mt-3 text-slate-400">{product.tagline || product.short_description}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ProductPage() {
  const { slug } = useParams()
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
        <SeoHead title="Product not found | LitxTech" path={`/products/${slug || ''}`} robots="noindex,follow" />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-3xl font-semibold text-white">This product is not published.</h1>
          <Link to="/products" className="mt-6 inline-block text-cyan-300">
            Back to products
          </Link>
        </div>
      </MarketingChrome>
    )
  }

  const featureLines = Array.isArray(product.features)
    ? product.features.map((feature) => (typeof feature === 'string' ? feature : feature.title || '')).filter(Boolean)
    : [product.tagline || product.short_description || product.name]

  return (
    <MarketingChrome>
      <SeoHead
        title={`${product.name} | LitxTech`}
        description={product.tagline || product.short_description || `${product.name} by LitxTech.`}
        path={`/products/${product.slug}`}
      />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{product.category || 'Product'}</p>
          <h1 className="mt-3 text-5xl font-semibold text-white">{product.name}</h1>
          <p className="mt-4 text-lg text-slate-300">{product.tagline || product.short_description}</p>
          {product.description && <p className="mt-4 text-slate-400">{product.description}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {(product.platforms || []).map((platform) => (
              <span key={platform} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
                {platform}
              </span>
            ))}
            {product.lifecycle && (
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">{product.lifecycle}</span>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {product.internalPath && (
              <Link to={product.internalPath} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                Open product site
              </Link>
            )}
            {!product.internalPath && knownProducts.find((item) => item.slug === product.slug)?.internalPath && (
              <Link
                to={knownProducts.find((item) => item.slug === product.slug)!.internalPath!}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Open product site
              </Link>
            )}
            {product.ios_url && (
              <a href={product.ios_url} className="rounded-lg border border-white/15 px-4 py-2 text-sm" onClick={() => trackEvent('app_store_click', `/products/${product.slug}`)}>
                App Store
              </a>
            )}
            {product.android_url && (
              <a href={product.android_url} className="rounded-lg border border-white/15 px-4 py-2 text-sm" onClick={() => trackEvent('google_play_click', `/products/${product.slug}`)}>
                Google Play
              </a>
            )}
            <Link to="/contact" className="rounded-lg border border-white/15 px-4 py-2 text-sm">
              Start a project
            </Link>
          </div>
        </div>
        <Frame name={product.name} lines={featureLines.length ? featureLines : [product.name]} />
      </section>
    </MarketingChrome>
  )
}

export function ServicesPage() {
  const [services, setServices] = useState(
    solutionsData.map((item) => ({
      slug: item.slug,
      title: item.title,
      short_description: item.cardDescription,
    })),
  )
  useEffect(() => {
    fetch('/api/public/services')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.services) && d.services.length) setServices(d.services)
      })
      .catch(() => {})
  }, [])
  return (
    <MarketingChrome>
      <SeoHead title="Services | LitxTech" description="What LitxTech builds: mobile products, web applications, and business software." path="/services" />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Services</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">What we build</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="rounded-2xl border border-white/10 p-6 hover:border-cyan-400/40">
              <h2 className="text-xl font-semibold text-white">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{service.short_description}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const local = solutionsData.find((item) => item.slug === slug)
  const [service, setService] = useState<any>(
    local
      ? {
          title: local.title,
          short_description: local.cardDescription,
          detailed_description: local.problem,
          benefits: local.features,
          slug: local.slug,
        }
      : null,
  )
  useEffect(() => {
    if (!slug) return
    void trackEvent('service_view', `/services/${slug}`)
    fetch(`/api/public/services/${slug}`)
      .then(async (r) => {
        const data = await r.json()
        if (data.service) setService(data.service)
      })
      .catch(() => {})
  }, [slug])
  if (!service) {
    return (
      <MarketingChrome>
        <div className="px-4 py-24 text-center text-white">Service not found.</div>
      </MarketingChrome>
    )
  }
  const benefits = Array.isArray(service.benefits) ? service.benefits : []
  return (
    <MarketingChrome>
      <SeoHead title={`${service.title} | LitxTech`} description={service.short_description || service.title} path={`/services/${slug}`} />
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-semibold text-white">{service.title}</h1>
        <p className="mt-4 text-lg text-slate-300">{service.short_description}</p>
        {service.detailed_description && <p className="mt-6 text-slate-400">{service.detailed_description}</p>}
        {!!benefits.length && (
          <ul className="mt-8 space-y-2 text-slate-300">
            {benefits.map((item: string) => (
              <li key={item} className="border-b border-white/10 py-2">{item}</li>
            ))}
          </ul>
        )}
        <Link to="/contact" className="mt-10 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">
          Start a project
        </Link>
      </article>
    </MarketingChrome>
  )
}

export function TechnologyPage() {
  const [items, setItems] = useState<{ name: string; category: string; description?: string }[]>([])
  useEffect(() => {
    fetch('/api/public/studio/technology')
      .then((r) => r.json())
      .then((d) => setItems(d.technologies || []))
      .catch(() => {})
  }, [])
  const groups = items.reduce<Record<string, typeof items>>((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})
  return (
    <MarketingChrome>
      <SeoHead title="Technology | LitxTech" description="The technologies LitxTech uses to build and run its products." path="/technology" />
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-semibold text-white">Technology</h1>
        <p className="mt-3 text-slate-400">Only tools this platform and our products actually use. Add more from admin when they are real.</p>
        {!items.length && <p className="mt-8 text-slate-500">Technology records are not published yet.</p>}
        <div className="mt-10 space-y-8">
          {Object.entries(groups).map(([category, rows]) => (
            <div key={category}>
              <h2 className="text-sm uppercase tracking-[0.18em] text-cyan-300">{category}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {rows.map((row) => (
                  <div key={row.name} className="rounded-xl border border-white/10 p-4">
                    <p className="font-medium text-white">{row.name}</p>
                    {row.description && <p className="mt-1 text-sm text-slate-400">{row.description}</p>}
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
  const [steps, setSteps] = useState<{ step_number: number; title: string; description: string }[]>([])
  useEffect(() => {
    fetch('/api/public/studio/process')
      .then((r) => r.json())
      .then((d) => setSteps(d.steps || []))
      .catch(() => {})
  }, [])
  return (
    <MarketingChrome>
      <SeoHead title="Process | LitxTech" description="How LitxTech takes a product from discovery to scale." path="/process" />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-semibold text-white">How we work</h1>
        {!steps.length && <p className="mt-6 text-slate-500">Process steps are edited in admin.</p>}
        <ol className="mt-10 space-y-6">
          {steps.map((step) => (
            <li key={step.step_number} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="text-cyan-300">{String(step.step_number).padStart(2, '0')}</span>
              <div>
                <h2 className="text-xl text-white">{step.title}</h2>
                <p className="mt-1 text-slate-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </MarketingChrome>
  )
}

export function CaseStudiesPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/public/cases')
      .then((r) => r.json())
      .then((d) => setItems(d.cases || []))
      .catch(() => {})
  }, [])
  return (
    <MarketingChrome>
      <SeoHead title="Case studies | LitxTech" description="Product stories from software LitxTech has shipped." path="/case-studies" />
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-semibold text-white">Case studies</h1>
        <p className="mt-3 max-w-2xl text-slate-400">These are LitxTech products, not unnamed client logos. Metrics appear only when they are stored.</p>
        {!items.length && <p className="mt-8 text-slate-500">No published case studies yet.</p>}
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <Link key={item.slug} to={`/case-studies/${item.slug}`} className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl text-white">{item.title}</h2>
              <p className="mt-2 text-slate-400">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams()
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
        <div className="px-4 py-24 text-center text-white">Case study not published.</div>
      </MarketingChrome>
    )
  }
  if (!item) return <MarketingChrome><div className="px-4 py-24 text-slate-400">Loading…</div></MarketingChrome>
  return (
    <MarketingChrome>
      <SeoHead title={`${item.title} | LitxTech`} description={item.summary || item.title} path={`/case-studies/${slug}`} />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 md:px-6">
        <h1 className="text-4xl font-semibold text-white">{item.title}</h1>
        <p className="text-slate-300">{item.summary}</p>
        {[['Challenge', item.challenge], ['Approach', item.approach], ['Solution', item.solution], ['Result', item.result]].map(([label, text]) =>
          text ? (
            <section key={label}>
              <h2 className="text-sm uppercase tracking-[0.16em] text-cyan-300">{label}</h2>
              <p className="mt-2 text-slate-300">{text}</p>
            </section>
          ) : null,
        )}
        <Link to="/contact" className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">Start a project</Link>
      </article>
    </MarketingChrome>
  )
}

export function FeedPostPage() {
  const { slug } = useParams()
  const location = useLocation()
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
  if (missing) return <MarketingChrome><div className="px-4 py-24 text-center text-white">Post not published.</div></MarketingChrome>
  if (!post) return <MarketingChrome><div className="px-4 py-24 text-slate-400">Loading…</div></MarketingChrome>
  return (
    <MarketingChrome>
      <SeoHead title={`${post.title} | LitxTech`} description={post.excerpt || post.title} path={`/blog/${slug}`} type="article" />
      <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{post.category}</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-500">{post.author} · {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</p>
        <div className="mt-8 whitespace-pre-wrap text-slate-300">{post.body}</div>
        <Link to="/blog" className="mt-10 inline-block text-cyan-300">Blog</Link>
      </article>
    </MarketingChrome>
  )
}

export function CookiesPage() {
  return (
    <MarketingChrome>
      <SeoHead title="Cookies | LitxTech" description="How LitxTech uses cookies on this website." path="/cookies" />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-slate-300 md:px-6">
        <h1 className="text-4xl font-semibold text-white">Cookies</h1>
        <p>Essential cookies keep sign-in and admin sessions working. Analytics events are stored only after you accept the cookie notice.</p>
        <p>We do not sell personal data. Company contact details on this site come from the company settings record.</p>
        <Link to="/privacy-policy" className="text-cyan-300">Privacy policy</Link>
      </article>
    </MarketingChrome>
  )
}

const NOT_FOUND_LINKS = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/cozumler', label: 'Yazılım geliştirme' },
  { href: '/products', label: 'Dijital ürünler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '/blog', label: 'Blog' },
  { href: '/destek', label: 'Destek' },
  { href: '/contact', label: 'İletişim' },
]

export function NotFoundPage() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const matches = NOT_FOUND_LINKS.filter((item) => item.label.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')))
  return (
    <MarketingChrome>
      <SeoHead
        title="Sayfa bulunamadı | LitxTech"
        description="Aradığınız sayfa yayında değil. Ana sayfa, çözümler, ürünler veya iletişim üzerinden devam edebilirsiniz."
        path={location.pathname}
        robots="noindex, follow"
      />
      <div className="mx-auto max-w-xl px-4 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Bu sayfa bulunamadı</h1>
        <p className="mt-3 text-slate-400">Bağlantı değişmiş olabilir. Aşağıdan aradığınız bölüme geçebilirsiniz.</p>
        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault()
            if (query.trim().length > 1) void trackEvent('search', location.pathname, { q: query.trim() })
          }}
        >
          <label className="mb-2 block text-sm text-slate-300" htmlFor="not-found-search">
            Sayfalarda ara
          </label>
          <input
            id="not-found-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-white"
            placeholder="Örneğin destek"
          />
        </form>
        <ul className="mt-6 space-y-2">
          {matches.map((item) => (
            <li key={item.href}>
              <Link className="text-cyan-300 hover:text-cyan-200" to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
          {!matches.length && <li className="text-slate-500">Eşleşen sayfa yok.</li>}
        </ul>
        <Link to="/" className="mt-8 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">
          Ana sayfaya dön
        </Link>
      </div>
    </MarketingChrome>
  )
}

export function ServerErrorPage() {
  return (
    <MarketingChrome>
      <SeoHead title="Something went wrong | LitxTech" path="/500" robots="noindex,follow" />
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <h1 className="text-4xl font-semibold text-white">This page could not be loaded.</h1>
        <Link to="/" className="mt-8 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">Back home</Link>
      </div>
    </MarketingChrome>
  )
}
