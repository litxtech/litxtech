import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'
import { supabase } from '@/lib/supabase'

type Msg = { id: string; sender: string; body: string; status?: string }

const chatStrings = {
  en: {
    title: 'Live support',
    online: 'Team online',
    offline: 'Team offline',
    close: 'Close',
    you: 'You',
    empty: 'Your message goes straight to our team.',
    continueWhatsApp: 'Continue on WhatsApp',
    namePlaceholder: 'Your name',
    messagePlaceholder: 'Message',
    send: 'Send',
    visitor: 'Visitor',
    openError: 'Could not open the chat',
    sendError: 'Could not send your message',
  },
  tr: {
    title: 'Canlı destek',
    online: 'Ekip çevrimiçi',
    offline: 'Ekip çevrimdışı',
    close: 'Kapat',
    you: 'Siz',
    empty: 'Mesajınız doğrudan ekibimize iletilir.',
    continueWhatsApp: 'WhatsApp ile devam et',
    namePlaceholder: 'Adınız',
    messagePlaceholder: 'Mesajınız',
    send: 'Gönder',
    visitor: 'Ziyaretçi',
    openError: 'Sohbet açılamadı',
    sendError: 'Mesaj gönderilemedi',
  },
} as const

export function LiveChatWidget() {
  const company = useCompanySettings()
  const { language } = useLanguage()
  const s = chatStrings[language]
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
          body: JSON.stringify({
            action: 'start',
            name: name.trim() || s.visitor,
            page: location.pathname,
          }),
        })
        const data = await started.json()
        if (!started.ok) throw new Error(data.error || s.openError)
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
      if (!res.ok) throw new Error(data.error || s.sendError)
      setMessages((m) => [...m, data.message])
      setText('')
      void supabase
        ?.channel(`chat:${id}`)
        .send({ type: 'broadcast', event: 'message', payload: { id: data.message.id } })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const wa = company.whatsapp?.enabled === false ? '' : getWhatsAppUrl(company)

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-24">
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c15]/95 p-4 shadow-2xl shadow-black/70 backdrop-blur-xl">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-[14px] font-semibold text-white">{s.title}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    adminOnline ? 'bg-emerald-400' : 'bg-slate-500'
                  }`}
                />
                {adminOnline ? s.online : s.offline}
              </p>
            </div>
            <button
              type="button"
              aria-label={s.close}
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-3 max-h-64 space-y-2 overflow-y-auto text-[13px]">
            {messages.map((m) => (
              <p key={m.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-slate-200">
                <span className="text-slate-500">{m.sender === 'admin' ? 'LitxTech' : s.you}: </span>
                {m.body}
              </p>
            ))}
            {!messages.length && <p className="text-slate-500">{s.empty}</p>}
          </div>
          {!adminOnline && wa && (
            <a
              href={wa}
              className="mb-3 block text-[12px] font-medium text-emerald-300 hover:text-emerald-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.continueWhatsApp}
            </a>
          )}
          <form onSubmit={send} className="space-y-2">
            {!conversationId && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={s.namePlaceholder}
                className="ltx-field !py-2 !text-[13px]"
              />
            )}
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              placeholder={s.messagePlaceholder}
              className="ltx-field resize-none !py-2 !text-[13px]"
            />
            {error && <p className="text-[11px] text-red-300">{error}</p>}
            <button type="submit" className="ltx-btn-primary w-full !py-2 !text-[13px]">
              {s.send}
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[13px] font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
        onClick={() => {
          setOpen((v) => !v)
          if (!open) void trackEvent('live_chat_open', location.pathname)
        }}
      >
        <MessageCircle className="h-4 w-4" />
        {s.title}
      </button>
    </div>
  )
}
