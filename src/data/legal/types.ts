import type { Lang } from '@/i18n/copy'

/** A single content block inside a legal section. */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'sub'; title: string; blocks: LegalBlock[] }

export type LegalSection = {
  /** Anchor id, also used by the table of contents */
  id: string
  title: string
  blocks: LegalBlock[]
}

export type LegalDoc = {
  /** Short badge above the title */
  eyebrow: string
  title: string
  /** One-paragraph plain-language summary */
  summary: string
  /** Version identifier shown in the hero meta row */
  version: string
  effective: string
  updated: string
  sections: LegalSection[]
}

export type LegalDocSet = Record<Lang, LegalDoc>

export const p = (text: string): LegalBlock => ({ type: 'p', text })

export const ul = (...items: string[]): LegalBlock => ({ type: 'list', items })

export const sub = (title: string, ...blocks: LegalBlock[]): LegalBlock => ({
  type: 'sub',
  title,
  blocks,
})
