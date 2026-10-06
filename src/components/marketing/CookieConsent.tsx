import { useEffect, useState } from 'react'

const KEY = 'ltx_cookie_consent'

export function cookieConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(!cookieConsent())
  }, [])
  if (!visible) return null
  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(KEY, value)
    setVisible(false)
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#070a12]/95 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-300">
          Analytics on this site runs only if you accept. Sign-in cookies stay on either way.
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => choose('declined')} className="rounded-lg border border-white/15 px-3 py-2 text-sm">
            Decline
          </button>
          <button type="button" onClick={() => choose('accepted')} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
