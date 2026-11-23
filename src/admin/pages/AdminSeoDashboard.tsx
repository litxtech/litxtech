import { useEffect, useState } from 'react'
import { Link2, Plus, RefreshCw, Save, Search, Settings2, Trash2 } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  Select,
  Stat,
  TextArea,
  TextInput,
  cx,
  timeAgo,
  useToast,
} from '../ui'

type Health = {
  counts?: Record<string, number>
  orphans?: string[]
  missingH1?: string[]
  missingDescription?: string[]
  duplicateTitle?: string[]
  duplicateDescription?: string[]
  checklist?: { id: string; ok: boolean; label: string }[]
  pages?: {
    path: string
    title: string
    scores?: {
      health: number | null
      metadata: number | null
      schema: number | null
      internal: number | null
      technical: number | null
      content: number | null
      performance: number | null
    }
  }[]
}

const PAGE_FIELDS: { key: string; label: string; hint?: string }[] = [
  { key: 'path', label: 'Yol', hint: '/ornek-sayfa' },
  { key: 'title', label: 'Başlık' },
  { key: 'description', label: 'Açıklama' },
  { key: 'h1', label: 'H1' },
  { key: 'canonical', label: 'Canonical' },
  { key: 'og_title', label: 'OG başlık' },
  { key: 'og_description', label: 'OG açıklama' },
  { key: 'og_image', label: 'OG görsel' },
  { key: 'focus_topic', label: 'Odak konu' },
]

export function AdminSeoPage() {
  const { push } = useToast()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'health' | 'pages' | 'redirects' | 'settings'>('health')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const payload = await adminApi.platform('seo')
      setData(payload)
      setError('')
    } catch (err: any) {
      setError(err?.message || 'SEO verisi yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const health = (data?.health || {}) as Health

  const tabs = [
    { id: 'health', label: 'Sağlık', icon: Search },
    { id: 'pages', label: 'Sayfa meta', icon: Settings2 },
    { id: 'redirects', label: 'Yönlendirmeler', icon: Link2 },
    { id: 'settings', label: 'Global ayarlar', icon: Settings2 },
  ] as const

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Pazarlama"
        title="SEO kontrol merkezi"
        description="Puanlar katalogdaki teknik kontrollerden gelir; Google sıralaması değildir. Kelime sayısı ve Core Web Vitals bu taramada ölçülmez."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}

      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cx(
              'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[12.5px] font-medium transition',
              tab === item.id
                ? 'bg-gradient-to-r from-cyan-400/[0.16] to-indigo-500/[0.08] text-white'
                : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
            )}
          >
            <item.icon className={cx('h-3.5 w-3.5', tab === item.id ? 'text-cyan-300' : 'text-slate-500')} />
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'health' && <HealthTab health={health} sitemapUrls={data?.sitemapUrls} />}
      {tab === 'pages' && (
        <PagesTab
          items={data?.items || []}
          healthPages={health.pages || []}
          onSaved={() => {
            push({ tone: 'success', title: 'Sayfa kaydedildi' })
            void load()
          }}
        />
      )}
      {tab === 'redirects' && (
        <RedirectsTab
          rows={data?.redirects || []}
          onSaved={() => {
            push({ tone: 'success', title: 'Yönlendirme kaydedildi' })
            void load()
          }}
        />
      )}
      {tab === 'settings' && data && (
        <SettingsTab
          settings={data.settings || {}}
          social={data.company?.social || {}}
          onSaved={() => {
            push({ tone: 'success', title: 'Ayarlar kaydedildi' })
            void load()
          }}
        />
      )}
    </div>
  )
}

function HealthTab({ health, sitemapUrls }: { health: Health; sitemapUrls?: number }) {
  const counts = health.counts || {}
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(counts).map(([key, value]) => (
          <Stat key={key} label={key} value={value} icon={<Search className="h-4 w-4" />} />
        ))}
        <Stat label="Sitemap URL" value={sitemapUrls ?? '—'} tone="violet" icon={<Link2 className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Yayın kontrol listesi" description="Teknik ön koşullar" bodyClassName="space-y-1.5">
          {(health.checklist || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-2">
              <span className="text-[12px] text-slate-300">{item.label}</span>
              <Badge tone={item.ok ? 'emerald' : 'amber'} dot>
                {item.ok ? 'tamam' : 'eksik'}
              </Badge>
            </div>
          ))}
          {!(health.checklist || []).length && <p className="text-[12px] text-slate-500">Kontrol listesi yok.</p>}
        </SectionCard>

        <SectionCard title="Skorlar" description="İlk 12 sayfa" bodyClassName="space-y-1.5">
          {(health.pages || []).slice(0, 12).map((page) => (
            <div key={page.path} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] px-3 py-2">
              <span className="min-w-0 truncate text-[11.5px] text-slate-300">{page.path}</span>
              <span className="flex shrink-0 gap-1">
                <Badge tone={(page.scores?.health ?? 0) >= 80 ? 'emerald' : 'amber'}>
                  health {page.scores?.health ?? '—'}
                </Badge>
                <Badge tone="slate">meta {page.scores?.metadata ?? '—'}</Badge>
              </span>
            </div>
          ))}
          {!(health.pages || []).length && <p className="text-[12px] text-slate-500">Skor yok.</p>}
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <IssueList title="Eksik H1" rows={health.missingH1 || []} />
        <IssueList title="Yetim sayfalar" rows={health.orphans || []} />
        <IssueList title="Yinelenen title" rows={health.duplicateTitle || []} />
      </div>
    </div>
  )
}

function IssueList({ title, rows }: { title: string; rows: string[] }) {
  return (
    <SectionCard title={title} description={`${rows.length} kayıt`}>
      {!rows.length && <p className="text-[12px] text-emerald-300">Sorun yok.</p>}
      <ul className="space-y-1">
        {rows.slice(0, 12).map((row) => (
          <li key={row} className="truncate rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-[11.5px] text-slate-400">
            {row}
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

function PagesTab({
  items,
  healthPages,
  onSaved,
}: {
  items: any[]
  healthPages: NonNullable<Health['pages']>
  onSaved: () => void
}) {
  const [form, setForm] = useState<Record<string, string>>({
    path: '/',
    title: '',
    description: '',
    h1: '',
    canonical: '',
    robots: 'index,follow',
    og_title: '',
    og_description: '',
    og_image: '',
    focus_topic: '',
    schema_type: 'WebPage',
    status: 'published',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await adminApi.platform('seo', {
        method: 'POST',
        body: JSON.stringify({ action: 'save-meta', ...form, include_in_sitemap: form.status === 'published' }),
      })
      onSaved()
    } catch (err: any) {
      setError(err?.message || 'Kaydedilemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <SectionCard title="Sayfa meta" description="Katalog varsayılanını geçersiz kılar">
        <form onSubmit={save} className="space-y-3">
          {error && <ErrorNote>{error}</ErrorNote>}
          <div className="grid gap-3 sm:grid-cols-2">
            {PAGE_FIELDS.map((field) => (
              <Field key={field.key} label={field.label} hint={field.hint} className={field.key === 'description' || field.key === 'og_description' ? 'sm:col-span-2' : ''}>
                {field.key === 'description' || field.key === 'og_description' ? (
                  <TextArea
                    rows={2}
                    value={form[field.key] || ''}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  />
                ) : (
                  <TextInput
                    value={form[field.key] || ''}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  />
                )}
              </Field>
            ))}
            <Field label="Robots">
              <TextInput value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })} />
            </Field>
            <Field label="Schema">
              <TextInput value={form.schema_type} onChange={(e) => setForm({ ...form, schema_type: e.target.value })} />
            </Field>
            <Field label="Durum">
              <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="published">published</option>
                <option value="draft">draft</option>
              </Select>
            </Field>
          </div>
          <Button type="submit" variant="primary" loading={busy}>
            <Save className="h-3.5 w-3.5" /> Kaydet
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Kayıtlı override" description="Düzenlemek için seçin" bodyClassName="space-y-1.5">
        {!items.length && <p className="text-[12px] text-slate-500">Henüz override yok. Katalog varsayılanları kullanılıyor.</p>}
        {items.map((item) => (
          <button
            key={item.id || item.path}
            type="button"
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left transition hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]"
            onClick={() =>
              setForm({
                path: item.path || '/',
                title: item.title || '',
                description: item.description || '',
                h1: item.h1 || '',
                canonical: item.canonical || '',
                robots: item.robots || 'index,follow',
                og_title: item.og_title || '',
                og_description: item.og_description || '',
                og_image: item.og_image || '',
                focus_topic: item.focus_topic || '',
                schema_type: item.schema_type || 'WebPage',
                status: item.status || 'published',
              })
            }
          >
            <p className="truncate text-[12px] font-medium text-white">{item.path}</p>
            <p className="truncate text-[11px] text-slate-500">{item.title || '—'}</p>
            <p className="mt-0.5 text-[10px] text-slate-600">{item.updated_at ? timeAgo(item.updated_at) : ''}</p>
          </button>
        ))}
        <div className="pt-3">
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Skorlar</p>
          {healthPages.slice(0, 10).map((page) => (
            <div key={page.path} className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{page.path}</span>
              <span className="shrink-0 tabular-nums">{page.scores?.health ?? '—'}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function RedirectsTab({ rows, onSaved }: { rows: any[]; onSaved: () => void }) {
  const [form, setForm] = useState({ source: '', destination: '', status_code: '301' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await adminApi.platform('seo', {
        method: 'POST',
        body: JSON.stringify({ action: 'redirect', ...form, status_code: Number(form.status_code) }),
      })
      setForm({ source: '', destination: '', status_code: '301' })
      onSaved()
    } catch (err: any) {
      setError(err?.message || 'Eklenemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Yeni yönlendirme" description="Eski yolu yeni adrese kalıcı olarak taşıyın">
        <form onSubmit={add} className="grid gap-2 md:grid-cols-[1fr_1fr_8rem_auto]">
          <TextInput required value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="/eski-yol" />
          <TextInput required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="/yeni-yol" />
          <Select value={form.status_code} onChange={(e) => setForm({ ...form, status_code: e.target.value })}>
            <option value="301">301</option>
            <option value="302">302</option>
            <option value="308">308</option>
          </Select>
          <Button type="submit" variant="primary" loading={busy}>
            <Plus className="h-3.5 w-3.5" /> Ekle
          </Button>
        </form>
        {error && <div className="mt-3"><ErrorNote>{error}</ErrorNote></div>}
      </SectionCard>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
        <table className="min-w-full text-left text-[12.5px]">
          <thead className="bg-white/[0.03] text-[10.5px] uppercase tracking-wide text-slate-500">
            <tr>
              {['Kaynak', 'Hedef', 'Kod', ''].map((head) => (
                <th key={head} className="px-4 py-2.5 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id || row.source} className="border-t border-white/[0.05]">
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-slate-300">{row.source}</td>
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-slate-400">{row.destination}</td>
                <td className="px-4 py-2.5">
                  <Badge tone="slate">{row.status_code}</Badge>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                    onClick={() =>
                      void adminApi.platform('seo', {
                        method: 'POST',
                        body: JSON.stringify({ action: 'delete-redirect', id: row.id, source: row.source }),
                      }).then(onSaved)
                    }
                    aria-label="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="px-4 py-6 text-center text-[12px] text-slate-500">Yönlendirme yok.</p>}
      </div>
    </div>
  )
}

function SettingsTab({
  settings,
  social,
  onSaved,
}: {
  settings: Record<string, string>
  social: Record<string, string>
  onSaved: () => void
}) {
  const [form, setForm] = useState<Record<string, string>>({
    site_title: settings.site_title || '',
    site_description: settings.site_description || '',
    default_og_image: settings.default_og_image || '',
    default_robots: settings.default_robots || 'index, follow',
    google_verification: settings.google_verification || '',
    bing_verification: settings.bing_verification || '',
    ga_measurement_id: settings.ga_measurement_id || '',
    gtm_id: settings.gtm_id || '',
    meta_pixel_id: settings.meta_pixel_id || '',
    linkedin: social.linkedin || '',
    x: social.x || '',
    instagram: social.instagram || '',
    youtube: social.youtube || '',
    github: social.github || '',
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    const { linkedin, x, instagram, youtube, github, ...seo } = form
    const nextSocial = Object.fromEntries(
      Object.entries({ linkedin, x, instagram, youtube, github }).filter(([, value]) =>
        String(value).trim().startsWith('https://'),
      ),
    )
    try {
      await adminApi.platform('seo', {
        method: 'POST',
        body: JSON.stringify({ action: 'save-settings', ...seo, sitemap_enabled: true, social: nextSocial }),
      })
      onSaved()
    } catch (err: any) {
      setError(err?.message || 'Kaydedilemedi')
    } finally {
      setBusy(false)
    }
  }

  const fields = [
    ['site_title', 'Site başlığı'],
    ['site_description', 'Site açıklaması'],
    ['default_og_image', 'Varsayılan OG görsel'],
    ['default_robots', 'Varsayılan robots'],
    ['google_verification', 'Google doğrulama'],
    ['bing_verification', 'Bing doğrulama'],
    ['ga_measurement_id', 'GA4 ölçüm kimliği'],
    ['gtm_id', 'GTM kimliği'],
    ['meta_pixel_id', 'Meta Pixel'],
    ['linkedin', 'LinkedIn'],
    ['x', 'X (Twitter)'],
    ['instagram', 'Instagram'],
    ['youtube', 'YouTube'],
    ['github', 'GitHub'],
  ]

  return (
    <SectionCard title="Global SEO & sosyal" description="Tüm sayfalara uygulanan varsayılanlar">
      <form onSubmit={save} className="space-y-3">
        {error && <ErrorNote>{error}</ErrorNote>}
        <div className="grid gap-3 md:grid-cols-2">
          {fields.map(([key, label]) => (
            <Field key={key} label={label} hint={key === 'site_description' ? 'meta açıklama' : undefined}>
              {key === 'site_description' ? (
                <TextArea rows={2} value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              ) : (
                <TextInput value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              )}
            </Field>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">Sosyal alanlar yalnızca https URL kabul eder; boş alanlar sameAs listesine eklenmez.</p>
        <Button type="submit" variant="primary" loading={busy}>
          <Save className="h-3.5 w-3.5" /> Ayarları kaydet
        </Button>
      </form>
    </SectionCard>
  )
}
