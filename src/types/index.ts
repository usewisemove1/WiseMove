export interface TrustBreakdown {
  ownershipVerified: number;
  agentVerified: number;
  addressVerified: number;
  gpsVerified: number;
  photoIntegrity: number;
  noDuplicateListing: number;
  priceVsMarket: number;
}

export interface Amenity {
  name: string;
  icon: string;
  available: boolean;
}

export interface DetailedAmenity {
  icon: string;
  label: string;
  description: string;
}

export interface DetailTrustBreakdown {
  ownership: number;
  verifiedAgent: number;
  gpsAddress: number;
  photosIntegrity: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "sale" | "rent" | "shortlet";
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  images: string[];
  videoUrl?: string;
  trustScore: number;
  trustBreakdown: TrustBreakdown;
  amenities: Amenity[];
  detailedAmenities?: DetailedAmenity[];
  detailTrustBreakdown?: DetailTrustBreakdown;
  powerSupplyHours: number;
  waterSupply: boolean;
  agentId: string;
  isVerified: boolean;
  isOwnershipVerified: boolean;
  isPriceReduced: boolean;
  listedAt: Date;
  createdAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  title?: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  isVerified: boolean;
  responseTime: string;
  totalListings: number;
  rating: number;
  yearsExperience: number;
  propertiesSoldCount: number;
  bio: string;
  specializations: string[];
  languages: string[];
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  phoneCode: string;
}

export interface Filter {
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: "sale" | "rent" | "shortlet" | "invest";
  trustScoreMin?: number;
  verifiedOnly?: boolean;
  city?: string;
  country?: string;
  location?: string;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "trust-desc";

export type UserRole = "home_seeker" | "agent";

export type ActivityType = "viewed" | "saved" | "contacted";

export interface Activity {
  id: string;
  type: ActivityType;
  propertyId: string;
  propertyTitle: string;
  timestamp: Date;
}

export interface Inquiry {
  id: string;
  senderName: string;
  senderAvatar?: string;
  propertyId: string;
  propertyTitle: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface AgentListingMetrics {
  viewCount: number;
  inquiryCount: number;
}

export interface PropertyAlert {
  id: string;
  label: string;
  location: string;
  priceRange?: string;
  propertyType: "sale" | "rent" | "shortlet";
  isActive: boolean;
  matchCount: number;
  createdAt: Date;
}

export interface RecentSearch {
  id: string;
  query: string;
}

export type PropertyStructureType =
  | "house"
  | "apartment"
  | "duplex"
  | "land"
  | "commercial";

export type ListingListingType = "sale" | "rent" | "shortlet";

export type ListingSizeUnit = "sqm" | "sqft";

export type ListingPricePeriod =
  | "one-time"
  | "year"
  | "month"
  | "night"
  | "week";

export interface ListingPhoto {
  id: string;
  url: string;
  file?: File;
  isCover: boolean;
}

export interface ListingAmenityEntry {
  icon: string;
  label: string;
  enabled: boolean;
  description: string;
}

export interface ListingOwnershipProof {
  id: string;
  url: string;
  name: string;
  file?: File;
}

export interface ListingFormData {
  title: string;
  propertyType: PropertyStructureType | "";
  listingType: ListingListingType | "";
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  sizeUnit: ListingSizeUnit;
  description: string;
  addressLine: string;
  city: string;
  area: string;
  latitude: number | null;
  longitude: number | null;
  photos: ListingPhoto[];
  price: number | null;
  pricePeriod: ListingPricePeriod | "";
  negotiable: boolean;
  amenities: ListingAmenityEntry[];
  amenitiesSkipped: boolean;
  ownershipProof: ListingOwnershipProof | null;
}

export type ListPropertyStep = 1 | 2 | 3 | 4 | 5 | 6;

export type AlertFrequency = "instant" | "daily" | "weekly";

export type AlertListingType = "sale" | "rent" | "shortlet";

export interface SavedSearchAlert {
  id: string;
  location: string;
  listingType: AlertListingType;
  priceMin?: number;
  priceMax?: number;
  bedrooms: number | null;
  frequency: AlertFrequency;
  isActive: boolean;
  matchCount: number;
  createdAt: Date;
}

export interface PriceDropAlert {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCity: string;
  propertyState: string;
  propertyImage: string;
  originalPrice: number;
  newPrice: number;
  priceType: AlertListingType;
  droppedAt: Date;
  isTrackingEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  imageUrl?: string;
}
