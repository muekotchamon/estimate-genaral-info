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
  /** Parcel / assessor-style GIS snapshot — single card in UI */
  gis: {
    location: {
      county: 'Southeastern Connecticut',
      state: 'CT',
      zoning: 'C2a',
      elevation: '262 ft',
      msa: 'Norwich-New London, CT',
      censusTract: '800501',
      coordinates: '41.739279, -72.179769',
    },
    legal: {
      parcelNumber: '52900',
      legalDescription: 'Lot:2 Blk:219 City/Muni/Twp:Windham',
      lotNumber: 'N/A',
      blockNumber: 'N/A',
      subdivision: 'N/A',
      publicationDate: '2025-11-05',
      landUseGeneral: 'N/A',
    },
    propertyOverview: {
      propertyType: 'N/A',
      stories: '1',
      totalRooms: 'N/A',
      parkingSpaces: '0',
      bathroomsTotal: 'N/A',
      bathroomsPartial: 'N/A',
      landUse: 'Commercial Building Show Room Warehouse',
      grossSquareFeet: '4,403',
    },
    financial: {
      assessedValue: '$353,510',
      landValue: '$118,130',
      buildingValue: '$235,380',
      assessedImprovementPct: '66.00%',
      taxAssessYear: '2025',
      annualTax2024: '$10,552',
    },
    buildingFeatures: {
      heating: 'Forced Air',
      heatFuel: 'Oil',
      airConditioning: 'Yes',
      fireplaces: '1',
      exteriorWalls: 'Wood Siding',
      foundation: 'N/A',
      roofCover: 'N/A',
      roofFrame: 'N/A',
      constructionType: 'Frame',
      quality: 'N/A',
    },
    owner: {
      ownerName: 'Tonya Z Xiao',
      ownershipType: 'Individual',
      ownerLastName: 'N/A',
      ownerFirstName: 'N/A',
      mailingAddress: '50 Hall Hill Rd',
      mailingCity: 'Willington, CT 06279',
      deedDocumentBook: '1106',
      deedSaleDate: '2011-06-06',
    },
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
