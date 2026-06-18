"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { cardBaseStyles, cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";

export default function SavedProperties() {
  const savedProperties = usePropertyStore((s) => s.savedProperties);

  if (savedProperties.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Saved Properties
        </h1>
        <div
          className={cn(
            cardBaseStyles,
            "flex flex-col items-center justify-center px-6 py-16 text-center"
          )}
        >
          <p className="text-lg font-semibold text-foreground">
            No saved properties yet
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Browse listings and tap the heart icon to save properties you&apos;re
            interested in.
          </p>
          <Button asChild className="mt-6">
            <Link href="/search">
              <Search className="h-4 w-4" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Saved Properties
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {savedProperties.length} propert
          {savedProperties.length === 1 ? "y" : "ies"} saved
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {savedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} layout="grid" />
        ))}
      </div>
    </div>
  );
}
