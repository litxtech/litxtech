import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

type Hit = { type: string; href: string; label: string }

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Hit[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    const openPalette = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('ltx-command', openPalette)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('ltx-command', openPalette)
    }
  }, [])

  useEffect(() => {
    if (!open || q.trim().length < 2) {
      setResults([])
      return
    }
    const timer = window.setTimeout(() => {
      adminApi
        .platform(`search?q=${encodeURIComponent(q.trim())}`)
        .then((data) => setResults(data.results || []))
        .catch(() => setResults([]))
    }, 180)
    return () => window.clearTimeout(timer)
  }, [q, open])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false)
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0e16]/95 shadow-[0_50px_120px_-30px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <Search className="h-4 w-4 shrink-0 text-cyan-300" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Lead, ürün, sayfa veya ayar ara…"
            className="w-full bg-transparent py-4 text-[13.5px] text-white outline-none placeholder:text-slate-600"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="max-h-[22rem] overflow-y-auto p-2">
          {results.map((hit) => (
            <li key={`${hit.type}-${hit.href}-${hit.label}`}>
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.05]"
                onClick={() => {
                  setOpen(false)
                  navigate(hit.href)
                }}
              >
                <span className="min-w-0 truncate text-[12.5px] text-slate-200">{hit.label}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[9.5px] uppercase tracking-wide text-slate-500">
                    {hit.type}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-cyan-300" />
                </span>
              </button>
            </li>
          ))}
          {q.trim().length >= 2 && !results.length && (
            <li className="px-3 py-8 text-center text-[12px] text-slate-500">Sonuç bulunamadı.</li>
          )}
          {q.trim().length < 2 && (
            <li className="px-3 py-8 text-center text-[12px] text-slate-500">
              En az 2 karakter yazın. <span className="text-slate-600">⌘K / Ctrl+K ile açılır.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
