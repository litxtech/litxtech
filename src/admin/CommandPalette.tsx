import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12] shadow-2xl">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search leads, products, settings…"
          className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-white outline-none"
        />
        <ul className="max-h-80 overflow-y-auto">
          {results.map((hit) => (
            <li key={`${hit.type}-${hit.href}-${hit.label}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  setOpen(false)
                  setQ('')
                  navigate(hit.href)
                }}
              >
                <span>{hit.label}</span>
                <span className="text-xs uppercase text-slate-500">{hit.type}</span>
              </button>
            </li>
          ))}
          {q.trim().length >= 2 && !results.length && <li className="px-4 py-6 text-sm text-slate-500">No matches.</li>}
        </ul>
      </div>
    </div>
  )
}
