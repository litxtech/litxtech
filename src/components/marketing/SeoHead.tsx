import { useEffect } from 'react'

type SeoHeadProps = {
  title: string
  description?: string
  path?: string
}

const SITE_ORIGIN = 'https://www.litxtech.com'

export function SeoHead({ title, description, path = '' }: SeoHeadProps) {
  useEffect(() => {
    document.title = title

    const ensureMeta = (name: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      return el
    }

    if (description) {
      ensureMeta('description').setAttribute('content', description)
      ensureMeta('og:description', 'property').setAttribute('content', description)
    }
    ensureMeta('og:title', 'property').setAttribute('content', title)
    const url = `${SITE_ORIGIN}${path}`
    ensureMeta('og:url', 'property').setAttribute('content', url)
  }, [title, description, path])

  return null
}
