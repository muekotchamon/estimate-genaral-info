import { useId } from 'react'
import { Building2, Briefcase, Mail, MapPin, Phone, Save } from 'lucide-react'
import { estimateRecord as e } from './data'
import { MapPlaceholderCard } from './MapPlaceholderCard'
import {
  InsuranceActiveSwitch,
  insuranceFieldClass,
  insuranceNotesClass,
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
  btnPrimary,
  customerEyebrow,
  estimateChipAccent,
  GoogleMapsLinkButton,
  heroCardClass,
} from './shared'

export function DesignCleanPriority() {
  const switchId = useId()
  const { insuranceActive, visibleFields, setInsuranceField } = useInsuranceForm()
  const disabled = !insuranceActive

  return (
    <Shell>
      <header className="mb-4">
        <Card className={`overflow-hidden p-5 sm:p-6 lg:p-8 ${heroCardClass}`}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className={customerEyebrow}>Customer</p>
              <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-[2rem] lg:text-[2.125rem]">
                {e.customer.name}
              </h1>
              <p className="mt-3">
                <span className={estimateChipAccent}>Estimate {e.id}</span>
              </p>
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
            <div className="flex shrink-0 flex-wrap gap-2">
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
              <button
                type="button"
                className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium ${btnPrimary}`}
              >
                <Save className="h-4 w-4" strokeWidth={1.75} />
                Save
              </button>
            </div>
          </div>
        </Card>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
        <Card className="flex h-full flex-col p-5 sm:p-6">
          <SectionTitle>Project</SectionTitle>
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
            <MapPlaceholderCard
              address={e.project.address}
              fallbackCoordinates={e.project.mapGeocodeFallback}
            />
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </div>
        </Card>

        <Card className="flex h-full flex-col p-5 sm:p-6">
          <SectionTitle action={<InsuranceActiveSwitch id={switchId} compact />}>
            Insurance
          </SectionTitle>
          {!insuranceActive ? (
            <p className="mb-4 text-sm text-slate-500" lang="en" translate="no">
              No insurance data is shown until you enable{' '}
              <span className="font-medium text-slate-600">Insurance active</span>. Turn it
              on to enter policy details and notes.
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={`${switchId}-claim`}>Claim number</FieldLabel>
              <input
                id={`${switchId}-claim`}
                type="text"
                value={visibleFields.claimNumber}
                onChange={(ev) =>
                  setInsuranceField('claimNumber', ev.target.value)
                }
                disabled={disabled}
                className={insuranceFieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={`${switchId}-agency`}>Agency</FieldLabel>
              <input
                id={`${switchId}-agency`}
                type="text"
                value={visibleFields.agency}
                onChange={(ev) => setInsuranceField('agency', ev.target.value)}
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                className={`${insuranceFieldClass} sm:max-w-none`}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={`${switchId}-notes`}>Notes</FieldLabel>
              <textarea
                id={`${switchId}-notes`}
                value={visibleFields.notes}
                onChange={(ev) => setInsuranceField('notes', ev.target.value)}
                disabled={disabled}
                placeholder="Claim context, coverage limits, visit preferences…"
                rows={4}
                className={insuranceNotesClass}
              />
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  )
}
