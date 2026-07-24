import type { ListingFormData } from "@/types";

export interface TrustScoreFactor {
  id: string;
  label: string;
  points: number;
  achieved: boolean;
}

// TODO: calculate from real market data when backend is ready
function isPriceWithinMockMarketRange(formData: ListingFormData): boolean {
  if (!formData.price || formData.price <= 0) return false;

  const ranges: Record<string, { min: number; max: number }> = {
    lagos: { min: 1_500_000, max: 250_000_000 },
    abuja: { min: 2_000_000, max: 180_000_000 },
    ibadan: { min: 800_000, max: 80_000_000 },
    "port harcourt": { min: 1_000_000, max: 120_000_000 },
  };

  const cityKey = formData.city.toLowerCase();
  const range = ranges[cityKey] ?? ranges.lagos;

  return formData.price >= range.min && formData.price <= range.max;
}

export function getMockPriceRangeLabel(city: string, area: string): string {
  void area;
  const ranges: Record<string, { min: number; max: number }> = {
    Lagos: { min: 1_500_000, max: 250_000_000 },
    Abuja: { min: 2_000_000, max: 180_000_000 },
    Ibadan: { min: 800_000, max: 80_000_000 },
    "Port Harcourt": { min: 1_000_000, max: 120_000_000 },
  };

  const range = ranges[city] ?? ranges.Lagos;
  const format = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  return `Similar properties in ${city || "this area"} range from ${format(range.min)} to ${format(range.max)}`;
}

function isBasicInfoComplete(formData: ListingFormData): boolean {
  return (
    formData.title.trim().length >= 5 &&
    formData.description.trim().length >= 100
  );
}

function enabledAmenityCount(formData: ListingFormData): number {
  return formData.amenities.filter(
    (amenity) => amenity.enabled && amenity.description.trim().length > 0
  ).length;
}

export function calculateListingTrustScore(formData: ListingFormData): {
  score: number;
  factors: TrustScoreFactor[];
} {
  const factors: TrustScoreFactor[] = [
    {
      id: "basic",
      label: "Basic info complete",
      points: 15,
      achieved: isBasicInfoComplete(formData),
    },
    {
      id: "gps",
      label: "GPS Address Pinned",
      points: 20,
      achieved:
        formData.latitude !== null &&
        formData.longitude !== null &&
        Number.isFinite(formData.latitude) &&
        Number.isFinite(formData.longitude),
    },
    {
      id: "photos",
      label: "Add 5+ photos",
      points: 20,
      achieved: formData.photos.length >= 5,
    },
    {
      id: "price",
      label: "Price within market range",
      points: 15,
      achieved: isPriceWithinMockMarketRange(formData),
    },
    {
      id: "amenities",
      label: "Detailed amenities (3+)",
      points: 15,
      achieved: enabledAmenityCount(formData) >= 3,
    },
    {
      id: "ownership",
      label: "Proof of ownership uploaded",
      points: 15,
      achieved: Boolean(formData.ownershipProof),
    },
  ];

  const score = Math.min(
    100,
    factors.reduce((total, factor) => (factor.achieved ? total + factor.points : total), 0)
  );

  const cappedScore = formData.ownershipProof ? score : Math.min(score, 70);

  return { score: cappedScore, factors };
}
