import type { ReactNode } from 'react'
import { estimateRecord } from './data'
import { Card, GisHeroButton } from './shared'

type GisLayout = 'wide' | 'sidebar'

export function GisCard({
  className = '',
  layout = 'wide',
}: {
  className?: string
  /** sidebar: single column, tight — for narrow column beside Insurance/Documents */
  layout?: GisLayout
}) {
  const g = estimateRecord.gis
  const b = g.buildingFeatures
  const side = layout === 'sidebar'

  const labelCls = side
    ? 'text-[9px] font-medium uppercase tracking-[0.06em] text-slate-500'
    : 'text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500'
  const valueCls = side
    ? 'text-xs font-semibold leading-snug text-slate-900'
    : 'text-[13px] font-semibold leading-snug text-slate-900'
  const titlePb = side ? 'pb-1' : 'pb-1.5'
  const titlePt = side ? 'pt-2' : 'pt-3'
  const titleText = side ? 'text-[10px]' : 'text-[11px]'
  const rowPy = side ? 'py-1' : 'py-1.5'
  const cardPad = side ? 'p-2.5 sm:p-3' : 'p-3 sm:p-4'
  const headerMb = side ? 'mb-1.5 pb-1.5' : 'mb-2 pb-2'
  const moneyText = side ? 'text-base' : 'text-lg'
  const moneyBoxPy = side ? 'py-1.5 px-2' : 'py-2 px-2.5'

  function GisSubsectionTitle({
    children,
    className = '',
  }: {
    children: ReactNode
    className?: string
  }) {
    return (
      <h3
        className={`border-b border-slate-100 ${titlePb} ${titlePt} ${titleText} font-semibold text-slate-900 ${className}`}
      >
        {children}
      </h3>
    )
  }

  function GisFullRow({ label, value }: { label: string; value: string }) {
    return (
      <div className={`border-b border-slate-100/90 ${rowPy} last:border-b-0`}>
        <div className={labelCls}>{label}</div>
        <div className={`mt-0.5 ${valueCls}`}>{value}</div>
      </div>
    )
  }

  function GisHalf({
    label,
    value,
    className = '',
  }: {
    label: string
    value: string
    className?: string
  }) {
    return (
      <div className={`${rowPy} ${className}`}>
        <div className={labelCls}>{label}</div>
        <div className={`mt-0.5 ${valueCls}`}>{value}</div>
      </div>
    )
  }

  function GisRow2({
    left,
    right,
  }: {
    left: { label: string; value: string }
    right: { label: string; value: string }
  }) {
    if (side) {
      return (
        <div className="border-b border-slate-100/90">
          <GisHalf label={left.label} value={left.value} />
          <GisHalf
            label={right.label}
            value={right.value}
            className="border-t border-slate-50"
          />
        </div>
      )
    }
    return (
      <div className="grid grid-cols-1 border-b border-slate-100/90 sm:grid-cols-2 sm:gap-0">
        <GisHalf
          label={left.label}
          value={left.value}
          className="sm:border-r sm:border-slate-100 sm:pr-4"
        />
        <GisHalf label={right.label} value={right.value} className="sm:pl-4" />
      </div>
    )
  }

  const locationBlock = (
    <div>
      <GisSubsectionTitle className="pt-0">Location details</GisSubsectionTitle>
      <GisRow2
        left={{ label: 'County', value: g.location.county }}
        right={{ label: 'State', value: g.location.state }}
      />
      <GisRow2
        left={{ label: 'Zoning', value: g.location.zoning }}
        right={{ label: 'Elevation', value: g.location.elevation }}
      />
      <GisFullRow label="MSA" value={g.location.msa} />
      <GisFullRow label="Census tract" value={g.location.censusTract} />
      <GisFullRow label="Coordinates" value={g.location.coordinates} />
    </div>
  )

  const legalBlock = (
    <div>
      <GisSubsectionTitle>Legal &amp; parcel info</GisSubsectionTitle>
      <GisFullRow label="Parcel number" value={g.legal.parcelNumber} />
      <GisFullRow label="Legal description" value={g.legal.legalDescription} />
      <GisFullRow label="Lot number" value={g.legal.lotNumber} />
      <GisFullRow label="Block number" value={g.legal.blockNumber} />
      <GisFullRow label="Subdivision" value={g.legal.subdivision} />
      <GisFullRow label="Publication date" value={g.legal.publicationDate} />
      <GisFullRow label="Land use general" value={g.legal.landUseGeneral} />
    </div>
  )

  const propertyBlock = (
    <div>
      <GisSubsectionTitle>Property overview</GisSubsectionTitle>
      <GisRow2
        left={{ label: 'Property type', value: g.propertyOverview.propertyType }}
        right={{ label: 'Stories', value: g.propertyOverview.stories }}
      />
      <GisRow2
        left={{ label: 'Total rooms', value: g.propertyOverview.totalRooms }}
        right={{ label: 'Parking spaces', value: g.propertyOverview.parkingSpaces }}
      />
      <GisRow2
        left={{
          label: 'Bathrooms total',
          value: g.propertyOverview.bathroomsTotal,
        }}
        right={{
          label: 'Bathrooms partial',
          value: g.propertyOverview.bathroomsPartial,
        }}
      />
      <GisFullRow label="Land use" value={g.propertyOverview.landUse} />
      <GisFullRow label="Gross square feet" value={g.propertyOverview.grossSquareFeet} />
    </div>
  )

  const financialBlock = (
    <div>
      <GisSubsectionTitle className={side ? '' : 'pt-0'}>
        Financial details
      </GisSubsectionTitle>
      <div
        className={`mb-1.5 rounded-md border border-emerald-200/80 bg-emerald-50/90 ${moneyBoxPy}`}
      >
        <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
          Assessed value
        </p>
        <p
          className={`${moneyText} font-bold leading-tight tracking-tight text-emerald-900`}
        >
          {g.financial.assessedValue}
        </p>
      </div>
      <GisRow2
        left={{ label: 'Land value', value: g.financial.landValue }}
        right={{ label: 'Building value', value: g.financial.buildingValue }}
      />
      <GisRow2
        left={{
          label: 'Assessed improvement %',
          value: g.financial.assessedImprovementPct,
        }}
        right={{ label: 'Tax assess year', value: g.financial.taxAssessYear }}
      />
      <div
        className={`mt-1.5 rounded-md border border-orange-200/90 bg-orange-50/90 ${moneyBoxPy}`}
      >
        <p className="text-[9px] font-semibold uppercase tracking-wide text-orange-800">
          Annual tax (2024)
        </p>
        <p
          className={`${moneyText} font-bold leading-tight tracking-tight text-orange-900`}
        >
          {g.financial.annualTax2024}
        </p>
      </div>
    </div>
  )

  const buildingBlock = (
    <div>
      <GisSubsectionTitle>Building features</GisSubsectionTitle>
      <GisRow2
        left={{ label: 'Heating', value: b.heating }}
        right={{ label: 'Heat fuel', value: b.heatFuel }}
      />
      <GisRow2
        left={{ label: 'Air conditioning', value: b.airConditioning }}
        right={{ label: 'Fireplaces', value: b.fireplaces }}
      />
      <GisRow2
        left={{ label: 'Exterior walls', value: b.exteriorWalls }}
        right={{ label: 'Foundation', value: b.foundation }}
      />
      <GisRow2
        left={{ label: 'Roof cover', value: b.roofCover }}
        right={{ label: 'Roof frame', value: b.roofFrame }}
      />
      <GisRow2
        left={{ label: 'Construction type', value: b.constructionType }}
        right={{ label: 'Quality', value: b.quality }}
      />
    </div>
  )

  const ownerBlock = (
    <div>
      <GisSubsectionTitle>Owner information</GisSubsectionTitle>
      <GisFullRow label="Owner name" value={g.owner.ownerName} />
      <GisFullRow label="Ownership type" value={g.owner.ownershipType} />
      <GisFullRow label="Owner last name" value={g.owner.ownerLastName} />
      <GisFullRow label="Owner first name" value={g.owner.ownerFirstName} />
      <GisFullRow label="Mailing address" value={g.owner.mailingAddress} />
      <GisFullRow label="Mailing city" value={g.owner.mailingCity} />
      <GisFullRow label="Deed document book" value={g.owner.deedDocumentBook} />
      <GisFullRow label="Deed sale date" value={g.owner.deedSaleDate} />
    </div>
  )

  return (
    <Card
      className={`${cardPad} lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden ${className}`}
    >
      <div
        className={`flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-100 ${headerMb}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="h-3 w-[3px] shrink-0 rounded-full bg-[#F83B3B]"
            aria-hidden
          />
          <h2 className="text-xs font-semibold tracking-tight text-slate-900">GIS</h2>
        </div>
        <GisHeroButton
          address={estimateRecord.project.address}
          size="sm"
          className="!w-auto shrink-0"
        />
      </div>

      <div className="min-w-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain">
        {side ? (
          <div className="min-w-0">
            {locationBlock}
            {legalBlock}
            {propertyBlock}
            {financialBlock}
            {buildingBlock}
            {ownerBlock}
          </div>
        ) : (
          <div className="xl:grid xl:grid-cols-2 xl:gap-x-6">
            <div className="min-w-0">
              {locationBlock}
              {legalBlock}
              {propertyBlock}
            </div>
            <div className="min-w-0 max-xl:mt-1 max-xl:border-t max-xl:border-slate-100 max-xl:pt-3 xl:border-l xl:border-slate-100 xl:pl-6">
              {financialBlock}
              {buildingBlock}
              {ownerBlock}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
