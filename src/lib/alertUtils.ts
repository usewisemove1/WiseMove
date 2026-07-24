import { formatPrice } from "@/lib/utils";
import type {
  AlertFrequency,
  AlertListingType,
  SavedSearchAlert,
} from "@/types";

const LISTING_TYPE_LABELS: Record<AlertListingType, string> = {
  sale: "for sale",
  rent: "for rent",
  shortlet: "for shortlet",
};

const FREQUENCY_LABELS: Record<AlertFrequency, string> = {
  instant: "Instant",
  daily: "Daily digest",
  weekly: "Weekly digest",
};

export function getFrequencyLabel(frequency: AlertFrequency): string {
  return FREQUENCY_LABELS[frequency];
}

function formatPriceRange(
  min?: number,
  max?: number,
  listingType?: AlertListingType
): string | null {
  if (!min && !max) return null;

  const suffix =
    listingType === "rent"
      ? "/year"
      : listingType === "shortlet"
        ? "/night"
        : "";

  if (min && max) {
    return `${formatPrice(min, "NGN")} - ${formatPrice(max, "NGN")}${suffix}`;
  }
  if (min) return `from ${formatPrice(min, "NGN")}${suffix}`;
  if (max) return `up to ${formatPrice(max, "NGN")}${suffix}`;
  return null;
}

export function formatSavedSearchSummary(alert: SavedSearchAlert): string {
  const bedroomLabel =
    alert.bedrooms === null
      ? "Properties"
      : alert.bedrooms === 0
        ? "Studios"
        : `${alert.bedrooms}-bedroom apartments`;

  const parts = [
    bedroomLabel,
    LISTING_TYPE_LABELS[alert.listingType],
    `in ${alert.location}`,
  ];

  const priceRange = formatPriceRange(
    alert.priceMin,
    alert.priceMax,
    alert.listingType
  );
  if (priceRange) parts.push(priceRange);

  return parts.join(" ");
}

export function calculatePriceDropPercent(
  originalPrice: number,
  newPrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - newPrice) / originalPrice) * 100);
}

export function getPricePeriodSuffix(priceType: AlertListingType): string {
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
