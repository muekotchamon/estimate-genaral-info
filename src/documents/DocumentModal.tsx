import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { estimateRecord as e } from '../estimate-detail/data'
import { useDocumentModal } from './document-modal-context'
import { DOCUMENT_TITLES } from './docSlug'
import { JobDocumentBody } from './JobDocumentPage'

export function DocumentModal() {
  const { activeSlug, closeDocument } = useDocumentModal()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeSlug) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') closeDocument()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeSlug, closeDocument])

  useEffect(() => {
    if (!activeSlug) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('document-modal-open')
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove('document-modal-open')
    }
  }, [activeSlug])

  useEffect(() => {
    if (!activeSlug) return
    const prevTitle = document.title
    document.title = `${DOCUMENT_TITLES[activeSlug]} — ${e.customer.name}`
    return () => {
      document.title = prevTitle
    }
  }, [activeSlug])

  useEffect(() => {
    if (!activeSlug) return
    const t = window.setTimeout(() => {
      dialogRef.current?.focus()
    }, 0)
    return () => window.clearTimeout(t)
  }, [activeSlug])

  if (!activeSlug) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 px-3 py-6 sm:px-5 sm:py-8 print:static print:inset-auto print:block print:overflow-visible print:bg-white print:p-0"
      role="presentation"
    >
      <button
        type="button"
        className="fixed inset-0 z-0 cursor-default print:hidden"
        aria-label="Close document preview"
        onClick={closeDocument}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-modal-title"
        tabIndex={-1}
        className="relative z-10 flex w-full max-w-[min(100vw-1.5rem,220mm)] flex-col rounded-2xl border border-slate-200/90 bg-[#e8eaed] shadow-2xl print:m-0 print:max-w-none print:rounded-none print:border-0 print:bg-white print:shadow-none"
        onClick={(ev) => ev.stopPropagation()}
        onKeyDown={(ev) => {
          if (ev.key === 'Escape') closeDocument()
        }}
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-white/95 px-3 py-2.5 sm:px-4 print:hidden">
          <h2
            id="document-modal-title"
            className="min-w-0 text-sm font-semibold text-slate-900 sm:text-base"
          >
            {DOCUMENT_TITLES[activeSlug]}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center rounded-lg bg-[#C62828] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#B71C1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62828] sm:px-4 sm:text-sm"
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={closeDocument}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 pt-2 sm:px-3 print:overflow-visible print:p-0">
          <JobDocumentBody slug={activeSlug} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
