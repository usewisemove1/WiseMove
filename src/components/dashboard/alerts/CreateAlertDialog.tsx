"use client";

import { useState } from "react";

import {
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
} from "@/components/list-property/FormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NIGERIAN_CITIES } from "@/lib/constants";
import {
  createAlertSchema,
  zodErrorsToRecord,
  type CreateAlertFormValues,
} from "@/lib/createAlertSchema";
import { cn } from "@/lib/utils";
import { useAlertsStore } from "@/store/useAlertsStore";
import type { AlertFrequency, AlertListingType } from "@/types";

const LISTING_TYPES: { value: AlertListingType; label: string }[] = [
  { value: "sale", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "shortlet", label: "Shortlet" },
];

const FREQUENCIES: { value: AlertFrequency; label: string }[] = [
  { value: "instant", label: "Instant" },
  { value: "daily", label: "Daily digest" },
  { value: "weekly", label: "Weekly digest" },
];

interface CreateAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (message: string) => void;
}

const initialForm: CreateAlertFormValues = {
  location: "",
  listingType: "rent",
  priceMin: null,
  priceMax: null,
  bedrooms: null,
  frequency: "instant",
};

export default function CreateAlertDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateAlertDialogProps) {
  const addSavedSearch = useAlertsStore((state) => state.addSavedSearch);
  const [form, setForm] = useState<CreateAlertFormValues>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useCustomLocation, setUseCustomLocation] = useState(false);

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setUseCustomLocation(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = createAlertSchema.safeParse(form);
    if (!result.success) {
      setErrors(zodErrorsToRecord(result.error));
      return;
    }

    addSavedSearch(result.data);
    onSuccess?.("Alert created successfully");
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) resetForm();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Alert</DialogTitle>
          <DialogDescription>
            Get notified when new listings match your search criteria.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="alert-location" required>
                Location
              </FieldLabel>
              <button
                type="button"
                onClick={() => setUseCustomLocation((value) => !value)}
                className="text-xs font-medium text-primary hover:underline"
              >
                {useCustomLocation ? "Choose from cities" : "Enter custom area"}
              </button>
            </div>

            {useCustomLocation ? (
              <FieldInput
                id="alert-location"
                value={form.location}
                onChange={(e) =>
                  setForm((current) => ({ ...current, location: e.target.value }))
                }
                placeholder="e.g. Lekki Phase 1, Lagos"
                error={errors.location}
              />
            ) : (
              <FieldSelect
                id="alert-location"
                value={form.location}
                onChange={(e) =>
                  setForm((current) => ({ ...current, location: e.target.value }))
                }
                error={errors.location}
              >
                <option value="">Select city</option>
                {NIGERIAN_CITIES.map((city) => (
                  <option key={city} value={`${city}`}>
                    {city}
                  </option>
                ))}
              </FieldSelect>
            )}
            <FieldError message={errors.location} />
          </div>

          <div className="space-y-2">
            <FieldLabel required>Listing Type</FieldLabel>
            <div className="grid grid-cols-3 gap-2">
              {LISTING_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setForm((current) => ({ ...current, listingType: type.value }))
                  }
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                    form.listingType === type.value
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-muted-foreground hover:bg-muted"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <FieldError message={errors.listingType} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="price-min">Min Price (₦)</FieldLabel>
              <FieldInput
                id="price-min"
                type="number"
                min={0}
                value={form.priceMin ?? ""}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    priceMin: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="price-max">Max Price (₦)</FieldLabel>
              <FieldInput
                id="price-max"
                type="number"
                min={0}
                value={form.priceMax ?? ""}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    priceMax: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
            <FieldSelect
              id="bedrooms"
              value={form.bedrooms ?? ""}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  bedrooms: e.target.value ? Number(e.target.value) : null,
                }))
              }
            >
              <option value="">Any</option>
              {[0, 1, 2, 3, 4, 5, 6].map((count) => (
                <option key={count} value={count}>
                  {count === 0 ? "Studio" : `${count}+`}
                </option>
              ))}
            </FieldSelect>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="frequency" required>
              Alert Frequency
            </FieldLabel>
            <FieldSelect
              id="frequency"
              value={form.frequency}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  frequency: e.target.value as AlertFrequency,
                }))
              }
            >
              {FREQUENCIES.map((frequency) => (
                <option key={frequency.value} value={frequency.value}>
                  {frequency.label}
                </option>
              ))}
            </FieldSelect>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Create Alert
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
