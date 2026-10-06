import { useEffect, useMemo, useState } from 'react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'

type Faq = { id: string; category: string; question: string; answer: string }

export function SssPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const categories = useMemo(
    () => Array.from(new Set(faqs.map((f) => f.category))),
    [faqs],
  )

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => r.json())
      .then((d) => setFaqs(Array.isArray(d.faqs) ? d.faqs : []))
      .catch(() => setFaqs([]))
  }, [])

  return (
    <MarketingChrome>
      <SeoHead
        title="Sıkça Sorulan Sorular | LitxTech"
        description="LitxTech SSS: mobil uygulama, sosyal platform, özel yazılım ve destek."
        path="/sss"
      />
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-bold text-white">Sıkça sorulan sorular</h1>
        <p className="mt-3 text-slate-300">İçerik admin panelinden yönetilir.</p>

        {!faqs.length && (
          <p className="mt-10 text-slate-500">
            Henüz yayınlanmış SSS yok. Admin → FAQ üzerinden ekleyebilirsiniz.
          </p>
        )}

        <div className="mt-10 space-y-10">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="mb-4 text-xl font-semibold text-cyan-300">{cat}</h2>
              <div className="space-y-3">
                {faqs
                  .filter((f) => f.category === cat)
                  .map((f) => (
                    <details key={f.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <summary className="cursor-pointer font-medium text-white">{f.question}</summary>
                      <p className="mt-2 text-sm text-slate-300">{f.answer}</p>
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
