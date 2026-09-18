import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

type TamusoPolicyDocumentPageProps = {
  title: string
  eyebrow: string
  description: string
  path: string
  document: string
}

export function TamusoPolicyDocumentPage({
  title,
  eyebrow,
  description,
  path,
  document,
}: TamusoPolicyDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#f6f5f2] text-[#16181d]" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead title={`${title} | LitxTech`} description={description} path={path} />

      <div className="border-b border-black/10 bg-[#070a12] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <Link to="/tamuso" className="font-display text-lg font-semibold tracking-tight hover:text-amber-300">
            Tamuso <span className="font-normal text-slate-400">/ LitxTech</span>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
            <Link to="/tamuso/gizlilik" className="hover:text-amber-300">Gizlilik</Link>
            <Link to="/tamuso/kullanim-sartlari" className="hover:text-amber-300">Kullanım şartları</Link>
            <Link to="/tamuso/child-safety" className="hover:text-amber-300">Child safety</Link>
            <Link to="/tamuso/destek" className="hover:text-amber-300">Destek</Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <header className="mb-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        </header>

        <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <pre className="whitespace-pre-wrap break-words px-5 py-7 font-sans text-[15px] leading-7 text-slate-700 sm:px-8 sm:py-10 lg:px-12">
            {document}
          </pre>
        </article>

        <footer className="flex flex-wrap gap-x-5 gap-y-2 px-1 py-8 text-sm text-slate-500">
          <Link to="/tamuso" className="font-medium text-amber-700 hover:text-amber-800">← Tamuso</Link>
          <Link to="/tamuso/hesap-silme" className="hover:text-slate-900">Hesap silme</Link>
          <Link to="/tamuso/destek" className="hover:text-slate-900">Destek</Link>
          <a href="mailto:support@litxtech.com" className="hover:text-slate-900">support@litxtech.com</a>
        </footer>
      </div>
    </main>
  )
}