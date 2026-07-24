import { create } from "zustand";

import { createDefaultAmenities } from "@/lib/listPropertyAmenities";
import {
  amenitiesSchema,
  basicInfoSchema,
  locationSchema,
  photosSchema,
  pricingSchema,
  zodErrorsToRecord,
} from "@/lib/listPropertySchemas";
import type { ListingFormData, ListPropertyStep } from "@/types";

export const LIST_PROPERTY_STEPS = [
  { step: 1 as const, label: "Basic Info" },
  { step: 2 as const, label: "Location" },
  { step: 3 as const, label: "Photos" },
  { step: 4 as const, label: "Pricing" },
  { step: 5 as const, label: "Amenities" },
  { step: 6 as const, label: "Review & Submit" },
];

export const initialListingFormData = (): ListingFormData => ({
  title: "",
  propertyType: "",
  listingType: "",
  bedrooms: null,
  bathrooms: null,
  size: null,
  sizeUnit: "sqm",
  description: "",
  addressLine: "",
  city: "Lagos",
  area: "",
  latitude: null,
  longitude: null,
  photos: [],
  price: null,
  pricePeriod: "",
  negotiable: false,
  amenities: createDefaultAmenities(),
  amenitiesSkipped: false,
  ownershipProof: null,
});

interface ListPropertyState {
  currentStep: ListPropertyStep;
  completedSteps: ListPropertyStep[];
  formData: ListingFormData;
  stepErrors: Record<string, string>;
  isSubmitted: boolean;
  submittedListingId: string | null;
  updateFormData: (partial: Partial<ListingFormData>) => void;
  setStep: (step: ListPropertyStep) => void;
  goToStep: (step: ListPropertyStep) => void;
  validateCurrentStep: () => boolean;
  goNext: () => boolean;
  goBack: () => void;
  skipAmenities: () => void;
  submitListing: () => void;
  resetWizard: () => void;
}

function markStepCompleted(
  completedSteps: ListPropertyStep[],
  step: ListPropertyStep
): ListPropertyStep[] {
  return completedSteps.includes(step)
    ? completedSteps
    : [...completedSteps, step];
}

function validateStep(
  step: ListPropertyStep,
  formData: ListingFormData
): Record<string, string> {
  switch (step) {
    case 1: {
      const result = basicInfoSchema.safeParse({
        title: formData.title,
        propertyType: formData.propertyType || undefined,
        listingType: formData.listingType || undefined,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        size: formData.size,
        sizeUnit: formData.sizeUnit,
        description: formData.description,
      });
      return result.success ? {} : zodErrorsToRecord(result.error);
    }
    case 2: {
      const result = locationSchema.safeParse({
        addressLine: formData.addressLine,
        city: formData.city,
        area: formData.area,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
      return result.success ? {} : zodErrorsToRecord(result.error);
    }
    case 3: {
      const result = photosSchema.safeParse({ photos: formData.photos });
      return result.success ? {} : zodErrorsToRecord(result.error);
    }
    case 4: {
      const result = pricingSchema.safeParse({
        price: formData.price,
        pricePeriod: formData.pricePeriod || undefined,
        negotiable: formData.negotiable,
      });
      return result.success ? {} : zodErrorsToRecord(result.error);
    }
    case 5: {
      amenitiesSchema.safeParse({
        amenities: formData.amenities,
        amenitiesSkipped: formData.amenitiesSkipped,
      });
      return {};
    }
    case 6:
    default:
      return {};
  }
}

export const useListPropertyStore = create<ListPropertyState>((set, get) => ({
  currentStep: 1,
  completedSteps: [],
  formData: initialListingFormData(),
  stepErrors: {},
  isSubmitted: false,
  submittedListingId: null,

  updateFormData: (partial) =>
    set((state) => ({
      formData: { ...state.formData, ...partial },
      stepErrors: {},
    })),

  setStep: (step) => set({ currentStep: step, stepErrors: {} }),

  goToStep: (step) => {
    const { currentStep } = get();
    if (step <= currentStep) {
      set({ currentStep: step, stepErrors: {} });
    }
  },

  validateCurrentStep: () => {
    const { currentStep, formData } = get();
    const stepErrors = validateStep(currentStep, formData);
    set({ stepErrors });
    return Object.keys(stepErrors).length === 0;
  },

  goNext: () => {
    const { currentStep, completedSteps, formData } = get();
    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      set({ stepErrors });
      return false;
    }

    const nextStep = Math.min(6, currentStep + 1) as ListPropertyStep;
    set({
      currentStep: nextStep,
      completedSteps: markStepCompleted(completedSteps, currentStep),
      stepErrors: {},
    });
    return true;
  },

  goBack: () => {
    const { currentStep } = get();
    if (currentStep <= 1) return;
    set({
      currentStep: (currentStep - 1) as ListPropertyStep,
      stepErrors: {},
    });
  },

  skipAmenities: () => {
    const { completedSteps } = get();
    set({
      formData: { ...get().formData, amenitiesSkipped: true },
      currentStep: 6,
      completedSteps: markStepCompleted(completedSteps, 5),
      stepErrors: {},
    });
  },

  submitListing: () => {
    // TODO: POST to API when backend is ready
    set({
      isSubmitted: true,
      submittedListingId: `listing-${Date.now()}`,
      completedSteps: [1, 2, 3, 4, 5, 6],
    });
  },

  resetWizard: () =>
    set({
      currentStep: 1,
      completedSteps: [],
      formData: initialListingFormData(),
      stepErrors: {},
      isSubmitted: false,
      submittedListingId: null,
    }),
}));
