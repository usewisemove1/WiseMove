import { getMockPropertyImage } from "@/lib/mockImages";
import { MOCK_CONTINENTAL_PENTHOUSE } from "@/lib/mockPropertyDetail";
import { mockProperties } from "@/lib/mockProperties";
import type {
  Activity,
  AgentListingMetrics,
  Inquiry,
  Property,
  PropertyAlert,
} from "@/types";

// TODO: replace with real API calls when backend is ready

export const MOCK_HOME_SEEKER_STATS = {
  savedCount: 12,
  savedThisWeek: 2,
  activeAlerts: 4,
  priorityAlerts: 4,
  recentSearches: 8,
};

export const MOCK_USER_TRUST_SCORE = 840;

export const MOCK_SAVED_PROPERTIES: Property[] = [
  mockProperties[0],
  mockProperties[1],
  mockProperties[2],
];

export const MOCK_RECENT_SEARCHES = [
  { id: "search-1", query: "Ikoyi Luxury" },
  { id: "search-2", query: "VGC Duplex" },
  { id: "search-3", query: "Lekki Phase 1" },
  { id: "search-4", query: "Eko Atlantic" },
  { id: "search-5", query: "Abuja GRA" },
];

export const MOCK_AGENT_STATS = {
  activeListings: 5,
  totalInquiries: 18,
  avgTrustScore: 94,
};

export const MOCK_RECENTLY_VIEWED: Property[] = [
  MOCK_CONTINENTAL_PENTHOUSE,
  mockProperties[0],
  mockProperties[1],
  mockProperties[2],
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    type: "viewed",
    propertyId: "continental-penthouse-eko",
    propertyTitle: "The Continental Penthouse",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "act-2",
    type: "saved",
    propertyId: "prop-001",
    propertyTitle: "The Emerald Courtyard Duplex",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "act-3",
    type: "contacted",
    propertyId: "prop-002",
    propertyTitle: "Skyline Terrace Apartment",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "act-4",
    type: "viewed",
    propertyId: "prop-003",
    propertyTitle: "Maitama Garden Villa",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "act-5",
    type: "saved",
    propertyId: "continental-penthouse-eko",
    propertyTitle: "The Continental Penthouse",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "act-6",
    type: "viewed",
    propertyId: "prop-004",
    propertyTitle: "GRA Executive Bungalow",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "act-7",
    type: "contacted",
    propertyId: "prop-005",
    propertyTitle: "Bodija Luxury Shortlet",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "act-8",
    type: "viewed",
    propertyId: "similar-eko-1",
    propertyTitle: "Ocean View Marina",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
];

export const MOCK_ALERTS: PropertyAlert[] = [
  {
    id: "alert-1",
    label: "3-Bed Apartments",
    location: "Lekki, Lagos",
    priceRange: "₦2M - ₦5M",
    propertyType: "rent",
    isActive: true,
    matchCount: 12,
    createdAt: new Date("2026-05-01"),
  },
  {
    id: "alert-2",
    label: "Shortlet Studio",
    location: "Victoria Island",
    priceRange: "₦80K - ₦500K per night",
    propertyType: "shortlet",
    isActive: true,
    matchCount: 4,
    createdAt: new Date("2026-04-20"),
  },
  {
    id: "alert-3",
    label: "Luxury Penthouses",
    location: "Eko Atlantic",
    priceRange: "₦15M - ₦50M",
    propertyType: "sale",
    isActive: true,
    matchCount: 3,
    createdAt: new Date("2026-03-15"),
  },
];

function agentListing(
  property: Property,
  metrics: AgentListingMetrics
): Property & { agentMetrics: AgentListingMetrics } {
  return { ...property, agentMetrics: metrics };
}

export const MOCK_AGENT_LISTINGS: (Property & {
  agentMetrics: AgentListingMetrics;
})[] = [
  agentListing(MOCK_CONTINENTAL_PENTHOUSE, {
    viewCount: 248,
    inquiryCount: 7,
  }),
  agentListing(mockProperties[0], { viewCount: 156, inquiryCount: 4 }),
  agentListing(mockProperties[1], { viewCount: 312, inquiryCount: 9 }),
  agentListing(mockProperties[2], { viewCount: 89, inquiryCount: 2 }),
  agentListing(
    {
      ...mockProperties[3],
      id: "agent-listing-ph",
      title: "Harbour View Residence",
      city: "Port Harcourt",
      images: [getMockPropertyImage(10)],
    },
    { viewCount: 64, inquiryCount: 1 }
  ),
];

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    senderName: "Chidi Okonkwo",
    senderAvatar: "https://placehold.co/40x40.jpg",
    propertyId: "continental-penthouse-eko",
    propertyTitle: "The Continental Penthouse",
    message:
      "Hello, I'm interested in scheduling a viewing this weekend. Is Saturday afternoon available?",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    isRead: false,
  },
  {
    id: "inq-2",
    senderName: "Fatima Bello",
    senderAvatar: "https://placehold.co/40x40.jpg",
    propertyId: "prop-002",
    propertyTitle: "Skyline Terrace Apartment",
    message:
      "Could you share more details about the service charge and parking availability?",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: false,
  },
  {
    id: "inq-3",
    senderName: "James Adeyemi",
    propertyId: "prop-001",
    propertyTitle: "The Emerald Courtyard Duplex",
    message:
      "Is this property still available? I'd like to discuss payment plans.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: "inq-4",
    senderName: "Ngozi Eze",
    senderAvatar: "https://placehold.co/40x40.jpg",
    propertyId: "continental-penthouse-eko",
    propertyTitle: "The Continental Penthouse",
    message:
      "I'm relocating from London next month. Can we arrange a virtual tour?",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: "inq-5",
    senderName: "Tunde Bakare",
    propertyId: "prop-003",
    propertyTitle: "Maitama Garden Villa",
    message:
      "What's the annual rent and are pets allowed on the property?",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isRead: false,
  },
  {
    id: "inq-6",
    senderName: "Amina Hassan",
    senderAvatar: "https://placehold.co/40x40.jpg",
    propertyId: "agent-listing-ph",
    propertyTitle: "Harbour View Residence",
    message: "Please send the floor plan and recent photos of the kitchen.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
];

export function formatRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
  return date.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
  });
}
