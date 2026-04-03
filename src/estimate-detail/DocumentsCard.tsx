import { FileText } from 'lucide-react'
import { useDocumentModal } from '../documents/document-modal-context'
import { isDocumentSlug } from '../documents/docSlug'
import { estimateRecord as e } from './data'

/** Display order: Final Letter, Warranty Certificate, Completion Certificate */
const DOCUMENT_ORDER = [
  'final-letter',
  'warranty-certificate',
  'completion-certificate',
] as const

function documentsInOrder() {
  const byId = new Map(e.documents.map((d) => [d.id, d]))
  return DOCUMENT_ORDER.map((id) => byId.get(id)).filter(
    (d): d is (typeof e.documents)[number] => d != null,
  )
}

const pdfButtonClass =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#E02E2E] transition hover:border-[#F83B3B]/35 hover:bg-red-50 hover:text-[#C62828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] sm:px-3.5 sm:py-2 sm:text-[13px]'

const pdfButtonClassDense =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#E02E2E] transition hover:border-[#F83B3B]/35 hover:bg-red-50 hover:text-[#C62828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] sm:px-3 sm:py-2 sm:text-xs'

export function DocumentsList({ dense }: { dense?: boolean }) {
  const { openDocument } = useDocumentModal()
  const ordered = documentsInOrder()
  const rowGap = dense ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-5'
  const iconBox = dense
    ? 'h-9 w-9 rounded-xl sm:h-10 sm:w-10'
    : 'h-11 w-11 rounded-xl sm:h-12 sm:w-12'
  const iconSz = dense ? 'h-4 w-4 sm:h-[18px] sm:w-[18px]' : 'h-5 w-5 sm:h-6 sm:w-6'
  const titleCls = dense
    ? 'min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-900 sm:text-[15px]'
    : 'min-w-0 flex-1 text-base font-semibold leading-snug text-slate-900 sm:text-[17px]'

  return (
    <div role="list" aria-label="Estimate documents" className="flex flex-col">
      {ordered.map((doc) => (
        <div
          key={doc.id}
          role="listitem"
          className={`flex w-full min-w-0 max-w-full items-center border-b border-slate-100 py-3.5 last:border-b-0 sm:py-4 ${rowGap}`}
        >
          <div
            className={`flex shrink-0 items-center justify-center bg-red-50 text-[#D32F2F] ${iconBox}`}
          >
            <FileText className={iconSz} strokeWidth={1.75} aria-hidden />
          </div>
          <span className={titleCls}>{doc.title}</span>
          <button
            type="button"
            className={dense ? pdfButtonClassDense : pdfButtonClass}
            aria-label={`Open ${doc.title} — print or save as PDF`}
            onClick={() => {
              if (isDocumentSlug(doc.id)) openDocument(doc.id)
            }}
          >
            PDF
          </button>
        </div>
      ))}
    </div>
  )
}
