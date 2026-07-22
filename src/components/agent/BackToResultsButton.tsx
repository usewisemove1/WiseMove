"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackToResultsButton({
  label = "Back to results",
  fallback = "/search",
}: {
  label?: string;
  fallback?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => window.history.length > 1 ? router.back() : router.push(fallback)}
      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
