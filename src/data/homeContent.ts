import { dictionaries } from '@/i18n/copy'
import type { Lang } from '@/i18n/copy'

/**
 * Ana sayfa metinleri.
 *
 * Tüm görünür metin burada ve `src/i18n/copy.ts` içinde tanımlıdır — CMS'den
 * yalnızca bölüm sırası/görünürlüğü okunur, böylece seçilen dilin dışında
 * kelime ekrana gelmez.
 */
export type HomeContent = {
  hero: {
    title: string
    subtitle: string
    description: string
    primaryCta: string
    secondaryCta: string
    tertiaryCta: string
  }
  stats: { value: string; label: string }[]
  capabilities: { title: string; subtitle: string; items: string[] }
  process: { title: string; subtitle: string; steps: { title: string; desc: string }[] }
  why: { title: string; lead: string; items: string[] }
  faq: { title: string; items: { q: string; a: string }[] }
  finalCta: { title: string; subtitle: string; quote: string; whatsapp: string; demo: string }
  sections: {
    solutions: string
    solutionsLead: string
    projects: string
    projectsLead: string
  }
  /** Optional CMS-driven layout hints */
  sectionOrder?: string[]
  hiddenSections?: string[]
}

function build(lang: Lang): HomeContent {
  const h = dictionaries[lang].home
  const lists = dictionaries[lang].homeLists
  return {
    hero: {
      title: h.heroTitle,
      subtitle: h.heroSubtitle,
      description: h.heroDescription,
      primaryCta: h.ctaPrimary,
      secondaryCta: h.ctaSecondary,
      tertiaryCta: h.ctaTertiary,
    },
    stats: [],
    capabilities: {
      title: h.capabilitiesTitle,
      subtitle: h.capabilitiesSubtitle,
      items: lists.capabilities,
    },
    process: {
      title: h.processTitle,
      subtitle: h.processSubtitle,
      steps: lists.process,
    },
    why: {
      title: h.whyTitle,
      lead: h.whyLead,
      items: lists.why,
    },
    faq: {
      title: h.faqTitle,
      items: lists.faq,
    },
    finalCta: {
      title: h.finalTitle,
      subtitle: h.finalSubtitle,
      quote: h.finalQuote,
      whatsapp: h.finalWhatsapp,
      demo: h.finalSupport,
    },
    sections: {
      solutions: h.solutionsEyebrow,
      solutionsLead: h.solutionsLead,
      projects: h.projectsEyebrow,
      projectsLead: h.projectsLead,
    },
  }
}

export const homeContentByLang: Record<Lang, HomeContent> = {
  en: build('en'),
  tr: build('tr'),
}

/** English default — kept for admin fallback/serialisation. */
export const homeContent = homeContentByLang.en
