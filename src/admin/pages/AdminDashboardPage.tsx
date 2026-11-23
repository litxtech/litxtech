import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  Eye,
  HeartPulse,
  Inbox,
  LifeBuoy,
  Mail,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Users,
  UserPlus,
  Wifi,
} from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import { useAdminAuth } from '../AdminAuthContext'
import { LiveStatBubbles, useAdminLive } from '../AdminLive'
import {
  Badge,
  Button,
  Card,
  ErrorNote,
  Loading,
  PageHeader,
  SectionCard,
  Stat,
  cx,
  timeAgo,
} from '../ui'

const TONE_BY_TYPE: Record<string, string> = {
  lead: 'amber',
  message: 'sky',
  chat: 'emerald',
  ticket: 'violet',
  signup: 'rose',
  application: 'cyan',
}

export function AdminDashboardPage() {
  const { user } = useAdminAuth()
  const { items, loading: liveLoading, counts, refresh: refreshLive, lastSync } = useAdminLive()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setBusy(true)
    try {
      const payload = await adminApi.dashboard()
      setData(payload)
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Panel yüklenemedi')
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const cards = data?.cards || {}
  const name = (user?.full_name || data?.admin?.full_name || user?.email || '').split(' ')[0]
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  if (error && !data) {
    return (
      <div className="space-y-4">
        <PageHeader eyebrow="Genel bakış" title="Panel yüklenemedi" />
        <ErrorNote>{error}</ErrorNote>
        <Button onClick={() => void load()} variant="primary" loading={busy}>
          Tekrar dene
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${today} · canlı veri`}
        title={`Merhaba${name ? `, ${name}` : ''}`}
        description="LitxTech operasyon merkezi. Buradaki tüm sayılar canlı veritabanından okunur; yeni destek mesajı, üye veya lead geldiğinde baloncuklar anında güncellenir."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => void Promise.all([load(), refreshLive()])} loading={busy}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
            <Link to="/settings/company">
              <Button variant="primary" size="sm">
                <Sparkles className="h-3.5 w-3.5" /> Şirket bilgileri
              </Button>
            </Link>
          </>
        }
      />

      <LiveStatBubbles />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Yeni lead"
          value={cards.new_leads ?? 0}
          hint={`${cards.open_leads ?? 0} açık fırsat`}
          icon={<Users className="h-4 w-4" />}
          tone="amber"
          to="/leads"
        />
        <Stat
          label="Okunmamış mesaj"
          value={cards.new_messages ?? 0}
          hint="İletişim formu"
          icon={<Mail className="h-4 w-4" />}
          tone="cyan"
          to="/messages"
        />
        <Stat
          label="Canlı destek"
          value={cards.unread_chat ?? 0}
          hint={`${counts.unread_chat} okunmamış sohbet`}
          icon={<MessageCircle className="h-4 w-4" />}
          tone="emerald"
          to="/support/chat"
        />
        <Stat
          label="Açık talep"
          value={cards.open_tickets ?? 0}
          hint="Destek kuyruğu"
          icon={<LifeBuoy className="h-4 w-4" />}
          tone="violet"
          to="/support/tickets"
        />
        <Stat
          label="Bugünkü üye"
          value={cards.signups_today ?? 0}
          hint="Yeni kayıt"
          icon={<UserPlus className="h-4 w-4" />}
          tone="rose"
          to="/customers/users"
        />
        <Stat
          label="Bugünkü ziyaretçi"
          value={cards.visitors_today ?? 0}
          hint={`7 gün: ${cards.visitors_7d ?? 0}`}
          icon={<Eye className="h-4 w-4" />}
          tone="cyan"
          to="/analytics"
        />
        <Stat
          label="Şu an çevrimiçi"
          value={cards.online_users ?? 0}
          hint="Presence kaydı"
          icon={<Wifi className="h-4 w-4" />}
          tone="emerald"
          to="/customers/users"
        />
        <Stat
          label="30 gün görüntüleme"
          value={cards.page_views_30d ?? 0}
          hint="Sayfa görüntüleme"
          icon={<Activity className="h-4 w-4" />}
          tone="violet"
          to="/analytics"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <SectionCard
          title="Canlı akış"
          description="Destek mesajı, yeni üye, lead ve talepler 12 saniyede bir taranır."
          actions={
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="ltx-live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {lastSync ? `güncel` : 'bağlanıyor'}
            </span>
          }
          bodyClassName="p-2.5"
        >
          {liveLoading && !items.length && <p className="px-3 py-6 text-[12.5px] text-slate-500">Akış yükleniyor…</p>}
          {!liveLoading && !items.length && (
            <p className="px-3 py-10 text-center text-[12.5px] text-slate-500">
              Henüz hareket yok. Yeni bir mesaj geldiğinde burada baloncuk olarak belirir.
            </p>
          )}
          <ul className="space-y-1">
            {items.slice(0, 9).map((row, index) => (
              <li key={row.key}>
                <Link
                  to={row.href}
                  className={cx(
                    'flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.04]',
                    index === 0 && 'bg-white/[0.03]',
                  )}
                >
                  <span
                    className={cx(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1',
                      row.tone === 'amber' && 'bg-amber-400/10 text-amber-300 ring-amber-400/20',
                      row.tone === 'sky' && 'bg-sky-400/10 text-sky-300 ring-sky-400/20',
                      row.tone === 'emerald' && 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
                      row.tone === 'violet' && 'bg-violet-400/10 text-violet-300 ring-violet-400/20',
                      row.tone === 'rose' && 'bg-rose-400/10 text-rose-300 ring-rose-400/20',
                      row.tone === 'cyan' && 'bg-cyan-400/10 text-cyan-300 ring-cyan-400/20',
                      !TONE_BY_TYPE[row.type] && 'bg-white/[0.06] text-slate-300 ring-white/10',
                    )}
                  >
                    {row.type === 'lead' ? (
                      <Users className="h-3.5 w-3.5" />
                    ) : row.type === 'message' ? (
                      <Mail className="h-3.5 w-3.5" />
                    ) : row.type === 'chat' ? (
                      <MessageCircle className="h-3.5 w-3.5" />
                    ) : row.type === 'ticket' ? (
                      <LifeBuoy className="h-3.5 w-3.5" />
                    ) : row.type === 'signup' ? (
                      <UserPlus className="h-3.5 w-3.5" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-[13px] font-medium text-white">{row.title}</span>
                      <Badge tone="slate">{row.label}</Badge>
                      {row.unread && <Badge tone="rose" dot>yeni</Badge>}
                    </span>
                    {row.subtitle && <span className="mt-0.5 block truncate text-[11.5px] text-slate-500">{row.subtitle}</span>}
                  </span>
                  <span className="shrink-0 pt-0.5 text-[10.5px] text-slate-600">{timeAgo(row.created_at)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard
            title="Son lead’ler"
            description="CRM’e en son düşen kayıtlar"
            actions={
              <Link to="/leads" className="text-[11.5px] font-medium text-cyan-300 hover:text-cyan-200">
                Tümü →
              </Link>
            }
            bodyClassName="p-2.5"
          >
            {(data?.recent_leads || []).slice(0, 5).map((lead: any) => (
              <Link
                key={lead.id}
                to="/leads"
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition hover:bg-white/[0.04]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] font-medium text-white">{lead.name}</span>
                  <span className="block truncate text-[11px] text-slate-500">
                    {lead.project_type || 'Belirtilmedi'} · {timeAgo(lead.created_at)}
                  </span>
                </span>
                <Badge tone={lead.status === 'NEW' ? 'cyan' : 'slate'}>{String(lead.status || '—')}</Badge>
              </Link>
            ))}
            {!data?.recent_leads?.length && <p className="px-3 py-6 text-[12px] text-slate-500">Henüz lead yok.</p>}
          </SectionCard>

          <SectionCard title="Sistem sağlığı" description="Canlı servis kontrolleri" bodyClassName="space-y-2 p-4">
            {Object.entries(data?.health || {}).map(([key, value]) => {
              const ok = String(value).toLowerCase().includes('healthy')
              return (
                <div key={key} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                  <span className="flex items-center gap-2 text-[12px] capitalize text-slate-300">
                    <HeartPulse className={cx('h-3.5 w-3.5', ok ? 'text-emerald-300' : 'text-amber-300')} />
                    {key}
                  </span>
                  <Badge tone={ok ? 'emerald' : 'amber'} dot>
                    {String(value)}
                  </Badge>
                </div>
              )
            })}
            {!Object.keys(data?.health || {}).length && !data && <Loading />}
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/support/chat" className="group">
          <Card className="h-full transition group-hover:border-cyan-400/25 group-hover:bg-cyan-400/[0.04]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
              <MessageCircle className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-white">Canlı destek</p>
            <p className="mt-1 text-[12px] text-slate-400">Ziyaretçi sohbetlerini yanıtla, çevrimiçi durumunu yönet.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-cyan-300">
              Aç <ArrowUpRight className="h-3 w-3" />
            </span>
          </Card>
        </Link>
        <Link to="/messages" className="group">
          <Card className="h-full transition group-hover:border-cyan-400/25 group-hover:bg-cyan-400/[0.04]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/20">
              <Inbox className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-white">Gelen mesajlar</p>
            <p className="mt-1 text-[12px] text-slate-400">İletişim formu kayıtlarını oku, durumlarını güncelle.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-cyan-300">
              Aç <ArrowUpRight className="h-3 w-3" />
            </span>
          </Card>
        </Link>
        <Link to="/settings/company" className="group">
          <Card className="h-full transition group-hover:border-cyan-400/25 group-hover:bg-cyan-400/[0.04]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-white">İletişim bilgileri</p>
            <p className="mt-1 text-[12px] text-slate-400">Telefon, e-posta, WhatsApp ve site bilgilerini güncelle.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-cyan-300">
              Düzenle <ArrowUpRight className="h-3 w-3" />
            </span>
          </Card>
        </Link>
      </div>
    </div>
  )
}
