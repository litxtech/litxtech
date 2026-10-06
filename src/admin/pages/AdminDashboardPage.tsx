import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '@/lib/adminApi'

export function AdminDashboardPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .dashboard()
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
        {error}
        <p className="mt-2 text-sm text-red-300/80">
          Run SQL migration and set SUPABASE_SERVICE_ROLE_KEY on Vercel.
        </p>
      </div>
    )
  }

  if (!data) return <p className="text-slate-400">Loading dashboard…</p>

  const cards = [
    { label: 'Bugünkü ziyaretçi', value: data.cards.visitors_today ?? 0 },
    { label: 'Son 7 gün', value: data.cards.visitors_7d ?? 0 },
    { label: 'Son 30 gün', value: data.cards.visitors_30d ?? 0 },
    { label: 'Şu an çevrimiçi', value: data.cards.online_users ?? 0 },
    { label: 'Yeni lead', value: data.cards.new_leads },
    { label: 'Açık talep', value: data.cards.open_tickets },
    { label: 'Bekleyen mesaj', value: data.cards.new_messages },
    { label: 'WhatsApp tıklama', value: data.cards.whatsapp_clicks ?? 0 },
    { label: 'Telefon tıklama', value: data.cards.phone_clicks ?? 0 },
    { label: 'E-posta tıklama', value: data.cards.email_clicks ?? 0 },
    { label: 'Hatalı giriş', value: data.cards.failed_logins ?? 0 },
    { label: 'Sayfa görüntüleme', value: data.cards.page_views_30d ?? 0 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome{data.admin?.full_name ? `, ${data.admin.full_name}` : ''}
        </h2>
        <p className="text-slate-400">LitxTech Control Center — live database metrics only.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-slate-400">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/leads" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">
          View Leads
        </Link>
        <Link
          to="/applications"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
        >
          Manage Applications
        </Link>
        <Link
          to="/settings/company"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5"
        >
          Edit Contact / WhatsApp
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 p-5">
          <h3 className="mb-4 font-semibold text-white">Recent leads</h3>
          <div className="space-y-3">
            {(data.recent_leads || []).map((l: any) => (
              <div key={l.id} className="rounded-lg bg-white/5 px-3 py-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-white">{l.name}</span>
                  <span className="text-cyan-300">{l.status}</span>
                </div>
                <p className="text-slate-400">
                  {l.reference_code} · {l.project_type || '—'}
                </p>
              </div>
            ))}
            {!data.recent_leads?.length && <p className="text-slate-500">No leads yet.</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 p-5">
          <h3 className="mb-4 font-semibold text-white">Recent activity</h3>
          <div className="space-y-3">
            {(data.recent_activity || []).map((a: any) => (
              <div key={a.id} className="rounded-lg bg-white/5 px-3 py-2 text-sm">
                <p className="text-white">
                  {a.actor_email || 'system'}: {a.action}
                </p>
                <p className="text-slate-500">{new Date(a.created_at).toLocaleString()}</p>
              </div>
            ))}
            {!data.recent_activity?.length && <p className="text-slate-500">No audit events yet.</p>}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 p-5">
        <h3 className="mb-3 font-semibold text-white">System health</h3>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {Object.entries(data.health || {}).map(([k, v]) => (
            <li key={k} className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
              <span className="uppercase text-slate-400">{k}</span>
              <span className="text-white">{String(v)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">Analytics: {data.analytics_status}</p>
      </section>
    </div>
  )
}
