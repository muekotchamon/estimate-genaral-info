import type { ReactNode } from 'react'
import { estimateRecord as e } from '../estimate-detail/data'
import { companyLetterhead, publicAsset } from './branding'
import { DocumentFooter, DocumentHeader, DocumentMain } from './DocumentChrome'
import { type DocumentSlug } from './docSlug'

function formatLetterDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function Paper({ children }: { children: ReactNode }) {
  return (
    <article
      className="doc-paper mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col bg-white text-[13px] leading-relaxed text-slate-800 shadow-lg shadow-slate-300/80 print:mx-0 print:min-h-0 print:max-w-none print:shadow-none"
      style={{ fontFamily: '"Source Serif 4", "Georgia", serif' }}
    >
      {children}
    </article>
  )
}

function FinalLetter({ jobNumber }: { jobNumber: string }) {
  const today = formatLetterDate()
  const addr = e.project.address

  return (
    <>
      <DocumentHeader jobNumber={jobNumber} />
      <DocumentMain>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Job address</p>
            <p className="mt-1 font-medium text-slate-900">{addr}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Billing address
            </p>
            <p className="mt-1 font-medium text-slate-900">{addr}</p>
          </div>
        </div>
        <p className="mt-10 text-base font-bold text-slate-900">{today}</p>
        <p className="mt-6">Dear {e.customer.name},</p>
        <p className="mt-4">
          Thank you for choosing {companyLetterhead.name}. Enclosed please find your project receipt
          and documentation for your records, including coverage under our{' '}
          <span className="font-semibold" style={{ color: companyLetterhead.red }}>
            Klaus Larsen Workmanship Warranty
          </span>
          . We appreciate your trust in our team.
        </p>
        <p className="mt-4">
          Should you have any questions about your roof, warranty, or future service, please contact
          us at {companyLetterhead.phone} or visit {companyLetterhead.website}.
        </p>
        <p className="mt-8">Sincerely yours,</p>
        <div className="mt-10 max-w-xs border-t border-slate-300 pt-4">
          <p className="font-semibold text-slate-900">Klaus Larsen</p>
          <p className="text-slate-600">Owner</p>
        </div>
      </DocumentMain>
      <DocumentFooter />
    </>
  )
}

function CompletionCertificate({ jobNumber }: { jobNumber: string }) {
  const addr = e.project.address
  const proposal = e.id

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-0 w-0 border-b-[52px] border-l-[52px] border-b-transparent sm:border-b-[56px] sm:border-l-[56px] print:border-l-[64px]"
        style={{ borderLeftColor: companyLetterhead.red }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-0 w-0 border-r-[52px] border-t-[52px] border-t-transparent sm:border-r-[56px] sm:border-t-[56px] print:border-r-[64px]"
        style={{ borderRightColor: companyLetterhead.red }}
        aria-hidden
      />
      <DocumentHeader
        jobNumber={jobNumber}
        documentSubtitle="Official project record"
        documentTitle="Certificate of completion"
      />
      <DocumentMain>
        <p className="text-justify">
          This certifies that the roofing work described in{' '}
          <strong>Proposal# {proposal}</strong> for the property at <strong>{addr}</strong> has been
          completed to the customer&apos;s satisfaction in accordance with the agreed scope of work and
          applicable codes.
        </p>
        <p className="mt-6">
          <strong>Notice to owner:</strong> Do not sign this certificate until all work is complete
          and you have inspected the job. Your signature acknowledges satisfactory completion.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">Customer signature</p>
            <div className="mt-8 border-b border-slate-800" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Date</p>
            <div className="mt-8 border-b border-slate-800" />
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-slate-600">
          Thank you for allowing us to serve you!
        </p>
      </DocumentMain>
      <DocumentFooter
        meta={
          <>
            <p className="font-semibold text-slate-900">Klaus Larsen</p>
            <p className="text-slate-600">Owner</p>
          </>
        }
      />
    </div>
  )
}

function CertificateCornerFlourishes() {
  const L = 'pointer-events-none absolute border-slate-900'
  return (
    <>
      <div className={`${L} left-2 top-2 h-8 w-8 border-l-[3px] border-t-[3px] sm:left-3 sm:top-3`} aria-hidden />
      <div className={`${L} right-2 top-2 h-8 w-8 border-r-[3px] border-t-[3px] sm:right-3 sm:top-3`} aria-hidden />
      <div className={`${L} bottom-2 left-2 h-8 w-8 border-b-[3px] border-l-[3px] sm:bottom-3 sm:left-3`} aria-hidden />
      <div className={`${L} bottom-2 right-2 h-8 w-8 border-b-[3px] border-r-[3px] sm:bottom-3 sm:right-3`} aria-hidden />
    </>
  )
}

function WarrantyCertificate({ jobNumber }: { jobNumber: string }) {
  const addr = e.project.address
  const printed = formatLetterDate()
  const logoSrc = publicAsset('Logo.png')

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f7f5f0] p-2.5 sm:p-3 print:bg-[#faf9f6]">
      <div className="relative flex min-h-0 flex-1 flex-col border-2 border-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
        <CertificateCornerFlourishes />
        <div className="relative z-[1] m-2 flex min-h-0 flex-1 flex-col border-4 border-double border-slate-900 bg-white sm:m-2.5">
          {/* Certificate-style header (centered, formal) */}
          <header className="relative shrink-0 border-b-2 border-slate-200 bg-gradient-to-b from-amber-50/40 to-white px-4 pb-5 pt-6 text-center sm:px-8 sm:pb-6 sm:pt-8">
            <p className="mb-3 text-[11px] font-semibold tracking-wide text-slate-700 sm:absolute sm:right-6 sm:top-5 sm:mb-0 sm:text-right sm:text-xs">
              Job# {jobNumber}
            </p>
            <div className="mx-auto mb-4 flex max-w-[140px] justify-center sm:max-w-[160px]">
              <img
                src={logoSrc}
                alt=""
                className="h-auto w-full object-contain"
              />
            </div>
            <p
              className="font-serif text-lg italic text-slate-700 sm:text-xl"
              style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
            >
              Certificate of Warranty
            </p>
            <div className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-2 text-slate-400">
              <span className="text-xs" aria-hidden>
                ✶
              </span>
              <span className="h-px flex-1 max-w-[6rem] bg-slate-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                Official
              </span>
              <span className="h-px flex-1 max-w-[6rem] bg-slate-300" />
              <span className="text-xs" aria-hidden>
                ✶
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold uppercase tracking-[0.2em] text-slate-900 sm:text-3xl sm:tracking-[0.24em]">
              50-Year
            </h1>
            <p
              className="mt-1 text-sm font-bold uppercase tracking-[0.28em] sm:text-base"
              style={{ color: companyLetterhead.red }}
            >
              Workmanship warranty
            </p>
            <p className="mx-auto mt-3 max-w-md text-[11px] leading-relaxed text-slate-600">
              {companyLetterhead.name} · {companyLetterhead.addressLine}
            </p>
          </header>

          <main className="min-h-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              This certifies that the following is registered under our warranty program
            </p>
            <div className="mx-auto mt-6 max-w-lg border-y border-slate-200 bg-slate-50/60 py-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Presented to
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">{e.customer.name}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{addr}</p>
            </div>

            <dl className="mx-auto mt-8 max-w-lg space-y-4">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Warranty start date
                </dt>
                <dd className="mt-1 border-b border-slate-400 pb-0.5 text-center text-base font-semibold text-slate-900">
                  {printed}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Job reference
                </dt>
                <dd className="mt-1 border-b border-slate-400 pb-0.5 text-center text-base font-semibold text-slate-900">
                  {jobNumber}
                </dd>
              </div>
            </dl>

            <p className="mx-auto mt-8 max-w-xl text-center text-[13px] leading-relaxed text-slate-700">
              This warranty covers workmanship-related leaks arising from installation performed by{' '}
              <span className="font-semibold text-slate-900">{companyLetterhead.name}</span>, subject
              to the full terms and conditions provided with your project packet. Coverage may be
              transferable to subsequent owners where allowed by policy. For service or questions,
              visit{' '}
              <strong className="text-slate-900">{companyLetterhead.website}</strong>.
            </p>

            <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <p className="max-w-sm text-center text-[9px] leading-snug text-slate-500 sm:text-left">
                Limitations and exclusions apply. This certificate does not replace manufacturer
                warranties or required maintenance. Retain this certificate with your property
                records.
              </p>
              <div className="relative flex shrink-0 flex-col items-center">
                <div
                  className="flex h-[7.5rem] w-[7.5rem] flex-col items-center justify-center rounded-full border-[5px] bg-gradient-to-b from-red-50 to-white text-center shadow-md sm:h-32 sm:w-32"
                  style={{ borderColor: companyLetterhead.red, color: companyLetterhead.red }}
                >
                  <span className="text-[9px] font-bold uppercase leading-tight">The Klaus</span>
                  <span className="text-[9px] font-bold uppercase leading-tight">Promise</span>
                  <span className="my-1.5 font-serif text-xl font-bold tracking-tight sm:text-2xl">
                    50
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Year</span>
                </div>
                <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                  Official seal
                </p>
              </div>
            </div>
          </main>

          <DocumentFooter note={<span>Printed date: {printed}</span>} />
        </div>
      </div>
    </div>
  )
}

/** Printable sheet (used inside {@link DocumentModal}). */
export function JobDocumentBody({ slug }: { slug: DocumentSlug }) {
  const jobNumber = e.id

  return (
    <Paper>
      {slug === 'final-letter' ? (
        <FinalLetter jobNumber={jobNumber} />
      ) : slug === 'completion-certificate' ? (
        <CompletionCertificate jobNumber={jobNumber} />
      ) : (
        <WarrantyCertificate jobNumber={jobNumber} />
      )}
    </Paper>
  )
}
