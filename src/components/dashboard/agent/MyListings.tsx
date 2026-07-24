import Link from "next/link";
import { LockKeyhole, Plus, ShieldCheck } from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { MOCK_AGENT_LISTINGS } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useAgentVerificationStore } from "@/store/useAgentVerificationStore";

export default function MyListings() {
  const status = useAgentVerificationStore((s) => s.status);
  const canList = status === "approved";
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            My Listings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {MOCK_AGENT_LISTINGS.length} active listings
          </p>
        </div>
      </div>

      {!canList && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><div><p className="font-semibold text-foreground">Verification required to publish</p><p className="text-sm text-muted-foreground">{status === "in_review" ? "Your documents are being reviewed. Property uploads will unlock once approved." : "Verify your professional details before uploading a property."}</p></div></div>
          <Link href="/agent/verification" className="shrink-0 text-sm font-bold text-primary hover:underline">{status === "in_review" ? "View status" : "Start verification"}</Link>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href={canList ? "/list-property" : "/agent/verification"}
          className={cn(
            cardBaseStyles,
            "flex min-h-[280px] flex-col items-center justify-center gap-2 border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/10"
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {canList ? <Plus className="h-6 w-6" aria-hidden="true" /> : <LockKeyhole className="h-6 w-6" aria-hidden="true" />}
          </div>
          <p className="font-semibold text-primary">{canList ? "Add New Listing" : "Verify to add listings"}</p>
          <p className="text-xs text-muted-foreground">
            List a new property on WiseMove
          </p>
        </Link>

        {MOCK_AGENT_LISTINGS.map((listing) => (
          <PropertyCard
            key={listing.id}
            property={listing}
            layout="grid"
            agentView
            agentMetrics={listing.agentMetrics}
          />
        ))}
      </div>
    </div>
  );
}
