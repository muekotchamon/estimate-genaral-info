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
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#E02E2E] transition hover:border-[#F83B3B]/35 hover:bg-red-50 hover:text-[#C62828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B]'

export function DocumentsList({ dense }: { dense?: boolean }) {
  const { openDocument } = useDocumentModal()
  const ordered = documentsInOrder()
  const gap = dense ? 'gap-1.5' : 'gap-2'
  const iconBox = dense ? 'h-6 w-6 rounded-lg' : 'h-7 w-7 rounded-xl'
  const iconSz = dense ? 'h-3 w-3' : 'h-3.5 w-3.5'
  const titleCls = dense
    ? 'whitespace-nowrap text-[12px] font-semibold text-slate-900'
    : 'whitespace-nowrap text-[13px] font-semibold text-slate-900'

  return (
    <div
      role="list"
      aria-label="Estimate documents"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4"
    >
      {ordered.map((doc) => (
        <div
          key={doc.id}
          role="listitem"
          className={`flex min-w-0 max-w-full items-center ${gap}`}
        >
          <div
            className={`flex shrink-0 items-center justify-center bg-red-50 text-[#D32F2F] ${iconBox}`}
          >
            <FileText className={iconSz} strokeWidth={1.75} aria-hidden />
          </div>
          <span className={titleCls}>{doc.title}</span>
          <button
            type="button"
            className={pdfButtonClass}
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
