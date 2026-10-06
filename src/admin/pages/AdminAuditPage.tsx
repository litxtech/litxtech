import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminAuditPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .audit()
      .then((d) => setLogs(d.logs))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Audit Log</h2>
        <p className="text-slate-400">Append-only security and content events.</p>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <div className="space-y-2">
        {logs.map((l) => (
          <div key={l.id} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
            <p className="text-white">
              {l.actor_email || 'system'} · {l.action} · {l.resource || '—'}
            </p>
            <p className="text-slate-500">{new Date(l.created_at).toLocaleString()}</p>
          </div>
        ))}
        {!logs.length && <p className="text-slate-500">No audit events yet.</p>}
      </div>
    </div>
  )
}
