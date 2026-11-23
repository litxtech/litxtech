import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { projectsData } from '@/data/projectsData'
import { useLanguage } from '@/contexts/LanguageContext'

export function ProjectsIndexPage() {
  const { language, t } = useLanguage()
  const p = t.projects

  return (
    <MarketingChrome>
      <SeoHead title={p.metaTitle} description={p.metaDescription} path="/projeler" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="ltx-eyebrow">{p.eyebrow}</p>
            <h1 className="ltx-h1 mt-4 text-balance">{p.title}</h1>
            <p className="ltx-lead mt-5 max-w-2xl">{p.lead}</p>
          </div>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-6 md:grid-cols-2">
          {projectsData.map((project, i) => {
            const text = project.text[language]
            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group ltx-card-interactive overflow-hidden !p-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={text.imageAlt}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/25 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
                    {text.tags.map((tag) => (
                      <span key={tag} className="ltx-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-white">
                    {text.title}
                  </h2>
                  <p className="text-[13.5px] leading-relaxed text-slate-400">{text.summary}</p>
                  <Link
                    to={`/projeler/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-300 transition hover:text-sky-200"
                  >
                    {p.inspect}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
