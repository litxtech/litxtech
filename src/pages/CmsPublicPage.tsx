import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'
import { NotFoundPage } from '@/pages/platform/CatalogPages'

type CmsPage = {
  title: string
  slug: string
  excerpt?: string | null
  content?: unknown
  featured_image?: string | null
  seo_title?: string | null
  seo_description?: string | null
  no_index?: boolean | null
}

function textBlocks(content: unknown) {
  if (!Array.isArray(content)) return []
  return content
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') {
        const row = item as { text?: string; body?: string; html?: string }
        return row.text || row.body || row.html || ''
      }
      return ''
    })
    .map((item) => item.trim())
    .filter(Boolean)
}

export function CmsPublicPage() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const [page, setPage] = useState<CmsPage | null>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!slug) return
    setMissing(false)
    setPage(null)
    fetch(`/api/public/pages/${encodeURIComponent(slug)}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!data?.page) {
          setMissing(true)
          return
        }
        setPage(data.page)
      })
      .catch(() => setMissing(true))
  }, [slug])

  if (missing) return <NotFoundPage />
  if (!page) {
    return (
      <MarketingChrome>
        <p className="px-4 py-24 text-center text-slate-400">
          {language === 'tr' ? 'Yükleniyor…' : 'Loading…'}
        </p>
      </MarketingChrome>
    )
  }

  const blocks = textBlocks(page.content)
  return (
    <MarketingChrome>
      <SeoHead
        title={page.seo_title || `${page.title} | LitxTech`}
        description={page.seo_description || page.excerpt || page.title}
        path={`/sayfa/${page.slug}`}
        robots={page.no_index ? 'noindex, follow' : 'index, follow'}
      />
      <article className="ltx-container ltx-section max-w-3xl">
        <p className="ltx-eyebrow">LitxTech</p>
        <h1 className="ltx-h1 mt-4 text-balance">{page.title}</h1>
        {page.excerpt && <p className="ltx-lead mt-4">{page.excerpt}</p>}
        {page.featured_image && (
          <img
            src={page.featured_image}
            alt=""
            className="mt-8 w-full rounded-2xl border border-white/[0.08] object-cover"
          />
        )}
        <div className="mt-8 space-y-4 text-[14.5px] leading-relaxed text-slate-300">
          {blocks.map((block) => (
            <p key={block}>{block}</p>
          ))}
        </div>
        <Link to="/" className="ltx-link mt-10 inline-block text-sm">
          {t.nav.home}
        </Link>
      </article>
    </MarketingChrome>
  )
}
