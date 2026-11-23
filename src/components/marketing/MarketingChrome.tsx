import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, Phone, Search, X, Zap } from 'lucide-react'
import { clsx } from 'clsx'
import { solutionsData } from '@/data/solutionsData'
import { siteConfig } from '@/data/siteConfig'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useUserAuth } from '@/contexts/UserAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'
import { LiveChatWidget } from '@/components/marketing/LiveChatWidget'
import { CookieConsent } from '@/components/marketing/CookieConsent'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const navLink =
  'relative text-[13.5px] font-medium text-slate-300 transition hover:text-white'

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const company = useCompanySettings()
  const { user, loading: authLoading, signOut } = useUserAuth()
  const { language, t } = useLanguage()

  const waLink = company.whatsapp?.enabled === false ? '' : getWhatsAppUrl(company)
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email?.split('@')[0] || t.nav.account
  const solutions = solutionsData.map((s) => ({ slug: s.slug, title: s.text[language].title }))

  useEffect(() => {
    void trackEvent('page_view', location.pathname, {
      referrer: document.referrer || undefined,
    })
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
    setSolutionsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const primaryNav = [
    { to: '/products', label: t.nav.products },
    { to: '/services', label: t.nav.services },
    { to: '/technology', label: t.nav.technology },
    { to: '/about', label: t.nav.company },
    { to: '/feed', label: t.nav.insights },
    { to: '/blog', label: t.nav.blog },
    { to: '/destek', label: t.nav.support },
  ]

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100">
      <header
        className={clsx(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/[0.08] bg-[#06080f]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[#06080f]/70'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="ltx-container-wide flex h-[68px] items-center gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="LitxTech">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.9)]">
              <Zap className="h-[18px] w-[18px] text-white" strokeWidth={2.6} />
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight text-white">
              LitxTech
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-1 lg:flex">
            {primaryNav.slice(0, 2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  navLink,
                  'rounded-lg px-3 py-2 hover:bg-white/[0.05]',
                  isActive(item.to) && 'text-white',
                )}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSolutionsOpen((v) => !v)}
                aria-expanded={solutionsOpen}
                className={clsx(
                  navLink,
                  'flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-white/[0.05]',
                  isActive('/cozumler') && 'text-white',
                )}
              >
                {t.nav.solutions}
                <ChevronDown
                  className={clsx('h-3.5 w-3.5 opacity-60 transition', solutionsOpen && 'rotate-180')}
                />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.99 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl">
                      {solutions.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/cozumler/${s.slug}`}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          <span>{s.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                        </Link>
                      ))}
                      <Link
                        to="/cozumler"
                        className="mt-1 flex items-center justify-between gap-2 rounded-xl border-t border-white/[0.07] px-3 py-2.5 text-[13px] font-semibold text-sky-300 transition hover:bg-white/[0.05] hover:text-sky-200"
                      >
                        {t.nav.allSolutions}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryNav.slice(2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={clsx(
                  navLink,
                  'rounded-lg px-3 py-2 hover:bg-white/[0.05]',
                  isActive(item.to) && 'text-white',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              to="/search"
              aria-label={t.nav.searchSite}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Link>

            <LanguageSwitcher />

            {authLoading ? (
              <span className="h-9 w-20 animate-pulse rounded-xl bg-white/10" />
            ) : user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/profile"
                  className="inline-flex max-w-[9rem] items-center truncate rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-white/[0.05]"
                >
                  {displayName}
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="ltx-btn-secondary ltx-btn-sm"
                >
                  {t.nav.signOut}
                </button>
              </div>
            ) : (
              <Link
                to="/giris"
                className="inline-flex items-center rounded-xl px-3 py-2 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/[0.05] hover:text-white"
              >
                {t.nav.signIn}
              </Link>
            )}

            <Link
              to="/contact"
              onClick={() => trackEvent('cta_click', location.pathname)}
              className="ltx-btn-primary ltx-btn-sm ml-1 !px-4 !py-2.5"
            >
              {t.nav.startProject}
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <LanguageSwitcher compact />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden border-t border-white/[0.08] bg-[#06080f]/98 backdrop-blur-xl lg:hidden"
            >
              <div className="ltx-container-wide flex max-h-[calc(100vh-68px)] flex-col gap-1 overflow-y-auto py-5">
                {primaryNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-3 py-2.5 text-[15px] text-slate-200 transition hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </Link>
                ))}

                <p className="mt-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {t.nav.solutions}
                </p>
                {solutions.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/cozumler/${s.slug}`}
                    className="rounded-xl px-3 py-2 text-[14px] text-slate-300 transition hover:bg-white/[0.05]"
                  >
                    {s.title}
                  </Link>
                ))}
                <Link to="/cozumler" className="px-3 py-2 text-[13px] font-semibold text-sky-300">
                  {t.nav.allSolutions}
                </Link>

                <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-4">
                  <Link to="/search" className="ltx-btn-secondary w-full">
                    <Search className="h-4 w-4" />
                    {t.nav.searchSite}
                  </Link>
                  {user ? (
                    <>
                      <Link to="/profile" className="ltx-btn-secondary w-full">
                        {t.nav.myAccount}
                      </Link>
                      <button
                        type="button"
                        className="ltx-btn-secondary w-full"
                        onClick={() => void signOut()}
                      >
                        {t.nav.signOut}
                      </button>
                    </>
                  ) : (
                    <Link to="/giris" className="ltx-btn-secondary w-full">
                      {t.nav.signIn}
                    </Link>
                  )}
                  {waLink && (
                    <a
                      href={waLink}
                      className="ltx-btn-secondary w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_click', location.pathname)}
                    >
                      {company.whatsapp?.buttonText || 'WhatsApp'}
                    </a>
                  )}
                  <Link to="/contact" className="ltx-btn-primary w-full">
                    {t.nav.startProject}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <LiveChatWidget />
      <CookieConsent />

      <footer className="relative border-t border-white/[0.08] bg-[#04060c]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
        <div className="ltx-container-wide py-14 lg:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500">
                  <Zap className="h-[18px] w-[18px] text-white" strokeWidth={2.6} />
                </span>
                <span className="font-display text-[17px] font-semibold tracking-tight text-white">
                  LitxTech
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-slate-500">
                {company.description || t.footer.tagline}
              </p>
              <a
                href={`mailto:${company.email || siteConfig.email}`}
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-slate-300 transition hover:text-white"
              >
                {company.email || siteConfig.email}
              </a>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t.footer.solutions}
              </p>
              <ul className="space-y-2.5 text-[13.5px]">
                {solutions.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link className="text-slate-400 transition hover:text-white" to={`/cozumler/${s.slug}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t.footer.company}
              </p>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/projeler">
                    {t.footer.projects}
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/about">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/destek">
                    {t.footer.support}
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/sss">
                    {t.footer.faq}
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/projemi-anlat">
                    {t.footer.projectRequest}
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-400 transition hover:text-white" to="/blog">
                    {t.footer.blog}
                  </Link>
                </li>
                <li>
                  {user ? (
                    <Link className="text-slate-400 transition hover:text-white" to="/profile">
                      {t.footer.myAccount}
                    </Link>
                  ) : (
                    <Link className="text-slate-400 transition hover:text-white" to="/giris">
                      {t.footer.signIn}
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t.footer.contact}
              </p>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <a
                    className="text-slate-400 transition hover:text-white"
                    href={`mailto:${company.email || siteConfig.email}`}
                    onClick={() => trackEvent('email_click', location.pathname)}
                  >
                    {company.email || siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-slate-400 transition hover:text-white"
                    href={`tel:${company.phone_tel || siteConfig.phoneTel}`}
                    onClick={() => trackEvent('phone_click', location.pathname)}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {company.phone || siteConfig.phone}
                  </a>
                </li>
                {waLink && (
                  <li>
                    <a
                      className="text-slate-400 transition hover:text-white"
                      href={waLink}
                      onClick={() => trackEvent('whatsapp_click', location.pathname)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.whatsapp?.buttonText || 'WhatsApp'}
                    </a>
                  </li>
                )}
                {Object.entries(company.social || {})
                  .filter(([, url]) => typeof url === 'string' && url.startsWith('http'))
                  .map(([name, url]) => (
                    <li key={name}>
                      <a
                        className="capitalize text-slate-400 transition hover:text-white"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-7 text-[12px] text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} LitxTech. {t.footer.rights}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link className="transition hover:text-slate-300" to="/privacy-policy">
                {t.footer.privacy}
              </Link>
              <Link className="transition hover:text-slate-300" to="/terms-of-service">
                {t.footer.terms}
              </Link>
              <Link className="transition hover:text-slate-300" to="/commercial-agreement">
                {t.footer.commercial}
              </Link>
              <a className="transition hover:text-slate-300" href="/sitemap.xml">
                {t.footer.sitemap}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
