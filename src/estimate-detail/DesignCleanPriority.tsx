import { useId } from 'react'
import { Building2, Briefcase, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react'
import { estimateRecord as e } from './data'
import { DocumentsList } from './DocumentsCard'
import { LeadReferralSection } from './LeadReferralCard'
import { GisCard } from './GisCard'
import { MapPlaceholderCard } from './MapPlaceholderCard'
import {
  InsuranceActiveSwitch,
  insuranceFieldClass,
  insuranceNotesClassCompact,
  useInsuranceForm,
} from './insurance-form-context'
import {
  Card,
  FieldLabel,
  FieldValue,
  SectionTitle,
  Shell,
  accent,
  btnHeaderSecondary,
  CustomerHeroMeta,
  customerEyebrow,
  GoogleMapsLinkButton,
  heroCardClass,
} from './shared'

export function DesignCleanPriority() {
  const switchId = useId()
  const { insuranceActive, visibleFields, setInsuranceField } = useInsuranceForm()

  return (
    <Shell>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="mb-4 shrink-0">
        <Card className={`overflow-hidden p-5 sm:p-6 lg:p-8 ${heroCardClass}`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
            <div className="min-w-0 flex-1 lg:pr-4 xl:pr-6">
              <p className={customerEyebrow}>Customer</p>
              <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-[2rem] lg:text-[2.125rem]">
                {e.customer.name}
              </h1>
              <CustomerHeroMeta
                companyName={e.customer.companyName}
                billingAddress={e.customer.billingAddress}
              />
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <a
                  href={e.customer.phoneHref}
                  className={`inline-flex items-center gap-2 font-medium ${accent}`}
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#F83B3B]/80" strokeWidth={1.75} />
                  {e.customer.phoneDisplay}
                </a>
                <a
                  href={`mailto:${e.customer.email}`}
                  className={`inline-flex items-center gap-2 font-medium ${accent}`}
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#F83B3B]/80" strokeWidth={1.75} />
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
            </div>
          </div>
        </Card>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto overscroll-y-contain lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.35fr)] lg:grid-rows-1 lg:items-stretch lg:gap-4 lg:overflow-hidden xl:gap-5">
        <Card className="flex min-h-0 flex-col overflow-hidden p-5 sm:p-6 lg:h-full lg:max-h-full">
          <div className="shrink-0">
            <SectionTitle>Project</SectionTitle>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="space-y-4">
            <div>
              <FieldLabel
                action={<GoogleMapsLinkButton address={e.project.address} />}
              >
                Address
              </FieldLabel>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#D32F2F]">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <FieldValue>{e.project.address}</FieldValue>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <FieldLabel>Property type</FieldLabel>
                <div className="flex items-center gap-2">
                  <Building2
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <FieldValue>{e.project.propertyType}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Job type</FieldLabel>
                <div className="flex items-center gap-2">
                  <Briefcase
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <FieldValue>{e.project.jobType}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Team</FieldLabel>
                <div className="flex items-center gap-2">
                  <User
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <FieldValue>{e.project.assignedTo}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Warranty</FieldLabel>
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <FieldValue>{e.project.warrantyYears} years</FieldValue>
                </div>
              </div>
            </div>
            <MapPlaceholderCard
              address={e.project.address}
              fallbackCoordinates={e.project.mapGeocodeFallback}
            />
          </div>
          </div>
        </Card>

        <div className="flex min-h-0 flex-col gap-3 lg:h-full lg:max-h-full lg:min-h-0">
          <Card className="flex w-full min-w-0 shrink-0 flex-col p-3 sm:p-4">
            <SectionTitle action={<InsuranceActiveSwitch id={switchId} compact />}>
              Insurance
            </SectionTitle>
            {!insuranceActive ? (
              <p className="mb-2 text-xs leading-snug text-slate-500 sm:text-sm" lang="en" translate="no">
                No insurance data is shown until you enable{' '}
                <span className="font-medium text-slate-600">Insurance active</span>. Turn it
                on to enter policy details and notes.
              </p>
            ) : (
              <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                <div>
                  <FieldLabel htmlFor={`${switchId}-claim`}>Claim number</FieldLabel>
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
                    onChange={(ev) => setInsuranceField('agency', ev.target.value)}
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
                  <FieldLabel htmlFor={`${switchId}-phone`}>Agent phone</FieldLabel>
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
                  <FieldLabel htmlFor={`${switchId}-email`}>Agent email</FieldLabel>
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
                    placeholder="Claim context, coverage limits, visit preferences…"
                    rows={2}
                    className={insuranceNotesClassCompact}
                  />
                </div>
              </div>
            )}
          </Card>

          <Card className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-3 sm:p-4">
            <SectionTitle>Documents</SectionTitle>
            <p className="mb-1 text-[11px] leading-snug text-slate-500">
              Final Letter, Warranty Certificate, Completion Certificate (PDF).
            </p>
            <DocumentsList dense />
          </Card>
        </div>

        <div className="min-h-0 min-w-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden lg:overscroll-contain">
          <GisCard />
        </div>
      </div>
      </div>
    </Shell>
  )
}
