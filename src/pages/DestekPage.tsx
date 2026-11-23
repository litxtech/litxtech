import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LifeBuoy, Mail, MessageCircle, Plus } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

type Faq = { id: string; category: string; question: string; answer: string; lang?: string }

export function DestekPage() {
  const company = useCompanySettings()
  const { language, t } = useLanguage()
  const s = t.support
  const [remoteFaqs, setRemoteFaqs] = useState<Faq[]>([])
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website_url_hp: '' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.faqs)) setRemoteFaqs(d.faqs)
      })
      .catch(() => {})
  }, [])

  // Keep language pure: remote FAQ rows (authored in the CMS) are only used for Turkish.
  const faqs: Faq[] =
    language === 'tr'
      ? remoteFaqs.length
        ? remoteFaqs
        : t.faq.fallback.map((item, index) => ({ id: `local-${index}`, ...item }))
      : t.faq.fallback.map((item, index) => ({ id: `local-${index}`, ...item }))

  return (
    <MarketingChrome>
      <SeoHead title={s.metaTitle} description={s.metaDescription} path="/destek" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{t.nav.support}</p>
          <h1 className="ltx-h1 mt-4 max-w-2xl text-balance">{s.title}</h1>
          <p className="ltx-lead mt-4">{s.lead}</p>
        </div>
      </section>

      <section className="ltx-container ltx-section">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link to="/projemi-anlat" className="ltx-card-interactive group p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-500/10 text-sky-300 ring-1 ring-white/10">
              <LifeBuoy className="h-[18px] w-[18px]" />
            </span>
            <p className="mt-4 text-[14px] font-semibold text-white">{s.projectCard}</p>
            <p className="mt-1 text-[12.5px] text-slate-500">{s.projectCardMeta}</p>
          </Link>

          <a
            href={getWhatsAppUrl(company)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', '/destek')}
            className="ltx-card-interactive group p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/10 text-emerald-300 ring-1 ring-white/10">
              <MessageCircle className="h-[18px] w-[18px]" />
            </span>
            <p className="mt-4 text-[14px] font-semibold text-white">{s.whatsappCard}</p>
            <p className="mt-1 text-[12.5px] text-slate-500">
              {company.whatsapp?.buttonText || s.whatsappFallback}
            </p>
          </a>

          <a
            href={`mailto:${company.email}`}
            onClick={() => trackEvent('email_click', '/destek')}
            className="ltx-card-interactive group p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400/20 to-fuchsia-500/10 text-violet-300 ring-1 ring-white/10">
              <Mail className="h-[18px] w-[18px]" />
            </span>
            <p className="mt-4 text-[14px] font-semibold text-white">{s.emailCard}</p>
            <p className="mt-1 truncate text-[12.5px] text-slate-500">{company.email}</p>
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <form
            className="ltx-card p-6 sm:p-7"
            onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              setMsg('')
              const res = await fetch('/api/public/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
              })
              const data = await res.json()
              if (!res.ok) {
                setError(data.error || s.ticketError)
                return
              }
              void trackEvent('ticket_created', '/destek')
              setMsg(`${s.ticketOk} · ${data.reference_code ?? ''}`.trim())
              setForm({ name: '', email: '', subject: '', message: '', website_url_hp: '' })
            }}
          >
            <h2 className="font-display text-lg font-semibold text-white">{s.ticketTitle}</h2>

            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={form.website_url_hp}
              onChange={(e) => setForm({ ...form, website_url_hp: e.target.value })}
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder={s.ticketName}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="ltx-field"
              />
              <input
                required
                type="email"
                placeholder={s.ticketEmail}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="ltx-field"
              />
            </div>
            <input
              required
              placeholder={s.ticketSubject}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="ltx-field mt-4"
            />
            <textarea
              required
              rows={5}
              placeholder={s.ticketMessage}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="ltx-field mt-4 resize-none"
            />

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}

            <button type="submit" className="ltx-btn-primary mt-5 w-full">
              {s.ticketSend}
            </button>
          </form>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-white">{s.faqTitle}</h2>
              <Link to="/sss" className="inline-flex items-center gap-1 text-[12.5px] text-sky-300 hover:text-sky-200">
                {s.faqSeeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 space-y-2.5">
              {faqs.slice(0, 6).map((f) => (
                <details
                  key={f.id}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition open:border-white/15 open:bg-white/[0.04]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] font-medium text-white [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <Plus className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingChrome>
  )
}
