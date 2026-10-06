import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminApplicationsPage() {
  const [apps, setApps] = useState<any[]>([])
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    slug: '',
    short_description: '',
    website_url: '',
    ios_url: '',
    android_url: '',
    status: 'draft',
    featured: false,
  })

  const load = () =>
    adminApi
      .applications()
      .then((d) => setApps(d.applications))
      .catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await adminApi.createApplication(form)
      setForm({
        name: '',
        slug: '',
        short_description: '',
        website_url: '',
        ios_url: '',
        android_url: '',
        status: 'draft',
        featured: false,
      })
      load()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const publish = async (app: any) => {
    await adminApi.updateApplication({
      id: app.id,
      status: app.status === 'published' ? 'draft' : 'published',
    })
    load()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        <p className="text-slate-400">CMS-managed apps (Tamuso, Vora, …). No invented claims.</p>
      </div>

      <form onSubmit={create} className="grid gap-3 rounded-2xl border border-white/10 p-5 md:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <input
          required
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <input
          placeholder="Short description"
          value={form.short_description}
          onChange={(e) => setForm({ ...form, short_description: e.target.value })}
          className="md:col-span-2 rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <input
          placeholder="Website URL"
          value={form.website_url}
          onChange={(e) => setForm({ ...form, website_url: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <input
          placeholder="iOS URL"
          value={form.ios_url}
          onChange={(e) => setForm({ ...form, ios_url: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <input
          placeholder="Android URL"
          value={form.android_url}
          onChange={(e) => setForm({ ...form, android_url: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button type="submit" className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950">
          Create application
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-3">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div>
              <p className="font-semibold text-white">
                {app.name}{' '}
                <span className="text-xs font-normal text-slate-400">/{app.slug}</span>
              </p>
              <p className="text-sm text-slate-400">{app.short_description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase text-cyan-300">{app.status}</span>
              <button
                type="button"
                onClick={() => publish(app)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5"
              >
                {app.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
