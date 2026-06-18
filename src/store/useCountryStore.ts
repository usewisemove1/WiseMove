import { create } from "zustand";

import { DEFAULT_COUNTRY } from "@/lib/constants";
import type { Country } from "@/types";

interface CountryState {
  selectedCountry: Country;
  setCountry: (country: Country) => void;
  formatPrice: (amount: number) => string;
}

export const useCountryStore = create<CountryState>((set, get) => ({
  selectedCountry: DEFAULT_COUNTRY,
  setCountry: (country) => set({ selectedCountry: country }),
  formatPrice: (amount) => {
    const { selectedCountry } = get();
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: selectedCountry.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  },
}));
