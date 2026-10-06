import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

const STATUSES = [
  'NEW',
  'CONTACTED',
  'DISCOVERY',
  'QUALIFIED',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
  'ARCHIVED',
]

export function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [note, setNote] = useState<Record<string, string>>({})

  const load = () => {
    adminApi
      .leads({ q: q || undefined, status: status || undefined })
      .then((d) => setLeads(d.leads))
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id: string, next: string) => {
    await adminApi.updateLead({ id, status: next, note: note[id] || undefined })
    setNote((n) => ({ ...n, [id]: '' }))
    load()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Leads / CRM</h2>
        <p className="text-slate-400">Pipeline statuses update the lead timeline.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, company…"
          className="min-w-[220px] flex-1 rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={load}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Filter
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-4">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                <p className="text-sm text-slate-400">
                  {lead.reference_code} · {lead.email}
                  {lead.phone ? ` · ${lead.phone}` : ''}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {lead.customer_type || '—'} / {lead.project_type || '—'}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
                  {lead.project_description}
                </p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                {lead.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-2">
              <select
                defaultValue={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                value={note[lead.id] || ''}
                onChange={(e) => setNote((n) => ({ ...n, [lead.id]: e.target.value }))}
                placeholder="Internal note (optional)"
                className="min-w-[200px] flex-1 rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => updateStatus(lead.id, lead.status)}
                className="rounded-lg border border-white/15 px-3 py-2 text-sm text-white hover:bg-white/5"
              >
                Save note
              </button>
            </div>
          </article>
        ))}
        {!leads.length && <p className="text-slate-500">No leads found.</p>}
      </div>
    </div>
  )
}
