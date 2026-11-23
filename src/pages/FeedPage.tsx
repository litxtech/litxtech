import { useEffect, useState } from 'react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/publicCms'
import { useUserAuth } from '@/contexts/UserAuthContext'

type Post = {
  id: string
  title: string
  body: string
  category: string
  type: string
  published_at: string
  featured: boolean
}

export function FeedPage() {
  const { t } = useLanguage()
  const e = t.editorial
  const { user, session } = useUserAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [warning, setWarning] = useState('')
  const [comment, setComment] = useState<Record<string, string>>({})

  useEffect(() => {
    void trackEvent('feed_view', '/feed')
    fetch('/api/public/feed')
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts || [])
        if (d.warning) setWarning(d.warning)
      })
      .catch(() => setWarning(e.feedError))
  }, [e.feedError])

  return (
    <MarketingChrome>
      <SeoHead title={`${e.feedTitle} | LitxTech`} description={e.feedLead} path="/feed" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{t.nav.insights}</p>
          <h1 className="ltx-h1 mt-4">{e.feedTitle}</h1>
          <p className="ltx-lead mt-4 max-w-2xl">{e.feedLead}</p>
        </div>
      </section>

      <section className="ltx-container py-14">
        {warning && <p className="text-sm text-amber-200">{warning}</p>}
        {!posts.length && !warning && <p className="text-sm text-slate-500">{e.feedEmpty}</p>}

        <div className="space-y-5">
          {posts.map((post) => (
            <article key={post.id} className="ltx-card p-6">
              <p className="text-[11px] uppercase tracking-[0.14em] text-sky-300/80">{post.category}</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-slate-300">{post.body}</p>
              <p className="mt-4 text-[11.5px] text-slate-500">
                {post.published_at ? new Date(post.published_at).toLocaleString() : ''}
              </p>

              {user ? (
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(ev) => {
                    ev.preventDefault()
                    fetch('/api/public/feed', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session?.access_token || ''}`,
                      },
                      body: JSON.stringify({
                        post_id: post.id,
                        body: comment[post.id],
                        author_name: user.email,
                        user_id: user.id,
                      }),
                    })
                  }}
                >
                  <input
                    value={comment[post.id] || ''}
                    onChange={(ev) => setComment({ ...comment, [post.id]: ev.target.value })}
                    placeholder={e.comment}
                    className="ltx-field flex-1 !py-2"
                  />
                  <button className="ltx-btn-primary ltx-btn-sm" type="submit">
                    {e.commentSend}
                  </button>
                </form>
              ) : (
                <p className="mt-4 text-[12px] text-slate-500">{e.commentSignIn}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
