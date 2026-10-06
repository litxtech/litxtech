import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'
import { homeContent } from '@/data/homeContent'

const SECTION_IDS = ['hero', 'solutions', 'projects', 'capabilities', 'process', 'why', 'faq', 'about', 'cta']

function SectionOrder({
  content,
  setContent,
}: {
  content: any
  setContent: (v: any) => void
}) {
  const order: string[] = content.sectionOrder?.length ? content.sectionOrder : SECTION_IDS
  const hidden: string[] = content.hiddenSections || []
  const move = (id: string, dir: -1 | 1) => {
    const next = [...order]
    const i = next.indexOf(id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    setContent({ ...content, sectionOrder: next })
  }
  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <h3 className="font-semibold text-white">Bölüm sırası</h3>
      <p className="mb-3 text-sm text-slate-400">Yukarı/aşağı ile sıralayın, görünürlüğü kapatın.</p>
      <ul className="space-y-2">
        {order.map((id) => (
          <li key={id} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!hidden.includes(id)}
                onChange={(e) => {
                  const nextHidden = e.target.checked ? hidden.filter((h) => h !== id) : [...hidden, id]
                  setContent({ ...content, hiddenSections: nextHidden, sectionOrder: order })
                }}
              />
              {id}
            </label>
            <span className="flex gap-2">
              <button type="button" className="text-xs text-slate-300" onClick={() => move(id, -1)}>
                Yukarı
              </button>
              <button type="button" className="text-xs text-slate-300" onClick={() => move(id, 1)}>
                Aşağı
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AdminHomepagePage() {
  const [status, setStatus] = useState('draft')
  const [content, setContent] = useState<any>(homeContent)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .homepage()
      .then((d) => {
        setStatus(d.homepage?.status || 'draft')
        if (d.homepage?.content && Object.keys(d.homepage.content).length > 1) {
          setContent({ ...homeContent, ...d.homepage.content })
        }
      })
      .catch((e) => setError(e.message))
  }, [])

  const save = async (nextStatus: string) => {
    setMsg('')
    setError('')
    try {
      await adminApi.updateHomepage({ content, status: nextStatus })
      setStatus(nextStatus)
      setMsg(nextStatus === 'published' ? 'Published to public site.' : 'Draft saved.')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Homepage CMS</h2>
        <p className="text-slate-400">
          Status: <span className="text-cyan-300">{status}</span>
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 p-5">
        <label className="block text-sm text-slate-300">
          Hero title
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.hero?.title || ''}
            onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
          />
        </label>
        <label className="block text-sm text-slate-300">
          Hero subtitle
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.hero?.subtitle || ''}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })
            }
          />
        </label>
        <label className="block text-sm text-slate-300">
          Hero description
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.hero?.description || ''}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, description: e.target.value } })
            }
          />
        </label>
        <label className="block text-sm text-slate-300">
          Primary CTA
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.hero?.primaryCta || ''}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })
            }
          />
        </label>
        <label className="block text-sm text-slate-300">
          Secondary CTA
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.hero?.secondaryCta || ''}
            onChange={(e) =>
              setContent({ ...content, hero: { ...content.hero, secondaryCta: e.target.value } })
            }
          />
        </label>
        <label className="block text-sm text-slate-300">
          Final CTA title
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            value={content.finalCta?.title || ''}
            onChange={(e) =>
              setContent({ ...content, finalCta: { ...content.finalCta, title: e.target.value } })
            }
          />
        </label>
      </div>

      <SectionOrder content={content} setContent={setContent} />

      {msg && <p className="text-emerald-400">{msg}</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => save('draft')}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={() => save('published')}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Publish
        </button>
      </div>
    </div>
  )
}
