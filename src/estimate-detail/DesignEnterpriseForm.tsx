import type { ReactNode } from 'react'
import { useId } from 'react'
import { Mail, Phone } from 'lucide-react'
import { estimateRecord as e } from './data'
import { DocumentsList } from './DocumentsCard'
import { LeadReferralSection } from './LeadReferralCard'
import {
  InsuranceActiveSwitch,
  insuranceFieldClass,
  insuranceNotesClassCompact,
  useInsuranceForm,
} from './insurance-form-context'
import { MapPlaceholderCard } from './MapPlaceholderCard'
import {
  Card,
  FieldLabel,
  FieldValue,
  Shell,
  accent,
  btnHeaderSecondary,
  CustomerHeroMeta,
  customerEyebrow,
  GisHeroButton,
  GoogleMapsLinkButton,
  heroCardClass,
} from './shared'

function EnterpriseSection({
  step,
  title,
  description,
  className,
  headerClassName,
  bodyClassName,
  children,
}: {
  step: string
  title: string
  description: string
  className?: string
  headerClassName?: string
  bodyClassName?: string
  children: ReactNode
}) {
  const header =
    headerClassName ??
    'border-b border-slate-200/80 bg-slate-100/40 px-5 py-3 sm:px-6'
  const body = bodyClassName ?? 'p-5 sm:p-6'

  return (
    <section
      className={`overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)] ${className ?? ''}`}
    >
      <div className={header}>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-mono text-xs font-semibold text-[#F83B3B]">{step}</span>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className={body}>{children}</div>
    </section>
  )
}

function ReadonlyRow({
  label,
  value,
  labelAction,
}: {
  label: string
  value: string
  labelAction?: ReactNode
}) {
  if (labelAction) {
    return (
      <div className="space-y-1">
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <FieldValue>{value}</FieldValue>
      </div>
    )
  }
  return (
    <div className="grid gap-1 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-baseline sm:gap-6">
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>{value}</FieldValue>
    </div>
  )
}

export function DesignEnterpriseForm() {
  const switchId = useId()
  const { insuranceActive, visibleFields, setInsuranceField } = useInsuranceForm()

  return (
    <Shell>
      <header className="mb-4">
        <Card className={`p-5 sm:p-6 lg:p-8 ${heroCardClass}`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
            <div className="min-w-0 flex-1 lg:pr-4 xl:pr-6">
              <p className={customerEyebrow}>Estimate detail</p>
              <h1 className="mt-2 text-[2rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-[2.25rem] lg:text-[2.5rem]">
                {e.customer.name}
              </h1>
              <CustomerHeroMeta
                companyName={e.customer.companyName}
                billingAddress={e.customer.billingAddress}
              />
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a href={e.customer.phoneHref} className={`font-medium ${accent}`}>
                  {e.customer.phoneDisplay}
                </a>
                <a href={`mailto:${e.customer.email}`} className={`font-medium ${accent}`}>
                  {e.customer.email}
                </a>
              </div>
            </div>
            <div className="min-w-0 flex-[1.7] border-t border-slate-200/80 pt-6 lg:border-t-0 lg:border-x lg:border-slate-200/60 lg:px-3 lg:pt-0 xl:px-5">
              <div className="w-full min-w-0">
                <LeadReferralSection compact />
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2 lg:pl-3 lg:pt-0.5 xl:pl-5">
              <div className="flex flex-wrap justify-end gap-2">
                <a
                  href={e.customer.phoneHref}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium ${btnHeaderSecondary}`}
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  Call
                </a>
                <a
                  href={`mailto:${e.customer.email}`}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium ${btnHeaderSecondary}`}
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  Email
                </a>
              </div>
              <GisHeroButton address={e.project.address} />
            </div>
          </div>
        </Card>
      </header>

      <div className="mt-1 flex w-full flex-col gap-5">
        <EnterpriseSection
          step="01"
          title="Customer"
          description="Primary contact on file for this estimate."
        >
          <div className="space-y-5">
            <ReadonlyRow label="Full name" value={e.customer.name} />
            <ReadonlyRow label="Phone" value={e.customer.phoneDisplay} />
            <ReadonlyRow label="Email" value={e.customer.email} />
            <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-sm">
              <a href={e.customer.phoneHref} className={`font-medium ${accent}`}>
                Open dialer
              </a>
              <a href={`mailto:${e.customer.email}`} className={`font-medium ${accent}`}>
                Compose email
              </a>
            </div>
          </div>
        </EnterpriseSection>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch">
          <EnterpriseSection
            step="02"
            title="Project"
            description="Property and work classification."
          >
            <div className="space-y-5">
              <ReadonlyRow
                label="Service address"
                value={e.project.address}
                labelAction={<GoogleMapsLinkButton address={e.project.address} />}
              />
              <MapPlaceholderCard
                address={e.project.address}
                fallbackCoordinates={e.project.mapGeocodeFallback}
                mapFrameSize="tall"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <ReadonlyRow label="Property type" value={e.project.propertyType} />
                <ReadonlyRow label="Job type" value={e.project.jobType} />
                <ReadonlyRow label="Team" value={e.project.assignedTo} />
                <ReadonlyRow
                  label="Warranty"
                  value={`${e.project.warrantyYears} years`}
                />
              </div>
            </div>
          </EnterpriseSection>

          <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:min-h-0">
            <div className="flex shrink-0">
              <EnterpriseSection
                className="flex w-full min-w-0 shrink-0 flex-col"
                bodyClassName="px-4 py-3 sm:px-5 sm:py-3"
                step="03"
                title="Insurance"
                description="Claims, carrier contacts, and related notes."
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <InsuranceActiveSwitch id={switchId} />
                </div>
                {!insuranceActive ? (
                  <p className="mb-2 text-xs leading-snug text-slate-500 sm:text-sm" lang="en" translate="no">
                    No insurance data is shown until you enable Insurance active. Turn it on
                    to enter policy details and notes.
                  </p>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                    <div>
                      <FieldLabel htmlFor={`${switchId}-claim`}>
                        Claim number
                      </FieldLabel>
                      <input
                        id={`${switchId}-claim`}
                        type="text"
                        value={visibleFields.claimNumber}
                        onChange={(ev) =>
                          setInsuranceField('claimNumber', ev.target.value)
                        }
                        className={insuranceFieldClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${switchId}-agency`}>Agency</FieldLabel>
                      <input
                        id={`${switchId}-agency`}
                        type="text"
                        value={visibleFields.agency}
                        onChange={(ev) =>
                          setInsuranceField('agency', ev.target.value)
                        }
                        placeholder="e.g. State Farm"
                        className={insuranceFieldClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor={`${switchId}-agent`}>Agent name</FieldLabel>
                      <input
                        id={`${switchId}-agent`}
                        type="text"
                        value={visibleFields.agentName}
                        onChange={(ev) =>
                          setInsuranceField('agentName', ev.target.value)
                        }
                        className={insuranceFieldClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${switchId}-phone`}>
                        Agent phone
                      </FieldLabel>
                      <input
                        id={`${switchId}-phone`}
                        type="tel"
                        value={visibleFields.agentPhone}
                        onChange={(ev) =>
                          setInsuranceField('agentPhone', ev.target.value)
                        }
                        className={insuranceFieldClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${switchId}-email`}>
                        Agent email
                      </FieldLabel>
                      <input
                        id={`${switchId}-email`}
                        type="email"
                        value={visibleFields.agentEmail}
                        onChange={(ev) =>
                          setInsuranceField('agentEmail', ev.target.value)
                        }
                        className={insuranceFieldClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor={`${switchId}-notes`}>Notes</FieldLabel>
                      <textarea
                        id={`${switchId}-notes`}
                        value={visibleFields.notes}
                        onChange={(ev) => setInsuranceField('notes', ev.target.value)}
                        placeholder="Internal notes visible to your team…"
                        rows={2}
                        className={insuranceNotesClassCompact}
                      />
                    </div>
                  </div>
                )}
              </EnterpriseSection>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 overflow-y-auto">
              <EnterpriseSection
                className="flex min-h-0 h-full min-w-0 flex-1 flex-col"
                headerClassName="border-b border-slate-200/80 bg-slate-100/40 px-4 py-2 sm:px-5 sm:py-2.5"
                bodyClassName="px-4 py-3 sm:px-4 sm:py-3"
                step="04"
                title="Documents"
                description="Final Letter, Warranty Certificate, Completion Certificate (PDF)."
              >
                <DocumentsList dense />
              </EnterpriseSection>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
