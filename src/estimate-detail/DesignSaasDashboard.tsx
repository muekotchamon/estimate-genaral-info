import { useId } from 'react'
import {
  Briefcase,
  Building2,
  Hash,
  Mail,
  MapPin,
  Phone,
  Save,
} from 'lucide-react'
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
  Shell,
  accent,
  btnHeaderSecondary,
  btnPrimary,
  customerEyebrow,
  estimateChipAccent,
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
  const disabled = !insuranceActive

  return (
    <Shell>
      <header className="mb-4">
        <Card className={`overflow-hidden p-0 ${heroCardClass}`}>
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className={customerEyebrow}>Customer</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[2rem] lg:text-4xl">
                  {e.customer.name}
                </h1>
                <p className="mt-3">
                  <span className={estimateChipAccent}>Estimate {e.id}</span>
                </p>
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
              <div className="flex shrink-0 flex-wrap gap-2">
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
                <button
                  type="button"
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium ${btnPrimary}`}
                >
                  <Save className="h-3.5 w-3.5" strokeWidth={2} />
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100/90 bg-slate-100/35 px-5 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <Tile label="Job type" value={e.project.jobType} icon={Briefcase} />
              <Tile label="Property" value={e.project.propertyType} icon={Building2} />
              <Tile label="Estimate" value={e.id} icon={Hash} />
            </div>
          </div>
        </Card>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        <Card className="flex h-full min-h-0 flex-col p-0 lg:col-span-7">
          <div className="shrink-0 border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Project location</h2>
            <p className="mt-0.5 text-xs text-slate-500">Service address &amp; site context</p>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-5">
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
            <MapPlaceholderCard
              address={e.project.address}
              fallbackCoordinates={e.project.mapGeocodeFallback}
              embedded
              fillInCard
            />
          </div>
        </Card>

        <Card className="flex h-full min-h-0 flex-col p-0 lg:col-span-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Insurance</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Carrier, adjuster &amp; notes
              </p>
            </div>
            <InsuranceActiveSwitch id={switchId} compact />
          </div>
          {!insuranceActive ? (
            <p
              className="border-b border-slate-100 px-5 py-3 text-xs text-slate-500"
              lang="en"
              translate="no"
            >
              Insurance data is hidden until you enable Insurance active.
            </p>
          ) : null}
          <div className="divide-y divide-slate-100 px-2 py-1">
            <div className="px-3 py-3">
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
                disabled={disabled}
                className={`mt-1 ${insuranceFieldClass}`}
              />
            </div>
            <div className="px-3 py-3">
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
                disabled={disabled}
                placeholder="e.g. State Farm"
                className={`mt-1 ${insuranceFieldClass}`}
              />
            </div>
            <div className="px-3 py-3">
              <label
                htmlFor={`${switchId}-agent`}
                className="text-xs font-medium text-slate-500"
              >
                Agent
              </label>
              <input
                id={`${switchId}-agent`}
                type="text"
                value={visibleFields.agentName}
                onChange={(ev) =>
                  setInsuranceField('agentName', ev.target.value)
                }
                disabled={disabled}
                className={`mt-1 ${insuranceFieldClass}`}
              />
            </div>
            <div className="px-3 py-3">
              <label
                htmlFor={`${switchId}-phone`}
                className="text-xs font-medium text-slate-500"
              >
                Phone
              </label>
              <input
                id={`${switchId}-phone`}
                type="tel"
                value={visibleFields.agentPhone}
                onChange={(ev) =>
                  setInsuranceField('agentPhone', ev.target.value)
                }
                disabled={disabled}
                className={`mt-1 ${insuranceFieldClass}`}
              />
            </div>
            <div className="px-3 py-3">
              <label
                htmlFor={`${switchId}-email`}
                className="text-xs font-medium text-slate-500"
              >
                Email
              </label>
              <input
                id={`${switchId}-email`}
                type="email"
                value={visibleFields.agentEmail}
                onChange={(ev) =>
                  setInsuranceField('agentEmail', ev.target.value)
                }
                disabled={disabled}
                className={`mt-1 ${insuranceFieldClass}`}
              />
            </div>
            <div className="px-3 py-3">
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
                disabled={disabled}
                placeholder="Internal notes for this claim…"
                rows={3}
                className={`mt-1 ${insuranceNotesClass}`}
              />
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  )
}
