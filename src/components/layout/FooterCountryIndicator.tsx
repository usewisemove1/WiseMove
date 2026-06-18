"use client";

import { useCountryStore } from "@/store/useCountryStore";

export default function FooterCountryIndicator() {
  const { selectedCountry } = useCountryStore();

  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span aria-hidden="true">{selectedCountry.flag}</span>
      <span>{selectedCountry.currency}</span>
    </span>
  );
}
