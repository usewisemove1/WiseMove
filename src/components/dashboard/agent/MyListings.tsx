import Link from "next/link";
import { Plus } from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { MOCK_AGENT_LISTINGS } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";

export default function MyListings() {
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

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/dashboard/listings/new"
          className={cn(
            cardBaseStyles,
            "flex min-h-[280px] flex-col items-center justify-center gap-2 border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center transition-colors hover:border-primary/50 hover:bg-primary/10"
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Plus className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="font-semibold text-primary">Add New Listing</p>
          <p className="text-xs text-muted-foreground">
            List a new property on Amaafi
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
