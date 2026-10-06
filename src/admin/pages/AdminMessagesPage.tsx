import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [error, setError] = useState('')

  const load = () =>
    adminApi
      .messages()
      .then((d) => setMessages(d.messages))
      .catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        <p className="text-slate-400">Contact form submissions.</p>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <div className="space-y-3">
        {messages.map((m) => (
          <article key={m.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-white">
                {m.name} · {m.email}
              </p>
              <select
                value={m.status}
                onChange={(e) =>
                  adminApi.updateMessage({ id: m.id, status: e.target.value }).then(load)
                }
                className="rounded border border-white/15 bg-slate-900 px-2 py-1 text-sm text-white"
              >
                <option value="new">new</option>
                <option value="read">read</option>
                <option value="replied">replied</option>
                <option value="closed">closed</option>
              </select>
            </div>
            <p className="mt-1 text-sm text-cyan-200">{m.subject}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{m.message}</p>
          </article>
        ))}
        {!messages.length && <p className="text-slate-500">No messages yet.</p>}
      </div>
    </div>
  )
}
