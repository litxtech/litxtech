import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X, Zap } from 'lucide-react'
import { solutionsData } from '@/data/solutionsData'
import { siteConfig, getWhatsAppLink } from '@/data/siteConfig'
import { clsx } from 'clsx'

const navLink = 'text-sm font-medium text-slate-200/90 transition hover:text-white'

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a12]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-900/30">
              <Zap className="h-6 w-6 text-white" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              LitxTech
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link className={clsx(navLink, isActive('/') && 'text-white')} to="/">
              Ana Sayfa
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                className={clsx(
                  'flex items-center gap-1 text-sm font-medium text-slate-200/90 transition hover:text-white',
                  isActive('/cozumler') && 'text-white',
                )}
                aria-expanded={solutionsOpen ? 'true' : 'false'}
              >
                Çözümler
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 top-full z-50 w-[min(100vw-2rem,22rem)] pt-3">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 py-2 shadow-2xl backdrop-blur-xl">
                    {solutionsData.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/cozumler/${s.slug}`}
                        className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
                      >
                        {s.title}
                      </Link>
                    ))}
                    <Link
                      to="/cozumler"
                      className="block border-t border-white/10 px-4 py-2.5 text-sm font-medium text-blue-300 hover:bg-white/5"
                    >
                      Tüm çözümler
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              className={clsx(navLink, isActive('/projeler') && 'text-white')}
              to="/projeler"
            >
              Projeler
            </Link>
            <Link className={navLink} to="/about">
              Hakkımızda
            </Link>
            <Link className={navLink} to="/blog">
              Blog
            </Link>
            <Link className={clsx(navLink, isActive('/contact') && 'text-white')} to="/contact">
              İletişim
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-white/20 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:opacity-95"
            >
              Teklif Al
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-[#070a12] px-4 py-4 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <Link to="/" className="py-2 text-slate-200" onClick={() => setOpen(false)}>
                Ana Sayfa
              </Link>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Çözümler</p>
              {solutionsData.map((s) => (
                <Link
                  key={s.slug}
                  to={`/cozumler/${s.slug}`}
                  className="py-1.5 text-slate-200"
                  onClick={() => setOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
              <Link to="/cozumler" className="py-2 text-blue-300" onClick={() => setOpen(false)}>
                Tüm çözümler
              </Link>
              <Link to="/projeler" className="py-2 text-slate-200" onClick={() => setOpen(false)}>
                Projeler
              </Link>
              <Link to="/about" className="py-2 text-slate-200" onClick={() => setOpen(false)}>
                Hakkımızda
              </Link>
              <Link to="/blog" className="py-2 text-slate-200" onClick={() => setOpen(false)}>
                Blog
              </Link>
              <Link to="/contact" className="py-2 text-slate-200" onClick={() => setOpen(false)}>
                İletişim
              </Link>
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                <a
                  href={getWhatsAppLink()}
                  className="rounded-lg bg-[#25D366] py-3 text-center text-sm font-semibold text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-[#05070f]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Zap className="h-5 w-5 text-blue-400" />
                LitxTech
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {siteConfig.tagline}
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Çözümler</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {solutionsData.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link className="hover:text-white" to={`/cozumler/${s.slug}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Kurumsal</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link className="hover:text-white" to="/projeler">
                    Projeler
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/about">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/packages">
                    Paketler
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/donation">
                    Destek (MyTrabzon)
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-white">İletişim</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href={`tel:${siteConfig.phoneTel}`}>
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white"
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} LitxTech LLC · Wyoming, United States · D-U-N-S®: 144849529</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link className="hover:text-slate-300" to="/privacy-policy">
                Gizlilik
              </Link>
              <Link className="hover:text-slate-300" to="/terms-of-service">
                Şartlar
              </Link>
              <Link className="hover:text-slate-300" to="/commercial-agreement">
                Ticari sözleşme
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
