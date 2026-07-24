"use client";

import { Check, Circle } from "lucide-react";

import TrustScore from "@/components/trust/TrustScore";
import { calculateListingTrustScore } from "@/lib/listPropertyTrustScore";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";

interface TrustScorePreviewProps {
  className?: string;
  compact?: boolean;
}

export default function TrustScorePreview({
  className,
  compact = false,
}: TrustScorePreviewProps) {
  const formData = useListPropertyStore((state) => state.formData);
  const { score, factors } = calculateListingTrustScore(formData);

  return (
    <div className={cn(cardBaseStyles, "p-5", className)}>
      <div className={cn("flex items-center gap-4", compact ? "flex-row" : "flex-col sm:flex-row")}>
        <TrustScore score={score} size={compact ? "md" : "lg"} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            Trust Score Preview
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Complete each section to maximize your listing visibility and buyer
            confidence.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {factors.map((factor) => (
          <li
            key={factor.id}
            className="flex items-start gap-2 text-sm"
          >
            {factor.achieved ? (
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
            ) : (
              <Circle
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                factor.achieved ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {factor.label}{" "}
              <span className="font-semibold text-primary">
                +{factor.points}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
