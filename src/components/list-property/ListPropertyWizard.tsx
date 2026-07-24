"use client";

import PageShell from "@/components/layout/PageShell";
import AmenitiesStep from "@/components/list-property/steps/AmenitiesStep";
import BasicInfoStep from "@/components/list-property/steps/BasicInfoStep";
import LocationStep from "@/components/list-property/steps/LocationStep";
import PhotosStep from "@/components/list-property/steps/PhotosStep";
import PricingStep from "@/components/list-property/steps/PricingStep";
import ReviewStep, {
  ListingSuccessState,
} from "@/components/list-property/steps/ReviewStep";
import TrustScorePreview from "@/components/list-property/TrustScorePreview";
import WizardStepper from "@/components/list-property/WizardStepper";
import { Button } from "@/components/ui/button";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";
import type { ListPropertyStep } from "@/types";

function StepContent({ step }: { step: ListPropertyStep }) {
  switch (step) {
    case 1:
      return <BasicInfoStep />;
    case 2:
      return <LocationStep />;
    case 3:
      return <PhotosStep />;
    case 4:
      return <PricingStep />;
    case 5:
      return <AmenitiesStep />;
    case 6:
    default:
      return <ReviewStep />;
  }
}

export default function ListPropertyWizard() {
  const currentStep = useListPropertyStore((state) => state.currentStep);
  const completedSteps = useListPropertyStore((state) => state.completedSteps);
  const isSubmitted = useListPropertyStore((state) => state.isSubmitted);
  const goNext = useListPropertyStore((state) => state.goNext);
  const goBack = useListPropertyStore((state) => state.goBack);
  const goToStep = useListPropertyStore((state) => state.goToStep);
  const submitListing = useListPropertyStore((state) => state.submitListing);

  if (isSubmitted) {
    return (
      <PageShell dataComponent="list-property" innerClassName="py-10 sm:py-14">
        <ListingSuccessState />
      </PageShell>
    );
  }

  const handlePrimaryAction = () => {
    if (currentStep === 6) {
      submitListing();
      return;
    }
    goNext();
  };

  return (
    <PageShell dataComponent="list-property" innerClassName="py-8 sm:py-10">
      <div className="mb-8 space-y-2">
        <h1 className={typography.h1}>List your property</h1>
        <p className={typography.caption}>
          Complete each step to publish a verified, high-trust listing on
          WiseMove.
        </p>
      </div>

      <WizardStepper
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      <div className="mt-8 lg:hidden">
        <TrustScorePreview compact />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className={cn(cardBaseStyles, "p-5 sm:p-8")}>
          <StepContent step={currentStep} />

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button type="button" onClick={handlePrimaryAction}>
              {currentStep === 6 ? "Submit Listing" : "Next"}
            </Button>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TrustScorePreview />
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
