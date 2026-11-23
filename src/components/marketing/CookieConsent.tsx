import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const KEY = 'ltx_cookie_consent'

export function cookieConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function CookieConsent() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!cookieConsent())
  }, [])

  if (!visible) return null

  const choose = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/[0.08] bg-[#06080f]/95 p-4 backdrop-blur-xl">
      <div className="ltx-container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-[12.5px] leading-relaxed text-slate-400">{t.common.cookieText}</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose('declined')} className="ltx-btn-secondary ltx-btn-sm">
            {t.common.cookieDecline}
          </button>
          <button type="button" onClick={() => choose('accepted')} className="ltx-btn-primary ltx-btn-sm">
            {t.common.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  )
}
