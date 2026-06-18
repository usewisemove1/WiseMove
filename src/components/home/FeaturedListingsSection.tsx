import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/lib/mockProperties";
import PageShell from "@/components/layout/PageShell";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function FeaturedListingsSection() {
  return (
    <section data-component="featured-listings" className="bg-white py-12 sm:py-14 lg:py-16">
      <PageShell dataComponent="featured-listings">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={typography.h2}>Featured Listings</h2>
            <p className={cn(typography.caption, "mt-2 max-w-xl text-base")}>
              Curated premium properties with the highest trust scores.
            </p>
          </div>
          <Link
            href="/search"
            className={cn(
              typography.body,
              "inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
            )}
          >
            View All Listings
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </PageShell>
    </section>
  );
}
