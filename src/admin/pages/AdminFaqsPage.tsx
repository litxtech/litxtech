import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [form, setForm] = useState({ category: 'Genel', question: '', answer: '' })
  const [error, setError] = useState('')

  const load = () =>
    adminApi
      .faqs()
      .then((d) => setFaqs(d.faqs))
      .catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await adminApi.createFaq(form)
      setForm({ category: 'Genel', question: '', answer: '' })
      load()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">FAQ</h2>
        <p className="text-slate-400">Published FAQs appear on /sss and /destek.</p>
      </div>

      <form onSubmit={create} className="space-y-3 rounded-2xl border border-white/10 p-5">
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
          placeholder="Category"
        />
        <input
          required
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
          placeholder="Question"
        />
        <textarea
          required
          rows={3}
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-white"
          placeholder="Answer"
        />
        <button type="submit" className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950">
          Add FAQ
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-cyan-300">{f.category}</p>
                <p className="font-semibold text-white">{f.question}</p>
                <p className="mt-1 text-sm text-slate-400">{f.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => adminApi.deleteFaq(f.id).then(load)}
                className="text-sm text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
