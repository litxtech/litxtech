import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Save,
  Search,
  Share2,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  TextArea,
  TextInput,
  Toggle,
  cx,
  useToast,
} from '../ui'

type Settings = Record<string, any>

const SOCIAL_KEYS = [
  ['linkedin', 'LinkedIn'],
  ['x', 'X (Twitter)'],
  ['instagram', 'Instagram'],
  ['github', 'GitHub'],
  ['youtube', 'YouTube'],
  ['facebook', 'Facebook'],
] as const

function asObject(value: any): Record<string, any> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
      return {}
    }
  }
  return {}
}

export function AdminSettingsPage() {
  const { push } = useToast()
  const [form, setForm] = useState<Settings | null>(null)
  const [original, setOriginal] = useState<Settings | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<'contact' | 'company' | 'whatsapp' | 'social' | 'seo'>('contact')

  const load = useCallback(async () => {
    setError('')
    try {
      const data = await adminApi.settings()
      const settings = {
        ...data.settings,
        social: asObject(data.settings?.social),
        default_seo: asObject(data.settings?.default_seo),
      }
      setForm(settings)
      setOriginal(settings)
    } catch (err: any) {
      setError(err?.message || 'Ayarlar yüklenemedi')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const set = (key: string, value: any) => setForm((current) => (current ? { ...current, [key]: value } : current))

  const dirty = useMemo(() => {
    if (!form || !original) return false
    return JSON.stringify(form) !== JSON.stringify(original)
  }, [form, original])

  const issues = useMemo(() => {
    if (!form) return {}
    const found: Record<string, string> = {}
    if (!String(form.company_name || '').trim()) found.company_name = 'Şirket adı zorunlu'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email))) found.email = 'Geçerli bir e-posta girin'
    if (form.support_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.support_email)))
      found.support_email = 'Geçerli bir e-posta girin'
    if (form.whatsapp_number && !/^\d{6,15}$/.test(String(form.whatsapp_number).replace(/\D/g, '')))
      found.whatsapp_number = 'Sadece rakam, ülke koduyla (örn. 13072715151)'
    if (form.website && !/^https?:\/\//.test(String(form.website))) found.website = 'https:// ile başlamalı'
    return found
  }, [form])

  const save = async () => {
    if (!form) return
    if (Object.keys(issues).length) {
      push({ tone: 'error', title: 'Form eksik', body: 'İşaretli alanları düzeltin.' })
      return
    }
    setBusy(true)
    setError('')
    try {
      const payload: Settings = { ...form }
      payload.whatsapp_number = String(form.whatsapp_number || '').replace(/\D/g, '')
      payload.social = asObject(form.social)
      payload.default_seo = asObject(form.default_seo)
      const data = await adminApi.updateSettings(payload)
      const settings = {
        ...data.settings,
        social: asObject(data.settings?.social),
        default_seo: asObject(data.settings?.default_seo),
      }
      setForm(settings)
      setOriginal(settings)
      push({ tone: 'success', title: 'Kaydedildi', body: 'Bilgiler site genelinde güncellendi.' })
    } catch (err: any) {
      setError(err?.message || 'Kaydetme başarısız')
      push({ tone: 'error', title: 'Kaydedilemedi', body: err?.message || 'Bilinmeyen hata' })
    } finally {
      setBusy(false)
    }
  }

  if (!form && !error) return <Loading label="Ayarlar yükleniyor…" />
  if (error && !form)
    return (
      <div className="space-y-4">
        <PageHeader eyebrow="Ayarlar" title="Şirket bilgileri" />
        <ErrorNote>{error}</ErrorNote>
        <Button onClick={() => void load()} variant="primary">
          <RefreshCw className="h-4 w-4" /> Tekrar dene
        </Button>
      </div>
    )

  if (!form) return null

  const tabs = [
    { id: 'contact', label: 'İletişim', icon: Phone },
    { id: 'company', label: 'Şirket', icon: Building2 },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'social', label: 'Sosyal medya', icon: Share2 },
    { id: 'seo', label: 'SEO & gizlilik', icon: Search },
  ] as const

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        eyebrow="Ayarlar"
        title="Şirket bilgileri"
        description="Telefon, e-posta, WhatsApp ve site bilgileri tek kaynaktan yönetilir. Kaydettiğinizde site genelinde (footer, iletişim, WhatsApp butonu) anında geçerli olur."
        actions={
          <>
            {dirty ? <Badge tone="amber" dot>kaydedilmemiş değişiklik</Badge> : <Badge tone="emerald" dot>güncel</Badge>}
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={busy}>
              <RefreshCw className="h-3.5 w-3.5" /> Sıfırla
            </Button>
            <Button variant="primary" size="sm" onClick={() => void save()} loading={busy}>
              <Save className="h-3.5 w-3.5" /> Kaydet
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cx(
              'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[12.5px] font-medium transition',
              tab === item.id
                ? 'bg-gradient-to-r from-cyan-400/[0.16] to-indigo-500/[0.08] text-white shadow-inner'
                : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
            )}
          >
            <item.icon className={cx('h-3.5 w-3.5', tab === item.id ? 'text-cyan-300' : 'text-slate-500')} />
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'contact' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Telefon" description="Sitede görünen numara ve tıklanabilir tel: bağlantısı">
            <div className="space-y-4">
              <Field label="Görünen numara" hint="örn. +1 307 271 5151" error={issues.phone}>
                <TextInput value={form.phone ?? ''} onChange={(e) => set('phone', e.target.value)} placeholder="+1 307 271 5151" />
              </Field>
              <Field label="Tel: bağlantısı" hint="boşluk yok" error={issues.phone_tel}>
                <TextInput
                  value={form.phone_tel ?? ''}
                  onChange={(e) => set('phone_tel', e.target.value)}
                  placeholder="+13072715151"
                />
              </Field>
              <Field label="Mobil" hint="opsiyonel">
                <TextInput value={form.mobile ?? ''} onChange={(e) => set('mobile', e.target.value)} placeholder="+1 ..." />
              </Field>
              <Field label="Çalışma saatleri">
                <TextInput
                  value={form.working_hours ?? ''}
                  onChange={(e) => set('working_hours', e.target.value)}
                  placeholder="Pzt–Cum 09:00–18:00 (EST)"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="E-posta" description="Destek ve satış adresleri">
            <div className="space-y-4">
              <Field label="Genel e-posta" error={issues.email}>
                <TextInput value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} placeholder="support@litxtech.com" />
              </Field>
              <Field label="Destek e-postası" error={issues.support_email}>
                <TextInput
                  value={form.support_email ?? ''}
                  onChange={(e) => set('support_email', e.target.value)}
                  placeholder="support@litxtech.com"
                />
              </Field>
              <Field label="Satış e-postası">
                <TextInput
                  value={form.business_email ?? ''}
                  onChange={(e) => set('business_email', e.target.value)}
                  placeholder="sales@litxtech.com"
                />
              </Field>
              <Field label="Web sitesi" error={issues.website}>
                <TextInput value={form.website ?? ''} onChange={(e) => set('website', e.target.value)} placeholder="https://www.litxtech.com" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Adres" className="lg:col-span-2" description="Faturalar ve yasal metinlerde kullanılır">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Adres" className="md:col-span-2">
                <TextInput value={form.address ?? ''} onChange={(e) => set('address', e.target.value)} placeholder="30 N Gould St, Ste R" />
              </Field>
              <Field label="Şehir">
                <TextInput value={form.city ?? ''} onChange={(e) => set('city', e.target.value)} placeholder="Sheridan" />
              </Field>
              <Field label="Ülke">
                <TextInput value={form.country ?? ''} onChange={(e) => set('country', e.target.value)} placeholder="United States" />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              Bu adres yalnızca yasal/fatura amaçlı kullanılır; sitenin her yerinde gösterilmez.
            </div>
          </SectionCard>
        </div>
      )}

      {tab === 'company' && (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <SectionCard title="Kimlik" description="Marka ve yasal unvan">
            <div className="space-y-4">
              <Field label="Şirket adı" error={issues.company_name}>
                <TextInput value={form.company_name ?? ''} onChange={(e) => set('company_name', e.target.value)} />
              </Field>
              <Field label="Yasal unvan">
                <TextInput value={form.legal_name ?? ''} onChange={(e) => set('legal_name', e.target.value)} />
              </Field>
              <Field label="Açıklama" hint="meta açıklaması olarak da kullanılabilir">
                <TextArea rows={4} value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} />
              </Field>
              <Field label="Telif metni">
                <TextInput value={form.copyright ?? ''} onChange={(e) => set('copyright', e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="Görsel kimlik" description="Logo ve favicon URL’leri">
              <div className="space-y-4">
                <Field label="Logo URL">
                  <TextInput value={form.logo_url ?? ''} onChange={(e) => set('logo_url', e.target.value)} placeholder="https://..." />
                </Field>
                <Field label="Favicon URL">
                  <TextInput value={form.favicon_url ?? ''} onChange={(e) => set('favicon_url', e.target.value)} placeholder="https://..." />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Görünüm" description="Site genelindeki iletişim davranışı">
              <div className="space-y-3">
                <Toggle
                  label="WhatsApp butonu"
                  hint="Sitede sabit WhatsApp butonu göster"
                  checked={!!form.whatsapp_enabled}
                  onChange={(value) => set('whatsapp_enabled', value)}
                />
                <Toggle
                  label="Masaüstünde göster"
                  checked={form.whatsapp_show_desktop !== false}
                  onChange={(value) => set('whatsapp_show_desktop', value)}
                />
                <Toggle
                  label="Mobilde göster"
                  checked={form.whatsapp_show_mobile !== false}
                  onChange={(value) => set('whatsapp_show_mobile', value)}
                />
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {tab === 'whatsapp' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Numara" description="Ülke kodu ve numara">
            <div className="space-y-4">
              <Field label="Ülke kodu" hint="örn. 1 (ABD)">
                <TextInput
                  value={form.whatsapp_country_code ?? ''}
                  onChange={(e) => set('whatsapp_country_code', e.target.value.replace(/\D/g, ''))}
                  placeholder="1"
                />
              </Field>
              <Field label="WhatsApp numarası" hint="sadece rakam" error={issues.whatsapp_number}>
                <TextInput
                  value={form.whatsapp_number ?? ''}
                  onChange={(e) => set('whatsapp_number', e.target.value)}
                  placeholder="13072715151"
                />
              </Field>
              <Field label="Görünen numara">
                <TextInput
                  value={form.whatsapp_display ?? ''}
                  onChange={(e) => set('whatsapp_display', e.target.value)}
                  placeholder="+1 307 271 5151"
                />
              </Field>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[11.5px] text-slate-400">
                <span className="font-medium text-slate-300">Önizleme:</span>{' '}
                {form.whatsapp_display || `+${form.whatsapp_country_code || ''} ${form.whatsapp_number || ''}`}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Mesaj & buton" description="Ziyaretçi WhatsApp’a geçtiğinde hazır mesaj">
            <div className="space-y-4">
              <Field label="Buton metni">
                <TextInput
                  value={form.whatsapp_button_text ?? ''}
                  onChange={(e) => set('whatsapp_button_text', e.target.value)}
                  placeholder="WhatsApp"
                />
              </Field>
              <Field label="Hazır mesaj">
                <TextArea
                  rows={4}
                  value={form.whatsapp_message ?? ''}
                  onChange={(e) => set('whatsapp_message', e.target.value)}
                  placeholder="Merhaba, LitxTech web sitesinden yazıyorum…"
                />
              </Field>
              <Field label="Calendly / randevu bağlantısı">
                <TextInput
                  value={form.calendly_url ?? ''}
                  onChange={(e) => set('calendly_url', e.target.value)}
                  placeholder="https://calendly.com/..."
                />
              </Field>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <CalendarClock className="h-3.5 w-3.5" /> Randevu bağlantısı iletişim sayfasında gösterilir.
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {tab === 'social' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Sosyal hesaplar" description="Footer ve yapılandırılmış veride kullanılır">
            <div className="space-y-4">
              {SOCIAL_KEYS.map(([key, label]) => (
                <Field key={key} label={label}>
                  <TextInput
                    value={form.social?.[key] ?? ''}
                    onChange={(e) => set('social', { ...asObject(form.social), [key]: e.target.value })}
                    placeholder="https://..."
                  />
                </Field>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Doğrulama" description="Google / arama motoru doğrulama kodları">
            <div className="space-y-4">
              <Field label="Google Search Console">
                <TextInput
                  value={form.default_seo?.google_site_verification ?? ''}
                  onChange={(e) =>
                    set('default_seo', { ...asObject(form.default_seo), google_site_verification: e.target.value })
                  }
                  placeholder="google-site-verification kodu"
                />
              </Field>
              <Field label="Bing doğrulama">
                <TextInput
                  value={form.default_seo?.bing_site_verification ?? ''}
                  onChange={(e) =>
                    set('default_seo', { ...asObject(form.default_seo), bing_site_verification: e.target.value })
                  }
                  placeholder="msvalidate.01"
                />
              </Field>
              <div className="flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[11.5px] text-slate-400">
                <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Bağlantılar boş bırakılırsa sitede ilgili simge gösterilmez.
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {tab === 'seo' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Varsayılan SEO" description="Sayfaya özel meta yoksa kullanılır">
            <div className="space-y-4">
              <Field label="Başlık şablonu">
                <TextInput
                  value={form.default_seo?.title_template ?? ''}
                  onChange={(e) => set('default_seo', { ...asObject(form.default_seo), title_template: e.target.value })}
                  placeholder="%s | LitxTech"
                />
              </Field>
              <Field label="Açıklama">
                <TextArea
                  rows={3}
                  value={form.default_seo?.description ?? ''}
                  onChange={(e) => set('default_seo', { ...asObject(form.default_seo), description: e.target.value })}
                  placeholder="LitxTech LLC özel yazılım, mobil uygulama ve SaaS geliştirme stüdyosu."
                />
              </Field>
              <Field label="Anahtar kelimeler">
                <TextInput
                  value={form.default_seo?.keywords ?? ''}
                  onChange={(e) => set('default_seo', { ...asObject(form.default_seo), keywords: e.target.value })}
                  placeholder="özel yazılım, mobil uygulama, SaaS"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Çerez metni" description="Çerez bildiriminde gösterilir">
            <div className="space-y-4">
              <Field label="Metin">
                <TextArea
                  rows={5}
                  value={form.cookie_text ?? ''}
                  onChange={(e) => set('cookie_text', e.target.value)}
                  placeholder="Deneyiminizi iyileştirmek için çerezler kullanıyoruz…"
                />
              </Field>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[11.5px] text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Değişiklikler kaydettiğinizde canlıya alınır.
                </span>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#070a11]/92 px-4 py-3 backdrop-blur-xl lg:pl-[17rem]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            {dirty ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Kaydedilmemiş değişiklikler var
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Tüm bilgiler güncel
              </>
            )}
            {Object.keys(issues).length > 0 && (
              <span className="ml-2 text-rose-300">· {Object.keys(issues).length} alan düzeltilmeli</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setForm(original)
                push({ tone: 'info', title: 'Değişiklikler geri alındı' })
              }}
              disabled={!dirty}
            >
              Geri al
            </Button>
            <Button variant="primary" size="sm" onClick={() => void save()} loading={busy} disabled={!dirty}>
              <Save className="h-3.5 w-3.5" /> Değişiklikleri kaydet
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5" /> Mobil uyumlu
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Canlı yayın
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5" /> /api/public/company üzerinden servis edilir
        </span>
      </div>
    </div>
  )
}
