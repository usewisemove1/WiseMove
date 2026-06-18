import { Check } from "lucide-react";

import { computeDetailTrustScore } from "@/lib/mockPropertyDetail";
import { cn } from "@/lib/utils";
import type { DetailTrustBreakdown } from "@/types";

const METRICS: {
  key: keyof DetailTrustBreakdown;
  label: string;
}[] = [
  { key: "ownership", label: "Ownership" },
  { key: "verifiedAgent", label: "Verified Agent" },
  { key: "gpsAddress", label: "GPS Address" },
  { key: "photosIntegrity", label: "Photos Integrity" },
];

interface TrustScoreBreakdownProps {
  breakdown: DetailTrustBreakdown;
  className?: string;
}

export default function TrustScoreBreakdown({
  breakdown,
  className,
}: TrustScoreBreakdownProps) {
  const overallScore = computeDetailTrustScore(breakdown);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-primary/20 bg-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-5">
        <p className="text-sm font-semibold text-foreground">Trust Score</p>
        <span className="rounded-lg bg-primary px-3.5 py-1.5 text-lg font-bold text-white">
          {overallScore}
        </span>
      </div>

      <ul className="space-y-3 px-5 pb-4">
        {METRICS.map(({ key, label }) => (
          <li key={key} className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="flex-1 text-sm text-foreground">{label}</span>
            <span className="text-sm font-bold text-foreground">
              {breakdown[key]}%
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-border px-5 py-3 text-xs italic leading-relaxed text-muted-foreground">
        All documents for this property have been physically verified by Amaafi
        legal team.
      </p>
    </div>
  );
}
