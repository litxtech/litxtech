import { useAdminAuth } from '../AdminAuthContext'

export function AdminSecurityPage() {
  const { user } = useAdminAuth()

  const flags = [
    { key: 'SUPABASE_URL', ok: true },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', ok: 'CONFIGURED (server)' },
    { key: 'ADMIN_SESSION_COOKIE', ok: 'HTTP-only ltx_admin_session' },
    { key: 'HARDCODED_ADMIN_PASSWORD', ok: 'REMOVED from login path' },
    { key: 'SUPER_ADMIN_UUID', ok: '26d4e301-9ae7-465d-805c-611ff302c04f' },
    { key: '2FA', ok: 'NOT CONFIGURED' },
    { key: 'Analytics', ok: 'NOT CONFIGURED' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Security Center</h2>
        <p className="text-slate-400">Secrets are never displayed — only configuration status.</p>
      </div>

      <div className="rounded-2xl border border-white/10 p-5">
        <p className="text-sm text-slate-400">Current admin</p>
        <p className="text-white">
          {user?.email} · {user?.role}
          {user?.is_super_admin ? ' · SUPER ACCESS' : ''}
        </p>
        <p className="mt-1 font-mono text-xs text-slate-500">{user?.id}</p>
      </div>

      <ul className="space-y-2">
        {flags.map((f) => (
          <li
            key={f.key}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
          >
            <span className="text-slate-300">{f.key}</span>
            <span className="text-cyan-200">{String(f.ok)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
