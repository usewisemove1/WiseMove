import type { Country } from "@/types";

export const countries: Country[] = [
  {
    code: "ng",
    name: "Nigeria",
    currency: "NGN",
    currencySymbol: "₦",
    flag: "🇳🇬",
    phoneCode: "+234",
  },
  {
    code: "gh",
    name: "Ghana",
    currency: "GHS",
    currencySymbol: "₵",
    flag: "🇬🇭",
    phoneCode: "+233",
  },
  {
    code: "ke",
    name: "Kenya",
    currency: "KES",
    currencySymbol: "KSh",
    flag: "🇰🇪",
    phoneCode: "+254",
  },
  {
    code: "gb",
    name: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    flag: "🇬🇧",
    phoneCode: "+44",
  },
  {
    code: "us",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    flag: "🇺🇸",
    phoneCode: "+1",
  },
  {
    code: "ae",
    name: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "د.إ",
    flag: "🇦🇪",
    phoneCode: "+971",
  },
  {
    code: "za",
    name: "South Africa",
    currency: "ZAR",
    currencySymbol: "R",
    flag: "🇿🇦",
    phoneCode: "+27",
  },
];

export const DEFAULT_COUNTRY = countries[0];

/** Nigerian cities for listing location step */
export const NIGERIAN_CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Enugu",
  "Benin City",
  "Calabar",
] as const;

export type NigerianCity = (typeof NIGERIAN_CITIES)[number];

export interface CityCoordinate {
  name: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export const cityCoordinates: Record<string, CityCoordinate> = {
  lagos: {
    name: "Lagos",
    latitude: 6.5244,
    longitude: 3.3792,
    zoom: 11,
  },
  abuja: {
    name: "Abuja",
    latitude: 9.0765,
    longitude: 7.3986,
    zoom: 11,
  },
  "port harcourt": {
    name: "Port Harcourt",
    latitude: 4.8156,
    longitude: 7.0498,
    zoom: 11,
  },
  ibadan: {
    name: "Ibadan",
    latitude: 7.3775,
    longitude: 3.947,
    zoom: 11,
  },
};

export function getCityCoordinates(location?: string): CityCoordinate {
  if (!location) return cityCoordinates.lagos;

  const key = location.trim().toLowerCase();
  const direct = cityCoordinates[key];
  if (direct) return direct;

  const match = Object.values(cityCoordinates).find((city) =>
    key.includes(city.name.toLowerCase())
  );

  return match ?? cityCoordinates.lagos;
}
