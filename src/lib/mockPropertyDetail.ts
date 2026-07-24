import { getMockPropertyImage } from "@/lib/mockImages";
import { MOCK_AGENT } from "@/lib/mockAgentProfile";
import type { DetailTrustBreakdown, Property } from "@/types";

export { MOCK_AGENT };

export const MOCK_DETAIL_TRUST: DetailTrustBreakdown = {
  ownership: 100,
  verifiedAgent: 95,
  gpsAddress: 100,
  photosIntegrity: 98,
};

export const MOCK_CONTINENTAL_PENTHOUSE: Property = {
  id: "continental-penthouse-eko",
  title: "The Continental Penthouse",
  description:
    "Experience unparalleled luxury in this stunning penthouse perched above the Atlantic in Eko Atlantic City. Floor-to-ceiling windows frame panoramic ocean and city skyline views from every room.\n\nThe open-plan living area flows seamlessly onto a private wraparound terrace — ideal for entertaining or quiet sunset evenings. A chef's kitchen with premium appliances, marble finishes throughout, and a master suite with walk-in closet and spa-inspired ensuite complete this exceptional residence.\n\nResidents enjoy 24-hour concierge, a rooftop infinity pool, state-of-the-art fitness centre, and direct access to Eko Atlantic's pristine beachfront. This is Lagos living at its most refined.",
  price: 4_500_000,
  priceType: "rent",
  bedrooms: 4,
  bathrooms: 5.5,
  squareFootage: 5200,
  address: "Ocean Parade Tower, Plot 14, Eko Atlantic City",
  city: "Eko Atlantic",
  state: "Lagos",
  country: "Nigeria",
  latitude: 6.4161,
  longitude: 3.4128,
  images: [
    getMockPropertyImage(0),
    getMockPropertyImage(1),
    getMockPropertyImage(2),
    getMockPropertyImage(3),
    getMockPropertyImage(4),
    getMockPropertyImage(5),
    getMockPropertyImage(6),
    getMockPropertyImage(7),
  ],
  trustScore: 98,
  trustBreakdown: {
    ownershipVerified: 100,
    agentVerified: 95,
    addressVerified: 100,
    gpsVerified: 100,
    photoIntegrity: 98,
    noDuplicateListing: 100,
    priceVsMarket: 92,
  },
  detailTrustBreakdown: MOCK_DETAIL_TRUST,
  amenities: [
    { name: "Swimming Pool", icon: "waves", available: true },
    { name: "Generator", icon: "zap", available: true },
    { name: "Parking", icon: "car", available: true },
  ],
  detailedAmenities: [
    {
      icon: "zap",
      label: "Power Supply",
      description: "24/7 Guaranteed (Grid + Backup Generators)",
    },
    {
      icon: "droplet",
      label: "Water Supply",
      description: "Central Industrial Treatment Plant",
    },
    {
      icon: "shield",
      label: "Security",
      description: "Biometric Access & 24hr Armed Patrol",
    },
    {
      icon: "waves",
      label: "Leisure",
      description: "Private Infinity Pool & Resident Lounge",
    },
    {
      icon: "parking-circle",
      label: "Parking",
      description: "3 Reserved Underground Slots",
    },
    {
      icon: "wifi",
      label: "Connectivity",
      description: "Fiber Optic Infrastructure Ready",
    },
  ],
  powerSupplyHours: 24,
  waterSupply: true,
  agentId: MOCK_AGENT.id,
  isVerified: true,
  isOwnershipVerified: true,
  isPriceReduced: false,
  listedAt: new Date("2026-05-01"),
  createdAt: new Date("2026-04-15"),
};

function similarProperty(
  id: string,
  title: string,
  city: string,
  state: string,
  price: number,
  imageIndex: number
): Property {
  return {
    id,
    title,
    description: `Premium rental in ${city} with exceptional finishes and verified ownership.`,
    price,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 3200,
    address: "12 Marina Boulevard",
    city,
    state,
    country: "Nigeria",
    latitude: 6.428 + imageIndex * 0.003,
    longitude: 3.421 + imageIndex * 0.002,
    images: [getMockPropertyImage(imageIndex + 8)],
    trustScore: 90 + imageIndex * 2,
    trustBreakdown: MOCK_CONTINENTAL_PENTHOUSE.trustBreakdown,
    amenities: MOCK_CONTINENTAL_PENTHOUSE.amenities,
    powerSupplyHours: 24,
    waterSupply: true,
    agentId: MOCK_AGENT.id,
    isVerified: true,
    isOwnershipVerified: true,
    isPriceReduced: false,
    listedAt: new Date("2026-04-20"),
    createdAt: new Date("2026-04-10"),
  };
}

export const MOCK_SIMILAR_PROPERTIES: Property[] = [
  similarProperty(
    "similar-eko-1",
    "Ocean View Marina",
    "Victoria Island",
    "Lagos",
    3_500_000,
    0
  ),
  similarProperty(
    "similar-eko-2",
    "Atlantic Heights",
    "Eko Atlantic",
    "Lagos",
    4_200_000,
    1
  ),
  similarProperty(
    "similar-eko-3",
    "Marina Bay Residence",
    "Lekki Phase 1",
    "Lagos",
    3_900_000,
    2
  ),
];

// TODO: fetch by id when backend is ready
export function getMockPropertyDetail(id?: string) {
  void id;
  return {
    property: MOCK_CONTINENTAL_PENTHOUSE,
    agent: MOCK_AGENT,
    similarProperties: MOCK_SIMILAR_PROPERTIES,
  };
}

export function computeDetailTrustScore(breakdown: DetailTrustBreakdown): string {
  const avg =
    (breakdown.ownership +
      breakdown.verifiedAgent +
      breakdown.gpsAddress +
      breakdown.photosIntegrity) /
    4;
  return (avg / 10).toFixed(1);
}

export function getPricePeriodSuffix(
  priceType: Property["priceType"]
): string {
  switch (priceType) {
    case "rent":
      return " / year";
    case "shortlet":
      return " / night";
    case "sale":
    default:
      return "";
  }
}
