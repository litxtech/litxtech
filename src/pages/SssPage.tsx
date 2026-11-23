import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'

type Faq = { id: string; category: string; question: string; answer: string }

export function SssPage() {
  const { language, t } = useLanguage()
  const [remoteFaqs, setRemoteFaqs] = useState<Faq[]>([])
  const categoriesFromFaqs = useMemo(
    () => (list: Faq[]) => Array.from(new Set(list.map((f) => f.category))),
    [],
  )

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => r.json())
      .then((d) => setRemoteFaqs(Array.isArray(d.faqs) ? d.faqs : []))
      .catch(() => setRemoteFaqs([]))
  }, [])

  // CMS FAQ rows are authored in Turkish; English uses the curated local set.
  const faqs: Faq[] =
    language === 'tr' && remoteFaqs.length
      ? remoteFaqs
      : t.faq.fallback.map((item, index) => ({ id: `local-${index}`, ...item }))

  const categories = categoriesFromFaqs(faqs)

  return (
    <MarketingChrome>
      <SeoHead title={t.faq.metaTitle} description={t.faq.metaDescription} path="/sss" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{t.nav.support}</p>
          <h1 className="ltx-h1 mt-4 text-balance">{t.faq.title}</h1>
          <p className="ltx-lead mt-4">{t.faq.lead}</p>
        </div>
      </section>

      <section className="ltx-container py-14">
        <div className="max-w-3xl space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/80">
                {category}
              </h2>
              <div className="space-y-2.5">
                {faqs
                  .filter((f) => f.category === category)
                  .map((f) => (
                    <details
                      key={f.id}
                      className="group rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition open:border-white/15 open:bg-white/[0.04]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-medium text-white [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <Plus className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-45" />
                      </summary>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{f.answer}</p>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
