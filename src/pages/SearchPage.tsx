import { FormEvent, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SeoHead } from '@/components/marketing/SeoHead'
import { SITE_ORIGIN, searchSite } from '@/data/searchIndex'

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const [draft, setDraft] = useState(query)
  const results = searchSite(query)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = draft.trim()
    if (next) setParams({ q: next })
    else setParams({})
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-white">
      <SeoHead
        title={query ? `${query} araması | LitxTech` : 'Site arama | LitxTech'}
        description="LitxTech resmi sitesinde ürün, hizmet ve sayfa arayın. Resmi adres https://www.litxtech.com."
        path={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
        robots={query ? 'noindex, follow' : 'index, follow'}
      />
      <p className="text-sm text-cyan-200/80">Resmi adres</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">LitxTech site arama</h1>
      <p className="mt-3 text-slate-300">
        Arama motorlarının kullanacağı site adresi{' '}
        <a className="text-white underline" href={SITE_ORIGIN}>
          {SITE_ORIGIN}
        </a>
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex gap-2" role="search">
        <label className="sr-only" htmlFor="site-search">
          Sitede ara
        </label>
        <input
          id="site-search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ürün, hizmet veya sayfa"
          className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950"
        >
          <Search className="h-4 w-4" />
          Ara
        </button>
      </form>
      <ul className="mt-8 divide-y divide-white/10">
        {results.map((entry) => (
          <li key={entry.path} className="py-4">
            <Link to={entry.path} className="text-lg font-medium text-white hover:text-cyan-200">
              {entry.title}
            </Link>
            <p className="mt-1 text-sm text-slate-400">{entry.description}</p>
            <p className="mt-1 text-xs text-slate-500">{`${SITE_ORIGIN}${entry.path === '/' ? '' : entry.path}`}</p>
          </li>
        ))}
      </ul>
      {query && results.length === 0 && (
        <p className="mt-6 text-slate-400">Bu arama için yayınlanmış bir sayfa yok.</p>
      )}
    </main>
  )
}
