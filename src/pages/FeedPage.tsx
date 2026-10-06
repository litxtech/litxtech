import { useEffect, useState } from 'react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
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
      .catch(() => setWarning('Feed yüklenemedi.'))
  }, [])

  return (
    <MarketingChrome>
      <SeoHead title="Feed | LitxTech" description="Ürün, mühendislik ve şirket güncellemeleri." path="/feed" />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Editorial</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">LitxTech Feed</h1>
        <p className="mt-3 text-slate-400">Yayınlanan ürün notları, mühendislik yazıları ve şirket güncellemeleri.</p>
        {warning && <p className="mt-4 text-sm text-amber-200">{warning}</p>}
        {!posts.length && !warning && <p className="mt-10 text-slate-500">Henüz yayınlanmış gönderi yok.</p>}
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400">{post.category}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-slate-300">{post.body}</p>
              <p className="mt-4 text-xs text-slate-500">{post.published_at ? new Date(post.published_at).toLocaleString() : ''}</p>
              {user ? (
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
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
                    onChange={(e) => setComment({ ...comment, [post.id]: e.target.value })}
                    placeholder="Yorum"
                    className="flex-1 rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm"
                  />
                  <button className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950" type="submit">
                    Gönder
                  </button>
                </form>
              ) : (
                <p className="mt-4 text-xs text-slate-500">Yorum için giriş yapın.</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
