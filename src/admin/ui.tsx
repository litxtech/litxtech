import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { AlertTriangle, CheckCircle2, Loader2, X } from 'lucide-react'

export const cx = clsx

/* ------------------------------------------------------------------ layout */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">{eyebrow}</p>
        )}
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-white">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export function Card({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div
      className={cx(
        'rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-sm',
        padded && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section className={cx('rounded-2xl border border-white/[0.07] bg-white/[0.022]', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-white">{title}</h2>
          {description && <p className="mt-0.5 text-[12.5px] text-slate-400">{description}</p>}
        </div>
        {actions}
      </div>
      <div className={cx('p-5', bodyClassName)}>{children}</div>
    </section>
  )
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = 'cyan',
  to,
}: {
  label: string
  value: React.ReactNode
  hint?: string
  icon?: React.ReactNode
  tone?: 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose' | 'slate'
  to?: string
}) {
  const tones: Record<string, string> = {
    cyan: 'text-cyan-300 bg-cyan-400/10 ring-cyan-400/20',
    emerald: 'text-emerald-300 bg-emerald-400/10 ring-emerald-400/20',
    violet: 'text-violet-300 bg-violet-400/10 ring-violet-400/20',
    amber: 'text-amber-300 bg-amber-400/10 ring-amber-400/20',
    rose: 'text-rose-300 bg-rose-400/10 ring-rose-400/20',
    slate: 'text-slate-300 bg-white/[0.06] ring-white/10',
  }
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 transition hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12.5px] font-medium text-slate-400">{label}</p>
        {icon && (
          <span className={cx('flex h-8 w-8 items-center justify-center rounded-lg ring-1', tones[tone])}>{icon}</span>
        )}
      </div>
      <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-white tabular-nums">{value}</p>
      {hint && <p className="mt-2 text-[11.5px] text-slate-500">{hint}</p>}
      <span className="pointer-events-none absolute inset-x-0 -bottom-10 h-16 bg-gradient-to-t from-cyan-400/[0.07] to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  )
  return to ? (
    <Link to={to} className="block">
      {inner}
    </Link>
  ) : (
    inner
  )
}

/* ---------------------------------------------------------------- controls */

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md'
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, variant = 'secondary', size = 'md', loading, className, ...rest }: ButtonProps) {
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-[0_10px_30px_-12px_rgba(34,211,238,0.55)] hover:from-cyan-300 hover:to-sky-400',
    secondary: 'border border-white/12 bg-white/[0.04] text-slate-100 hover:border-white/20 hover:bg-white/[0.08]',
    ghost: 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
    danger: 'border border-rose-400/25 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
    success: 'border border-emerald-400/25 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20',
  }
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-55',
        size === 'sm' ? 'px-3 py-1.5 text-[12.5px]' : 'px-4 py-2.5 text-[13.5px]',
        variants[variant],
        className,
      )}
    >
      {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {children}
    </button>
  )
}

export function Badge({
  children,
  tone = 'slate',
  dot,
}: {
  children: React.ReactNode
  tone?: 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose' | 'slate'
  dot?: boolean
}) {
  const tones: Record<string, string> = {
    cyan: 'bg-cyan-400/10 text-cyan-200 ring-cyan-400/20',
    emerald: 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20',
    violet: 'bg-violet-400/10 text-violet-200 ring-violet-400/20',
    amber: 'bg-amber-400/10 text-amber-200 ring-amber-400/20',
    rose: 'bg-rose-400/10 text-rose-200 ring-rose-400/20',
    slate: 'bg-white/[0.06] text-slate-300 ring-white/10',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1',
        tones[tone],
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cx('block', className)}>
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[12.5px] font-medium text-slate-300">{label}</span>
        {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11.5px] text-rose-300">{error}</span>}
    </label>
  )
}

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-[#0a0e17] px-3.5 py-2.5 text-[13.5px] text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15'

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(fieldBase, props.className)} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx(fieldBase, 'resize-y leading-relaxed', props.className)} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(fieldBase, 'appearance-none pr-9', props.className)} />
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-left transition hover:border-white/20"
    >
      <span>
        <span className="block text-[13px] font-medium text-slate-200">{label}</span>
        {hint && <span className="mt-0.5 block text-[11.5px] text-slate-500">{hint}</span>}
      </span>
      <span
        className={cx(
          'relative h-6 w-11 shrink-0 rounded-full transition',
          checked ? 'bg-cyan-400/80' : 'bg-white/10',
        )}
      >
        <span
          className={cx(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
            checked ? 'left-[22px]' : 'left-0.5',
          )}
        />
      </span>
    </button>
  )
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center">
      {icon && (
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
          {icon}
        </span>
      )}
      <p className="text-[14px] font-medium text-slate-200">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[12.5px] text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function Loading({ label = 'Yükleniyor…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-6 text-sm text-slate-400">
      <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
      {label}
    </div>
  )
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-rose-400/25 bg-rose-500/[0.08] px-3.5 py-3 text-[12.5px] text-rose-200">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="break-words">{children}</span>
    </div>
  )
}

export function StatusPill({ value }: { value?: string | null }) {
  const raw = String(value || '').toLowerCase()
  const tone: 'emerald' | 'cyan' | 'amber' | 'violet' | 'rose' | 'slate' =
    raw.includes('won') || raw.includes('published') || raw.includes('resolved') || raw === 'replied' || raw === 'active'
      ? 'emerald'
      : raw.includes('new') || raw === 'open'
        ? 'cyan'
        : raw.includes('progress') || raw.includes('contacted') || raw.includes('qualified')
          ? 'violet'
          : raw.includes('proposal') || raw.includes('negotiation') || raw.includes('waiting')
            ? 'amber'
            : raw.includes('lost') || raw.includes('closed') || raw.includes('archived') || raw.includes('draft')
              ? 'rose'
              : 'slate'
  return <Badge tone={tone} dot>{String(value || '—').replace(/_/g, ' ')}</Badge>
}

export function Dot({ tone = 'slate' }: { tone?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate' | 'violet' }) {
  const tones: Record<string, string> = {
    emerald: 'bg-emerald-400',
    cyan: 'bg-cyan-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    violet: 'bg-violet-400',
    slate: 'bg-slate-500',
  }
  return <span className={cx('h-1.5 w-1.5 rounded-full', tones[tone])} />
}

export function timeAgo(value?: string | null) {
  if (!value) return '—'
  const diff = Date.now() - new Date(value).getTime()
  if (Number.isNaN(diff)) return '—'
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'şimdi'
  if (mins < 60) return `${mins} dk önce`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} sa önce`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} gün önce`
  return new Date(value).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/* ------------------------------------------------------------------ toasts */

type Toast = { id: number; tone: 'success' | 'error' | 'info'; title: string; body?: string }
type ToastCtx = { push: (t: Omit<Toast, 'id'>) => void }

const Ctx = createContext<ToastCtx | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts((list) => [...list.slice(-3), { ...t, id }])
    window.setTimeout(() => setToasts((list) => list.filter((item) => item.id !== id)), 5200)
  }, [])
  const value = useMemo(() => ({ push }), [push])

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2 lg:left-auto lg:right-6 lg:translate-x-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cx(
              'ltx-toast-in pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl',
              toast.tone === 'success'
                ? 'border-emerald-400/25 bg-emerald-500/[0.12]'
                : toast.tone === 'error'
                  ? 'border-rose-400/25 bg-rose-500/[0.12]'
                  : 'border-white/12 bg-[#0b111c]/95',
            )}
          >
            <span className="mt-0.5">
              {toast.tone === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              ) : toast.tone === 'error' ? (
                <AlertTriangle className="h-4 w-4 text-rose-300" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white">{toast.title}</p>
              {toast.body && <p className="mt-0.5 break-words text-[12px] text-slate-300">{toast.body}</p>}
            </div>
            <button
              type="button"
              aria-label="Kapat"
              className="rounded-md p-1 text-slate-400 hover:text-white"
              onClick={() => setToasts((list) => list.filter((item) => item.id !== toast.id))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast outside ToastProvider')
  return ctx
}
