import { useId, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { DesignCleanPriority } from './estimate-detail/DesignCleanPriority'
import { DesignEnterpriseForm } from './estimate-detail/DesignEnterpriseForm'
import { DesignSaasDashboard } from './estimate-detail/DesignSaasDashboard'
import { InsuranceFormProvider } from './estimate-detail/insurance-form-context'
import { accent } from './estimate-detail/shared'

const TABS = [
  { id: 'clean', label: 'Design 1 - Clean Priority', Panel: DesignCleanPriority },
  { id: 'dashboard', label: 'Design 2 - SaaS Dashboard', Panel: DesignSaasDashboard },
  { id: 'enterprise', label: 'Design 3 - Enterprise Form', Panel: DesignEnterpriseForm },
] as const

export function EstimateDetailsPage() {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('clean')
  const tabListId = useId()

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0]
  const Panel = activeTab.Panel

  return (
    <InsuranceFormProvider>
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="z-20 shrink-0 border-b border-slate-200/70 bg-[#F1F2F4]/92 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 pt-2.5 pb-2.5 sm:flex-row sm:items-center sm:justify-between sm:pb-3">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                CRM · Estimate detail
              </p>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 text-[13px] text-slate-600 sm:text-sm">
                  <li>
                    <button
                      type="button"
                      className={`bg-transparent p-0 font-medium ${accent} underline-offset-2 hover:underline`}
                    >
                      Opportunity
                    </button>
                  </li>
                  <li className="flex items-center gap-1 font-semibold text-slate-900" aria-current="page">
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-slate-400"
                      strokeWidth={2}
                      aria-hidden
                    />
                    General
                  </li>
                </ol>
              </nav>
            </div>
            <div
              role="tablist"
              aria-label="Design variations"
              id={tabListId}
              className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-slate-200/80 bg-white/90 p-1 shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((tab) => {
                const isActive = tab.id === active
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className={`relative shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-[color,background-color,box-shadow] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F83B3B] sm:px-3.5 sm:text-[13px] ${
                      isActive
                        ? 'bg-[#F83B3B] text-white shadow-sm shadow-[#F83B3B]/25'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]"
      >
        <Panel />
      </div>
    </div>
    </InsuranceFormProvider>
  )
}
