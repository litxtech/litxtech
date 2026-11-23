import { useCallback, useEffect, useState } from 'react'
import { AppWindow, ExternalLink, Plus, RefreshCw, Rocket, Trash2 } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  StatusPill,
  TextArea,
  TextInput,
  timeAgo,
  useToast,
} from '../ui'

const EMPTY_FORM = {
  name: '',
  slug: '',
  short_description: '',
  website_url: '',
  ios_url: '',
  android_url: '',
  status: 'draft',
  featured: false,
}

export function AdminApplicationsPage() {
  const { push } = useToast()
  const [apps, setApps] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.applications()
      setApps(data.applications || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Uygulamalar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const create = async () => {
    if (!form.name || !form.slug) {
      push({ tone: 'error', title: 'Ad ve slug zorunlu' })
      return
    }
    setCreating(true)
    try {
      await adminApi.createApplication(form)
      setForm({ ...EMPTY_FORM })
      setOpen(false)
      push({ tone: 'success', title: 'Uygulama oluşturuldu' })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Oluşturulamadı', body: err?.message || 'Hata' })
    } finally {
      setCreating(false)
    }
  }

  const togglePublish = async (app: any) => {
    setBusyId(app.id)
    try {
      await adminApi.updateApplication({ id: app.id, status: app.status === 'published' ? 'draft' : 'published' })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Güncellenemedi', body: err?.message || 'Hata' })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik"
        title="Projeler & uygulamalar"
        description="Sitede listelenen ürünler. Yayınlanan kayıtlar vitrin ve sitemap’e girer."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
            <Button variant="primary" size="sm" onClick={() => setOpen((value) => !value)}>
              <Plus className="h-3.5 w-3.5" /> Yeni proje
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {open && (
        <SectionCard title="Yeni proje" description="Yayınlamadan önce taslak olarak kaydedilir" bodyClassName="grid gap-3 md:grid-cols-2">
          <Field label="Ad">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tamuso" />
          </Field>
          <Field label="Slug" hint="/projeler/…">
            <TextInput value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="tamuso" />
          </Field>
          <Field label="Kısa açıklama" className="md:col-span-2">
            <TextArea
              rows={3}
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              placeholder="Tek cümlelik değer önerisi"
            />
          </Field>
          <Field label="Web sitesi">
            <TextInput value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="https://" />
          </Field>
          <Field label="iOS bağlantısı">
            <TextInput value={form.ios_url} onChange={(e) => setForm({ ...form, ios_url: e.target.value })} placeholder="https://apps.apple.com/…" />
          </Field>
          <Field label="Android bağlantısı">
            <TextInput
              value={form.android_url}
              onChange={(e) => setForm({ ...form, android_url: e.target.value })}
              placeholder="https://play.google.com/…"
            />
          </Field>
          <Field label="Durum">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0a0e17] px-3.5 py-2.5 text-[13.5px] text-white outline-none focus:border-cyan-400/60"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </Field>
          <div className="flex gap-2 md:col-span-2">
            <Button variant="primary" onClick={() => void create()} loading={creating}>
              Oluştur
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Vazgeç
            </Button>
          </div>
        </SectionCard>
      )}

      {loading && !apps.length && <Loading />}
      {!loading && !apps.length && (
        <EmptyState
          icon={<AppWindow className="h-5 w-5" />}
          title="Henüz proje yok"
          description="İlk projeyi ekleyerek vitrini oluşturun."
          action={
            <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
              <Plus className="h-3.5 w-3.5" /> Yeni proje
            </Button>
          }
        />
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <article
            key={app.id}
            className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 transition hover:border-white/[0.15] hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {app.logo_url ? (
                  <img src={app.logo_url} alt={app.name} className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-[13px] font-bold text-cyan-100 ring-1 ring-white/10">
                    {String(app.name || '?').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-semibold text-white">{app.name}</p>
                  <p className="truncate font-mono text-[10.5px] text-slate-500">/{app.slug}</p>
                </div>
              </div>
              <StatusPill value={app.status} />
            </div>

            <p className="mt-3 line-clamp-2 min-h-[2.4rem] text-[12px] leading-relaxed text-slate-400">
              {app.short_description || 'Açıklama eklenmemiş.'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {app.category && <Badge tone="slate">{app.category}</Badge>}
              {app.featured && <Badge tone="amber">öne çıkan</Badge>}
              {!!(app.platforms || []).length && <Badge tone="violet">{app.platforms.length} platform</Badge>}
            </div>

            <div className="mt-3 flex items-center justify-between text-[10.5px] text-slate-600">
              <span>Güncellendi {timeAgo(app.updated_at)}</span>
              <span>#{app.sort_order ?? 0}</span>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
              <Button size="sm" variant={app.status === 'published' ? 'secondary' : 'primary'} loading={busyId === app.id} onClick={() => void togglePublish(app)}>
                <Rocket className="h-3.5 w-3.5" /> {app.status === 'published' ? 'Yayından al' : 'Yayınla'}
              </Button>
              {app.website_url && (
                <a href={app.website_url} target="_blank" rel="noreferrer" className="ml-auto">
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              )}
              <button
                type="button"
                onClick={async () => {
                  if (!confirm(`${app.name} silinsin mi?`)) return
                  try {
                    await adminApi.deleteApplication(app.id)
                    push({ tone: 'success', title: 'Proje silindi' })
                  } catch (err: any) {
                    push({ tone: 'error', title: 'Silinemedi', body: err?.message || 'Hata' })
                  }
                  await load()
                }}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                aria-label="Sil"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
