import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

type SafdasPolicyDocumentPageProps = {
  title: string
  eyebrow: string
  description: string
  path: string
  document: string
}

const links = [
  { to: '/safdas/gizlilik', label: 'Gizlilik' },
  { to: '/safdas/kullanim-sartlari', label: 'Kullanım şartları' },
  { to: '/safdas/child-safety', label: 'Çocuk koruma' },
  { to: '/safdas/destek', label: 'Destek' },
  { to: '/safdas/hesap-silme', label: 'Hesap silme' },
  { to: '/safdas/abonelik', label: 'Abonelik' },
]

export function SafdasPolicyDocumentPage({
  title,
  eyebrow,
  description,
  path,
  document,
}: SafdasPolicyDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#f4f7f4] text-[#14211a]" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead title={`${title} | LitxTech`} description={description} path={path} />

      <div className="border-b border-black/10 bg-[#071510] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <Link to="/safdas" className="text-lg font-semibold tracking-tight hover:text-emerald-300">
            SAFDAŞ <span className="font-normal text-emerald-100/60">/ LitxTech</span>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-50/80">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-emerald-300">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <header className="mb-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </header>

        <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <pre className="whitespace-pre-wrap break-words px-5 py-7 font-sans text-[15px] leading-7 text-slate-700 sm:px-8 sm:py-10 lg:px-12">
            {document}
          </pre>
        </article>

        <footer className="flex flex-wrap gap-x-5 gap-y-2 px-1 py-8 text-sm text-slate-500">
          <Link to="/safdas" className="font-medium text-emerald-700 hover:text-emerald-800">
            ← SAFDAŞ
          </Link>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          <a href="mailto:support@litxtech.com" className="hover:text-slate-900">
            support@litxtech.com
          </a>
        </footer>
      </div>
    </main>
  )
}
