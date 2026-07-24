"use client";

import { useEffect, useMemo } from "react";

import {
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
} from "@/components/list-property/FormFields";
import { getMockPriceRangeLabel } from "@/lib/listPropertyTrustScore";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";
import type { ListingListingType, ListingPricePeriod } from "@/types";

function formatPriceInput(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("en-NG").format(value);
}

function parsePriceInput(value: string): number | null {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function getPricePeriodOptions(
  listingType: ListingListingType | ""
): { value: ListingPricePeriod; label: string }[] {
  switch (listingType) {
    case "rent":
      return [
        { value: "year", label: "/ year" },
        { value: "month", label: "/ month" },
      ];
    case "shortlet":
      return [
        { value: "night", label: "/ night" },
        { value: "week", label: "/ week" },
      ];
    case "sale":
    default:
      return [{ value: "one-time", label: "One-time" }];
  }
}

export default function PricingStep() {
  const formData = useListPropertyStore((state) => state.formData);
  const stepErrors = useListPropertyStore((state) => state.stepErrors);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);

  const periodOptions = useMemo(
    () => getPricePeriodOptions(formData.listingType),
    [formData.listingType]
  );

  useEffect(() => {
    if (!formData.pricePeriod && periodOptions.length === 1) {
      updateFormData({ pricePeriod: periodOptions[0].value });
    }
  }, [formData.pricePeriod, periodOptions, updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className={typography.h2}>Pricing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a competitive price to attract qualified enquiries.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
        <div className="space-y-2">
          <FieldLabel htmlFor="price" required>
            Price
          </FieldLabel>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              ₦
            </span>
            <FieldInput
              id="price"
              inputMode="numeric"
              value={formatPriceInput(formData.price)}
              onChange={(e) =>
                updateFormData({ price: parsePriceInput(e.target.value) })
              }
              placeholder="0"
              error={stepErrors.price}
              className="pl-8"
            />
          </div>
          <FieldError message={stepErrors.price} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="pricePeriod" required>
            Price Period
          </FieldLabel>
          <FieldSelect
            id="pricePeriod"
            value={formData.pricePeriod}
            onChange={(e) =>
              updateFormData({
                pricePeriod: e.target.value as ListingPricePeriod,
              })
            }
            error={stepErrors.pricePeriod}
          >
            <option value="">Select period</option>
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FieldSelect>
          <FieldError message={stepErrors.pricePeriod} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={formData.negotiable}
          onChange={(e) => updateFormData({ negotiable: e.target.checked })}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        Price is negotiable
      </label>

      <div className={cn(cardBaseStyles, "bg-primary/5 p-4")}>
        <p className="text-sm font-semibold text-foreground">
          Price comparison
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {getMockPriceRangeLabel(formData.city, formData.area)}
        </p>
        {/* TODO: calculate from real market data when backend is ready */}
      </div>
    </div>
  );
}
