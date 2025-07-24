export const ghanaRegions = [
  {
    name: "Ashanti Region",
    districts: [
      {
        name: "Bekwai District",
        locations: ["Domeabra", "Bosome Freho", "Bekwai", "Asiwa"]
      },
      {
        name: "Kumasi Metropolitan",
        locations: ["Kumasi", "Bantama", "Suame", "Asokwa"]
      }
    ]
  },
  {
    name: "Greater Accra Region",
    districts: [
      {
        name: "Accra Metropolitan",
        locations: ["Accra", "Osu", "Labadi", "Cantonments"]
      }
    ]
  },
  {
    name: "Western Region",
    districts: [
      {
        name: "Shama District",
        locations: ["Shama", "Egyambra", "Beposo"]
      }
    ]
  },
  {
    name: "Eastern Region",
    districts: [
      {
        name: "Kwahu West District",
        locations: ["Nkawkaw", "Abetifi", "Kwahu Tafo"]
      }
    ]
  }
];

export const cropTypes = [
  "Cocoa", "Coffee", "Oil Palm", "Rubber", "Coconut", "Cashew", "Citrus", "Mango"
];

export const treeSpecies = [
  "Trinitario", "Forastero", "Nacional", "Hybrid", "Amelonado", "Upper Amazon"
];

export const soilTypes = [
  "Clay", "Sandy", "Loamy", "Laterite", "Forest Soil", "Alluvial"
];

export const farmHealthStatuses = [
  "Excellent", "Good", "Fair", "Poor", "Critical"
];

export const pestObservations = [
  "None", "Minimal", "Moderate", "Severe", "Black Pod", "Swollen Shoot", "Capsid", "Mirids"
];

export const humidityLevels = [
  "Very Low", "Low", "Moderate", "High", "Very High"
];

export const cooperationStatuses = [
  "Very Cooperative", "Cooperative", "Neutral", "Uncooperative", "Absent"
];

export const mockFarms = [
  {
    id: "1",
    name: "Farm A",
    gps: "6.67° N, 1.62° W",
    status: "visited",
    farmer: "Kofi Asante",
    assignedVisits: 4,
    completedVisits: 3
  },
  {
    id: "2",
    name: "Farm B",
    gps: "6.68° N, 1.63° W",
    status: "visited",
    farmer: "Ama Serwaa",
    assignedVisits: 4,
    completedVisits: 2
  },
  {
    id: "3",
    name: "Farm C",
    gps: "6.69° N, 1.64° W",
    status: "visited",
    farmer: "Kwame Boateng",
    assignedVisits: 4,
    completedVisits: 1
  },
  {
    id: "4",
    name: "Farm D",
    gps: "6.70° N, 1.65° W",
    status: "visited",
    farmer: "Akosua Adjei",
    assignedVisits: 4,
    completedVisits: 4
  },
  {
    id: "5",
    name: "Farm E",
    gps: "6.71° N, 1.66° W",
    status: "visited",
    farmer: "Yaw Mensah",
    assignedVisits: 4,
    completedVisits: 2
  },
  {
    id: "6",
    name: "Farm F",
    gps: "6.72° N, 1.67° W",
    status: "visited",
    farmer: "Efua Konadu",
    assignedVisits: 4,
    completedVisits: 3
  }
];

export const mockVisits = [
  {
    id: "1",
    farmId: "1",
    farmName: "Kwame's Farm",
    visitNumber: 3,
    date: "2024-07-26",
    cropType: "Cocoa",
    treeSpecies: "Hybrid",
    numberOfTrees: 150,
    farmHealth: "Good",
    notes: "Healthy growth observed, minimal pest damage",
    images: [
      "/api/placeholder/300/200",
      "/api/placeholder/300/200"
    ],
    polygon: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-1.62, 6.67], [-1.61, 6.67], [-1.61, 6.68], [-1.62, 6.68], [-1.62, 6.67]]]
      }
    }
  }
];