import { useId } from 'react'
import {
  Briefcase,
  Building2,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'
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
  Shell,
  accent,
  btnHeaderSecondary,
  CustomerHeroMeta,
  customerEyebrow,
  GoogleMapsLinkButton,
  heroCardClass,
} from './shared'

function Tile({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Building2
}) {
  return (
    <Card className="flex items-start gap-3 border-slate-200/60 p-4 sm:p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#D32F2F]">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </Card>
  )
}

export function DesignSaasDashboard() {
  const switchId = useId()
  const { insuranceActive, visibleFields, setInsuranceField } = useInsuranceForm()

  return (
    <Shell>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="mb-4 shrink-0">
        <Card className={`overflow-hidden p-0 ${heroCardClass}`}>
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
              <div className="min-w-0 flex-1 lg:pr-4 xl:pr-6">
                <p className={customerEyebrow}>Customer</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[2rem] lg:text-4xl">
                  {e.customer.name}
                </h1>
                <CustomerHeroMeta
                  companyName={e.customer.companyName}
                  billingAddress={e.customer.billingAddress}
                />
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <a
                    href={e.customer.phoneHref}
                    className={`inline-flex items-center gap-1.5 ${accent}`}
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                    {e.customer.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${e.customer.email}`}
                    className={`inline-flex items-center gap-1.5 ${accent}`}
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                    {e.customer.email}
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-[1.7] border-t border-slate-100/90 pt-6 lg:border-t-0 lg:border-x lg:border-slate-200/60 lg:px-3 lg:pt-0 xl:px-5">
                <div className="w-full min-w-0">
                  <LeadReferralSection compact />
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 lg:pl-3 lg:pt-0.5 xl:pl-5">
                <div className="flex flex-wrap justify-end gap-2">
                  <a
                    href={e.customer.phoneHref}
                    className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium ${btnHeaderSecondary}`}
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                    Call
                  </a>
                  <a
                    href={`mailto:${e.customer.email}`}
                    className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium ${btnHeaderSecondary}`}
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100/90 bg-slate-100/35 px-5 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-4">
              <Tile label="Job type" value={e.project.jobType} icon={Briefcase} />
              <Tile label="Property" value={e.project.propertyType} icon={Building2} />
              <Tile label="Team" value={e.project.assignedTo} icon={User} />
              <Tile
                label="Warranty"
                value={`${e.project.warrantyYears} years`}
                icon={ShieldCheck}
              />
              <Tile label="Estimate" value={e.id} icon={Hash} />
            </div>
          </div>
        </Card>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto overscroll-y-contain lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.35fr)] lg:grid-rows-1 lg:items-stretch lg:gap-4 lg:overflow-hidden xl:gap-5">
        <Card className="flex min-h-0 flex-col overflow-hidden p-0 lg:h-full lg:max-h-full">
          <div className="shrink-0 border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Project location</h2>
            <p className="mt-0.5 text-xs text-slate-500">Service address &amp; site context</p>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain p-5">
            <div className="shrink-0 flex gap-3 rounded-xl bg-slate-50 p-4">
              <MapPin className="h-5 w-5 shrink-0 text-[#F83B3B]" strokeWidth={1.75} />
              <div className="min-w-0 flex-1">
                <FieldLabel
                  action={<GoogleMapsLinkButton address={e.project.address} />}
                >
                  Address
                </FieldLabel>
                <FieldValue className="mt-1">{e.project.address}</FieldValue>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <FieldLabel>Property type</FieldLabel>
                <div className="mt-1 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" strokeWidth={1.75} aria-hidden />
                  <FieldValue>{e.project.propertyType}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Job type</FieldLabel>
                <div className="mt-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" strokeWidth={1.75} aria-hidden />
                  <FieldValue>{e.project.jobType}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Team</FieldLabel>
                <div className="mt-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" strokeWidth={1.75} aria-hidden />
                  <FieldValue>{e.project.assignedTo}</FieldValue>
                </div>
              </div>
              <div>
                <FieldLabel>Warranty</FieldLabel>
                <div className="mt-1 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-slate-400" strokeWidth={1.75} aria-hidden />
                  <FieldValue>{e.project.warrantyYears} years</FieldValue>
                </div>
              </div>
            </div>
            <MapPlaceholderCard
              address={e.project.address}
              fallbackCoordinates={e.project.mapGeocodeFallback}
              embedded
              fillInCard
            />
          </div>
        </Card>

        <div className="flex min-h-0 flex-col gap-3 lg:h-full lg:max-h-full lg:min-h-0">
          <Card className="flex w-full min-w-0 shrink-0 flex-col p-0">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 px-3 py-2 sm:px-4 sm:py-2.5">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Insurance</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Carrier, adjuster &amp; notes
                </p>
              </div>
              <InsuranceActiveSwitch id={switchId} compact />
            </div>
            {!insuranceActive ? (
              <p
                className="border-b border-slate-100 px-3 py-1.5 text-[11px] leading-snug text-slate-500 sm:px-4 sm:text-xs"
                lang="en"
                translate="no"
              >
                No insurance data is shown until you enable Insurance active. Turn it on to
                enter policy details and notes.
              </p>
            ) : (
              <div className="px-3 py-2 sm:px-4 sm:py-2.5">
                <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                  <div>
                    <label
                      htmlFor={`${switchId}-claim`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Claim number
                    </label>
                    <input
                      id={`${switchId}-claim`}
                      type="text"
                      value={visibleFields.claimNumber}
                      onChange={(ev) =>
                        setInsuranceField('claimNumber', ev.target.value)
                      }
                      className={`mt-1 ${insuranceFieldClass}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${switchId}-agency`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Agency
                    </label>
                    <input
                      id={`${switchId}-agency`}
                      type="text"
                      value={visibleFields.agency}
                      onChange={(ev) => setInsuranceField('agency', ev.target.value)}
                      placeholder="e.g. State Farm"
                      className={`mt-1 ${insuranceFieldClass}`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`${switchId}-agent`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Agent name
                    </label>
                    <input
                      id={`${switchId}-agent`}
                      type="text"
                      value={visibleFields.agentName}
                      onChange={(ev) =>
                        setInsuranceField('agentName', ev.target.value)
                      }
                      className={`mt-1 ${insuranceFieldClass}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${switchId}-phone`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Agent phone
                    </label>
                    <input
                      id={`${switchId}-phone`}
                      type="tel"
                      value={visibleFields.agentPhone}
                      onChange={(ev) =>
                        setInsuranceField('agentPhone', ev.target.value)
                      }
                      className={`mt-1 ${insuranceFieldClass}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${switchId}-email`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Agent email
                    </label>
                    <input
                      id={`${switchId}-email`}
                      type="email"
                      value={visibleFields.agentEmail}
                      onChange={(ev) =>
                        setInsuranceField('agentEmail', ev.target.value)
                      }
                      className={`mt-1 ${insuranceFieldClass}`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`${switchId}-notes`}
                      className="text-xs font-medium text-slate-500"
                    >
                      Notes
                    </label>
                    <textarea
                      id={`${switchId}-notes`}
                      value={visibleFields.notes}
                      onChange={(ev) => setInsuranceField('notes', ev.target.value)}
                      placeholder="Internal notes for this claim…"
                      rows={2}
                      className={`mt-1 ${insuranceNotesClassCompact}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-0">
            <div className="shrink-0 border-b border-slate-100 px-3 py-2">
              <h2 className="text-sm font-semibold text-slate-900">Documents</h2>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                Final Letter, Warranty Certificate, Completion Certificate (PDF).
              </p>
            </div>
            <div className="px-3 py-2">
              <DocumentsList dense />
            </div>
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
