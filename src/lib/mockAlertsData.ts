import { getMockPropertyImage } from "@/lib/mockImages";
import { mockProperties } from "@/lib/mockProperties";
import { MOCK_CONTINENTAL_PENTHOUSE } from "@/lib/mockPropertyDetail";
import type { PriceDropAlert, SavedSearchAlert } from "@/types";

// TODO: replace with real data/API when backend is ready

export const MOCK_SAVED_SEARCH_ALERTS: SavedSearchAlert[] = [
  {
    id: "search-alert-1",
    location: "Lekki, Lagos",
    listingType: "rent",
    priceMin: 2_000_000,
    priceMax: 5_000_000,
    bedrooms: 3,
    frequency: "instant",
    isActive: true,
    matchCount: 12,
    createdAt: new Date("2026-05-01"),
  },
  {
    id: "search-alert-2",
    location: "Victoria Island, Lagos",
    listingType: "shortlet",
    priceMin: 80_000,
    priceMax: 500_000,
    bedrooms: 1,
    frequency: "daily",
    isActive: true,
    matchCount: 4,
    createdAt: new Date("2026-04-18"),
  },
  {
    id: "search-alert-3",
    location: "Eko Atlantic, Lagos",
    listingType: "sale",
    priceMin: 150_000_000,
    priceMax: 400_000_000,
    bedrooms: 4,
    frequency: "weekly",
    isActive: false,
    matchCount: 0,
    createdAt: new Date("2026-03-22"),
  },
  {
    id: "search-alert-4",
    location: "Abuja, FCT",
    listingType: "rent",
    priceMin: 3_000_000,
    priceMax: 8_000_000,
    bedrooms: null,
    frequency: "daily",
    isActive: true,
    matchCount: 7,
    createdAt: new Date("2026-05-10"),
  },
];

export const MOCK_PRICE_DROP_ALERTS: PriceDropAlert[] = [
  {
    id: "price-drop-1",
    propertyId: MOCK_CONTINENTAL_PENTHOUSE.id,
    propertyTitle: MOCK_CONTINENTAL_PENTHOUSE.title,
    propertyCity: MOCK_CONTINENTAL_PENTHOUSE.city,
    propertyState: MOCK_CONTINENTAL_PENTHOUSE.state,
    propertyImage: MOCK_CONTINENTAL_PENTHOUSE.images[0] ?? getMockPropertyImage(0),
    originalPrice: 4_500_000,
    newPrice: 3_950_000,
    priceType: "rent",
    droppedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isTrackingEnabled: true,
  },
  {
    id: "price-drop-2",
    propertyId: mockProperties[0].id,
    propertyTitle: mockProperties[0].title,
    propertyCity: mockProperties[0].city,
    propertyState: mockProperties[0].state,
    propertyImage: mockProperties[0].images[0] ?? getMockPropertyImage(1),
    originalPrice: 195_000_000,
    newPrice: 185_000_000,
    priceType: "sale",
    droppedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isTrackingEnabled: true,
  },
  {
    id: "price-drop-3",
    propertyId: mockProperties[1].id,
    propertyTitle: mockProperties[1].title,
    propertyCity: mockProperties[1].city,
    propertyState: mockProperties[1].state,
    propertyImage: mockProperties[1].images[0] ?? getMockPropertyImage(2),
    originalPrice: 4_800_000,
    newPrice: 4_500_000,
    priceType: "rent",
    droppedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isTrackingEnabled: false,
  },
];
