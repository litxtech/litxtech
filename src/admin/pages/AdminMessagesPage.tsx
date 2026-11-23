import { useCallback, useEffect, useMemo, useState } from 'react'
import { Inbox, Mail, RefreshCw, Reply } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Loading,
  PageHeader,
  StatusPill,
  cx,
  timeAgo,
  useToast,
} from '../ui'

const STATUSES = ['new', 'read', 'replied', 'closed']

export function AdminMessagesPage() {
  const { push } = useToast()
  const [messages, setMessages] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.messages()
      const list = data.messages || []
      setMessages(list)
      setActiveId((current) => current || list[0]?.id || null)
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Mesajlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const active = useMemo(() => messages.find((row) => row.id === activeId) || null, [messages, activeId])
  const unread = messages.filter((row) => row.status === 'new').length

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    try {
      const data = await adminApi.updateMessage({ id, status })
      setMessages((list) => list.map((row) => (row.id === id ? data.message : row)))
      push({ tone: 'success', title: 'Mesaj güncellendi', body: `Durum: ${status}` })
    } catch (err: any) {
      push({ tone: 'error', title: 'Güncellenemedi', body: err?.message || 'Hata' })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Müşteriler"
        title="Gelen mesajlar"
        description="İletişim formundan gelen kayıtlar. Okundu/yanıtlandı durumları ekip içinde takip edilir."
        actions={
          <>
            <Badge tone={unread ? 'cyan' : 'slate'} dot>
              {unread} yeni
            </Badge>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}
      {loading && !messages.length && <Loading label="Mesajlar yükleniyor…" />}

      {!loading && !messages.length && (
        <EmptyState icon={<Inbox className="h-5 w-5" />} title="Mesaj yok" description="İletişim formu gönderimleri burada listelenir." />
      )}

      {!!messages.length && (
        <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
          <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5 ltx-scroll">
            {messages.map((row) => {
              const isActive = row.id === activeId
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => {
                    setActiveId(row.id)
                    if (row.status === 'new') void updateStatus(row.id, 'read')
                  }}
                  className={cx(
                    'mb-1 flex w-full flex-col gap-1 rounded-xl px-3 py-2.5 text-left transition',
                    isActive ? 'bg-gradient-to-r from-cyan-400/[0.12] to-indigo-500/[0.05]' : 'hover:bg-white/[0.04]',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-semibold text-white">{row.name || row.email}</span>
                    {row.status === 'new' && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />}
                  </span>
                  <span className="truncate text-[11.5px] text-slate-400">{row.subject || '—'}</span>
                  <span className="flex items-center justify-between text-[10.5px] text-slate-600">
                    <span>{row.email}</span>
                    <span>{timeAgo(row.created_at)}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="min-h-[24rem] rounded-2xl border border-white/[0.07] bg-white/[0.022] p-5">
            {!active && <p className="text-sm text-slate-500">Bir mesaj seçin.</p>}
            {active && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[18px] font-semibold text-white">{active.subject || '(Konu yok)'}</h2>
                    <p className="mt-1 text-[12.5px] text-slate-400">
                      {active.name} ·{' '}
                      <a href={`mailto:${active.email}`} className="text-cyan-300 hover:text-cyan-200">
                        {active.email}
                      </a>
                      {active.phone ? ` · ${active.phone}` : ''}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">{new Date(active.created_at).toLocaleString('tr-TR')}</p>
                  </div>
                  <StatusPill value={active.status} />
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-200">{active.message}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {STATUSES.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={active.status === status ? 'primary' : 'secondary'}
                      loading={updating && active.status !== status}
                      onClick={() => void updateStatus(active.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                  <a href={`mailto:${active.email}?subject=${encodeURIComponent(`Re: ${active.subject || 'LitxTech'}`)}`}>
                    <Button size="sm" variant="success">
                      <Reply className="h-3.5 w-3.5" /> E-posta ile yanıtla
                    </Button>
                  </a>
                </div>

                {active.admin_notes && (
                  <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3">
                    <p className="text-[10.5px] font-semibold uppercase tracking-wide text-amber-200">İç not</p>
                    <p className="mt-1 whitespace-pre-wrap text-[12.5px] text-amber-100/90">{active.admin_notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <Mail className="h-3.5 w-3.5" /> Yanıtlar müşterinin e-posta adresine gider.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
