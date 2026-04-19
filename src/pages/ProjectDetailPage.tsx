import { Link, Navigate, useParams } from 'react-router-dom'
import { ExternalLink, MessageCircle } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { getProjectBySlug } from '@/data/projectsData'
import { getWhatsAppLink } from '@/data/siteConfig'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/projeler" replace />
  }

  const primaryHref = project.internalPath ?? project.externalUrl ?? '/contact'
  const isExternal = Boolean(project.externalUrl)

  return (
    <MarketingChrome>
      <SeoHead
        title={`${project.title} | LitxTech Projeler`}
        description={project.summary}
        path={`/projeler/${project.slug}`}
      />

      <section className="border-b border-white/10 bg-gradient-to-b from-[#070a12] to-[#05070f]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">Proje</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-xl text-slate-300">{project.summary}</p>
              <p className="mt-6 text-base leading-relaxed text-slate-400">{project.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {isExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25"
                  >
                    {project.ctaLabel}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to={primaryHref}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25"
                  >
                    {project.ctaLabel}
                  </Link>
                )}
                <a
                  href={getWhatsAppLink(`Merhaba, "${project.title}" projesi hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/25"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/25"
                >
                  Teklif Al
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h2 className="font-display text-xl font-semibold text-white">Öne çıkan başlıklar</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <Link to="/projeler" className="text-sm font-medium text-blue-300 hover:text-blue-200">
            ← Tüm projeler
          </Link>
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
