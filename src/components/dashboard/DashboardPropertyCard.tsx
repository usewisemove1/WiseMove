"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Heart, Square } from "lucide-react";

import VerifiedBadge from "@/components/trust/VerifiedBadge";
import { getMockPropertyImage } from "@/lib/mockImages";
import { cardBaseStyles, cn, formatPrice } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { Property } from "@/types";

function propertyImageUrl(property: Property): string {
  if (property.images[0]) return property.images[0];
  const index = property.id
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return getMockPropertyImage(index);
}

function sqmFromSqft(sqft: number): number {
  return Math.round(sqft * 0.0929);
}

interface DashboardPropertyCardProps {
  property: Property;
  currencyCode?: string;
}

export default function DashboardPropertyCard({
  property,
  currencyCode = "NGN",
}: DashboardPropertyCardProps) {
  const { isPropertySaved, saveProperty, unsaveProperty } = usePropertyStore();
  const saved = isPropertySaved(property.id);
  const imageUrl = propertyImageUrl(property);

  return (
    <article
      className={cn(
        cardBaseStyles,
        "group flex h-full flex-col overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5"
      )}
    >
      <Link
        href={`/property/${property.id}`}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 280px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {property.isVerified && (
            <div className="absolute left-3 top-3 z-10">
              <VerifiedBadge verified size="sm" />
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (saved) unsaveProperty(property.id);
              else saveProperty(property);
            }}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md transition-colors hover:bg-white"
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                saved ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
          </button>

          <div className="absolute bottom-3 right-3 z-10 rounded-md bg-primary px-2 py-1 text-white shadow-md">
            <p className="text-[9px] font-bold uppercase leading-none tracking-wider opacity-90">
              Trust Score
            </p>
            <p className="mt-0.5 text-sm font-bold leading-none">
              {property.trustScore}
              <span className="text-[10px] font-semibold opacity-80">/100</span>
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-lg font-bold leading-tight text-foreground">
            {formatPrice(property.price, currencyCode)}
          </p>

          <h3 className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">
            {property.title}
          </h3>

          <p className="line-clamp-1 text-sm text-muted-foreground">
            {property.city}, {property.state}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" aria-hidden="true" />
              {property.bedrooms} Bed
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" aria-hidden="true" />
              {property.bathrooms} Bath
            </span>
            <span className="inline-flex items-center gap-1">
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              {sqmFromSqft(property.squareFootage)}m²
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
