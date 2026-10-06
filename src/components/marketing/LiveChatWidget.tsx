import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'
import { supabase } from '@/lib/supabase'

type Msg = { id: string; sender: string; body: string; status?: string }

export function LiveChatWidget() {
  const company = useCompanySettings()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [conversationId, setConversationId] = useState(() => localStorage.getItem('ltx_chat_id') || '')
  const [token, setToken] = useState(() => localStorage.getItem('ltx_chat_token') || '')
  const [messages, setMessages] = useState<Msg[]>([])
  const [adminOnline, setAdminOnline] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open || !conversationId || !token) return
    const pull = async () => {
      const res = await fetch(`/api/public/chat?id=${conversationId}&token=${token}`)
      const data = await res.json()
      if (res.ok) {
        setMessages(data.messages || [])
        setAdminOnline(!!data.admin_online)
      }
    }
    void pull()
    const timer = window.setInterval(() => void pull(), 8000)
    const channel = supabase?.channel(`chat:${conversationId}`)
    channel?.on('broadcast', { event: 'message' }, () => void pull()).subscribe()
    return () => {
      window.clearInterval(timer)
      if (channel) void supabase?.removeChannel(channel)
    }
  }, [open, conversationId, token])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      let id = conversationId
      let visitor = token
      if (!id) {
        const started = await fetch('/api/public/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'start', name: name || 'Ziyaretçi', page: location.pathname }),
        })
        const data = await started.json()
        if (!started.ok) throw new Error(data.error || 'Sohbet açılamadı')
        id = data.conversation.id
        visitor = data.conversation.visitor_token
        localStorage.setItem('ltx_chat_id', id)
        localStorage.setItem('ltx_chat_token', visitor)
        setConversationId(id)
        setToken(visitor)
      }
      const res = await fetch('/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', conversation_id: id, visitor_token: visitor, body: text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gönderilemedi')
      setMessages((m) => [...m, data.message])
      setText('')
      void supabase?.channel(`chat:${id}`).send({ type: 'broadcast', event: 'message', payload: { id: data.message.id } })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const wa = company.whatsapp?.enabled === false ? '' : getWhatsAppUrl(company)

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-24">
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,22rem)] rounded-2xl border border-white/10 bg-[#0c1018] p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Canlı destek</p>
              <p className="text-xs text-slate-400">{adminOnline ? 'Ekip çevrimiçi' : 'Ekip çevrimdışı'}</p>
            </div>
            <button type="button" aria-label="Kapat" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-3 max-h-64 space-y-2 overflow-y-auto text-sm">
            {messages.map((m) => (
              <p key={m.id} className="rounded-lg bg-white/5 px-3 py-2">
                <span className="text-slate-400">{m.sender === 'admin' ? 'LitxTech' : 'Siz'}: </span>
                {m.body}
              </p>
            ))}
            {!messages.length && <p className="text-slate-500">Mesajınız ekibe iletilir.</p>}
          </div>
          {!adminOnline && wa && (
            <a href={wa} className="mb-3 block text-xs text-emerald-300" target="_blank" rel="noopener noreferrer">
              WhatsApp ile devam et
            </a>
          )}
          <form onSubmit={send} className="space-y-2">
            {!conversationId && (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm" />
            )}
            <textarea required value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Mesaj" className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm" />
            {error && <p className="text-xs text-red-300">{error}</p>}
            <button type="submit" className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-slate-950">Gönder</button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg"
        onClick={() => {
          setOpen((v) => !v)
          if (!open) void trackEvent('live_chat_open', location.pathname)
        }}
      >
        <MessageCircle className="h-4 w-4" />
        Canlı destek
      </button>
    </div>
  )
}
