import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dictionaries, htmlLang, type Copy, type Lang } from '@/i18n/copy'

export type Language = Lang
export type Translations = Copy

const STORAGE_KEY = 'litxtech-language'

type LanguageContextValue = {
  language: Lang
  setLanguage: (lang: Lang) => void
  toggleLanguage: () => void
  /** Active-language dictionary. */
  t: Copy
  /** Shorthand for `language === 'tr'`. */
  isTr: boolean
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function readStored(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    // An explicit `?lang=tr` (or `?lang=en`) wins so shared links and the
    // hreflang alternates always resolve to the language they advertise.
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param === 'tr' || param === 'en') return param
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'tr' || stored === 'en') return stored
  } catch {
    /* ignore (private mode) */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is the default; Turkish is opt-in and remembered.
  const [language, setLang] = useState<Lang>(readStored)

  useEffect(() => {
    document.documentElement.lang = htmlLang[language]
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      /* ignore */
    }
  }, [language])

  const setLanguage = useCallback((lang: Lang) => {
    setLang(lang === 'tr' ? 'tr' : 'en')
  }, [])

  const toggleLanguage = useCallback(() => {
    setLang((current) => (current === 'en' ? 'tr' : 'en'))
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: dictionaries[language],
      isTr: language === 'tr',
    }),
    [language, setLanguage, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

/** Returns the dictionary for the active language. */
export function useTranslation() {
  return useLanguage().t
}

/**
 * Picks the localized branch of a `{ en, tr }` record.
 * Keeps data files language-aware without prop drilling.
 */
export function useLocalized() {
  const { language, isTr } = useLanguage()
  const pick = useCallback(
    <T,>(value: Record<Lang, T>): T => value[language],
    [language],
  )
  return { language, isTr, pick }
}
