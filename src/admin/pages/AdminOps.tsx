import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  FileText,
  HeartPulse,
  Image as ImageIcon,
  Kanban,
  LifeBuoy,
  Mail,
  MessageCircle,
  MousePointerClick,
  Plus,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import { supabase } from '@/lib/supabase'
import { solutionsData } from '@/data/solutionsData'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  Select,
  Stat,
  StatusPill,
  TextArea,
  TextInput,
  cx,
  timeAgo,
  useToast,
} from '../ui'

function useResource(path: string) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [warning, setWarning] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const payload = await adminApi.platform(path)
      setData(payload)
      setWarning(payload?.warning || '')
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Kayıtlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [path])

  useEffect(() => {
    void load()
  }, [load])

  return { data, error, warning, loading, reload: load }
}

/* ------------------------------------------------------------------ users */

export function AdminUsersPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('users')
  const [q, setQ] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const users = useMemo(
    () =>
      (data?.users || []).filter((user: any) =>
        `${user.name} ${user.email} ${user.username}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [data, q],
  )

  const toggle = async (user: any) => {
    setBusyId(user.id)
    try {
      await adminApi.platform(`users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: user.is_active === false }),
      })
      push({ tone: 'success', title: user.is_active === false ? 'Kullanıcı aktifleştirildi' : 'Kullanıcı devre dışı' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'İşlem başarısız', body: err?.message || 'Hata' })
    } finally {
      setBusyId(null)
    }
  }

  const online = (data?.users || []).filter((user: any) => user.status === 'online').length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Müşteriler"
        title="Kullanıcılar"
        description="Uygulama hesapları ve presence durumu. Engelleme işlemi profile.is_active alanını günceller."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Toplam kullanıcı" value={(data?.users || []).length} icon={<Users className="h-4 w-4" />} />
        <Stat label="Şu an çevrimiçi" value={online} tone="emerald" icon={<Activity className="h-4 w-4" />} />
        <Stat
          label="Son 24 saat kayıt"
          value={
            (data?.users || []).filter((user: any) => Date.now() - new Date(user.created_at).getTime() < 86400000).length
          }
          tone="rose"
          icon={<UserPlus className="h-4 w-4" />}
        />
      </div>

      <div className="flex items-center gap-2">
        <TextInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim veya e-posta ara…" className="max-w-sm" />
        <Badge tone="slate">{users.length} kayıt</Badge>
      </div>

      {loading && !data && <Loading />}

      <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[12.5px]">
            <thead className="bg-white/[0.03] text-[10.5px] uppercase tracking-wide text-slate-500">
              <tr>
                {['Kullanıcı', 'E-posta', 'Durum', 'Kayıt', 'Son görülme', ''].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-2.5 font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-t border-white/[0.05] transition hover:bg-white/[0.03]">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-[10px] font-bold text-slate-300">
                        {String(user.name || '?').slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-slate-200">{user.name || '—'}</span>
                      {user.is_verified && <Badge tone="cyan">doğrulanmış</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400">{user.email || '—'}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone={user.is_active === false ? 'rose' : user.status === 'online' ? 'emerald' : 'slate'} dot>
                      {user.is_active === false ? 'engelli' : user.status || 'offline'}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">{timeAgo(user.created_at)}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">{timeAgo(user.last_seen)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Button
                      size="sm"
                      variant={user.is_active === false ? 'success' : 'danger'}
                      loading={busyId === user.id}
                      onClick={() => void toggle(user)}
                    >
                      {user.is_active === false ? 'Aktifleştir' : 'Engelle'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!users.length && !loading && <p className="px-4 py-8 text-center text-[12.5px] text-slate-500">Kullanıcı bulunamadı.</p>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- feed */

const FEED_CATEGORIES = ['New Product', 'Behind the Build', 'Technology', 'Case Study', 'Company Update', 'Release', 'Engineering']

export function AdminFeedPage() {
  const { push } = useToast()
  const { data, error, warning, loading, reload } = useResource('feed')
  const [form, setForm] = useState({ title: '', body: '', category: 'Company Update', type: 'update', status: 'draft' })
  const [busy, setBusy] = useState(false)

  const create = async () => {
    if (!form.title.trim()) {
      push({ tone: 'error', title: 'Başlık zorunlu' })
      return
    }
    setBusy(true)
    try {
      await adminApi.platform('feed', { method: 'POST', body: JSON.stringify(form) })
      setForm({ title: '', body: '', category: form.category, type: 'update', status: 'draft' })
      push({ tone: 'success', title: 'Gönderi oluşturuldu' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Oluşturulamadı', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  const patch = async (id: string, body: Record<string, unknown>) => {
    try {
      await adminApi.platform(`feed/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Güncellenemedi', body: err?.message || 'Hata' })
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik"
        title="Feed"
        description="Duyuru, sürüm notu ve mühendislik yazıları. Yayınlanan kayıtlar /feed adresinde listelenir."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}
      {warning && <ErrorNote>{warning}</ErrorNote>}

      <SectionCard title="Yeni gönderi" description="Taslak olarak başlar, hazır olduğunda yayınlayın">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Başlık" className="md:col-span-2">
            <TextInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="LitxTech feed" />
          </Field>
          <Field label="Kategori">
            <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {FEED_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </Select>
          </Field>
          <Field label="Durum">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="scheduled">scheduled</option>
            </Select>
          </Field>
          <Field label="İçerik" className="md:col-span-2">
            <TextArea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Markdown benzeri düz metin" />
          </Field>
          <div className="md:col-span-2">
            <Button variant="primary" onClick={() => void create()} loading={busy}>
              <Plus className="h-3.5 w-3.5" /> Gönderiyi kaydet
            </Button>
          </div>
        </div>
      </SectionCard>

      {loading && !data && <Loading />}

      <div className="space-y-2.5">
        {(data?.posts || []).map((post: any) => (
          <article key={post.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[13.5px] font-semibold text-white">{post.title || 'Adsız'}</h3>
                  <StatusPill value={post.status} />
                  <Badge tone="slate">{post.category || 'Genel'}</Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-[12px] text-slate-400">{post.body || 'İçerik yok.'}</p>
                <p className="mt-1.5 text-[10.5px] text-slate-600">
                  {post.views || 0} görüntüleme · {post.published_at ? timeAgo(post.published_at) : timeAgo(post.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {post.status !== 'published' && (
                  <Button size="sm" variant="primary" onClick={() => void patch(post.id, { status: 'published' })}>
                    Yayınla
                  </Button>
                )}
                {post.status === 'published' && (
                  <Button size="sm" variant="secondary" onClick={() => void patch(post.id, { status: 'archived' })}>
                    Arşivle
                  </Button>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm('Bu gönderi silinsin mi?')) return
                    try {
                      await adminApi.platform(`feed/${post.id}`, { method: 'DELETE' })
                      await reload()
                    } catch (err: any) {
                      push({ tone: 'error', title: 'Silinemedi', body: err?.message || 'Hata' })
                    }
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                  aria-label="Sil"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
        {!loading && !(data?.posts || []).length && (
          <EmptyState icon={<FileText className="h-5 w-5" />} title="Gönderi yok" description="İlk feed kaydını oluşturun." />
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- services */

export function AdminServicesPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('services')
  const [busy, setBusy] = useState(false)

  const importExisting = async () => {
    setBusy(true)
    try {
      await adminApi.platform('services', {
        method: 'POST',
        body: JSON.stringify({
          items: solutionsData.map((solution, index) => ({
            slug: solution.slug,
            title: solution.text.tr.title,
            short_description: solution.text.tr.cardDescription,
            detailed_description: solution.text.tr.problem,
            status: 'published',
            sort_order: index,
            benefits: solution.text.tr.features,
            cta_label: 'Teklif al',
            cta_url: '/contact',
          })),
        }),
      })
      push({ tone: 'success', title: 'Hizmetler içe aktarıldı' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'İçe aktarılamadı', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik"
        title="Hizmetler"
        description="Çözüm kataloğu. Kayıt yoksa mevcut çözümleri tek tıkla içe aktarabilirsiniz."
        actions={
          <Button variant="primary" size="sm" onClick={() => void importExisting()} loading={busy}>
            <Sparkles className="h-3.5 w-3.5" /> Mevcut çözümleri içe aktar
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {(data?.services || []).map((service: any) => (
          <article key={service.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-semibold text-white">{service.title}</p>
              <StatusPill value={service.status} />
            </div>
            <p className="mt-1.5 line-clamp-3 text-[12px] text-slate-400">{service.short_description || '—'}</p>
            <p className="mt-2 font-mono text-[10.5px] text-slate-600">/{service.slug}</p>
          </article>
        ))}
      </div>
      {!loading && !(data?.services || []).length && (
        <EmptyState icon={<Sparkles className="h-5 w-5" />} title="Hizmet kaydı yok" description="Mevcut çözüm kataloğunu içe aktarın." />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ media */

export function AdminMediaPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('media')
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      await adminApi.platform('media', {
        method: 'POST',
        body: JSON.stringify({ filename: url.split('/').pop(), url, alt, mime_type: 'image/webp' }),
      })
      setUrl('')
      setAlt('')
      push({ tone: 'success', title: 'Görsel eklendi' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Eklenemedi', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik"
        title="Medya"
        description="Genel görsel kütüphanesi. Yükleme MIME ve boyut API tarafında doğrulanır."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}

      <form onSubmit={add} className="grid gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 md:grid-cols-[1fr_14rem_auto]">
        <TextInput required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… görsel URL" />
        <TextInput value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt metin" />
        <Button type="submit" variant="primary" loading={busy}>
          <Plus className="h-3.5 w-3.5" /> Ekle
        </Button>
      </form>

      {loading && !data && <Loading />}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {(data?.media || []).map((media: any) => (
          <figure key={media.id} className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.022]">
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
              {media.url ? (
                <img src={media.url} alt={media.alt || media.filename} className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-600">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[12px] text-slate-200">{media.filename}</p>
                <p className="truncate text-[10.5px] text-slate-500">{media.alt || 'Alt metin yok'}</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!confirm('Görsel silinsin mi?')) return
                  try {
                    await adminApi.platform(`media/${media.id}`, { method: 'DELETE' })
                    await reload()
                  } catch (err: any) {
                    push({ tone: 'error', title: 'Silinemedi', body: err?.message || 'Hata' })
                  }
                }}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                aria-label="Sil"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- chat */

export function AdminChatPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('chat')
  const [active, setActive] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!data?.conversations?.length) return
    setActive((current) => current || data.conversations[0].id)
  }, [data])

  useEffect(() => {
    if (!active) return
    const pull = () =>
      adminApi
        .platform(`chat/${active}`)
        .then((payload) => setMessages(payload.messages || []))
        .catch(() => {})
    void pull()
    const timer = window.setInterval(pull, 5000)
    const channel = supabase?.channel(`chat:${active}`)
    channel?.on('broadcast', { event: 'message' }, () => void pull()).subscribe()
    return () => {
      window.clearInterval(timer)
      if (channel) void supabase?.removeChannel(channel)
    }
  }, [active])

  const send = async () => {
    if (!active || !text.trim()) return
    setSending(true)
    try {
      await adminApi.platform(`chat/${active}`, { method: 'POST', body: JSON.stringify({ body: text }) })
      setText('')
      const payload = await adminApi.platform(`chat/${active}`)
      setMessages(payload.messages || [])
      void supabase?.channel(`chat:${active}`).send({ type: 'broadcast', event: 'message', payload: {} })
    } catch (err: any) {
      push({ tone: 'error', title: 'Gönderilemedi', body: err?.message || 'Hata' })
    } finally {
      setSending(false)
    }
  }

  const online = !!data?.presence?.online
  const conversation = (data?.conversations || []).find((row: any) => row.id === active)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Destek"
        title="Canlı destek"
        description="Ziyaretçi sohbetleri 5 saniyede bir yenilenir. Çevrimiçi durumunuz site üzerinde anında yansır."
        actions={
          <>
            <Badge tone={online ? 'emerald' : 'slate'} dot>
              {online ? 'çevrimiçi' : 'çevrimdışı'}
            </Badge>
            <Button
              variant={online ? 'secondary' : 'primary'}
              size="sm"
              onClick={() =>
                void adminApi
                  .platform('chat/presence', { method: 'POST', body: JSON.stringify({ online: !online }) })
                  .then(reload)
              }
            >
              {online ? 'Çevrimdışı ol' : 'Çevrimiçi ol'}
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}

      <div className="grid gap-4 lg:grid-cols-[19rem_1fr]">
        <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5 ltx-scroll">
          {(data?.conversations || []).map((row: any) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setActive(row.id)}
              className={cx(
                'mb-1 w-full rounded-xl px-3 py-2.5 text-left transition',
                active === row.id ? 'bg-gradient-to-r from-cyan-400/[0.12] to-indigo-500/[0.05]' : 'hover:bg-white/[0.04]',
              )}
            >
              <p className="truncate text-[12.5px] font-semibold text-white">{row.visitor_name || 'Ziyaretçi'}</p>
              <p className="truncate text-[11px] text-slate-500">{row.page || '/'}</p>
              <p className="mt-0.5 text-[10.5px] text-slate-600">{timeAgo(row.updated_at)}</p>
            </button>
          ))}
          {!(data?.conversations || []).length && (
            <p className="px-3 py-8 text-center text-[12px] text-slate-500">Henüz konuşma yok.</p>
          )}
        </div>

        <div className="flex min-h-[26rem] flex-col rounded-2xl border border-white/[0.07] bg-white/[0.022]">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <p className="text-[13px] font-semibold text-white">{conversation?.visitor_name || 'Sohbet seçin'}</p>
            <p className="text-[11px] text-slate-500">{conversation?.page || '—'}</p>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-4 ltx-scroll">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cx(
                  'max-w-[85%] rounded-xl px-3 py-2 text-[12.5px]',
                  message.sender === 'admin' ? 'ml-auto bg-cyan-400/[0.12] text-cyan-50' : 'bg-white/[0.05] text-slate-200',
                )}
              >
                <p className="mb-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                  {message.sender === 'admin' ? 'LitxTech' : 'Ziyaretçi'} · {timeAgo(message.created_at)}
                </p>
                <p className="whitespace-pre-wrap">{message.body}</p>
              </div>
            ))}
            {!messages.length && (
              <div className="flex h-full items-center justify-center text-center text-[12px] text-slate-500">
                <span>
                  <MessageCircle className="mx-auto mb-2 h-5 w-5 text-slate-600" />
                  Mesaj yok. İlk yanıtı siz yazın.
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.06] p-3">
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                void send()
              }}
            >
              <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={active ? 'Yanıt yaz…' : 'Önce bir sohbet seçin'}
                disabled={!active}
                className="flex-1"
              />
              <Button type="submit" variant="primary" loading={sending} disabled={!active}>
                <Send className="h-3.5 w-3.5" /> Gönder
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- analytics */

export function AdminAnalyticsPage() {
  const { data, error, loading, reload } = useResource('analytics')

  const summary = useMemo(() => {
    const events = data?.events || []
    const views = data?.views || []
    const byName: Record<string, number> = {}
    for (const event of events) byName[event.event_name] = (byName[event.event_name] || 0) + 1
    const byPath: Record<string, number> = {}
    for (const view of views) byPath[view.path] = (byPath[view.path] || 0) + 1
    const devices: Record<string, number> = {}
    for (const view of views) devices[view.device || 'unknown'] = (devices[view.device || 'unknown'] || 0) + 1
    return {
      byName,
      byPath,
      devices,
      visitors: new Set(views.map((view: any) => view.visitor_id).filter(Boolean)).size,
      views: views.length,
      topPaths: Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 8),
      topEvents: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 8),
    }
  }, [data])

  const max = Math.max(1, ...summary.topPaths.map(([, value]) => value))

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analitik"
        title="Trafik ve olaylar"
        description="Son 30 gün. Tüm sayılar analytics_events ve page_views tablolarından gelir."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Sayfa görüntüleme" value={summary.views} icon={<Activity className="h-4 w-4" />} />
        <Stat label="Tekil ziyaretçi" value={summary.visitors} tone="emerald" icon={<Users className="h-4 w-4" />} />
        <Stat label="Olay" value={(data?.events || []).length} tone="violet" icon={<MousePointerClick className="h-4 w-4" />} />
        <Stat label="Mobil" value={summary.devices.mobile || 0} tone="amber" icon={<MousePointerClick className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="En çok görüntülenen sayfalar" description="Son 30 gün">
          <div className="space-y-2.5">
            {summary.topPaths.map(([path, value]) => (
              <div key={path}>
                <div className="mb-1 flex items-center justify-between text-[11.5px]">
                  <span className="truncate text-slate-300">{path}</span>
                  <span className="tabular-nums text-slate-500">{value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    style={{ width: `${Math.max(4, (value / max) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            {!summary.topPaths.length && <p className="text-[12px] text-slate-500">Henüz görüntüleme yok.</p>}
          </div>
        </SectionCard>

        <SectionCard title="Olaylar" description="Tıklama ve dönüşüm olayları">
          <div className="space-y-2">
            {summary.topEvents.map(([name, value]) => (
              <div key={name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                <span className="text-[12px] text-slate-300">{name}</span>
                <Badge tone="cyan">{value}</Badge>
              </div>
            ))}
            {!summary.topEvents.length && <p className="text-[12px] text-slate-500">Henüz olay yok.</p>}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ misc */

export function AdminCtasPage() {
  const { data, error, loading } = useResource('ctas')
  const items = data?.items || []
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Pazarlama" title="CTA’lar" description="Sitedeki çağrı düğmeleri ve hedefleri." />
      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item: any) => (
          <div key={item.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-white">{item.label || item.key}</p>
              <Badge tone={item.active === false ? 'slate' : 'emerald'} dot>
                {item.active === false ? 'pasif' : 'aktif'}
              </Badge>
            </div>
            <p className="mt-1.5 truncate text-[11.5px] text-slate-500">{item.href || '—'}</p>
          </div>
        ))}
        {!items.length && !loading && <EmptyState icon={<MousePointerClick className="h-5 w-5" />} title="CTA yok" />}
      </div>
    </div>
  )
}

export function AdminNotificationsPage() {
  const { data, error, loading, reload } = useResource('notifications')
  const items = data?.items || []
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistem"
        title="Bildirimler"
        description="Platform bildirimleri. Okundu işaretlemek listeyi günceller."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}
      <div className="space-y-2">
        {items.map((row: any) => (
          <div
            key={row.id}
            className={cx(
              'flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.022] px-4 py-3',
              !row.read_at && 'border-cyan-400/20 bg-cyan-400/[0.04]',
            )}
          >
            <div className="min-w-0">
              <p className="text-[12.5px] font-medium text-white">{row.title}</p>
              <p className="truncate text-[11.5px] text-slate-500">{row.body || row.href}</p>
              <p className="mt-0.5 text-[10.5px] text-slate-600">{timeAgo(row.created_at)}</p>
            </div>
            {!row.read_at ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => void adminApi.platform(`notifications/${row.id}`, { method: 'PATCH' }).then(reload)}
              >
                Okundu işaretle
              </Button>
            ) : (
              <Badge tone="slate">okundu</Badge>
            )}
          </div>
        ))}
        {!items.length && !loading && (
          <EmptyState icon={<LifeBuoy className="h-5 w-5" />} title="Bildirim yok" description="Yeni hareketler burada listelenir." />
        )}
      </div>
    </div>
  )
}

export function AdminRolesPage() {
  const { data, error, loading } = useResource('roles')
  const admins = data?.admins || []
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Sistem" title="Yönetici rolleri" description="Panel erişimi olan hesaplar." />
      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
        <table className="min-w-full text-left text-[12.5px]">
          <thead className="bg-white/[0.03] text-[10.5px] uppercase tracking-wide text-slate-500">
            <tr>
              {['E-posta', 'Ad', 'Rol', 'Durum'].map((head) => (
                <th key={head} className="px-4 py-2.5 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map((admin: any) => (
              <tr key={admin.id} className="border-t border-white/[0.05]">
                <td className="px-4 py-2.5 text-slate-200">{admin.email}</td>
                <td className="px-4 py-2.5 text-slate-400">{admin.full_name || '—'}</td>
                <td className="px-4 py-2.5">
                  <Badge tone="violet">
                    <Shield className="mr-1 h-3 w-3" /> {admin.role}
                  </Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Badge tone={admin.is_active === false ? 'rose' : 'emerald'} dot>
                    {admin.is_active === false ? 'pasif' : 'aktif'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminHealthPage() {
  const { data, error, loading, reload } = useResource('health')
  const checks = data?.checks || []
  const ok = checks.filter((check: any) => check.status === 'ok').length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistem"
        title="Sistem sağlığı"
        description="Veritabanı, kimlik doğrulama, analitik ve destek servisleri için canlı probe sonuçları."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void reload()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Sağlıklı" value={ok} tone="emerald" icon={<CheckCircle2 className="h-4 w-4" />} />
        <Stat label="Toplam kontrol" value={checks.length} icon={<HeartPulse className="h-4 w-4" />} />
        <Stat label="Uyarı" value={checks.length - ok} tone="amber" icon={<AlertTriangle className="h-4 w-4" />} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {checks.map((check: any) => (
          <div
            key={check.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.022] px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <Database className={cx('h-4 w-4', check.status === 'ok' ? 'text-emerald-300' : 'text-amber-300')} />
              <div>
                <p className="text-[12.5px] font-medium text-white">{check.name}</p>
                {check.detail && <p className="text-[10.5px] text-slate-500">{check.detail}</p>}
              </div>
            </div>
            <Badge tone={check.status === 'ok' ? 'emerald' : 'amber'} dot>
              {check.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminErrorsPage() {
  const { data, error, loading } = useResource('errors')
  const items = data?.items || []
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Sistem" title="Hatalar" description="Uygulama hataları ve referans kimlikleri." />
      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !data && <Loading />}
      <div className="space-y-2">
        {items.map((row: any) => (
          <div key={row.id} className="rounded-2xl border border-rose-400/15 bg-rose-500/[0.04] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12.5px] font-medium text-rose-100">{row.message}</p>
              <Badge tone={row.severity === 'high' || row.severity === 'critical' ? 'rose' : 'amber'}>{row.severity || 'info'}</Badge>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {row.endpoint || '—'} · {row.reference_id || '—'} · {timeAgo(row.created_at)}
            </p>
          </div>
        ))}
        {!items.length && !loading && (
          <EmptyState icon={<CheckCircle2 className="h-5 w-5" />} title="Hata kaydı yok" description="Sistem temiz görünüyor." />
        )}
      </div>
    </div>
  )
}

export function AdminPagesCms() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('pages')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [busy, setBusy] = useState(false)

  const create = async () => {
    if (!title || !slug) return
    setBusy(true)
    try {
      await adminApi.platform('pages', { method: 'POST', body: JSON.stringify({ title, slug, status: 'draft' }) })
      setTitle('')
      setSlug('')
      push({ tone: 'success', title: 'Sayfa oluşturuldu' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Oluşturulamadı', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="İçerik" title="Sayfalar" description="Dinamik CMS sayfaları /sayfa/:slug adresinde yayınlanır." />
      {error && <ErrorNote>{error}</ErrorNote>}
      <form
        className="grid gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 md:grid-cols-[1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          void create()
        }}
      >
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" />
        <TextInput required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" />
        <Button type="submit" variant="primary" loading={busy}>
          <Plus className="h-3.5 w-3.5" /> Taslak
        </Button>
      </form>
      {loading && !data && <Loading />}
      <div className="space-y-2">
        {(data?.pages || []).map((page: any) => (
          <div key={page.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.022] px-4 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-white">{page.title}</p>
              <p className="font-mono text-[10.5px] text-slate-500">/sayfa/{page.slug}</p>
            </div>
            <StatusPill value={page.status} />
          </div>
        ))}
        {!(data?.pages || []).length && !loading && (
          <EmptyState icon={<FileText className="h-5 w-5" />} title="Sayfa yok" description="İlk CMS sayfasını oluşturun." />
        )}
      </div>
    </div>
  )
}

export function AdminNavigationPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('navigation')
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)

  const create = async () => {
    if (!label || !url) return
    setBusy(true)
    try {
      await adminApi.platform('navigation', {
        method: 'POST',
        body: JSON.stringify({ label, url, location: 'header', visible: true }),
      })
      setLabel('')
      setUrl('')
      push({ tone: 'success', title: 'Menü öğesi eklendi' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Eklenemedi', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Ayarlar" title="Menü" description="Üst menü ve footer bağlantıları." />
      {error && <ErrorNote>{error}</ErrorNote>}
      <form
        className="grid gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 md:grid-cols-[1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          void create()
        }}
      >
        <TextInput required value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Etiket" />
        <TextInput required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/yol" />
        <Button type="submit" variant="primary" loading={busy}>
          <Plus className="h-3.5 w-3.5" /> Ekle
        </Button>
      </form>
      {loading && !data && <Loading />}
      <div className="space-y-1.5">
        {(data?.items || []).map((item: any) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] px-3.5 py-2">
            <span className="text-[12px] text-slate-300">
              <Badge tone="slate">{item.location}</Badge> <span className="ml-2">{item.label}</span>
            </span>
            <span className="font-mono text-[11px] text-slate-500">{item.url}</span>
          </div>
        ))}
        {!(data?.items || []).length && !loading && <EmptyState icon={<FileText className="h-5 w-5" />} title="Menü boş" />}
      </div>
    </div>
  )
}

export function AdminEmailPage() {
  const { push } = useToast()
  const { data, error, loading, reload } = useResource('email')
  const [form, setForm] = useState({ from_name: 'LitxTech', from_email: '', reply_to: '' })
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (data?.settings) {
      setForm({
        from_name: data.settings.from_name || 'LitxTech',
        from_email: data.settings.from_email || '',
        reply_to: data.settings.reply_to || '',
      })
    }
  }, [data])

  const save = async () => {
    setBusy(true)
    try {
      await adminApi.platform('email', { method: 'POST', body: JSON.stringify(form) })
      push({ tone: 'success', title: 'E-posta ayarları kaydedildi' })
      await reload()
    } catch (err: any) {
      push({ tone: 'error', title: 'Kaydedilemedi', body: err?.message || 'Hata' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ayarlar"
        title="E-posta"
        description={
          data?.smtp_configured
            ? 'SMTP tanımlı. Şablonlar gerçek gönderim için kullanılabilir.'
            : 'SMTP tanımlı değil. Şablonlar kaydedilir, sahte gönderim yapılmaz.'
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Gönderen kimliği" description="Tüm otomatik e-postalar için">
          <div className="space-y-3">
            <Field label="Gönderen adı">
              <TextInput value={form.from_name} onChange={(e) => setForm({ ...form, from_name: e.target.value })} />
            </Field>
            <Field label="Gönderen e-posta">
              <TextInput value={form.from_email} onChange={(e) => setForm({ ...form, from_email: e.target.value })} placeholder="no-reply@litxtech.com" />
            </Field>
            <Field label="Yanıt adresi">
              <TextInput value={form.reply_to} onChange={(e) => setForm({ ...form, reply_to: e.target.value })} placeholder="support@litxtech.com" />
            </Field>
            <Button variant="primary" onClick={() => void save()} loading={busy}>
              <Mail className="h-3.5 w-3.5" /> Kaydet
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Şablonlar" description="Kayıtlı e-posta şablonları">
          {loading && !data && <Loading />}
          <div className="space-y-2">
            {(data?.templates || []).map((template: any) => (
              <div key={template.key} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">{template.key}</p>
                <p className="text-[12.5px] text-slate-200">{template.subject}</p>
              </div>
            ))}
            {!(data?.templates || []).length && !loading && (
              <p className="text-[12px] text-slate-500">Şablon yok.</p>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export function AdminPipelinePage() {
  const [leads, setLeads] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { push } = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.leads()
      setLeads(data.leads || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Pipeline yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const columns = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']

  const move = async (lead: any, direction: 1 | -1) => {
    const index = columns.indexOf(lead.status)
    const next = columns[Math.min(Math.max(index + direction, 0), columns.length - 1)]
    if (!next || next === lead.status) return
    try {
      await adminApi.updateLead({ id: lead.id, status: next })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Taşınamadı', body: err?.message || 'Hata' })
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Müşteriler"
        title="Pipeline"
        description="Lead’leri aşamalar arasında taşıyın. Her taşıma CRM zaman çizelgesine yazılır."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />
      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !leads.length && <Loading />}

      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {columns.map((status) => {
          const rows = leads.filter((lead) => lead.status === status)
          return (
            <div key={status} className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-2.5">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{status}</p>
                <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-400">{rows.length}</span>
              </div>
              <div className="space-y-1.5">
                {rows.map((lead) => (
                  <div key={lead.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2">
                    <p className="truncate text-[12px] font-medium text-white">{lead.name}</p>
                    <p className="truncate text-[10.5px] text-slate-500">{lead.project_type || lead.email}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-600">{timeAgo(lead.created_at)}</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => void move(lead, -1)}
                          className="rounded px-1 text-[10px] text-slate-500 hover:text-white"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => void move(lead, 1)}
                          className="rounded px-1 text-[10px] text-slate-500 hover:text-white"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!rows.length && <p className="px-1 py-4 text-center text-[10.5px] text-slate-600">boş</p>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 text-[11px] text-slate-600">
        <Kanban className="h-3.5 w-3.5" /> Kartlardaki oklarla aşama değiştirin.
      </div>
    </div>
  )
}

export { AdminSeoPage } from './AdminSeoDashboard'

