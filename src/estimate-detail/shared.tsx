import type { ReactNode } from 'react'
import { MapPinned } from 'lucide-react'

/** Open this address in Google Maps (new tab). */
export function googleMapsUrlForAddress(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

/** Compact control next to an “Address” label */
export function GoogleMapsLinkButton({
  address,
  className = '',
}: {
  address: string
  className?: string
}) {
  return (
    <a
      href={googleMapsUrlForAddress(address)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open in Google Maps: ${address}`}
      title="Open in Google Maps"
      className={`ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200/90 bg-white text-[#D32F2F] shadow-sm transition hover:border-slate-300 hover:bg-red-50 hover:text-[#F83B3B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] ${className}`}
    >
      <MapPinned className="h-4 w-4" strokeWidth={2} aria-hidden />
    </a>
  )
}

/** Primary brand */
export const brandHex = '#F83B3B'
export const brandHexHover = '#E62E2E'

/** Links & inline actions — slightly softened vs pure hex on white */
export const accent =
  'text-[#E02E2E] hover:text-[#C62828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B]'

export const focusBrand =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B]'

/** Primary CTA */
export const btnPrimary =
  'bg-[#F83B3B] font-medium text-white shadow-md shadow-[#F83B3B]/25 transition hover:bg-[#E62E2E] hover:shadow-lg hover:shadow-[#F83B3B]/20 active:scale-[0.98] ' +
  focusBrand

/** Secondary header buttons */
export const btnHeaderSecondary =
  'border border-slate-300/70 bg-white font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:shadow ' +
  focusBrand

/**
 * Eyebrow above customer name — neutral text + brand bar (less red noise than full red type)
 */
export const customerEyebrow =
  'flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 before:block before:h-3 before:w-[3px] before:shrink-0 before:rounded-full before:bg-[#F83B3B] before:content-[""]'

/** Estimate / reference chip — calm surface, readable text */
export const estimateChip =
  'inline-flex items-center rounded-lg border border-slate-200/90 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm'

/** Subtle brand accent on chip (optional dot) — use inside chip if needed */
export const estimateChipAccent =
  'inline-flex items-center gap-2 rounded-lg border border-[#F83B3B]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#C62828] shadow-sm'

/** Hero / header card — same shell as other cards, subtle warm bottom wash (no red border) */
export const heroCardClass =
  'bg-gradient-to-b from-white via-white to-[#FFFAFA]'

/** Standard content cards on canvas */
export const contentCardClass =
  'rounded-[18px] border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_20px_-4px_rgba(15,23,42,0.07)]'

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F1F2F4] pb-3 pt-1">
      <div className="w-full px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`${contentCardClass} ${className}`}>{children}</div>
  )
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
      <h2 className="flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900">
        <span
          className="h-4 w-[3px] shrink-0 rounded-full bg-[#F83B3B]"
          aria-hidden
        />
        <span>{children}</span>
      </h2>
      {action}
    </div>
  )
}

export function FieldLabel({
  children,
  htmlFor,
  action,
}: {
  children: ReactNode
  htmlFor?: string
  /** Renders beside the label (e.g. Google Maps link for Address) */
  action?: ReactNode
}) {
  const textClass =
    'text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500'

  if (action) {
    return (
      <div className="mb-1.5 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
        {htmlFor ? (
          <label htmlFor={htmlFor} className={textClass}>
            {children}
          </label>
        ) : (
          <span className={textClass}>{children}</span>
        )}
        {action}
      </div>
    )
  }

  const className = `mb-1.5 block ${textClass}`
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
    )
  }
  return <div className={className}>{children}</div>
}

export function FieldValue({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`text-[15px] font-normal leading-relaxed text-slate-800 ${className}`}>
      {children}
    </div>
  )
}
