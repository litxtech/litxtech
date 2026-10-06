import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminSettingsPage() {
  const [form, setForm] = useState<any>(null)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .settings()
      .then((d) => setForm(d.settings))
      .catch((e) => setError(e.message))
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    setError('')
    try {
      const d = await adminApi.updateSettings(form)
      setForm(d.settings)
      setMsg('Saved. Public site will use these values via /api/public/company.')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (!form && !error) return <p className="text-slate-400">Loading settings…</p>
  if (error && !form) return <p className="text-red-400">{error}</p>

  const set = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }))

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Company & Contact</h2>
        <p className="text-slate-400">One source of truth for phone, WhatsApp, email.</p>
      </div>

      <form onSubmit={save} className="space-y-4 rounded-2xl border border-white/10 p-6">
        {[
          ['company_name', 'Company name'],
          ['legal_name', 'Legal name'],
          ['phone', 'Phone display'],
          ['phone_tel', 'Phone tel: link'],
          ['email', 'Email'],
          ['support_email', 'Support email'],
          ['whatsapp_number', 'WhatsApp number (digits)'],
          ['whatsapp_message', 'WhatsApp default message'],
          ['whatsapp_button_text', 'WhatsApp button text'],
          ['calendly_url', 'Calendly URL'],
          ['address', 'Address'],
          ['copyright', 'Copyright'],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-1 block text-sm text-slate-300">{label}</label>
            <input
              value={form[key] ?? ''}
              onChange={(e) => set(key, e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
            />
          </div>
        ))}

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={!!form.whatsapp_enabled}
            onChange={(e) => set('whatsapp_enabled', e.target.checked)}
          />
          WhatsApp enabled
        </label>

        <textarea
          value={form.description ?? ''}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
          placeholder="Company description"
          className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />

        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950"
        >
          Save settings
        </button>
      </form>
    </div>
  )
}
