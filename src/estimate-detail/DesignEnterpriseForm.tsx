import type { ReactNode } from 'react'
import { useId } from 'react'
import { Mail, Phone, Save } from 'lucide-react'
import { estimateRecord as e } from './data'
import {
  InsuranceActiveSwitch,
  insuranceFieldClass,
  insuranceNotesClass,
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
  btnPrimary,
  customerEyebrow,
  estimateChipAccent,
  GoogleMapsLinkButton,
  heroCardClass,
} from './shared'

function EnterpriseSection({
  step,
  title,
  description,
  children,
}: {
  step: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-200/80 bg-slate-100/40 px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-mono text-xs font-semibold text-[#F83B3B]">{step}</span>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
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
  const disabled = !insuranceActive

  return (
    <Shell>
      <header className="mb-4">
        <Card className={`p-5 sm:p-6 lg:p-8 ${heroCardClass}`}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className={customerEyebrow}>Estimate detail</p>
              <h1 className="mt-2 text-[2rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-[2.25rem] lg:text-[2.5rem]">
                {e.customer.name}
              </h1>
              <p className="mt-3">
                <span className={estimateChipAccent}>Reference {e.id}</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a href={e.customer.phoneHref} className={`font-medium ${accent}`}>
                  {e.customer.phoneDisplay}
                </a>
                <a href={`mailto:${e.customer.email}`} className={`font-medium ${accent}`}>
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
            <div className="grid gap-5 sm:grid-cols-2">
              <ReadonlyRow label="Property type" value={e.project.propertyType} />
              <ReadonlyRow label="Job type" value={e.project.jobType} />
            </div>
          </div>
        </EnterpriseSection>

        <EnterpriseSection
          step="03"
          title="Insurance"
          description="Claims, carrier contacts, and related notes."
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <InsuranceActiveSwitch id={switchId} />
            {!insuranceActive ? (
              <p className="text-sm text-slate-500" lang="en" translate="no">
                No insurance data appears until Insurance active is enabled.
              </p>
            ) : null}
          </div>
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
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
                  disabled={disabled}
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
                  disabled={disabled}
                  placeholder="e.g. State Farm"
                  className={insuranceFieldClass}
                />
              </div>
            </div>
            <div>
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
            <div className="grid gap-5 sm:grid-cols-2">
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
                  disabled={disabled}
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
                  disabled={disabled}
                  className={insuranceFieldClass}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor={`${switchId}-notes`}>Notes</FieldLabel>
              <textarea
                id={`${switchId}-notes`}
                value={visibleFields.notes}
                onChange={(ev) => setInsuranceField('notes', ev.target.value)}
                disabled={disabled}
                placeholder="Internal notes visible to your team…"
                rows={4}
                className={insuranceNotesClass}
              />
            </div>
          </div>
        </EnterpriseSection>
      </div>
    </Shell>
  )
}
