import { estimateRecord as e } from './data'

type LeadReferralSectionProps = {
  className?: string
  compact?: boolean
}

function SourceBlock({
  label,
  value,
  compact,
}: {
  label: string
  value: string
  compact: boolean
}) {
  return (
    <div
      className={
        compact
          ? 'min-w-0 rounded-lg border border-slate-200/70 bg-white/90 px-2.5 py-2 shadow-[0_1px_0_rgba(15,23,42,0.03)] lg:px-3.5 lg:py-2.5 xl:px-4'
          : 'min-w-0 rounded-xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm'
      }
    >
      <p
        className={
          compact
            ? 'text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500'
            : 'text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500'
        }
      >
        {label}
      </p>
      <p
        className={
          compact
            ? 'mt-1 text-sm font-semibold leading-snug text-slate-900'
            : 'mt-1.5 text-[15px] font-semibold leading-snug text-slate-900'
        }
      >
        {value}
      </p>
    </div>
  )
}

export function LeadReferralSection({
  className = '',
  compact = false,
}: LeadReferralSectionProps) {
  const { primarySource, secondarySource, referralDetails } = e.leadReferral
  const secondaryTrimmed = secondarySource.trim()
  const secondaryDisplay = secondaryTrimmed !== '' ? secondaryTrimmed : '—'

  /** Primary | Secondary | Referral — one row from lg; stacked on small screens */
  const gridClass = compact
    ? 'grid min-w-0 w-full grid-cols-1 items-stretch gap-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.15fr)_minmax(0,1.95fr)] lg:gap-x-4 xl:gap-x-6'
    : 'grid w-full grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.85fr)] lg:gap-5 xl:gap-6'

  const referralBoxClass = compact
    ? 'flex min-h-0 min-w-0 flex-col rounded-lg border border-dashed border-slate-200/90 bg-gradient-to-b from-slate-50/80 to-[#FFFAFA]/60 px-2.5 py-2.5 lg:h-full lg:px-4 lg:py-3 xl:px-4 xl:py-3.5'
    : 'flex min-h-0 min-w-0 flex-col rounded-xl border border-dashed border-slate-200/90 bg-gradient-to-b from-slate-50/60 to-[#FFFAFA]/70 px-4 py-3.5 lg:h-full'

  return (
    <div className={className}>
      <div
        className={
          compact
            ? 'mb-3 flex items-center gap-2 border-b border-slate-200/70 pb-2.5'
            : 'mb-4 flex items-center gap-2.5 border-b border-slate-200/80 pb-4'
        }
      >
        <span
          className="h-4 w-[3px] shrink-0 rounded-full bg-[#F83B3B]"
          aria-hidden
        />
        <h2
          className={
            compact
              ? 'text-sm font-semibold tracking-tight text-slate-900'
              : 'text-base font-semibold tracking-tight text-slate-900'
          }
        >
          Lead &amp; Referral
        </h2>
      </div>

      <div className={gridClass}>
        <SourceBlock label="Primary source" value={primarySource} compact={compact} />
        <SourceBlock label="Secondary source" value={secondaryDisplay} compact={compact} />

        <div className={referralBoxClass}>
          <p
            className={
              compact
                ? 'text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'
                : 'text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500'
            }
          >
            Referral information
          </p>
          {referralDetails ? (
            <p
              className={
                compact
                  ? 'mt-1.5 flex-1 text-xs leading-relaxed text-slate-600'
                  : 'mt-2 flex-1 text-sm leading-relaxed text-slate-700'
              }
            >
              {referralDetails}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
