import { useCallback, useEffect, useMemo, useState } from 'react'
import { Filter, Mail, Phone, RefreshCw, Search, Users } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  StatusPill,
  TextArea,
  TextInput,
  cx,
  timeAgo,
  useToast,
} from '../ui'

const STATUSES = ['NEW', 'CONTACTED', 'DISCOVERY', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED']

export function AdminLeadsPage() {
  const { push } = useToast()
  const [leads, setLeads] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.leads({ q: q || undefined, status: status || undefined })
      setLeads(data.leads || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Lead’ler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [q, status])

  useEffect(() => {
    void load()
  }, [load])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const lead of leads) map[lead.status] = (map[lead.status] || 0) + 1
    return map
  }, [leads])

  const updateStatus = async (id: string, next: string) => {
    setSavingId(id)
    try {
      await adminApi.updateLead({ id, status: next, note: notes[id] || undefined })
      setNotes((current) => ({ ...current, [id]: '' }))
      push({ tone: 'success', title: 'Lead güncellendi', body: next })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Güncellenemedi', body: err?.message || 'Hata' })
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Müşteriler"
        title="Lead’ler / CRM"
        description="Form, WhatsApp ve kampanya kaynaklı tüm fırsatlar. Durum değişiklikleri lead zaman çizelgesine yazılır."
        actions={
          <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </Button>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <TextInput
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void load()}
              placeholder="İsim, e-posta, şirket veya referans kodu ara…"
              className="pl-9"
            />
          </div>
          <Button variant="primary" onClick={() => void load()} loading={loading}>
            <Filter className="h-4 w-4" /> Filtrele
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStatus('')}
            className={cx(
              'rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition',
              !status ? 'border-cyan-400/40 bg-cyan-400/10 text-white' : 'border-white/10 text-slate-400 hover:text-white',
            )}
          >
            Tümü
          </button>
          {STATUSES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(status === item ? '' : item)}
              className={cx(
                'rounded-full border px-3 py-1.5 text-[11px] font-medium transition',
                status === item
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-white'
                  : 'border-white/10 text-slate-400 hover:text-white',
              )}
            >
              {item}
              {counts[item] ? <span className="ml-1.5 text-[10px] text-slate-500">{counts[item]}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {loading && !leads.length && <Loading label="Lead’ler yükleniyor…" />}

      {!loading && !leads.length && (
        <EmptyState
          icon={<Users className="h-5 w-5" />}
          title="Lead bulunamadı"
          description="Filtreleri temizleyin veya yeni form gönderimlerini bekleyin."
          action={
            <Button variant="secondary" size="sm" onClick={() => { setQ(''); setStatus('') }}>
              Filtreleri temizle
            </Button>
          }
        />
      )}

      <div className="space-y-2.5">
        {leads.map((lead) => {
          const initials = String(lead.name || '?').slice(0, 2).toUpperCase()
          const open = openId === lead.id
          return (
            <article
              key={lead.id}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.022] transition hover:border-white/[0.14]"
            >
              <div className="flex flex-wrap items-center gap-3 px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-[11px] font-bold text-cyan-100 ring-1 ring-white/10">
                  {initials}
                </span>
                <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setOpenId(open ? null : lead.id)}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-white">{lead.name}</span>
                    <StatusPill value={lead.status} />
                    {lead.project_type && <Badge tone="slate">{lead.project_type}</Badge>}
                    {lead.budget_range && <Badge tone="violet">{lead.budget_range}</Badge>}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {lead.email || '—'}
                    </span>
                    {lead.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </span>
                    )}
                    <span>{lead.reference_code}</span>
                    <span>· {timeAgo(lead.created_at)}</span>
                  </p>
                </button>
                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => void updateStatus(lead.id, e.target.value)}
                    disabled={savingId === lead.id}
                    className="rounded-xl border border-white/10 bg-[#0a0e17] px-2.5 py-1.5 text-[12px] text-slate-200 outline-none focus:border-cyan-400/60"
                  >
                    {STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <Button variant="ghost" size="sm" onClick={() => setOpenId(open ? null : lead.id)}>
                    {open ? 'Kapat' : 'Detay'}
                  </Button>
                </div>
              </div>

              {open && (
                <div className="grid gap-4 border-t border-white/[0.06] px-4 py-4 lg:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Proje özeti</p>
                    <p className="whitespace-pre-wrap text-[12.5px] leading-relaxed text-slate-300">
                      {lead.project_description || 'Açıklama girilmemiş.'}
                    </p>
                    <dl className="grid grid-cols-2 gap-2 text-[11.5px]">
                      {[
                        ['Müşteri tipi', lead.customer_type],
                        ['Zaman planı', lead.timeline],
                        ['Tercih edilen iletişim', lead.preferred_contact],
                        ['Kaynak', lead.source],
                        ['Son temas', lead.last_contact_at ? new Date(lead.last_contact_at).toLocaleString('tr-TR') : '—'],
                        ['Sonraki takip', lead.next_follow_up ? new Date(lead.next_follow_up).toLocaleString('tr-TR') : '—'],
                      ].map(([label, value]) => (
                        <div key={String(label)} className="rounded-lg bg-white/[0.03] px-2.5 py-2">
                          <dt className="text-slate-500">{label}</dt>
                          <dd className="mt-0.5 text-slate-200">{value || '—'}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="space-y-3">
                    <Field label="İç not" hint="yalnızca ekip görür">
                      <TextArea
                        rows={5}
                        value={notes[lead.id] || ''}
                        onChange={(e) => setNotes((current) => ({ ...current, [lead.id]: e.target.value }))}
                        placeholder="Görüşme notu, sonraki adım…"
                      />
                    </Field>
                    <Button
                      variant="primary"
                      size="sm"
                      loading={savingId === lead.id}
                      onClick={() => void updateStatus(lead.id, lead.status)}
                    >
                      Notu kaydet
                    </Button>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
