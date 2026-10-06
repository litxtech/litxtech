import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, Calendar, MessageCircle } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

export function ContactPage() {
  const company = useCompanySettings()
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
      if (!res.ok) throw new Error(data.error || 'Gönderilemedi')
      setDone(`${data.message} Ref: ${data.reference_code}`)
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

  const fieldClass =
    'litx-dark-input w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 [color-scheme:dark]'

  return (
    <MarketingChrome>
      <SeoHead
        title="İletişim | LitxTech"
        description="Proje, destek veya iş birliği için LitxTech ile iletişime geçin. Formu doldurun ya da telefon, e-posta ve WhatsApp üzerinden yazın."
        path="/contact"
      />
      <div className="relative min-h-screen text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                İletişim
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-100">
              Ready to start your project? Get in touch with our team today.
            </p>
            <div className="mt-6">
              <Link
                to="/projemi-anlat"
                className="inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                Projemi Anlat
              </Link>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-white">Book a Free Consultation</h2>
              <p className="mb-6 text-gray-100">
                Schedule a call to discuss your project requirements.
              </p>
              <a
                href={company.calendly_url || 'https://calendly.com/litxtech/consultation'}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button inline-flex items-center space-x-2 px-8 py-4 text-lg neon-blue"
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Call</span>
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-blue-400" />
              <h3 className="mb-2 text-xl font-bold text-white">Quick Call</h3>
              <p className="text-sm text-gray-300">15 minutes • Free consultation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md">
              <h2 className="mb-6 text-3xl font-bold text-white">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={fieldClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`${fieldClass} resize-none`}
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
                <button
                  type="submit"
                  disabled={busy}
                  className="glow-button flex w-full items-center justify-center space-x-2 py-4 text-lg neon-blue disabled:opacity-60"
                >
                  <Send className="h-5 w-5" />
                  <span>{busy ? 'Sending…' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md">
                <h2 className="mb-6 text-3xl font-bold text-white">Get in touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-white">Email</h3>
                      <a
                        href={`mailto:${company.email}`}
                        onClick={() => trackEvent('email_click', '/contact')}
                        className="text-gray-200 hover:text-white"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-pink-500">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-white">Phone</h3>
                      <a
                        href={`tel:${company.phone_tel}`}
                        onClick={() => trackEvent('phone_click', '/contact')}
                        className="text-gray-200 hover:text-white"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-white">WhatsApp</h3>
                      <a
                        href={getWhatsAppUrl(company)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click', '/contact')}
                        className="text-gray-200 hover:text-white"
                      >
                        {company.whatsapp?.buttonText || 'Chat on WhatsApp'}
                      </a>
                    </div>
                  </div>
                  {company.address && (
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-red-500">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">Address</h3>
                        <p className="text-gray-200">{company.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingChrome>
  )
}
