import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type InsuranceFields = {
  claimNumber: string
  agency: string
  agentName: string
  agentPhone: string
  agentEmail: string
  notes: string
}

const EMPTY_INSURANCE: InsuranceFields = {
  claimNumber: '',
  agency: '',
  agentName: '',
  agentPhone: '',
  agentEmail: '',
  notes: '',
}

type InsuranceFormContextValue = {
  insuranceActive: boolean
  setInsuranceActive: (v: boolean) => void
  /** Stored values (persist when toggling the switch off). */
  fields: InsuranceFields
  /** Shown in inputs: empty until Insurance active is on. */
  visibleFields: InsuranceFields
  setInsuranceField: <K extends keyof InsuranceFields>(
    key: K,
    value: InsuranceFields[K],
  ) => void
}

const InsuranceFormContext = createContext<InsuranceFormContextValue | null>(
  null,
)

export function InsuranceFormProvider({ children }: { children: ReactNode }) {
  const [insuranceActive, setInsuranceActive] = useState(false)
  const [fields, setFields] = useState<InsuranceFields>(EMPTY_INSURANCE)

  const setInsuranceField = useCallback(
    <K extends keyof InsuranceFields>(key: K, value: InsuranceFields[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const value = useMemo(() => {
    const visibleFields = insuranceActive ? fields : EMPTY_INSURANCE
    return {
      insuranceActive,
      setInsuranceActive,
      fields,
      visibleFields,
      setInsuranceField,
    }
  }, [insuranceActive, fields, setInsuranceField])

  return (
    <InsuranceFormContext.Provider value={value}>
      {children}
    </InsuranceFormContext.Provider>
  )
}

export function useInsuranceForm() {
  const ctx = useContext(InsuranceFormContext)
  if (!ctx) {
    throw new Error('useInsuranceForm must be used within InsuranceFormProvider')
  }
  return ctx
}

/** Shared pill switch; label associated for a11y */
export function InsuranceActiveSwitch({
  id,
  compact,
}: {
  id: string
  compact?: boolean
}) {
  const { insuranceActive, setInsuranceActive } = useInsuranceForm()

  return (
    <div
      className={`flex items-center gap-3 ${compact ? '' : 'rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2'}`}
    >
      <label
        htmlFor={id}
        className={`cursor-pointer font-medium text-slate-700 ${compact ? 'text-xs' : 'text-sm'}`}
        lang="en"
        translate="no"
      >
        Insurance active
      </label>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={insuranceActive}
        onClick={() => setInsuranceActive(!insuranceActive)}
        className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] ${
          insuranceActive ? 'bg-[#F83B3B]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
            insuranceActive ? 'translate-x-5' : 'translate-x-0'
          }`}
          aria-hidden
        />
      </button>
    </div>
  )
}

export const insuranceFieldClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F83B3B] focus:ring-2 focus:ring-[#F83B3B]/20 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500'

export const insuranceNotesClass = `${insuranceFieldClass} min-h-[120px] resize-y py-2.5 leading-relaxed`

export const insuranceNotesClassCompact = `${insuranceFieldClass} min-h-0 resize-none py-1.5 leading-snug`
