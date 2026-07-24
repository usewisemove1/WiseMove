import { getMockPropertyImage } from "@/lib/mockImages";
import type { Agent, Property, TrustBreakdown } from "@/types";

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

export const MOCK_AGENT: Agent = {
  id: "agent-emeka-001",
  name: "Emeka Okafor",
  title: "Senior Portfolio Manager",
  photo: "https://placehold.co/200x200",
  phone: "2348012345678",
  whatsapp: "2348012345678",
  email: "emeka.okafor@amaafi.com",
  isVerified: true,
  responseTime: "Under 1 hour",
  totalListings: 6,
  rating: 4.9,
  yearsExperience: 8,
  propertiesSoldCount: 47,
  bio: "Emeka Okafor is a licensed real estate professional with over eight years of experience guiding high-net-worth clients through Lagos's premium property market. He specializes in luxury waterfront apartments, penthouses, and investment-grade residences across Eko Atlantic, Victoria Island, and Lekki Phase 1.\n\nBefore joining WiseMove, Emeka managed a portfolio of ₦12B+ in transactions for a leading Lagos brokerage, with a focus on expatriate relocations and diaspora buyers. He is known for transparent deal structuring, rigorous due diligence, and end-to-end support from first viewing through handover.\n\nEmeka holds a B.Sc. in Estate Management from the University of Lagos and is a registered member of the Nigerian Institution of Estate Surveyors and Valuers (NIESV).",
  specializations: ["Eko Atlantic", "Victoria Island", "Lekki Phase 1"],
  languages: ["English", "Yoruba", "Igbo"],
};

function agentListing(
  partial: Pick<Property, "id" | "title" | "city" | "state" | "price" | "priceType"> & {
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    address: string;
    imageIndex: number;
    trustScore: number;
    isPriceReduced?: boolean;
  }
): Property {
  return {
    id: partial.id,
    title: partial.title,
    description: `Premium ${partial.priceType} in ${partial.city} with verified ownership and WiseMove trust scoring.`,
    price: partial.price,
    priceType: partial.priceType,
    bedrooms: partial.bedrooms,
    bathrooms: partial.bathrooms,
    squareFootage: partial.squareFootage,
    address: partial.address,
    city: partial.city,
    state: partial.state,
    country: "Nigeria",
    latitude: 6.42 + partial.imageIndex * 0.004,
    longitude: 3.42 + partial.imageIndex * 0.003,
    images: [getMockPropertyImage(partial.imageIndex)],
    trustScore: partial.trustScore,
    trustBreakdown: trustBreakdown(partial.trustScore),
    amenities: [
      { name: "Generator", icon: "zap", available: true },
      { name: "Parking", icon: "car", available: true },
    ],
    powerSupplyHours: 24,
    waterSupply: true,
    agentId: MOCK_AGENT.id,
    isVerified: true,
    isOwnershipVerified: true,
    isPriceReduced: partial.isPriceReduced ?? false,
    listedAt: new Date("2026-05-01"),
    createdAt: new Date("2026-04-15"),
  };
}

export const MOCK_AGENT_PROFILE_LISTINGS: Property[] = [
  agentListing({
    id: "continental-penthouse-eko",
    title: "The Continental Penthouse",
    city: "Eko Atlantic",
    state: "Lagos",
    price: 4_500_000,
    priceType: "rent",
    bedrooms: 4,
    bathrooms: 5,
    squareFootage: 5200,
    address: "Ocean Parade Tower, Plot 14, Eko Atlantic City",
    imageIndex: 0,
    trustScore: 98,
  }),
  agentListing({
    id: "similar-eko-1",
    title: "Ocean View Marina",
    city: "Victoria Island",
    state: "Lagos",
    price: 3_500_000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 3200,
    address: "12 Marina Boulevard",
    imageIndex: 8,
    trustScore: 90,
  }),
  agentListing({
    id: "similar-eko-2",
    title: "Atlantic Heights",
    city: "Eko Atlantic",
    state: "Lagos",
    price: 4_200_000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 3000,
    address: "Plot 8, Eko Atlantic City",
    imageIndex: 9,
    trustScore: 92,
  }),
  agentListing({
    id: "similar-eko-3",
    title: "Marina Bay Residence",
    city: "Lekki Phase 1",
    state: "Lagos",
    price: 3_900_000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2800,
    address: "18 Admiralty Way",
    imageIndex: 10,
    trustScore: 94,
  }),
  agentListing({
    id: "agent-emeka-ikoyi-sale",
    title: "Ikoyi Waterfront Residence",
    city: "Victoria Island",
    state: "Lagos",
    price: 285_000_000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 6,
    squareFootage: 4800,
    address: "21 Bourdillon Road",
    imageIndex: 4,
    trustScore: 94,
  }),
  agentListing({
    id: "agent-emeka-lekki-shortlet",
    title: "Lekki Marina Shortlet Loft",
    city: "Lekki Phase 1",
    state: "Lagos",
    price: 95_000,
    priceType: "shortlet",
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1400,
    address: "5 Admiralty Way",
    imageIndex: 5,
    trustScore: 89,
    isPriceReduced: true,
  }),
];

export interface AgentProfileData {
  agent: Agent;
  listings: Property[];
}

// TODO: fetch by agentId when backend is ready
export function getMockAgentProfile(_agentId?: string): AgentProfileData {
  void _agentId;

  return {
    agent: {
      ...MOCK_AGENT,
      totalListings: MOCK_AGENT_PROFILE_LISTINGS.length,
    },
    listings: MOCK_AGENT_PROFILE_LISTINGS,
  };
}

export function getAgentFirstName(name: string): string {
  return name.split(" ")[0] ?? name;
}
