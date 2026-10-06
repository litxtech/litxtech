import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

type Health = {
  counts?: Record<string, number>
  orphans?: string[]
  missingH1?: string[]
  missingDescription?: string[]
  duplicateTitle?: string[]
  duplicateDescription?: string[]
  redirectChains?: { source: string; destination: string }[]
  checklist?: { id: string; ok: boolean; label: string }[]
  pages?: { path: string; title: string; scores?: { health: number | null; metadata: number | null; schema: number | null; internal: number | null; technical: number | null; content: number | null; performance: number | null } }[]
  notes?: string
}

export function AdminSeoPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'health' | 'pages' | 'redirects' | 'settings'>('health')
  const [notice, setNotice] = useState('')

  const load = () => {
    adminApi
      .platform('seo')
      .then((payload) => {
        setData(payload)
        setError('')
      })
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    load()
  }, [])

  const health = (data?.health || {}) as Health

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">SEO</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          Puanlar bu katalogdaki teknik kontrollerden gelir. Google sıralaması değildir. İçerik kelime sayısı ve Core Web Vitals bu taramada ölçülmez.
        </p>
      </div>
      {error && <p className="text-red-300">{error}</p>}
      {notice && <p className="text-emerald-300">{notice}</p>}
      <div className="flex flex-wrap gap-2">
        {(['health', 'pages', 'redirects', 'settings'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-lg px-3 py-2 text-sm ${tab === item ? 'bg-white text-slate-950' : 'border border-white/10 text-slate-200'}`}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === 'health' && <HealthTab health={health} sitemapUrls={data?.sitemapUrls} />}
      {tab === 'pages' && <PagesTab items={data?.items || []} healthPages={health.pages || []} onSaved={() => { setNotice('Sayfa kaydedildi.'); load() }} />}
      {tab === 'redirects' && <RedirectsTab rows={data?.redirects || []} onSaved={() => { setNotice('Yönlendirme kaydedildi.'); load() }} />}
      {tab === 'settings' && data && (
        <SettingsTab
          settings={data.settings || {}}
          social={data.company?.social || {}}
          onSaved={() => {
            setNotice('Ayarlar kaydedildi.')
            load()
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
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(counts).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{key}</p>
            <p className="mt-2 text-2xl text-white">{value}</p>
          </div>
        ))}
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">sitemap urls</p>
          <p className="mt-2 text-2xl text-white">{sitemapUrls ?? '—'}</p>
        </div>
      </div>
      <List title="Eksik H1 kaydı" rows={health.missingH1 || []} />
      <List title="Yetim sayfalar" rows={health.orphans || []} />
      <List title="Yinelenen title" rows={health.duplicateTitle || []} />
      <div>
        <h3 className="mb-2 text-sm font-medium text-white">Yayın kontrol listesi</h3>
        <ul className="space-y-1 text-sm">
          {(health.checklist || []).map((item) => (
            <li key={item.id} className={item.ok ? 'text-emerald-300' : 'text-amber-300'}>
              {item.ok ? 'Tamam' : 'Eksik'} · {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function List({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-white">{title}</h3>
      {!rows.length && <p className="text-sm text-slate-500">Yok.</p>}
      <ul className="space-y-1 text-sm text-slate-300">
        {rows.slice(0, 20).map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
    </div>
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
  const [form, setForm] = useState({
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
  const [pageError, setPageError] = useState('')

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="space-y-2"
        onSubmit={(event) => {
          event.preventDefault()
          setPageError('')
          adminApi
            .platform('seo', { method: 'POST', body: JSON.stringify({ action: 'save-meta', ...form, include_in_sitemap: form.status === 'published' }) })
            .then(onSaved)
            .catch((err: Error) => setPageError(err.message))
        }}
      >
        {pageError && <p className="text-sm text-red-300">{pageError}</p>}
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className="block text-xs text-slate-400">
            {key}
            <input
              value={value}
              onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
            />
          </label>
        ))}
        <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950" type="submit">
          Kaydet
        </button>
      </form>
      <div className="space-y-2 text-sm">
        <h3 className="font-medium text-white">Kayıtlı override</h3>
        {!items.length && <p className="text-slate-500">Henüz override yok. Katalog varsayılanları kullanılır.</p>}
        {items.map((item) => (
          <button
            key={item.id || item.path}
            type="button"
            className="block w-full rounded-lg border border-white/10 px-3 py-2 text-left"
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
            {item.path} — {item.title}
          </button>
        ))}
        <h3 className="pt-4 font-medium text-white">Skorlar</h3>
        <p className="text-xs text-slate-500">content ve performance null ise ölçülmedi.</p>
        {healthPages.slice(0, 12).map((page) => (
          <p key={page.path} className="text-slate-300">
            {page.path} · health {page.scores?.health ?? '—'} · meta {page.scores?.metadata ?? '—'} · schema {page.scores?.schema ?? '—'}
          </p>
        ))}
      </div>
    </div>
  )
}

function RedirectsTab({ rows, onSaved }: { rows: any[]; onSaved: () => void }) {
  const [form, setForm] = useState({ source: '', destination: '', status_code: '301' })
  const [redirectError, setRedirectError] = useState('')
  return (
    <div className="space-y-4">
      <form
        className="grid gap-2 md:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault()
          setRedirectError('')
          adminApi
            .platform('seo', {
              method: 'POST',
              body: JSON.stringify({ action: 'redirect', ...form, status_code: Number(form.status_code) }),
            })
            .then(onSaved)
            .catch((err: Error) => setRedirectError(err.message))
        }}
      >
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="/eski" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="/yeni" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" value={form.status_code} onChange={(e) => setForm({ ...form, status_code: e.target.value })} />
        <button className="rounded-lg bg-white px-4 py-2 text-slate-950" type="submit">Ekle</button>
      </form>
      {redirectError && <p className="text-sm text-red-300">{redirectError}</p>}
      <ul className="space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.id || row.source} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2">
            <span>{row.source} → {row.destination} ({row.status_code})</span>
            <button
              type="button"
              className="text-xs text-slate-400 underline"
              onClick={() => adminApi.platform('seo', { method: 'POST', body: JSON.stringify({ action: 'delete-redirect', id: row.id, source: row.source }) }).then(onSaved)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
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
  const [form, setForm] = useState({
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
  useEffect(() => {
    setForm((current) => ({
      ...current,
      ...settings,
      linkedin: social.linkedin || '',
      x: social.x || '',
      instagram: social.instagram || '',
      youtube: social.youtube || '',
      github: social.github || '',
    }))
  }, [settings, social])
  return (
    <form
      className="grid max-w-2xl gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        const { linkedin, x, instagram, youtube, github, ...seo } = form
        const nextSocial = Object.fromEntries(
          Object.entries({ linkedin, x, instagram, youtube, github }).filter(([, value]) => String(value).trim().startsWith('https://')),
        )
        adminApi
          .platform('seo', {
            method: 'POST',
            body: JSON.stringify({ action: 'save-settings', ...seo, sitemap_enabled: true, social: nextSocial }),
          })
          .then(onSaved)
      }}
    >
      {Object.entries(form).map(([key, value]) => (
        <label key={key} className="text-xs text-slate-400">
          {key}
          <input value={value || ''} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white" />
        </label>
      ))}
      <p className="text-xs text-slate-500">Sosyal alanlar yalnızca https URL kaydeder. Boş alan sameAs listesine eklenmez.</p>
      <button className="w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950" type="submit">
        Ayarları kaydet
      </button>
    </form>
  )
}
