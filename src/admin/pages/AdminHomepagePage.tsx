import { useCallback, useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, Eye, EyeOff, Home, RefreshCw, Rocket, Save } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import { homeContent } from '@/data/homeContent'
import {
  Badge,
  Button,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  TextArea,
  TextInput,
  Toggle,
  cx,
  timeAgo,
  useToast,
} from '../ui'

const SECTION_IDS = ['hero', 'solutions', 'projects', 'capabilities', 'process', 'why', 'faq', 'about', 'cta']

export function AdminHomepagePage() {
  const { push } = useToast()
  const [status, setStatus] = useState('draft')
  const [content, setContent] = useState<any>(homeContent)
  const [original, setOriginal] = useState<any>(homeContent)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.homepage()
      const next = { ...homeContent, ...(data.homepage?.content || {}) }
      setStatus(data.homepage?.status || 'draft')
      setUpdatedAt(data.homepage?.updated_at || null)
      setContent(next)
      setOriginal(next)
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Ana sayfa yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const dirty = JSON.stringify(content) !== JSON.stringify(original)

  const save = async (nextStatus: string) => {
    setBusy(true)
    setError('')
    try {
      await adminApi.updateHomepage({ content, status: nextStatus })
      setStatus(nextStatus)
      setOriginal(content)
      setUpdatedAt(new Date().toISOString())
      push({
        tone: 'success',
        title: nextStatus === 'published' ? 'Ana sayfa yayınlandı' : 'Taslak kaydedildi',
        body: nextStatus === 'published' ? 'Değişiklikler canlı sitede.' : 'Yayınlamak için “Yayınla”ya basın.',
      })
    } catch (err: any) {
      setError(err?.message || 'Kaydedilemedi')
      push({ tone: 'error', title: 'Kaydedilemedi', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  const order: string[] = content.sectionOrder?.length ? content.sectionOrder : SECTION_IDS
  const hidden: string[] = content.hiddenSections || []

  const move = (id: string, direction: -1 | 1) => {
    const next = [...order]
    const index = next.indexOf(id)
    const target = index + direction
    if (index < 0 || target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setContent({ ...content, sectionOrder: next })
  }

  const toggleSection = (id: string, visible: boolean) => {
    const nextHidden = visible ? hidden.filter((item) => item !== id) : [...hidden, id]
    setContent({ ...content, hiddenSections: nextHidden, sectionOrder: order })
  }

  if (loading && !content) return <Loading label="Ana sayfa yükleniyor…" />

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        eyebrow="İçerik"
        title="Ana sayfa"
        description="Hero metinleri, CTA’lar ve bölüm sırası. Taslak olarak kaydedip hazır olduğunda yayınlayın."
        actions={
          <>
            <Badge tone={status === 'published' ? 'emerald' : 'amber'} dot>
              {status}
            </Badge>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <SectionCard title="Hero" description="İlk ekranda görünen başlık ve CTA’lar">
          <div className="space-y-4">
            <Field label="Başlık">
              <TextInput
                value={content.hero?.title || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
              />
            </Field>
            <Field label="Alt başlık">
              <TextInput
                value={content.hero?.subtitle || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
              />
            </Field>
            <Field label="Açıklama">
              <TextArea
                rows={4}
                value={content.hero?.description || ''}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Birincil CTA">
                <TextInput
                  value={content.hero?.primaryCta || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })}
                />
              </Field>
              <Field label="İkincil CTA">
                <TextInput
                  value={content.hero?.secondaryCta || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, secondaryCta: e.target.value } })}
                />
              </Field>
            </div>
            <Field label="Kapanış CTA başlığı">
              <TextInput
                value={content.finalCta?.title || ''}
                onChange={(e) => setContent({ ...content, finalCta: { ...content.finalCta, title: e.target.value } })}
              />
            </Field>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Bölüm sırası" description="Yukarı/aşağı taşıyın, görünürlüğü yönetin" bodyClassName="space-y-2">
            {order.map((id, index) => {
              const visible = !hidden.includes(id)
              return (
                <div
                  key={id}
                  className={cx(
                    'flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2',
                    !visible && 'opacity-55',
                  )}
                >
                  <span className="w-5 text-center text-[10.5px] font-semibold text-slate-600">{index + 1}</span>
                  <span className="flex-1 truncate text-[12.5px] capitalize text-slate-200">{id}</span>
                  <button
                    type="button"
                    onClick={() => toggleSection(id, !visible)}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    aria-label={visible ? 'Gizle' : 'Göster'}
                  >
                    {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => move(id, -1)}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    aria-label="Yukarı"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(id, 1)}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    aria-label="Aşağı"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
          </SectionCard>

          <SectionCard title="Yayın durumu" description="Canlı site davranışı" bodyClassName="space-y-3">
            <Toggle
              label="Yalnızca taslak"
              hint="Kapatırsanız kaydettiğinizde yayınlanır"
              checked={status !== 'published'}
              onChange={(value) => setStatus(value ? 'draft' : 'published')}
            />
            <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
              <Home className="h-3.5 w-3.5" /> Son güncelleme: {updatedAt ? timeAgo(updatedAt) : '—'}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => void save('draft')} loading={busy} disabled={!dirty}>
                <Save className="h-3.5 w-3.5" /> Taslak kaydet
              </Button>
              <Button variant="primary" size="sm" onClick={() => void save('published')} loading={busy}>
                <Rocket className="h-3.5 w-3.5" /> Yayınla
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#070a11]/92 px-4 py-3 backdrop-blur-xl lg:pl-[17rem]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            {dirty ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Kaydedilmemiş değişiklikler
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Güncel
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setContent(original)} disabled={!dirty}>
              Geri al
            </Button>
            <Button variant="secondary" size="sm" onClick={() => void save('draft')} loading={busy} disabled={!dirty}>
              Taslak
            </Button>
            <Button variant="primary" size="sm" onClick={() => void save('published')} loading={busy}>
              <Rocket className="h-3.5 w-3.5" /> Yayınla
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
