import { create } from "zustand";

import {
  MOCK_PRICE_DROP_ALERTS,
  MOCK_SAVED_SEARCH_ALERTS,
} from "@/lib/mockAlertsData";
import type {
  AlertFrequency,
  AlertListingType,
  PriceDropAlert,
  SavedSearchAlert,
} from "@/types";

interface CreateSavedSearchInput {
  location: string;
  listingType: AlertListingType;
  priceMin?: number | null;
  priceMax?: number | null;
  bedrooms: number | null;
  frequency: AlertFrequency;
}

interface AlertsState {
  savedSearches: SavedSearchAlert[];
  priceDrops: PriceDropAlert[];
  addSavedSearch: (input: CreateSavedSearchInput) => SavedSearchAlert;
  toggleSavedSearch: (id: string) => void;
  deleteSavedSearch: (id: string) => void;
  togglePriceDropTracking: (id: string) => void;
}

function createAlertId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useAlertsStore = create<AlertsState>((set) => ({
  savedSearches: MOCK_SAVED_SEARCH_ALERTS,
  priceDrops: MOCK_PRICE_DROP_ALERTS,

  addSavedSearch: (input) => {
    const alert: SavedSearchAlert = {
      id: createAlertId("search-alert"),
      location: input.location,
      listingType: input.listingType,
      priceMin: input.priceMin ?? undefined,
      priceMax: input.priceMax ?? undefined,
      bedrooms: input.bedrooms,
      frequency: input.frequency,
      isActive: true,
      matchCount: 0,
      createdAt: new Date(),
    };

    set((state) => ({
      savedSearches: [alert, ...state.savedSearches],
    }));

    return alert;
  },

  toggleSavedSearch: (id) =>
    set((state) => ({
      savedSearches: state.savedSearches.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      ),
    })),

  deleteSavedSearch: (id) =>
    set((state) => ({
      savedSearches: state.savedSearches.filter((alert) => alert.id !== id),
    })),

  togglePriceDropTracking: (id) =>
    set((state) => ({
      priceDrops: state.priceDrops.map((alert) =>
        alert.id === id
          ? { ...alert, isTrackingEnabled: !alert.isTrackingEnabled }
          : alert
      ),
    })),
}));
