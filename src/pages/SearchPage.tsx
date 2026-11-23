import { FormEvent, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE_ORIGIN, searchSite } from '@/data/searchIndex'

export function SearchPage() {
  const { language, t } = useLanguage()
  const e = t.editorial
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const [draft, setDraft] = useState(query)
  const results = searchSite(query, language)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = draft.trim()
    if (next) setParams({ q: next })
    else setParams({})
  }

  return (
    <MarketingChrome>
      <SeoHead
        title={query ? `${query} · ${e.searchTitle}` : `${e.searchTitle} | LitxTech site`}
        description={e.searchLead}
        path={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
        robots={query ? 'noindex, follow' : 'index, follow'}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{t.nav.search}</p>
          <h1 className="ltx-h1 mt-4">{e.searchTitle}</h1>
          <p className="ltx-lead mt-4 max-w-2xl">{e.searchLead}</p>
        </div>
      </section>

      <section className="ltx-container py-14">
        <form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-2 sm:flex-row" role="search">
          <label className="sr-only" htmlFor="site-search">
            {t.nav.searchSite}
          </label>
          <input
            id="site-search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={e.searchPlaceholder}
            className="ltx-field flex-1"
          />
          <button type="submit" className="ltx-btn-primary">
            <Search className="h-4 w-4" />
            {e.searchButton}
          </button>
        </form>

        <ul className="mt-8 max-w-2xl divide-y divide-white/[0.07]">
          {results.map((entry) => (
            <li key={entry.path} className="py-4">
              <Link to={entry.path} className="text-[15px] font-semibold text-white transition hover:text-sky-200">
                {entry.title}
              </Link>
              <p className="mt-1 text-[13px] text-slate-400">{entry.description}</p>
              <p className="mt-1 text-[11.5px] text-slate-600">{`${SITE_ORIGIN}${entry.path === '/' ? '' : entry.path}`}</p>
            </li>
          ))}
        </ul>

        {query && results.length === 0 && <p className="mt-6 text-sm text-slate-400">{e.searchEmpty}</p>}
      </section>
    </MarketingChrome>
  )
}
