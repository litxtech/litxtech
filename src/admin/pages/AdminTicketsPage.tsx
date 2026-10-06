import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [error, setError] = useState('')

  const load = () =>
    adminApi
      .tickets()
      .then((d) => setTickets(d.tickets))
      .catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Support Tickets</h2>
        <p className="text-slate-400">Internal ticket queue.</p>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <div className="space-y-3">
        {tickets.map((t) => (
          <article key={t.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-white">
                  {t.reference_code} · {t.subject}
                </p>
                <p className="text-sm text-slate-400">
                  {t.customer_email} · {t.category} · {t.priority}
                </p>
              </div>
              <select
                value={t.status}
                onChange={(e) =>
                  adminApi.updateTicket({ id: t.id, status: e.target.value }).then(load)
                }
                className="rounded border border-white/15 bg-slate-900 px-2 py-1 text-sm text-white"
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="WAITING_CUSTOMER">WAITING_CUSTOMER</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </article>
        ))}
        {!tickets.length && <p className="text-slate-500">No tickets yet.</p>}
      </div>
    </div>
  )
}
