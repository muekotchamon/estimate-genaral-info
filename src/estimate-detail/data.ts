/** Sample record for Estimate Detail explorations */
export const estimateRecord = {
  id: 'OPT-00053',
  customer: {
    name: 'Rose Blick',
    /** Shown in hero under customer name */
    companyName: 'Springfield Residential LLC',
    billingAddress: '123 Maple St, Springfield, IL 62704',
    phoneDisplay: '+1 (555) 123-4567',
    phoneHref: 'tel:+15551234567',
    email: 'rose.blick@example.com',
  },
  leadReferral: {
    primarySource: 'Treehouse - Leadbank (MA)',
    /** Empty or omitted shows an em dash */
    secondarySource: '',
    /** Shown under “Referral information” */
    referralDetails:
      'Referred through Treehouse partner program. Note promo code on file for follow-up booking.',
  },
  /** Job documents — opened in-app modal (Print / Save as PDF). Logo: `public/Logo.png` */
  documents: [
    { id: 'final-letter', title: 'Final Letter' },
    { id: 'warranty-certificate', title: 'Warranty Certificate' },
    { id: 'completion-certificate', title: 'Completion Certificate' },
  ],
  project: {
    address: '123 Maple St, Springfield, IL 62704',
    /** Shown if geocoding fails (demo / offline). ~Springfield, IL */
    mapGeocodeFallback: { lat: 39.7984, lon: -89.6534 },
    propertyType: 'Residential — House',
    jobType: 'Cleaning',
    /** Shown under Project as “Team” */
    assignedTo: 'Alex Morgan',
    /** Workmanship warranty term (years) */
    warrantyYears: 50,
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
