import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

type Faq = { id: string; category: string; question: string; answer: string }

const fallbackFaqs: Faq[] = [
  {
    id: '1',
    category: 'Genel',
    question: 'LitxTech ne geliştiriyor?',
    answer:
      'Mobil uygulamalar, sosyal platformlar, SaaS ürünleri, işletme yazılımları ve özel dijital sistemler geliştiriyoruz.',
  },
  {
    id: '2',
    category: 'Genel',
    question: 'Nasıl teklif alabilirim?',
    answer: 'Projemi Anlat formunu doldurun veya WhatsApp / e-posta ile bize ulaşın.',
  },
]

export function DestekPage() {
  const company = useCompanySettings()
  const [faqs, setFaqs] = useState<Faq[]>(fallbackFaqs)

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.faqs) && d.faqs.length) setFaqs(d.faqs)
      })
      .catch(() => {})
  }, [])

  return (
    <MarketingChrome>
      <SeoHead
        title="Destek | LitxTech"
        description="LitxTech destek merkezi: SSS, iletişim ve proje desteği."
        path="/destek"
      />
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <h1 className="text-4xl font-bold text-white">Size nasıl yardımcı olabiliriz?</h1>
        <p className="mt-4 text-slate-300">
          SSS, proje talebi ve doğrudan iletişim kanalları.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link to="/projemi-anlat" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-semibold text-white">Proje talebi</p>
            <p className="mt-1 text-sm text-slate-400">Yeni ürün / yazılım fikri</p>
          </Link>
          <a
            href={getWhatsAppUrl(company)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', '/destek')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-semibold text-white">WhatsApp</p>
            <p className="mt-1 text-sm text-slate-400">{company.whatsapp?.buttonText || 'Yazın'}</p>
          </a>
          <a
            href={`mailto:${company.email}`}
            onClick={() => trackEvent('email_click', '/destek')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="font-semibold text-white">E-posta</p>
            <p className="mt-1 text-sm text-slate-400">{company.email}</p>
          </a>
        </div>

        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">SSS</h2>
            <Link to="/sss" className="text-sm text-cyan-300">
              Tümünü gör
            </Link>
          </div>
          {faqs.slice(0, 6).map((f) => (
            <details key={f.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <summary className="cursor-pointer font-medium text-white">{f.question}</summary>
              <p className="mt-2 text-sm text-slate-300">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
