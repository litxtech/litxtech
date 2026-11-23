import { useCallback, useEffect, useMemo, useState } from 'react'
import { FileText, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Field,
  Loading,
  PageHeader,
  SectionCard,
  TextArea,
  TextInput,
  cx,
  useToast,
} from '../ui'

export function AdminFaqsPage() {
  const { push } = useToast()
  const [faqs, setFaqs] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ category: 'Genel', question: '', answer: '' })
  const [q, setQ] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await adminApi.faqs()
      setFaqs(data.faqs || [])
      setError('')
    } catch (err: any) {
      setError(err?.message || 'SSS yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const filtered = useMemo(
    () =>
      faqs.filter((row) =>
        `${row.category} ${row.question} ${row.answer}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [faqs, q],
  )

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {}
    for (const row of filtered) {
      const key = row.category || 'Genel'
      map[key] = map[key] || []
      map[key].push(row)
    }
    return map
  }, [filtered])

  const create = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      push({ tone: 'error', title: 'Soru ve cevap zorunlu' })
      return
    }
    setCreating(true)
    try {
      await adminApi.createFaq(form)
      setForm({ category: form.category, question: '', answer: '' })
      push({ tone: 'success', title: 'SSS eklendi' })
      await load()
    } catch (err: any) {
      push({ tone: 'error', title: 'Eklenemedi', body: err?.message || 'Hata' })
    } finally {
      setCreating(false)
    }
  }

  const toggle = async (faq: any) => {
    try {
      await adminApi.updateFaq({ id: faq.id, published: !faq.published })
      setFaqs((current) => current.map((row) => (row.id === faq.id ? { ...row, published: !row.published } : row)))
    } catch (err: any) {
      push({ tone: 'error', title: 'Güncellenemedi', body: err?.message || 'Hata' })
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="İçerik"
        title="Sıkça sorulan sorular"
        description="Yayınlanan sorular /sss ve /destek sayfalarında listelenir."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => void load()} loading={loading}>
              <RefreshCw className="h-3.5 w-3.5" /> Yenile
            </Button>
            <Button variant="primary" size="sm" onClick={() => setOpen((value) => !value)}>
              <Plus className="h-3.5 w-3.5" /> Yeni soru
            </Button>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {open && (
        <SectionCard title="Yeni soru" description="Kategoriye göre gruplanır" bodyClassName="grid gap-3 md:grid-cols-[12rem_1fr]">
          <Field label="Kategori">
            <TextInput value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </Field>
          <Field label="Soru">
            <TextInput value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </Field>
          <Field label="Cevap" className="md:col-span-2">
            <TextArea rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
          </Field>
          <div className="flex gap-2 md:col-span-2">
            <Button variant="primary" onClick={() => void create()} loading={creating}>
              Ekle
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Vazgeç
            </Button>
          </div>
        </SectionCard>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TextInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Sorularda ara…"
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
          <Badge tone="slate">{faqs.length} kayıt</Badge>
          <Badge tone="emerald">{faqs.filter((row) => row.published !== false).length} yayında</Badge>
        </div>
      </div>

      {loading && !faqs.length && <Loading />}
      {!loading && !filtered.length && (
        <EmptyState icon={<FileText className="h-5 w-5" />} title="SSS kaydı yok" description="İlk soruyu ekleyerek başlayın." />
      )}

      <div className="space-y-5">
        {Object.entries(grouped).map(([category, rows]) => (
          <div key={category}>
            <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-500">{category}</p>
            <div className="space-y-2">
              {rows.map((faq) => (
                <article
                  key={faq.id}
                  className={cx(
                    'rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 transition hover:border-white/[0.14]',
                    faq.published === false && 'opacity-60',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-white">{faq.question}</p>
                      <p className="mt-1 whitespace-pre-wrap text-[12.5px] leading-relaxed text-slate-400">{faq.answer}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void toggle(faq)}
                        className={cx(
                          'rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide ring-1 transition',
                          faq.published === false
                            ? 'bg-white/[0.05] text-slate-400 ring-white/10 hover:text-white'
                            : 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20',
                        )}
                      >
                        {faq.published === false ? 'taslak' : 'yayında'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!confirm('Bu soru silinsin mi?')) return
                          try {
                            await adminApi.deleteFaq(faq.id)
                            await load()
                          } catch (err: any) {
                            push({ tone: 'error', title: 'Silinemedi', body: err?.message || 'Hata' })
                          }
                        }}
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                        aria-label="Sil"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
