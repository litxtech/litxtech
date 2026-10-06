import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { submitLead, trackEvent } from '@/lib/publicCms'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { getWhatsAppUrl } from '@/lib/publicCms'

const projectTypes = [
  { id: 'mobile', label: 'Mobil uygulama' },
  { id: 'web', label: 'Web uygulaması' },
  { id: 'social', label: 'Sosyal platform' },
  { id: 'saas', label: 'SaaS' },
  { id: 'hotel', label: 'Otel sistemi' },
  { id: 'restaurant', label: 'Restoran / işletme' },
  { id: 'custom', label: 'Özel yazılım' },
  { id: 'ai', label: 'Yapay zeka' },
  { id: 'other', label: 'Diğer' },
]

const customerTypes = [
  { id: 'business', label: 'İşletme sahibiyim' },
  { id: 'entrepreneur', label: 'Bir fikrim var' },
  { id: 'company', label: 'Şirketim için yazılım' },
  { id: 'startup', label: 'Startup' },
  { id: 'individual', label: 'Bireysel' },
  { id: 'other', label: 'Diğer' },
]

export function ProjemiAnlatPage() {
  const settings = useCompanySettings()
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
    website_url_hp: '',
  })

  const wa = useMemo(() => getWhatsAppUrl(settings), [settings])

  const next = async () => {
    setError('')
    if (step === 1 && !form.project_type) return setError('Lütfen bir proje tipi seçin.')
    if (step === 2 && !form.customer_type) return setError('Lütfen müşteri tipini seçin.')
    if (step === 3 && form.project_description.trim().length < 20) {
      return setError('Lütfen projenizi en az birkaç cümle ile anlatın.')
    }
    if (step === 1) trackEvent('lead_started', '/projemi-anlat', { project_type: form.project_type })
    setStep((s) => Math.min(5, s + 1))
  }

  const submit = async () => {
    setError('')
    if (!form.name.trim() || !form.email.trim()) {
      setError('Ad ve e-posta zorunludur.')
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
      setError(e.message || 'Gönderilemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <MarketingChrome>
      <SeoHead
        title="Projenizi Anlatın | LitxTech"
        description="Fikrinizi çalışan bir dijital ürüne dönüştürelim. Proje talebinizi birkaç adımda iletin."
        path="/projemi-anlat"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Lead</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Fikrinizi çalışan bir dijital ürüne dönüştürelim.
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Birkaç kısa adımda projenizi anlatın. Ekibimiz ihtiyaçlarınızı inceleyerek sizinle iletişime
          geçer.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {step < 5 && (
            <p className="mb-6 text-sm text-slate-400">
              Adım {step} / 4
            </p>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Ne geliştirmek istiyorsunuz?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {projectTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setForm({ ...form, project_type: t.id })}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      form.project_type === t.id
                        ? 'border-cyan-400 bg-cyan-500/10 text-white'
                        : 'border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Bu proje kimin için?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {customerTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setForm({ ...form, customer_type: t.id })}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      form.customer_type === t.id
                        ? 'border-cyan-400 bg-cyan-500/10 text-white'
                        : 'border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Projenizi kısaca anlatın</h2>
              <textarea
                rows={6}
                value={form.project_description}
                onChange={(e) => setForm({ ...form, project_description: e.target.value })}
                placeholder="Hedef kullanıcılar, temel özellikler, mevcut durum…"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Şirket / marka (opsiyonel)"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Size nasıl ulaşalım?</h2>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ad Soyad"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="E-posta"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Telefon (opsiyonel)"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white"
              />
              <input
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="WhatsApp (opsiyonel)"
                className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white"
              />
              {/* honeypot */}
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
              <h2 className="text-2xl font-bold text-white">Talebinizi aldık.</h2>
              <p className="text-slate-300">
                Referans numarası:{' '}
                <span className="font-mono font-semibold text-cyan-300">{refCode}</span>
              </p>
              <p className="text-slate-400">
                LITXTECH ekibimiz projenizi inceleyerek sizinle iletişime geçecek.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link to="/" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                  Ana sayfa
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', '/projemi-anlat')}
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                >
                  WhatsApp&apos;tan yaz
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
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 disabled:opacity-40"
              >
                Geri
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
                >
                  Devam
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={submit}
                  className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-60"
                >
                  {busy ? 'Gönderiliyor…' : 'Talebi gönder'}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </MarketingChrome>
  )
}
