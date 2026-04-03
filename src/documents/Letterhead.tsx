import { companyLetterhead, publicAsset } from './branding'

export function LetterheadBlock({
  jobNumber,
  logoAlt = companyLetterhead.name,
}: {
  jobNumber: string
  logoAlt?: string
}) {
  const logoSrc = publicAsset('Logo.png')

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-slate-200/90 pb-5 sm:grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] sm:items-start sm:gap-6 sm:pb-6">
      <div className="flex justify-center sm:justify-start">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-14 w-auto max-w-[200px] object-contain object-left sm:h-16"
        />
      </div>
      <div className="flex justify-center text-center sm:text-left">
        <div
          className="max-w-md border-l-4 pl-3 text-left text-[13px] leading-snug text-slate-800"
          style={{ borderColor: companyLetterhead.red }}
        >
          <p className="text-base font-bold text-slate-900">{companyLetterhead.name}</p>
          <p className="mt-0.5">{companyLetterhead.addressLine}</p>
          <p>{companyLetterhead.phone}</p>
          <p className="font-medium text-slate-700">{companyLetterhead.website}</p>
        </div>
      </div>
      <p className="text-center text-[13px] font-semibold tracking-wide text-slate-800 sm:text-right">
        Job# {jobNumber}
      </p>
    </div>
  )
}
