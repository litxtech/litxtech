import { KeyRound, Lock, ShieldCheck, UserRound } from 'lucide-react'
import { useAdminAuth } from '../AdminAuthContext'
import { Badge, Card, PageHeader, SectionCard } from '../ui'

export function AdminSecurityPage() {
  const { user } = useAdminAuth()

  const flags = [
    { key: 'Supabase URL', value: 'Yapılandırıldı', ok: true },
    { key: 'Service role anahtarı', value: 'Sunucu tarafında', ok: true },
    { key: 'Oturum çerezi', value: 'HttpOnly · ltx_admin_session', ok: true },
    { key: 'Sabit admin şifresi', value: 'Kaldırıldı', ok: true },
    { key: 'İki adımlı doğrulama', value: 'Yapılandırılmadı', ok: false },
    { key: 'Denetim kaydı', value: 'Aktif (system_logs)', ok: true },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistem"
        title="Güvenlik merkezi"
        description="Gizli anahtarlar asla gösterilmez; yalnızca yapılandırma durumu listelenir."
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <SectionCard title="Oturum" description="Aktif yönetici kimliği">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-[13px] font-bold text-cyan-100 ring-1 ring-white/10">
              {(user?.full_name || user?.email || 'A').slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white">{user?.full_name || user?.email}</p>
              <p className="text-[12px] text-slate-400">
                <UserRound className="mr-1 inline h-3 w-3" />
                {user?.role}
                {user?.is_super_admin ? ' · süper yönetici' : ''}
              </p>
              <p className="mt-1 break-all font-mono text-[10.5px] text-slate-600">{user?.id}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="emerald" dot>
              oturum doğrulandı
            </Badge>
            <Badge tone="cyan">
              <Lock className="mr-1 h-3 w-3" /> httpOnly
            </Badge>
          </div>
        </SectionCard>

        <Card className="flex flex-col justify-between">
          <div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold text-white">Öneri</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
              Yönetici hesaplarında iki adımlı doğrulamayı etkinleştirin ve oturum süresini 12 saat ile sınırlı tutun.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
            <KeyRound className="h-3.5 w-3.5" /> Anahtarlar yalnızca sunucu ortamında tutulur.
          </div>
        </Card>
      </div>

      <SectionCard title="Yapılandırma" description="Ortam ve güvenlik kontrolleri" bodyClassName="p-0">
        <ul className="divide-y divide-white/[0.05]">
          {flags.map((flag) => (
            <li key={flag.key} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
              <span className="text-[12.5px] text-slate-300">{flag.key}</span>
              <Badge tone={flag.ok ? 'emerald' : 'amber'} dot>
                {flag.value}
              </Badge>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
