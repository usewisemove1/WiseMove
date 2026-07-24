"use client";

import {
  Droplet,
  ParkingCircle,
  Shield,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  FieldInput,
  FieldLabel,
} from "@/components/list-property/FormFields";
import { LISTING_AMENITY_CATEGORIES } from "@/lib/listPropertyAmenities";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  droplet: Droplet,
  shield: Shield,
  waves: Waves,
  "parking-circle": ParkingCircle,
  wifi: Wifi,
};

export default function AmenitiesStep() {
  const formData = useListPropertyStore((state) => state.formData);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);
  const skipAmenities = useListPropertyStore((state) => state.skipAmenities);

  const toggleAmenity = (label: string, enabled: boolean) => {
    updateFormData({
      amenities: formData.amenities.map((amenity) =>
        amenity.label === label ? { ...amenity, enabled } : amenity
      ),
      amenitiesSkipped: false,
    });
  };

  const updateDescription = (label: string, description: string) => {
    updateFormData({
      amenities: formData.amenities.map((amenity) =>
        amenity.label === label ? { ...amenity, description } : amenity
      ),
      amenitiesSkipped: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className={typography.h2}>Amenities</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Properties with detailed amenities earn higher Trust Scores
          </p>
        </div>
        <button
          type="button"
          onClick={skipAmenities}
          className="text-sm font-medium text-primary hover:underline"
        >
          Skip for now
        </button>
      </div>

      <div className="grid gap-4">
        {LISTING_AMENITY_CATEGORIES.map((category) => {
          const amenity = formData.amenities.find(
            (item) => item.label === category.label
          );
          const enabled = amenity?.enabled ?? false;
          const Icon = iconMap[category.icon] ?? Zap;

          return (
            <div
              key={category.label}
              className={cn(
                cardBaseStyles,
                "space-y-4 p-4",
                enabled && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-foreground">
                    {category.label}
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) =>
                      toggleAmenity(category.label, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  Included
                </label>
              </div>

              {enabled ? (
                <div className="space-y-2">
                  <FieldLabel htmlFor={`amenity-${category.icon}`}>
                    Description
                  </FieldLabel>
                  <FieldInput
                    id={`amenity-${category.icon}`}
                    value={amenity?.description ?? ""}
                    onChange={(e) =>
                      updateDescription(category.label, e.target.value)
                    }
                    placeholder={category.placeholder}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
