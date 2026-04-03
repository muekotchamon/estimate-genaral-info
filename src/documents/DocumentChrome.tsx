import type { ReactNode } from 'react'
import { companyLetterhead } from './branding'
import { LetterheadBlock } from './Letterhead'

/** Top band + letterhead (+ optional document title). */
export function DocumentHeader({
  jobNumber,
  documentTitle,
  documentSubtitle,
}: {
  jobNumber: string
  /** Large title under letterhead (certificates). */
  documentTitle?: string
  /** Small line above title, e.g. “Official record”. */
  documentSubtitle?: string
}) {
  return (
    <header
      className="relative shrink-0 border-b-4 bg-gradient-to-b from-slate-100/90 to-white print:border-b-4 print:from-white print:to-white"
      style={{ borderBottomColor: companyLetterhead.red }}
    >
      <div
        className="h-1.5 w-full sm:h-2"
        style={{ backgroundColor: companyLetterhead.red }}
        aria-hidden
      />
      <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
        <LetterheadBlock jobNumber={jobNumber} />
        {documentSubtitle || documentTitle ? (
          <div className="mt-5 border-t border-slate-200/90 pt-5 text-center">
            {documentSubtitle ? (
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {documentSubtitle}
              </p>
            ) : null}
            {documentTitle ? (
              <h1 className="mt-2 text-lg font-bold uppercase tracking-[0.14em] text-slate-900 sm:text-xl sm:tracking-[0.18em]">
                {documentTitle}
              </h1>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  )
}

/** Body column between header and footer. */
export function DocumentMain({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <main
      className={`min-h-0 flex-1 px-5 py-6 sm:px-7 sm:py-8 print:px-8 print:py-8 ${className}`}
    >
      {children}
    </main>
  )
}

function BrandSlogan({ compact }: { compact?: boolean }) {
  const accent = compact ? 'text-base' : 'text-lg sm:text-xl'
  return (
    <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-slate-800 sm:text-[11px]">
      Put a{' '}
      <span
        className={`font-serif italic normal-case tracking-normal ${accent}`}
        style={{ color: companyLetterhead.red }}
      >
        Klaus
      </span>{' '}
      on your{' '}
      <span
        className={`font-serif italic normal-case tracking-normal ${accent}`}
        style={{ color: companyLetterhead.red }}
      >
        House!
      </span>
    </p>
  )
}

/** Bottom band: optional lines + slogan + company tag. */
export function DocumentFooter({
  meta,
  note,
}: {
  /** Emphasis line(s) above the fine-print band (e.g. sign-off). */
  meta?: ReactNode
  /** Small muted text (printed date, legal). */
  note?: ReactNode
}) {
  return (
    <footer
      className="mt-auto shrink-0 border-t-4 bg-gradient-to-b from-white to-slate-100/90 px-5 py-5 sm:px-7 sm:py-6 print:border-t-4 print:from-white print:to-slate-50/80"
      style={{ borderTopColor: companyLetterhead.red }}
    >
      {meta ? <div className="mb-3 text-center text-[13px] text-slate-800">{meta}</div> : null}
      {note ? (
        <div className="mb-4 text-center text-[10px] leading-snug text-slate-500">{note}</div>
      ) : null}
      <div className="border-t border-slate-200/90 pt-4">
        <BrandSlogan />
      </div>
      <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400">
        {companyLetterhead.name}
      </p>
    </footer>
  )
}
