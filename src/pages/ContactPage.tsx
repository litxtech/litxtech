import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

export function ContactPage() {
  const company = useCompanySettings()
  const { t } = useLanguage()
  const c = t.contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_url_hp: '',
  })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    setDone('')
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || c.sendError)
      setDone(`${data.message || c.sent} · ${data.reference_code ?? ''}`.trim())
      setFormData({ name: '', email: '', subject: '', message: '', website_url_hp: '' })
      trackEvent('contact_submit', '/contact')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const channels = [
    {
      icon: Mail,
      label: c.email,
      value: company.email,
      href: `mailto:${company.email}`,
      tone: 'from-sky-400/20 to-blue-500/10 text-sky-300',
      onClick: () => trackEvent('email_click', '/contact'),
    },
    {
      icon: Phone,
      label: c.phone,
      value: company.phone,
      href: `tel:${company.phone_tel}`,
      tone: 'from-violet-400/20 to-fuchsia-500/10 text-violet-300',
      onClick: () => trackEvent('phone_click', '/contact'),
    },
    {
      icon: MessageCircle,
      label: c.whatsapp,
      value: company.whatsapp?.buttonText || c.whatsappCta,
      href: getWhatsAppUrl(company),
      tone: 'from-emerald-400/20 to-teal-500/10 text-emerald-300',
      onClick: () => trackEvent('whatsapp_click', '/contact'),
      external: true,
    },
  ]

  return (
    <MarketingChrome>
      <SeoHead title={c.metaTitle} description={c.metaDescription} path="/contact" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="ltx-h1">
              <span className="ltx-gradient-text">{c.title}</span>
            </h1>
            <p className="ltx-lead mt-5">{c.lead}</p>
            <Link to="/projemi-anlat" className="ltx-btn-primary mt-8">
              {c.ctaProject}
            </Link>
          </div>
        </div>
      </section>

      <section className="ltx-container ltx-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          {/* Form */}
          <div className="ltx-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-white">{c.formTitle}</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="ltx-label">
                    {c.labelName}
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="ltx-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="ltx-label">
                    {c.labelEmail}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="ltx-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="ltx-label">
                  {c.labelSubject}
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="ltx-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="ltx-label">
                  {c.labelMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="ltx-field resize-none"
                  required
                />
              </div>
              <input
                name="website_url_hp"
                value={formData.website_url_hp}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              {done && <p className="text-sm text-emerald-400">{done}</p>}
              {error && <p className="text-sm text-red-400">{error}</p>}

              <button type="submit" disabled={busy} className="ltx-btn-primary w-full disabled:opacity-60">
                <Send className="h-4 w-4" />
                {busy ? c.sending : c.send}
              </button>
            </form>
          </div>

          {/* Channels */}
          <div className="space-y-4">
            <div className="ltx-card p-6">
              <h2 className="font-display text-base font-semibold text-white">{c.channelsTitle}</h2>
              <div className="mt-5 space-y-3">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      onClick={channel.onClick}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${channel.tone} ring-1 ring-white/10`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-[0.12em] text-slate-500">
                          {channel.label}
                        </span>
                        <span className="block truncate text-[13.5px] font-medium text-slate-200">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                  )
                })}

                {company.address && (
                  <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 text-amber-300 ring-1 ring-white/10">
                      <MapPin className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.12em] text-slate-500">
                        {c.address}
                      </span>
                      <span className="block text-[13px] leading-snug text-slate-300">{company.address}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="ltx-card p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-sky-300" />
                <h2 className="font-display text-base font-semibold text-white">{c.consultTitle}</h2>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{c.consultLead}</p>
              <a
                href={company.calendly_url || 'https://calendly.com/litxtech/consultation'}
                target="_blank"
                rel="noopener noreferrer"
                className="ltx-btn-secondary mt-4 w-full"
              >
                <Calendar className="h-4 w-4" />
                {c.consultCta}
              </a>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {c.quickMeta}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <h2 className="text-[13px] font-semibold text-white">{c.responseTitle}</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{c.responseBody}</p>
            </div>
          </div>
        </div>
      </section>
    </MarketingChrome>
  )
}
