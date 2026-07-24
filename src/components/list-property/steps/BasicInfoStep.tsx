"use client";

import { Minus, Plus } from "lucide-react";

import {
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
  FieldTextarea,
} from "@/components/list-property/FormFields";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";
import type { ListingListingType, PropertyStructureType } from "@/types";

const PROPERTY_TYPES: { value: PropertyStructureType; label: string }[] = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const LISTING_TYPES: { value: ListingListingType; label: string }[] = [
  { value: "sale", label: "Sale" },
  { value: "rent", label: "Rent" },
  { value: "shortlet", label: "Shortlet" },
];

function NumberStepper({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
}) {
  const current = value ?? 0;

  return (
    <div className="space-y-2">
      <FieldLabel required>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, current - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-input hover:bg-muted"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <FieldInput
          type="number"
          min={0}
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          error={error}
          className="text-center"
        />
        <button
          type="button"
          onClick={() => onChange(current + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-input hover:bg-muted"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function BasicInfoStep() {
  const formData = useListPropertyStore((state) => state.formData);
  const stepErrors = useListPropertyStore((state) => state.stepErrors);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);

  return (
    <div className="space-y-6">
      <div>
        <h2 className={typography.h2}>Basic Info</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell buyers and renters what makes your property stand out.
        </p>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="title" required>
          Property Title
        </FieldLabel>
        <FieldInput
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="e.g. Luxury 4-Bed Penthouse with Ocean Views"
          error={stepErrors.title}
        />
        <FieldError message={stepErrors.title} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="propertyType" required>
            Property Type
          </FieldLabel>
          <FieldSelect
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) =>
              updateFormData({
                propertyType: e.target.value as PropertyStructureType,
              })
            }
            error={stepErrors.propertyType}
          >
            <option value="">Select type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </FieldSelect>
          <FieldError message={stepErrors.propertyType} />
        </div>

        <div className="space-y-2">
          <FieldLabel required>Listing Type</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {LISTING_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => updateFormData({ listingType: type.value })}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                  formData.listingType === type.value
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-muted-foreground hover:bg-muted"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
          <FieldError message={stepErrors.listingType} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberStepper
          label="Bedrooms"
          value={formData.bedrooms}
          onChange={(bedrooms) => updateFormData({ bedrooms })}
          error={stepErrors.bedrooms}
        />
        <NumberStepper
          label="Bathrooms"
          value={formData.bathrooms}
          onChange={(bathrooms) => updateFormData({ bathrooms })}
          error={stepErrors.bathrooms}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="size" required>
          Square Footage / Size
        </FieldLabel>
        <div className="flex gap-2">
          <FieldInput
            id="size"
            type="number"
            min={1}
            value={formData.size ?? ""}
            onChange={(e) => updateFormData({ size: Number(e.target.value) })}
            placeholder="e.g. 240"
            error={stepErrors.size}
            className="flex-1"
          />
          <div className="flex overflow-hidden rounded-md border border-input">
            {(["sqm", "sqft"] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => updateFormData({ sizeUnit: unit })}
                className={cn(
                  "px-3 text-sm font-semibold",
                  formData.sizeUnit === unit
                    ? "bg-primary text-white"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>
        <FieldError message={stepErrors.size} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <FieldLabel htmlFor="description" required>
            Description
          </FieldLabel>
          <span className="text-xs text-muted-foreground">
            {formData.description.length}/100 min
          </span>
        </div>
        <FieldTextarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Describe the property, neighbourhood, finishes, and nearby amenities..."
          error={stepErrors.description}
        />
        <FieldError message={stepErrors.description} />
        <p className="text-xs text-muted-foreground">
          Min 100 characters for a better Trust Score
        </p>
      </div>
    </div>
  );
}
