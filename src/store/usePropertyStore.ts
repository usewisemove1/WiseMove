import { create } from "zustand";

import { DEFAULT_PROPERTY_TYPE } from "@/lib/searchUtils";
import type { Filter, Property, SortOption } from "@/types";

interface PropertyState {
  savedProperties: Property[];
  filters: Filter;
  sortBy: SortOption;
  hoveredPropertyId: string | null;
  selectedPropertyId: string | null;
  saveProperty: (property: Property) => void;
  unsaveProperty: (id: string) => void;
  setFilters: (filters: Filter) => void;
  updateFilters: (partial: Partial<Filter>) => void;
  clearFilters: (location?: string) => void;
  setSortBy: (sort: SortOption) => void;
  setHoveredPropertyId: (id: string | null) => void;
  setSelectedPropertyId: (id: string | null) => void;
  isPropertySaved: (id: string) => boolean;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  savedProperties: [],
  filters: {
    propertyType: DEFAULT_PROPERTY_TYPE,
    trustScoreMin: 0,
  },
  sortBy: "newest",
  hoveredPropertyId: null,
  selectedPropertyId: null,
  saveProperty: (property) =>
    set((state) => ({
      savedProperties: state.savedProperties.some((p) => p.id === property.id)
        ? state.savedProperties
        : [...state.savedProperties, property],
    })),
  unsaveProperty: (id) =>
    set((state) => ({
      savedProperties: state.savedProperties.filter((p) => p.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  updateFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),
  clearFilters: (location) =>
    set({
      filters: {
        location,
        propertyType: DEFAULT_PROPERTY_TYPE,
        trustScoreMin: 0,
        priceMin: undefined,
        priceMax: undefined,
        bedrooms: undefined,
        bathrooms: undefined,
      },
    }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setHoveredPropertyId: (id) => set({ hoveredPropertyId: id }),
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
  isPropertySaved: (id) => get().savedProperties.some((p) => p.id === id),
}));
