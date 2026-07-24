"use client";

import { Check } from "lucide-react";

import { LIST_PROPERTY_STEPS } from "@/store/useListPropertyStore";
import { cn } from "@/lib/utils";
import type { ListPropertyStep } from "@/types";

interface WizardStepperProps {
  currentStep: ListPropertyStep;
  completedSteps: ListPropertyStep[];
  onStepClick: (step: ListPropertyStep) => void;
}

export default function WizardStepper({
  currentStep,
  completedSteps,
  onStepClick,
}: WizardStepperProps) {
  const progress = ((currentStep - 1) / (LIST_PROPERTY_STEPS.length - 1)) * 100;
  const currentLabel =
    LIST_PROPERTY_STEPS.find((item) => item.step === currentStep)?.label ?? "";

  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            Step {currentStep} of {LIST_PROPERTY_STEPS.length}
          </span>
          <span className="text-muted-foreground">{currentLabel}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ol className="hidden gap-2 md:grid md:grid-cols-6">
        {LIST_PROPERTY_STEPS.map(({ step, label }) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = currentStep === step;
          const isClickable = step <= currentStep;

          return (
            <li key={step}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step)}
                className={cn(
                  "flex w-full flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-colors",
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : isCompleted
                      ? "border-primary/30 bg-white hover:bg-primary/5"
                      : "border-border bg-white",
                  step > currentStep && "cursor-not-allowed opacity-50",
                  isClickable && step !== currentStep && "hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    isCurrent
                      ? "bg-primary text-white"
                      : isCompleted
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    step
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium leading-tight",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
