import type { Property, TrustBreakdown } from "@/types";

import { getMockPropertyImage } from "@/lib/mockImages";

function trustBreakdown(overall: number): TrustBreakdown {
  const factor = overall / 100;
  return {
    ownershipVerified: Math.round(85 * factor),
    agentVerified: Math.round(90 * factor),
    addressVerified: Math.round(88 * factor),
    gpsVerified: Math.round(82 * factor),
    photoIntegrity: Math.round(92 * factor),
    noDuplicateListing: Math.round(95 * factor),
    priceVsMarket: Math.round(80 * factor),
  };
}

const areaTemplates: Record<
  string,
  { city: string; state: string; areas: string[]; lat: number; lng: number }
> = {
  lagos: {
    city: "Lagos",
    state: "Lagos",
    areas: ["Lekki", "Ikoyi", "Yaba", "Ikeja", "Victoria Island", "Ajah"],
    lat: 6.5244,
    lng: 3.3792,
  },
  abuja: {
    city: "Abuja",
    state: "FCT",
    areas: ["Maitama", "Wuse", "Gwarinpa", "Asokoro", "Jabi"],
    lat: 9.0765,
    lng: 7.3986,
  },
  "port harcourt": {
    city: "Port Harcourt",
    state: "Rivers",
    areas: ["GRA", "Woji", "Trans Amadi", "Rumuola"],
    lat: 4.8156,
    lng: 7.0498,
  },
  ibadan: {
    city: "Ibadan",
    state: "Oyo",
    areas: ["Bodija", "Jericho", "Ring Road", "Agodi"],
    lat: 7.3775,
    lng: 3.947,
  },
};

function resolveLocation(location?: string) {
  const key = (location ?? "Lagos").trim().toLowerCase();
  if (areaTemplates[key]) return areaTemplates[key];

  const match = Object.entries(areaTemplates).find(([name, template]) =>
    key.includes(name) || template.city.toLowerCase().includes(key)
  );

  return match?.[1] ?? areaTemplates.lagos;
}

const propertySeeds = [
  {
    title: "Emerald Courtyard Duplex",
    priceType: "sale" as const,
    price: 185000000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3200,
    trustScore: 96,
    verified: true,
    daysAgo: 2,
  },
  {
    title: "Skyline Terrace Apartment",
    priceType: "rent" as const,
    price: 4500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    trustScore: 91,
    verified: true,
    daysAgo: 5,
  },
  {
    title: "Palm Grove Villa",
    priceType: "sale" as const,
    price: 320000000,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 4500,
    trustScore: 88,
    verified: true,
    daysAgo: 8,
  },
  {
    title: "Harbour View Flat",
    priceType: "rent" as const,
    price: 2800000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    trustScore: 74,
    verified: false,
    daysAgo: 3,
  },
  {
    title: "Bodija Luxury Shortlet",
    priceType: "shortlet" as const,
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    trustScore: 72,
    verified: true,
    daysAgo: 1,
  },
  {
    title: "Tech Hub Studio",
    priceType: "rent" as const,
    price: 1800000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    trustScore: 65,
    verified: false,
    daysAgo: 12,
  },
  {
    title: "Island Executive Penthouse",
    priceType: "sale" as const,
    price: 450000000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3800,
    trustScore: 98,
    verified: true,
    daysAgo: 4,
  },
  {
    title: "Garden City Bungalow",
    priceType: "sale" as const,
    price: 95000000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 2400,
    trustScore: 78,
    verified: false,
    daysAgo: 9,
  },
  {
    title: "Metro Heights Apartment",
    priceType: "rent" as const,
    price: 3200000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1500,
    trustScore: 83,
    verified: true,
    daysAgo: 6,
  },
  {
    title: "Riverside Shortlet Suite",
    priceType: "shortlet" as const,
    price: 120000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1600,
    trustScore: 80,
    verified: true,
    daysAgo: 2,
  },
  {
    title: "Central Business Flat",
    priceType: "rent" as const,
    price: 2200000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 980,
    trustScore: 70,
    verified: false,
    daysAgo: 14,
  },
  {
    title: "Asokoro Investment Home",
    priceType: "sale" as const,
    price: 275000000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3000,
    trustScore: 94,
    verified: true,
    daysAgo: 7,
  },
  {
    title: "Coastal View Duplex",
    priceType: "sale" as const,
    price: 145000000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2800,
    trustScore: 86,
    verified: true,
    daysAgo: 10,
  },
  {
    title: "University District Room",
    priceType: "rent" as const,
    price: 950000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 520,
    trustScore: 68,
    verified: false,
    daysAgo: 18,
  },
  {
    title: "Premium Shortlet Loft",
    priceType: "shortlet" as const,
    price: 150000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1350,
    trustScore: 89,
    verified: true,
    daysAgo: 3,
  },
];

// TODO: replace with API call when backend is ready
export function getMockSearchProperties(location?: string): Property[] {
  const template = resolveLocation(location);

  return propertySeeds.map((seed, index) => {
    const area = template.areas[index % template.areas.length];
    const latOffset = (index % 5) * 0.012 - 0.024;
    const lngOffset = (index % 4) * 0.015 - 0.022;
    const listedAt = new Date();
    listedAt.setDate(listedAt.getDate() - seed.daysAgo);

    return {
      id: `search-${index + 1}`,
      title: `${seed.title} in ${area}`,
      description: `A ${seed.bedrooms}-bedroom ${seed.priceType} property in ${area}, ${template.city}.`,
      price: seed.price,
      priceType: seed.priceType,
      bedrooms: seed.bedrooms,
      bathrooms: seed.bathrooms,
      squareFootage: seed.sqft,
      address: `${index + 10} ${area} Road`,
      city: area,
      state: template.state,
      country: "Nigeria",
      latitude: template.lat + latOffset,
      longitude: template.lng + lngOffset,
      images: [getMockPropertyImage(index)],
      trustScore: seed.trustScore,
      trustBreakdown: trustBreakdown(seed.trustScore),
      amenities: [
        { name: "Parking", icon: "car", available: true },
        { name: "Generator", icon: "zap", available: seed.verified },
      ],
      powerSupplyHours: seed.verified ? 20 : 12,
      waterSupply: seed.trustScore >= 70,
      agentId: `agent-${index + 1}`,
      isVerified: seed.verified,
      isOwnershipVerified: seed.trustScore >= 85,
      isPriceReduced: index % 4 === 0,
      listedAt,
      createdAt: listedAt,
    };
  });
}
