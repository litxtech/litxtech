import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'

type Post = {
  slug: string
  title: string
  excerpt?: string | null
  published_at?: string | null
  category?: string | null
}

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch('/api/public/feed')
      .then((response) => response.json())
      .then((data) => setPosts(Array.isArray(data.posts) ? data.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setReady(true))
  }, [])

  return (
    <MarketingChrome>
      <SeoHead
        title="Blog | LitxTech"
        description="LitxTech blogunda yayınlanan yazılım, mobil uygulama ve dijital ürün yazıları. Taslak içerik listelenmez."
        path="/blog"
        robots={posts.length ? 'index, follow' : 'noindex, follow'}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">Yazılar</h1>
        <p className="mt-3 text-slate-400">
          Yalnızca admin panelinden yayınlanan yazılar listelenir. Taslaklar dizine eklenmez.
        </p>
        {ready && !posts.length && (
          <p className="mt-10 text-slate-500">Henüz yayınlanmış yazı yok.</p>
        )}
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              {post.category && <p className="text-xs uppercase tracking-wide text-slate-500">{post.category}</p>}
              <h2 className="mt-2 text-2xl font-semibold text-white">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt && <p className="mt-3 text-slate-300">{post.excerpt}</p>}
              <Link className="mt-4 inline-block text-sm text-cyan-300" to={`/blog/${post.slug}`}>
                Yazıyı oku
              </Link>
            </article>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
