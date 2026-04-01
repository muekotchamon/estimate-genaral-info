/** Sample record for Estimate Detail explorations */
export const estimateRecord = {
  id: 'OPT-00053',
  customer: {
    name: 'Rose Blick',
    phoneDisplay: '+1 (555) 123-4567',
    phoneHref: 'tel:+15551234567',
    email: 'rose.blick@example.com',
  },
  project: {
    address: '123 Maple St, Springfield, IL 62704',
    /** Shown if geocoding fails (demo / offline). ~Springfield, IL */
    mapGeocodeFallback: { lat: 39.7984, lon: -89.6534 },
    propertyType: 'Residential — House',
    jobType: 'Cleaning',
  },
  insurance: {
    claimNumber: 'CLM-99201',
    agency: 'State Farm',
    agentName: 'Jordan Ellis',
    agentPhone: '(555) 100-2200',
    agentEmail: 'j.ellis@statefarm.example',
  },
  notes:
    'Customer prefers morning visits. Gate code 1842#. Pets: one friendly dog.',
} as const
