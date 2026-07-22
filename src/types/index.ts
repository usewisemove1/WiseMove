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
  state?: string;
  amenities?: string[];
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
  propertyType: "sale" | "rent" | "shortlet";
  isActive: boolean;
  matchCount: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  imageUrl?: string;
}
