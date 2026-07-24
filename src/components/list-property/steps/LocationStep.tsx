"use client";

import PinDropMapView from "@/components/list-property/PinDropMapView";
import {
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
} from "@/components/list-property/FormFields";
import { NIGERIAN_CITIES } from "@/lib/constants";
import { typography } from "@/lib/typography";
import { useListPropertyStore } from "@/store/useListPropertyStore";

export default function LocationStep() {
  const formData = useListPropertyStore((state) => state.formData);
  const stepErrors = useListPropertyStore((state) => state.stepErrors);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);

  return (
    <div className="space-y-6">
      <div>
        <h2 className={typography.h2}>Location</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Help buyers find your property with an accurate address and GPS pin.
        </p>
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="addressLine" required>
          Address Line
        </FieldLabel>
        <FieldInput
          id="addressLine"
          value={formData.addressLine}
          onChange={(e) => updateFormData({ addressLine: e.target.value })}
          placeholder="e.g. 14 Ocean Parade Tower, Eko Atlantic City"
          error={stepErrors.addressLine}
        />
        <FieldError message={stepErrors.addressLine} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="city" required>
            City
          </FieldLabel>
          <FieldSelect
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            error={stepErrors.city}
          >
            {NIGERIAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </FieldSelect>
          <FieldError message={stepErrors.city} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="area" required>
            Area / Neighbourhood
          </FieldLabel>
          <FieldInput
            id="area"
            value={formData.area}
            onChange={(e) => updateFormData({ area: e.target.value })}
            placeholder="e.g. Lekki Phase 1"
            error={stepErrors.area}
          />
          <FieldError message={stepErrors.area} />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel required>GPS Pin</FieldLabel>
        <p className="text-sm text-muted-foreground">
          Adding an accurate GPS pin significantly boosts your Trust Score
        </p>
        <PinDropMapView
          city={formData.city}
          latitude={formData.latitude}
          longitude={formData.longitude}
          onPinChange={(latitude, longitude) =>
            updateFormData({ latitude, longitude })
          }
        />
        <FieldError message={stepErrors.latitude || stepErrors.longitude} />
      </div>
    </div>
  );
}
