import { useCallback, useEffect, useMemo, useState } from 'react'
import { RefreshCw, ScrollText, Search } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Loading,
  PageHeader,
  Stat,
  TextInput,
  timeAgo,
  useToast,
} from '../ui'

export function AdminAuditPage() {
  const { push } = useToast()
  const [logs, setLogs] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.audit()
      setLogs(data.logs || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'Denetim kaydı yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const filtered = useMemo(
    () =>
      logs.filter((row) =>
        `${row.action} ${row.resource} ${row.actor_email} ${row.resource_id}`
          .toLowerCase()
          .includes(q.trim().toLowerCase()),
      ),
    [logs, q],
  )

  const today = logs.filter((row) => new Date(row.created_at).toDateString() === new Date().toDateString()).length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sistem"
        title="Denetim kaydı"
        description="Yönetici işlemlerinin değiştirilemez kaydı. Her kaydetme, yayınlama ve silme burada izlenir."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const header = 'created_at,actor,action,resource,resource_id'
                const rows = filtered.map((row) =>
                  [row.created_at, row.actor_email || '', row.action, row.resource || '', row.resource_id || ''].join(','),
                )
                const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'litxtech-audit.csv'
                link.click()
                URL.revokeObjectURL(url)
                push({ tone: 'info', title: 'CSV dışa aktarıldı' })
              }}
            >
              CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Toplam kayıt" value={logs.length} icon={<ScrollText className="h-4 w-4" />} tone="violet" />
        <Stat label="Bugün" value={today} tone="cyan" />
        <Stat label="Son işlem" value={logs[0] ? timeAgo(logs[0].created_at) : '—'} tone="emerald" />
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <TextInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="İşlem, kaynak veya yönetici ara…" className="pl-9" />
        </div>
        <Badge tone="slate">{filtered.length} kayıt</Badge>
      </div>

      {loading && !logs.length && <Loading />}
      {!loading && !filtered.length && (
        <EmptyState icon={<ScrollText className="h-5 w-5" />} title="Kayıt yok" description="Yönetici işlemleri yapıldıkça burada birikir." />
      )}

      {!!filtered.length && (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-[12.5px]">
              <thead className="bg-white/[0.03] text-[10.5px] uppercase tracking-wide text-slate-500">
                <tr>
                  {['Zaman', 'Yönetici', 'İşlem', 'Kaynak', 'Sonuç'].map((head) => (
                    <th key={head} className="whitespace-nowrap px-4 py-2.5 font-semibold">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t border-white/[0.05] transition hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-400">
                      {new Date(row.created_at).toLocaleString('tr-TR')}
                    </td>
                    <td className="px-4 py-2.5 text-slate-300">{row.actor_email || 'sistem'}</td>
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-[11.5px] text-cyan-200">{row.action}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-400">
                      {row.resource || '—'}
                      {row.resource_id ? <span className="ml-1 text-slate-600">#{String(row.resource_id).slice(0, 8)}</span> : null}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge tone={String(row.result).toUpperCase().includes('OK') ? 'emerald' : 'slate'}>{row.result || 'OK'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
