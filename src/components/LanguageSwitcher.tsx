import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { clsx } from 'clsx'
import { LANGS, langLabel, langShort } from '@/i18n/copy'
import { useLanguage } from '@/contexts/LanguageContext'

/** Premium language dropdown — English by default, Turkish opt-in. */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className={clsx(
          'group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-200 transition',
          'hover:border-white/20 hover:bg-white/[0.06] hover:text-white',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40',
          compact ? 'px-2.5 py-2' : 'px-3 py-2 text-sm',
        )}
      >
        <Globe className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
        <span className="font-medium tracking-wide">{langShort[language]}</span>
        <ChevronDown
          className={clsx('h-3.5 w-3.5 opacity-60 transition', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-[70] mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0b1120]/95 p-1 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {LANGS.map((lang) => {
            const active = lang === language
            return (
              <button
                key={lang}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLanguage(lang)
                  setOpen(false)
                }}
                className={clsx(
                  'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition',
                  active
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white',
                )}
              >
                <span>{langLabel[lang]}</span>
                {active && <Check className="h-3.5 w-3.5 text-sky-400" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function LanguageSwitcherCompact() {
  return <LanguageSwitcher compact />
}
