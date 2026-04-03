/** Letterhead / certificate branding (demo — align with your CRM) */
export const companyLetterhead = {
  name: 'Klaus Larsen Roofing',
  addressLine: '29 Northridge Drive, North Windham, CT 06256',
  phone: '(860) 563-7661',
  website: 'www.klauslarsen.com',
  /** Primary brand red used on printed docs */
  red: '#C62828',
  redLight: '#E53935',
} as const

export function publicAsset(file: string) {
  const base = import.meta.env.BASE_URL
  const path = file.startsWith('/') ? file.slice(1) : file
  return `${base}${path}`
}
