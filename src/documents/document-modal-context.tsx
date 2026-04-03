import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { DocumentSlug } from './docSlug'

type DocumentModalContextValue = {
  openDocument: (slug: DocumentSlug) => void
  closeDocument: () => void
  activeSlug: DocumentSlug | null
}

const DocumentModalContext = createContext<DocumentModalContextValue | null>(null)

export function DocumentModalProvider({ children }: { children: ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<DocumentSlug | null>(null)

  const openDocument = useCallback((slug: DocumentSlug) => {
    setActiveSlug(slug)
  }, [])

  const closeDocument = useCallback(() => {
    setActiveSlug(null)
  }, [])

  const value = useMemo(
    () => ({ openDocument, closeDocument, activeSlug }),
    [openDocument, closeDocument, activeSlug],
  )

  return (
    <DocumentModalContext.Provider value={value}>
      {children}
    </DocumentModalContext.Provider>
  )
}

export function useDocumentModal() {
  const ctx = useContext(DocumentModalContext)
  if (!ctx) {
    throw new Error('useDocumentModal must be used within DocumentModalProvider')
  }
  return ctx
}
