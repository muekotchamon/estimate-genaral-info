export const DOCUMENT_SLUGS = [
  'final-letter',
  'warranty-certificate',
  'completion-certificate',
] as const

export type DocumentSlug = (typeof DOCUMENT_SLUGS)[number]

export const DOCUMENT_TITLES: Record<DocumentSlug, string> = {
  'final-letter': 'Final Letter',
  'warranty-certificate': 'Warranty Certificate',
  'completion-certificate': 'Completion Certificate',
}

export function isDocumentSlug(s: string): s is DocumentSlug {
  return (DOCUMENT_SLUGS as readonly string[]).includes(s)
}
