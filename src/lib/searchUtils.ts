import type { Filter, Property, SortOption } from "@/types";

export const DEFAULT_PROPERTY_TYPE: Filter["propertyType"] = "rent";

const propertyTypeLabels: Record<
  NonNullable<Filter["propertyType"]>,
  string
> = {
  sale: "Sale",
  rent: "Rent",
  shortlet: "Shortlet",
  invest: "Investment",
};

export function getResultsTitle(
  propertyType: Filter["propertyType"] | undefined,
  location: string
): string {
  const type = (propertyType ??
    DEFAULT_PROPERTY_TYPE) as NonNullable<Filter["propertyType"]>;
  return `Properties for ${propertyTypeLabels[type]} in ${location}`;
}

export function filtersToSearchParams(
  filters: Filter,
  sort: SortOption
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.location) params.set("location", filters.location);
  if (filters.propertyType) params.set("type", filters.propertyType);
  if (filters.priceMin !== undefined) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.bedrooms !== undefined) {
    params.set("bedrooms", String(filters.bedrooms));
  }
  if (filters.bathrooms !== undefined) {
    params.set("bathrooms", String(filters.bathrooms));
  }
  if (filters.trustScoreMin !== undefined && filters.trustScoreMin > 0) {
    params.set("trustScoreMin", String(filters.trustScoreMin));
  }
  if (sort !== "newest") params.set("sort", sort);

  return params;
}

export function searchParamsToFilters(
  params: URLSearchParams
): { filters: Filter; sort: SortOption } {
  const type = params.get("type");
  const propertyType =
    type === "sale" ||
    type === "rent" ||
    type === "shortlet" ||
    type === "invest"
      ? type
      : DEFAULT_PROPERTY_TYPE;

  const parseNumber = (value: string | null) => {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const sortParam = params.get("sort");
  const sort: SortOption =
    sortParam === "price-asc" ||
    sortParam === "price-desc" ||
    sortParam === "trust-desc"
      ? sortParam
      : "newest";

  return {
    filters: {
      location: params.get("location") ?? undefined,
      propertyType,
      priceMin: parseNumber(params.get("priceMin")),
      priceMax: parseNumber(params.get("priceMax")),
      bedrooms: parseNumber(params.get("bedrooms")),
      bathrooms: parseNumber(params.get("bathrooms")),
      trustScoreMin: parseNumber(params.get("trustScoreMin")) ?? 0,
    },
    sort,
  };
}

export function hasActiveFilters(filters: Filter): boolean {
  return (
    (filters.propertyType !== undefined &&
      filters.propertyType !== DEFAULT_PROPERTY_TYPE) ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.bedrooms !== undefined ||
    filters.bathrooms !== undefined ||
    (filters.trustScoreMin !== undefined && filters.trustScoreMin > 0)
  );
}

// TODO: replace with API call when backend is ready
export function filterProperties(
  properties: Property[],
  filters: Filter
): Property[] {
  return properties.filter((property) => {
    if (filters.propertyType === "invest") {
      if (property.priceType !== "sale" || property.trustScore < 75) {
        return false;
      }
    } else if (
      filters.propertyType &&
      property.priceType !== filters.propertyType
    ) {
      return false;
    }

    if (filters.priceMin !== undefined && property.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && property.price > filters.priceMax) {
      return false;
    }
    if (
      filters.bedrooms !== undefined &&
      property.bedrooms < filters.bedrooms
    ) {
      return false;
    }
    if (
      filters.bathrooms !== undefined &&
      property.bathrooms < filters.bathrooms
    ) {
      return false;
    }
    if (
      filters.trustScoreMin !== undefined &&
      property.trustScore < filters.trustScoreMin
    ) {
      return false;
    }

    return true;
  });
}

export function sortProperties(
  properties: Property[],
  sort: SortOption
): Property[] {
  const sorted = [...properties];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "trust-desc":
      return sorted.sort((a, b) => b.trustScore - a.trustScore);
    case "newest":
    default:
      return sorted.sort(
        (a, b) => b.listedAt.getTime() - a.listedAt.getTime()
      );
  }
}
