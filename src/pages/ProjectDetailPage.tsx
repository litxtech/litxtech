import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { getProjectBySlug } from '@/data/projectsData'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

type RemoteProject = {
  slug: string
  title: string
  summary: string
  description: string
  image: string
  imageAlt: string
  tags: string[]
  internalPath?: string
  externalUrl?: string
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const company = useCompanySettings()
  const { language, t } = useLanguage()
  const staticProject = getProjectBySlug(slug)
  const [remote, setRemote] = useState<RemoteProject | null>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (staticProject || !slug) return
    setMissing(false)
    fetch(`/api/public/projects/${encodeURIComponent(slug)}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const row = data?.project
        if (!row) {
          setMissing(true)
          return
        }
        setRemote({
          slug: row.slug,
          title: row.name || row.slug,
          summary: row.summary || '',
          description: row.description || row.summary || '',
          image: row.cover_image || row.image_url || '/og-litxtech.jpg',
          imageAlt: row.name || row.slug,
          tags: row.category ? [row.category] : [],
          internalPath: row.internal_path || '/contact',
          externalUrl: row.external_url || undefined,
        })
      })
      .catch(() => setMissing(true))
  }, [slug, staticProject])

  if (!staticProject && missing) {
    return <Navigate to="/projeler" replace />
  }

  const p = t.projects

  const local = staticProject ? staticProject.text[language] : null
  const project: RemoteProject | null =
    staticProject && local
      ? {
          slug: staticProject.slug,
          title: local.title,
          summary: local.summary,
          description: local.description,
          image: staticProject.image,
          imageAlt: local.imageAlt,
          tags: local.tags,
          internalPath: staticProject.internalPath,
          externalUrl: staticProject.externalUrl,
        }
      : remote

  if (!project) {
    return (
      <MarketingChrome>
        <p className="px-4 py-24 text-center text-sm text-slate-400">{t.common.loading}</p>
      </MarketingChrome>
    )
  }

  const primaryHref = project.internalPath ?? project.externalUrl ?? '/contact'
  const isExternal = Boolean(project.externalUrl)

  return (
    <MarketingChrome>
      <SeoHead
        title={`${project.title} | ${t.footer.projects} — LitxTech`}
        description={project.summary}
        path={`/projeler/${project.slug}`}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container-wide relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="ltx-eyebrow">{p.eyebrow}</p>
              <h1 className="ltx-h1 mt-4 text-balance">{project.title}</h1>
              <p className="mt-4 text-lg font-medium text-slate-300">{project.summary}</p>
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-400">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="ltx-pill !py-1 !text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {isExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ltx-btn-primary"
                  >
                    {p.visit}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link to={primaryHref} className="ltx-btn-primary">
                    {p.openProduct}
                  </Link>
                )}
                <a
                  href={getWhatsAppUrl(
                    company,
                    language === 'tr'
                      ? `Merhaba, "${project.title}" projesi hakkında bilgi almak istiyorum.`
                      : `Hi, I'd like to learn more about "${project.title}".`,
                  )}
                  onClick={() => trackEvent('whatsapp_click', `/projeler/${project.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ltx-btn-secondary"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </a>
                <Link to="/contact" className="ltx-btn-ghost">
                  {t.nav.startProject}
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/60">
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

      <section className="ltx-container-wide ltx-section-tight">
        <div className="ltx-card max-w-3xl p-7">
          <h2 className="font-display text-lg font-semibold text-white">{p.talkTitle}</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{p.talkLead}</p>
          <Link to="/contact" className="ltx-btn-primary mt-5">
            {t.nav.startProject}
          </Link>
        </div>

        <div className="mt-10 border-t border-white/[0.07] pt-7">
          <Link
            to="/projeler"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200"
          >
            <ArrowLeft className="h-4 w-4" />
            {p.back}
          </Link>
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
