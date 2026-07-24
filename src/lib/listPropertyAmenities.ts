export interface ListingAmenityCategory {
  icon: string;
  label: string;
  placeholder: string;
}

export const LISTING_AMENITY_CATEGORIES: ListingAmenityCategory[] = [
  {
    icon: "zap",
    label: "Power Supply",
    placeholder: "e.g. 24/7 Generator + Solar Backup",
  },
  {
    icon: "droplet",
    label: "Water Supply",
    placeholder: "e.g. Borehole + Overhead Tank",
  },
  {
    icon: "shield",
    label: "Security",
    placeholder: "e.g. 24hr CCTV & Armed Patrol",
  },
  {
    icon: "waves",
    label: "Leisure",
    placeholder: "e.g. Swimming Pool & Gym",
  },
  {
    icon: "parking-circle",
    label: "Parking",
    placeholder: "e.g. 2 Covered Parking Spaces",
  },
  {
    icon: "wifi",
    label: "Connectivity",
    placeholder: "e.g. Fibre Optic Ready",
  },
];

export function createDefaultAmenities() {
  return LISTING_AMENITY_CATEGORIES.map((category) => ({
    icon: category.icon,
    label: category.label,
    enabled: false,
    description: "",
  }));
}
