import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'

type Post = {
  slug: string
  title: string
  excerpt?: string | null
  published_at?: string | null
  category?: string | null
}

export function BlogPage() {
  const { t } = useLanguage()
  const e = t.editorial
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
        title={`${t.nav.blog} | LitxTech`}
        description={e.blogLead}
        path="/blog"
        robots={posts.length ? 'index, follow' : 'noindex, follow'}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container relative py-16 sm:py-20">
          <p className="ltx-eyebrow">{t.nav.blog}</p>
          <h1 className="ltx-h1 mt-4">{e.blogTitle}</h1>
          <p className="ltx-lead mt-4 max-w-2xl">{e.blogLead}</p>
        </div>
      </section>

      <section className="ltx-container py-14">
        {ready && !posts.length && <p className="text-sm text-slate-500">{e.blogEmpty}</p>}

        <div className="grid gap-3">
          {posts.map((post) => (
            <article key={post.slug} className="ltx-card-interactive p-6">
              {post.category && (
                <p className="text-[11px] uppercase tracking-[0.14em] text-sky-300/80">{post.category}</p>
              )}
              <h2 className="mt-2 font-display text-xl font-semibold text-white">
                <Link to={`/blog/${post.slug}`} className="transition hover:text-sky-200">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{post.excerpt}</p>}
              <Link
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-300 transition hover:text-sky-200"
                to={`/blog/${post.slug}`}
              >
                {e.readPost}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </MarketingChrome>
  )
}
