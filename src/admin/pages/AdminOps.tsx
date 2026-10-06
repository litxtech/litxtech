import { useEffect, useMemo, useState } from 'react'
import { adminApi } from '@/lib/adminApi'
import { supabase } from '@/lib/supabase'
import { solutionsData } from '@/data/solutionsData'

function useResource(path: string) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const load = () => {
    setLoading(true)
    adminApi
      .platform(path)
      .then((d) => {
        setData(d)
        setError('')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    load()
  }, [path])
  return { data, error, loading, reload: load }
}

function Shell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {hint && <p className="mt-1 text-sm text-slate-400">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

export function AdminUsersPage() {
  const { data, error, loading, reload } = useResource('users')
  const [q, setQ] = useState('')
  const users = (data?.users || []).filter((u: any) =>
    `${u.email} ${u.full_name}`.toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <Shell title="Kullanıcılar" hint="Oturum durumu presence kaydından gelir.">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ara" className="w-full max-w-sm rounded-lg border border-white/10 bg-transparent px-3 py-2" />
      {error && <p className="text-red-300">{error}</p>}
      {loading && <p className="text-slate-400">Yükleniyor…</p>}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              {['Kullanıcı', 'E-posta', 'Son giriş', 'Durum', 'Giriş', 'İşlem'].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="px-3 py-2">{u.full_name || '—'}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.last_login ? new Date(u.last_login).toLocaleString() : '—'}</td>
                <td className="px-3 py-2">{u.status}</td>
                <td className="px-3 py-2">{u.login_count}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="text-xs underline"
                    onClick={() =>
                      adminApi
                        .platform(`users/${u.id}`, {
                          method: 'PATCH',
                          body: JSON.stringify({ blocked: !u.blocked, is_active: u.blocked }),
                        })
                        .then(reload)
                    }
                  >
                    {u.blocked ? 'Aktifleştir' : 'Engelle'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && !loading && <p className="p-4 text-slate-500">Kayıtlı kullanıcı yok.</p>}
      </div>
    </Shell>
  )
}

export function AdminFeedPage() {
  const { data, error, reload } = useResource('feed')
  const [form, setForm] = useState({ title: '', body: '', category: 'Company Update', type: 'update', status: 'draft' })
  const save = async () => {
    await adminApi.platform('feed', { method: 'POST', body: JSON.stringify(form) })
    setForm({ title: '', body: '', category: 'Company Update', type: 'update', status: 'draft' })
    reload()
  }
  return (
    <Shell title="Feed" hint="Taslak, yayın ve arşiv gerçek kayıtlardır.">
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {['New Product', 'Behind the Build', 'Technology', 'Case Study', 'Company Update', 'Release', 'Engineering'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea className="md:col-span-2 rounded-lg border border-white/10 bg-transparent px-3 py-2" rows={4} placeholder="İçerik" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <select className="rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="scheduled">scheduled</option>
        </select>
        <button type="button" onClick={save} className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-950">Kaydet</button>
      </div>
      <ul className="space-y-3">
        {(data?.posts || []).map((p: any) => (
          <li key={p.id} className="rounded-xl border border-white/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{p.title || 'Adsız'}</p>
                <p className="text-xs text-slate-400">{p.category} · {p.status} · {p.views || 0} görüntüleme</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button type="button" onClick={() => adminApi.platform(`feed/${p.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'published' }) }).then(reload)}>Yayınla</button>
                <button type="button" onClick={() => adminApi.platform(`feed/${p.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'archived' }) }).then(reload)}>Arşiv</button>
                <button type="button" onClick={() => { if (confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) adminApi.platform(`feed/${p.id}`, { method: 'DELETE' }).then(reload) }}>Sil</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

export function AdminServicesPage() {
  const { data, error, reload } = useResource('services')
  const importExisting = async () => {
    await adminApi.platform('services', {
      method: 'POST',
      body: JSON.stringify({
        items: solutionsData.map((s, i) => ({
          slug: s.slug,
          title: s.title,
          short_description: s.cardDescription,
          detailed_description: s.problem,
          status: 'published',
          sort_order: i,
          benefits: s.features,
          cta_label: 'Teklif al',
          cta_url: '/contact',
        })),
      }),
    })
    reload()
  }
  return (
    <Shell title="Hizmetler" hint="Boşsa mevcut çözüm kataloğunu içe aktarın. Yeni hizmet uydurulmaz.">
      {error && <p className="text-red-300">{error}</p>}
      <button type="button" onClick={importExisting} className="rounded-lg border border-white/15 px-4 py-2 text-sm">Mevcut çözümleri içe aktar</button>
      <ul className="space-y-2">
        {(data?.services || []).map((s: any) => (
          <li key={s.id} className="rounded-lg border border-white/10 px-3 py-2 text-sm">{s.title} · {s.status}</li>
        ))}
      </ul>
    </Shell>
  )
}

export function AdminMediaPage() {
  const { data, error, reload } = useResource('media')
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  return (
    <Shell title="Medya" hint="URL kaydı. Yükleme MIME ve boyut API’de doğrulanır.">
      {error && <p className="text-red-300">{error}</p>}
      <form
        className="flex flex-col gap-2 md:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          adminApi.platform('media', { method: 'POST', body: JSON.stringify({ filename: url.split('/').pop(), url, alt, mime_type: 'image/webp' }) }).then(() => {
            setUrl('')
            setAlt('')
            reload()
          })
        }}
      >
        <input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Görsel URL" className="flex-1 rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt metin" className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <button className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-950" type="submit">Ekle</button>
      </form>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(data?.media || []).map((m: any) => (
          <li key={m.id} className="rounded-xl border border-white/10 p-3 text-sm">
            <p className="truncate">{m.filename}</p>
            <p className="text-slate-400">{m.alt || 'Alt metin yok'}</p>
            <button type="button" className="mt-2 text-xs underline" onClick={() => confirm('Silinsin mi?') && adminApi.platform(`media/${m.id}`, { method: 'DELETE' }).then(reload)}>Sil</button>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

export function AdminChatPage() {
  const { data, error, reload } = useResource('chat')
  const [active, setActive] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  useEffect(() => {
    if (!active) return
    const pull = () => adminApi.platform(`chat/${active}`).then((d) => setMessages(d.messages || [])).catch(() => {})
    pull()
    const t = window.setInterval(pull, 8000)
    const channel = supabase?.channel(`chat:${active}`)
    channel?.on('broadcast', { event: 'message' }, () => void pull()).subscribe()
    return () => {
      window.clearInterval(t)
      if (channel) void supabase?.removeChannel(channel)
    }
  }, [active])
  return (
    <Shell title="Canlı destek" hint="Mesajlar 3 saniyede bir yenilenir. Çevrimiçi durum ziyaretçiye yansır.">
      {error && <p className="text-red-300">{error}</p>}
      <button
        type="button"
        className="rounded-lg border border-white/15 px-3 py-2 text-sm"
        onClick={() => adminApi.platform('chat/presence', { method: 'POST', body: JSON.stringify({ online: !data?.presence?.online }) }).then(reload)}
      >
        Durum: {data?.presence?.online ? 'Çevrimiçi' : 'Çevrimdışı'}
      </button>
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <ul className="space-y-2">
          {(data?.conversations || []).map((c: any) => (
            <li key={c.id}>
              <button type="button" onClick={() => setActive(c.id)} className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-sm">
                {c.visitor_name} · {c.page}
              </button>
            </li>
          ))}
          {!data?.conversations?.length && <p className="text-sm text-slate-500">Henüz konuşma yok.</p>}
        </ul>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="mb-3 max-h-80 space-y-2 overflow-y-auto">
            {messages.map((m) => (
              <p key={m.id} className="text-sm"><span className="text-slate-400">{m.sender}:</span> {m.body}</p>
            ))}
          </div>
          {active && (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                adminApi.platform(`chat/${active}`, { method: 'POST', body: JSON.stringify({ body: text }) }).then(() => {
                  setText('')
                  return adminApi.platform(`chat/${active}`)
                }).then((d) => {
                  setMessages(d.messages || [])
                  void supabase?.channel(`chat:${active}`).send({ type: 'broadcast', event: 'message', payload: {} })
                })
              }}
            >
              <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="Yanıt" />
              <button className="rounded-lg bg-white px-3 py-2 text-slate-950" type="submit">Gönder</button>
            </form>
          )}
        </div>
      </div>
    </Shell>
  )
}

export function AdminAnalyticsPage() {
  const { data, error, loading } = useResource('analytics')
  const summary = useMemo(() => {
    const events = data?.events || []
    const views = data?.views || []
    const byName: Record<string, number> = {}
    for (const e of events) byName[e.event_name] = (byName[e.event_name] || 0) + 1
    const byPath: Record<string, number> = {}
    for (const v of views) byPath[v.path] = (byPath[v.path] || 0) + 1
    return { byName, byPath, visitors: new Set(views.map((v: any) => v.visitor_id).filter(Boolean)).size, views: views.length }
  }, [data])
  return (
    <Shell title="Trafik ve olaylar" hint="Son 30 gün. Veri yoksa sayılar 0’dır.">
      {error && <p className="text-red-300">{error}</p>}
      {loading && <p className="text-slate-400">Yükleniyor…</p>}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 p-4"><p className="text-sm text-slate-400">Sayfa görüntüleme</p><p className="text-2xl">{summary.views}</p></div>
        <div className="rounded-xl border border-white/10 p-4"><p className="text-sm text-slate-400">Tekil ziyaretçi</p><p className="text-2xl">{summary.visitors}</p></div>
        <div className="rounded-xl border border-white/10 p-4"><p className="text-sm text-slate-400">Olay</p><p className="text-2xl">{(data?.events || []).length}</p></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 font-medium">Olaylar</h3>
          {Object.entries(summary.byName).map(([k, v]) => (
            <p key={k} className="text-sm text-slate-300">{k}: {v}</p>
          ))}
          {!Object.keys(summary.byName).length && <p className="text-sm text-slate-500">Henüz olay yok.</p>}
        </div>
        <div>
          <h3 className="mb-2 font-medium">Sayfalar</h3>
          {Object.entries(summary.byPath).map(([k, v]) => (
            <p key={k} className="text-sm text-slate-300">{k}: {v}</p>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function SimpleList({ title, path, field }: { title: string; path: string; field: string }) {
  const { data, error, loading } = useResource(path)
  const items = data?.[field] || data?.items || []
  return (
    <Shell title={title}>
      {error && <p className="text-red-300">{error}</p>}
      {loading && <p className="text-slate-400">Yükleniyor…</p>}
      {!items.length && !loading && <p className="text-slate-500">Kayıt yok.</p>}
      <ul className="space-y-2 text-sm">
        {items.map((item: any) => (
          <li key={item.id || item.path || item.key} className="rounded-lg border border-white/10 px-3 py-2">
            {item.title || item.subject || item.key || item.path || item.email || item.message || item.name}
            {item.status && <span className="ml-2 text-slate-400">{item.status}</span>}
            {item.detail && <span className="ml-2 text-slate-400">{item.detail}</span>}
          </li>
        ))}
      </ul>
    </Shell>
  )
}

export { AdminSeoPage } from './AdminSeoDashboard'

export function AdminCtasPage() {
  return <SimpleList title="CTA" path="ctas" field="items" />
}
export function AdminNotificationsPage() {
  const { data, error, reload } = useResource('notifications')
  return (
    <Shell title="Bildirimler">
      {error && <p className="text-red-300">{error}</p>}
      <ul className="space-y-2">
        {(data?.items || []).map((n: any) => (
          <li key={n.id} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
            <span>{n.read_at ? '' : '● '}{n.title}</span>
            {!n.read_at && (
              <button type="button" className="text-xs underline" onClick={() => adminApi.platform(`notifications/${n.id}`, { method: 'PATCH' }).then(reload)}>Okundu</button>
            )}
          </li>
        ))}
      </ul>
    </Shell>
  )
}
export function AdminRolesPage() {
  return <SimpleList title="Roller" path="roles" field="admins" />
}
export function AdminHealthPage() {
  return <SimpleList title="Sistem sağlığı" path="health" field="checks" />
}
export function AdminErrorsPage() {
  return <SimpleList title="Sistem hataları" path="errors" field="items" />
}
export function AdminPagesCms() {
  const { data, error, reload } = useResource('pages')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  return (
    <Shell title="Sayfalar">
      {error && <p className="text-red-300">{error}</p>}
      <form className="flex flex-col gap-2 md:flex-row" onSubmit={(e) => { e.preventDefault(); adminApi.platform('pages', { method: 'POST', body: JSON.stringify({ title, slug, status: 'draft' }) }).then(() => { setTitle(''); setSlug(''); reload() }) }}>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <button className="rounded-lg bg-white px-4 py-2 text-slate-950" type="submit">Taslak</button>
      </form>
      <ul className="text-sm">{(data?.pages || []).map((p: any) => <li key={p.id}>{p.title} · {p.status}</li>)}</ul>
    </Shell>
  )
}
export function AdminNavigationPage() {
  const { data, error, reload } = useResource('navigation')
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  return (
    <Shell title="Menü">
      {error && <p className="text-red-300">{error}</p>}
      <form className="flex flex-col gap-2 md:flex-row" onSubmit={(e) => { e.preventDefault(); adminApi.platform('navigation', { method: 'POST', body: JSON.stringify({ label, url, location: 'header', visible: true }) }).then(reload) }}>
        <input required value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Etiket" className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/yol" className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        <button className="rounded-lg bg-white px-4 py-2 text-slate-950" type="submit">Ekle</button>
      </form>
      <ul className="text-sm">{(data?.items || []).map((i: any) => <li key={i.id}>{i.location}: {i.label} → {i.url}</li>)}</ul>
    </Shell>
  )
}
export function AdminEmailPage() {
  const { data, error, reload } = useResource('email')
  const [form, setForm] = useState({ from_name: 'LitxTech', from_email: '', reply_to: '' })
  useEffect(() => {
    if (data?.settings) setForm({ from_name: data.settings.from_name || 'LitxTech', from_email: data.settings.from_email || '', reply_to: data.settings.reply_to || '' })
  }, [data])
  return (
    <Shell title="E-posta" hint={data?.smtp_configured ? 'SMTP tanımlı.' : 'SMTP tanımlı değil. Şablonlar kaydedilir, sahte gönderim yapılmaz.'}>
      {error && <p className="text-red-300">{error}</p>}
      <form className="grid max-w-lg gap-2" onSubmit={(e) => { e.preventDefault(); adminApi.platform('email', { method: 'POST', body: JSON.stringify(form) }).then(reload) }}>
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" value={form.from_name} onChange={(e) => setForm({ ...form, from_name: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="From email" value={form.from_email} onChange={(e) => setForm({ ...form, from_email: e.target.value })} />
        <input className="rounded-lg border border-white/10 bg-transparent px-3 py-2" placeholder="Reply-to" value={form.reply_to} onChange={(e) => setForm({ ...form, reply_to: e.target.value })} />
        <button className="w-fit rounded-lg bg-white px-4 py-2 text-slate-950" type="submit">Kaydet</button>
      </form>
      <ul className="text-sm text-slate-300">{(data?.templates || []).map((t: any) => <li key={t.key}>{t.key}: {t.subject}</li>)}</ul>
    </Shell>
  )
}

export function AdminPipelinePage() {
  const [leads, setLeads] = useState<any[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    adminApi.leads().then((d) => setLeads(d.leads)).catch((e) => setError(e.message))
  }, [])
  const cols = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']
  return (
    <Shell title="Pipeline">
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cols.map((status) => (
          <div key={status} className="rounded-xl border border-white/10 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{status}</p>
            {leads.filter((l) => l.status === status).map((l) => (
              <p key={l.id} className="mb-2 rounded-lg bg-white/5 px-2 py-2 text-sm">{l.name}</p>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  )
}
