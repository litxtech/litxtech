import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { projectsData } from '@/data/projectsData'

export function ProjectsIndexPage() {
  return (
    <MarketingChrome>
      <SeoHead
        title="Projeler | LitxTech"
        description="Valoria Hotel, KBS Prime, şehir uygulamaları ve eşleşme çözümleri gibi gerçek ürün örnekleri."
        path="/projeler"
      />
      <section className="border-b border-white/10 bg-gradient-to-b from-[#070a12] to-[#05070f]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">Projeler</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Sahada çalışan ürünler
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Aşağıdaki örnekler gerçek kullanım senaryoları içindir. Benzer bir ürünü markanıza göre sıfırdan da
              kurabiliriz.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {projectsData.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-slate-100 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3 p-6">
                <h2 className="font-display text-xl font-bold text-white">{p.title}</h2>
                <p className="text-sm leading-relaxed text-slate-400">{p.summary}</p>
                <Link
                  to={`/projeler/${p.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"
                >
                  İncele
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <WhatsAppFloat />
    </MarketingChrome>
  )
}
