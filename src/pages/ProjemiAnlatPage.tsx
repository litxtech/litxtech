import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { submitLead, trackEvent } from '@/lib/publicCms'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl } from '@/lib/publicCms'

export function ProjemiAnlatPage() {
  const settings = useCompanySettings()
  const { t } = useLanguage()
  const c = t.lead
  const projectTypes = c.projectTypes
  const customerTypes = c.customerTypes
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [refCode, setRefCode] = useState('')
  const [form, setForm] = useState({
    project_type: '',
    customer_type: '',
    project_description: '',
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    preferred_contact: 'email',
    budget_range: '',
    website_url_hp: '',
  })

  useEffect(() => {
    const plan = searchParams.get('plan')
    const projectType = searchParams.get('project_type')
    if (projectType && projectTypes.some((item) => item.id === projectType)) {
      setForm((f) => ({ ...f, project_type: projectType }))
    }
    if (plan) {
      setForm((f) => ({
        ...f,
        budget_range: plan,
        project_description: f.project_description || `Package request: ${plan}`,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const wa = useMemo(() => getWhatsAppUrl(settings), [settings])

  const next = async () => {
    setError('')
    if (step === 1 && !form.project_type) return setError(c.errProjectType)
    if (step === 2 && !form.customer_type) return setError(c.errCustomerType)
    if (step === 3 && form.project_description.trim().length < 20) {
      return setError(c.errDescription)
    }
    if (step === 1) trackEvent('lead_started', '/projemi-anlat', { project_type: form.project_type })
    setStep((s) => Math.min(5, s + 1))
  }

  const submit = async () => {
    setError('')
    if (!form.name.trim() || !form.email.trim()) {
      setError(c.errContact)
      return
    }
    setBusy(true)
    try {
      const result = await submitLead({
        ...form,
        source: 'projemi-anlat',
        path: '/projemi-anlat',
      })
      setRefCode(result.reference_code)
      setStep(5)
    } catch (e: any) {
      setError(e.message || c.errSend)
    } finally {
      setBusy(false)
    }
  }

  const optionClass = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-[13.5px] transition ${
      active
        ? 'border-sky-400/60 bg-sky-500/10 text-white'
        : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20'
    }`

  return (
    <MarketingChrome>
      <SeoHead title={c.metaTitle} description={c.metaDescription} path="/projemi-anlat" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{c.eyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{c.title}</h1>
          <p className="ltx-lead mt-5 max-w-2xl">{c.lead}</p>
        </div>
      </section>

      <section className="ltx-container py-14">
        <div className="ltx-card mx-auto max-w-3xl p-6 md:p-8">
          {step < 5 && (
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                {c.stepLabel} {step} / 4
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-white">{c.step1Title}</h2>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {projectTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setForm({ ...form, project_type: item.id })}
                    className={optionClass(form.project_type === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-white">{c.step2Title}</h2>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {customerTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setForm({ ...form, customer_type: item.id })}
                    className={optionClass(form.customer_type === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-white">{c.step3Title}</h2>
              <textarea
                rows={6}
                value={form.project_description}
                onChange={(e) => setForm({ ...form, project_description: e.target.value })}
                placeholder={c.descriptionPlaceholder}
                className="ltx-field resize-none"
              />
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder={c.companyPlaceholder}
                className="ltx-field"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">{c.step4Title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={c.namePlaceholder}
                  className="ltx-field"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={c.emailPlaceholder}
                  className="ltx-field"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={c.phonePlaceholder}
                  className="ltx-field"
                />
                <input
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder={c.whatsappPlaceholder}
                  className="ltx-field"
                />
              </div>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.website_url_hp}
                onChange={(e) => setForm({ ...form, website_url_hp: e.target.value })}
                className="hidden"
                aria-hidden
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <Check className="h-6 w-6 text-emerald-300" strokeWidth={3} />
              </span>
              <h2 className="font-display text-2xl font-semibold text-white">{c.successTitle}</h2>
              <p className="text-[14px] text-slate-300">
                {c.successRef}{' '}
                <span className="font-mono font-semibold text-sky-300">{refCode}</span>
              </p>
              <p className="text-[13px] text-slate-400">{c.successBody}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link to="/" className="ltx-btn-primary">
                  {c.home}
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', '/projemi-anlat')}
                  className="ltx-btn-secondary"
                >
                  {c.whatsapp}
                </a>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          {step < 5 && (
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="ltx-btn-secondary ltx-btn-sm disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                {c.back}
              </button>
              {step < 4 ? (
                <button type="button" onClick={next} className="ltx-btn-primary ltx-btn-sm">
                  {c.next}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={submit}
                  className="ltx-btn-primary ltx-btn-sm disabled:opacity-60"
                >
                  {busy ? c.submitting : c.submit}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </MarketingChrome>
  )
}
