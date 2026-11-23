import { useCallback, useEffect, useMemo, useState } from 'react'
import { LifeBuoy, Plus, RefreshCw, Send } from 'lucide-react'
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
  cx,
  timeAgo,
  useToast,
} from '../ui'

const STATUSES = ['OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'RESOLVED', 'CLOSED']
const PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT']

export function AdminTicketsPage() {
  const { push } = useToast()
  const [tickets, setTickets] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [reply, setReply] = useState<Record<string, string>>({})
  const [creating, setCreating] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    category: 'General',
    priority: 'NORMAL',
    body: '',
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.tickets()
      setTickets(data.tickets || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Talepler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const list = useMemo(
    () => (filter ? tickets.filter((row) => row.status === filter) : tickets),
    [tickets, filter],
  )
  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const row of tickets) map[row.status] = (map[row.status] || 0) + 1
    return map
  }, [tickets])

  const patch = async (id: string, body: Record<string, unknown>) => {
    setBusyId(id)
    try {
      const data = await adminApi.updateTicket({ id, ...body })
      setTickets((current) => current.map((row) => (row.id === id ? { ...row, ...data.ticket } : row)))
      if (body.reply) {
        await load()
        push({ tone: 'success', title: 'Yanıt gönderildi' })
      }
    } catch (err: any) {
      push({ tone: 'error', title: 'İşlem başarısız', body: err?.message || 'Hata' })
    } finally {
      setBusyId(null)
    }
  }

  const create = async () => {
    if (!form.customer_email || !form.subject) {
      push({ tone: 'error', title: 'E-posta ve konu zorunlu' })
      return
    }
    setCreating(true)
    try {
      await adminApi.createTicket(form)
      setForm({ customer_name: '', customer_email: '', subject: '', category: 'General', priority: 'NORMAL', body: '' })
      setCreateOpen(false)
      push({ tone: 'success', title: 'Talep oluşturuldu' })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Oluşturulamadı', body: err?.message || 'Hata' })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Destek"
        title="Destek talepleri"
        description="Gelen talepleri önceliklendirin, yanıtlayın ve durumlarını güncelleyin."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
            <Button variant="primary" size="sm" onClick={() => setCreateOpen((value) => !value)}>
              <Plus className="h-3.5 w-3.5" /> Yeni talep
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {createOpen && (
        <SectionCard title="Yeni destek talebi" description="Müşteri adına kayıt oluştur" bodyClassName="grid gap-3 md:grid-cols-2">
          <Field label="Müşteri adı">
            <TextInput value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
          </Field>
          <Field label="Müşteri e-postası">
            <TextInput
              type="email"
              value={form.customer_email}
              onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
              placeholder="musteri@ornek.com"
            />
          </Field>
          <Field label="Konu" className="md:col-span-2">
            <TextInput value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </Field>
          <Field label="Kategori">
            <TextInput value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </Field>
          <Field label="Öncelik">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0a0e17] px-3.5 py-2.5 text-[13.5px] text-white outline-none focus:border-cyan-400/60"
            >
              {PRIORITIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="İlk mesaj" className="md:col-span-2">
            <TextArea rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </Field>
          <div className="flex gap-2 md:col-span-2">
            <Button variant="primary" onClick={() => void create()} loading={creating}>
              Oluştur
            </Button>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Vazgeç
            </Button>
          </div>
        </SectionCard>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setFilter('')}
          className={cx(
            'rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition',
            !filter ? 'border-cyan-400/40 bg-cyan-400/10 text-white' : 'border-white/10 text-slate-400 hover:text-white',
          )}
        >
          Tümü <span className="ml-1 text-[10px] text-slate-500">{tickets.length}</span>
        </button>
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(filter === status ? '' : status)}
            className={cx(
              'rounded-full border px-3 py-1.5 text-[11px] font-medium transition',
              filter === status
                ? 'border-cyan-400/40 bg-cyan-400/10 text-white'
                : 'border-white/10 text-slate-400 hover:text-white',
            )}
          >
            {status.replace(/_/g, ' ')} <span className="ml-1 text-[10px] text-slate-500">{counts[status] || 0}</span>
          </button>
        ))}
      </div>

      {loading && !tickets.length && <Loading label="Talepler yükleniyor…" />}
      {!loading && !list.length && (
        <EmptyState icon={<LifeBuoy className="h-5 w-5" />} title="Talep yok" description="Destek kuyruğu temiz görünüyor." />
      )}

      <div className="space-y-3">
        {list.map((ticket) => (
          <article key={ticket.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-500">{ticket.reference_code}</span>
                  <StatusPill value={ticket.status} />
                  <Badge tone={ticket.priority === 'URGENT' ? 'rose' : ticket.priority === 'HIGH' ? 'amber' : 'slate'}>
                    {ticket.priority || 'NORMAL'}
                  </Badge>
                  <Badge tone="slate">{ticket.category || 'Genel'}</Badge>
                </div>
                <h3 className="mt-1.5 text-[14px] font-semibold text-white">{ticket.subject}</h3>
                <p className="mt-0.5 text-[11.5px] text-slate-500">
                  {ticket.customer_name || '—'} · {ticket.customer_email} · {timeAgo(ticket.created_at)}
                </p>
              </div>
              <select
                value={ticket.status}
                onChange={(e) => void patch(ticket.id, { status: e.target.value })}
                disabled={busyId === ticket.id}
                className="rounded-xl border border-white/10 bg-[#0a0e17] px-2.5 py-1.5 text-[12px] text-slate-200 outline-none focus:border-cyan-400/60"
              >
                {STATUSES.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 space-y-1.5 rounded-xl border border-white/[0.05] bg-black/20 p-3">
              {(ticket.support_messages || [])
                .slice()
                .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((message: any) => (
                  <div
                    key={message.id}
                    className={cx(
                      'max-w-[85%] rounded-xl px-3 py-2 text-[12.5px]',
                      message.sender_type === 'admin'
                        ? 'ml-auto bg-cyan-400/[0.1] text-cyan-50'
                        : 'bg-white/[0.05] text-slate-200',
                    )}
                  >
                    <p className="mb-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                      {message.sender_type === 'admin' ? 'LitxTech' : message.sender_email || 'Müşteri'} ·{' '}
                      {timeAgo(message.created_at)}
                    </p>
                    <p className="whitespace-pre-wrap">{message.body}</p>
                  </div>
                ))}
              {!(ticket.support_messages || []).length && (
                <p className="text-[12px] text-slate-500">Henüz mesaj yok. İlk yanıtı siz yazın.</p>
              )}
            </div>

            <form
              className="mt-3 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                const body = (reply[ticket.id] || '').trim()
                if (!body) return
                void patch(ticket.id, { reply: body }).then(() => setReply((current) => ({ ...current, [ticket.id]: '' })))
              }}
            >
              <TextInput
                value={reply[ticket.id] || ''}
                onChange={(e) => setReply((current) => ({ ...current, [ticket.id]: e.target.value }))}
                placeholder="Yanıt yaz…"
                className="flex-1"
              />
              <Button type="submit" variant="primary" loading={busyId === ticket.id}>
                <Send className="h-3.5 w-3.5" /> Gönder
              </Button>
            </form>
          </article>
        ))}
      </div>
    </div>
  )
}
