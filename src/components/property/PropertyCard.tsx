"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  Bed,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Pencil,
  Shield,
  Square,
  TrendingDown,
} from "lucide-react";

import { cardBaseStyles, cn, formatPrice } from "@/lib/utils";
import { getMockPropertyImage } from "@/lib/mockImages";
import { getPricePeriodSuffix } from "@/lib/mockPropertyDetail";
import VerifiedBadge from "@/components/trust/VerifiedBadge";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { AgentListingMetrics, Property } from "@/types";

function propertyImageUrl(property: Property): string {
  if (property.images[0]) return property.images[0];
  const index = property.id
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return getMockPropertyImage(index);
}

interface PropertyCardProps {
  property: Property;
  currencyCode?: string;
  layout?: "grid" | "list" | "search" | "similar";
  agentView?: boolean;
  agentMetrics?: AgentListingMetrics;
  isHighlighted?: boolean;
  onHover?: (id: string | null) => void;
  id?: string;
}

function formatListedAgo(date: Date): string {
  const days = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (days <= 0) return "Listed today";
  if (days === 1) return "Listed 1 day ago";
  return `Listed ${days} days ago`;
}

function sqmFromSqft(sqft: number): number {
  return Math.round(sqft * 0.0929);
}

function AgentPropertyCard({
  property,
  currencyCode,
  agentMetrics,
}: {
  property: Property;
  currencyCode: string;
  agentMetrics?: AgentListingMetrics;
}) {
  const imageUrl = propertyImageUrl(property);
  const views = agentMetrics?.viewCount ?? 0;
  const inquiries = agentMetrics?.inquiryCount ?? 0;

  return (
    <article
      className={cn(
        cardBaseStyles,
        "group overflow-hidden p-0 transition-all duration-200"
      )}
    >
      <Link href={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {property.isVerified && (
            <div className="absolute left-3 top-3 z-10">
              <VerifiedBadge verified size="sm" />
            </div>
          )}
        </div>
        <div className="space-y-1 p-4">
          <p className="text-lg font-bold text-foreground">
            {formatPrice(property.price, currencyCode)}
          </p>
          <h3 className="line-clamp-1 text-base font-semibold text-foreground group-hover:text-primary">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {property.city}, {property.state}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 border-t border-border px-4 py-3 text-sm text-muted-foreground">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
          aria-label="Edit listing"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </button>
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-4 w-4" aria-hidden="true" />
          {views.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {inquiries}
        </span>
      </div>
    </article>
  );
}

function SimilarPropertyCard({
  property,
  currencyCode,
}: {
  property: Property;
  currencyCode: string;
}) {
  const { isPropertySaved, saveProperty, unsaveProperty } = usePropertyStore();
  const saved = isPropertySaved(property.id);
  const imageUrl = propertyImageUrl(property);
  const period = getPricePeriodSuffix(property.priceType).replace(
    "year",
    "yr"
  );

  return (
    <article
      className={cn(
        cardBaseStyles,
        "group overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5"
      )}
    >
      <Link href={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
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
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white"
            aria-label={saved ? "Unsave property" : "Save property"}
          >
            <Heart
              className={cn("h-4 w-4", saved && "fill-primary text-primary")}
            />
          </button>
        </div>
        <div className="space-y-1 p-4">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground group-hover:text-primary">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {property.city}, {property.state}
          </p>
          <p className="text-base font-bold text-accent">
            {formatPrice(property.price, currencyCode)}
            {period}
          </p>
        </div>
      </Link>
    </article>
  );
}

function SearchPropertyCard({
  property,
  currencyCode,
  isHighlighted,
  onHover,
  id,
}: {
  property: Property;
  currencyCode: string;
  isHighlighted?: boolean;
  onHover?: (id: string | null) => void;
  id?: string;
}) {
  const { isPropertySaved, saveProperty, unsaveProperty } = usePropertyStore();
  const saved = isPropertySaved(property.id);
  const imageUrl = propertyImageUrl(property);

  return (
    <article
      id={id}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        cardBaseStyles,
        "relative w-full overflow-hidden p-0 transition-all duration-200",
        isHighlighted && "shadow-lg ring-2 ring-primary/30"
      )}
    >
      <Link href={`/property/${property.id}`} className="block w-full">
        <div className="relative h-[200px] w-full overflow-hidden bg-muted sm:h-[220px]">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          />

          <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
            {property.isPriceReduced && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                <TrendingDown className="h-3 w-3" aria-hidden="true" />
                Price Reduced
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8edd9] px-2 py-0.5 text-[11px] font-semibold text-[#3d4f2f] shadow-sm">
              <Shield className="h-3 w-3" aria-hidden="true" />
              Trust Score: {property.trustScore}/100
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (saved) unsaveProperty(property.id);
              else saveProperty(property);
            }}
            className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md transition-colors hover:bg-white"
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                saved ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
          </button>
        </div>

        <div className="space-y-1.5 p-3 pb-11">
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg font-bold leading-tight text-foreground">
              {formatPrice(property.price, currencyCode)}
            </p>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {formatListedAgo(property.listedAt)}
            </span>
          </div>

          <p className="line-clamp-1 text-xs text-muted-foreground">
            <MapPin
              className="mr-1 inline h-3.5 w-3.5 shrink-0 text-foreground/70"
              aria-hidden="true"
            />
            {property.address}, {property.city}, {property.state}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" aria-hidden="true" />
              {property.bedrooms} Beds
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" aria-hidden="true" />
              {property.bathrooms} Baths
            </span>
            <span className="inline-flex items-center gap-1">
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              {sqmFromSqft(property.squareFootage).toLocaleString()} sqm
            </span>
          </div>
        </div>
      </Link>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" />
      </a>
    </article>
  );
}

function PropertyImage({
  property,
  imageUrl,
  layout,
}: {
  property: Property;
  imageUrl: string;
  layout: "grid" | "list";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        layout === "grid"
          ? "aspect-[4/3] w-full"
          : "aspect-[4/3] w-full sm:aspect-auto sm:h-auto sm:min-h-[180px] sm:w-56 sm:shrink-0 lg:w-64"
      )}
    >
      <Image
        src={imageUrl}
        alt={property.title}
        fill
        sizes={
          layout === "grid"
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : "(max-width: 640px) 100vw, 256px"
        }
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {property.isVerified && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          <Shield className="h-3 w-3" aria-hidden="true" />
          Verified Listing
        </span>
      )}

      <div className="absolute bottom-3 right-3 z-10 rounded-md bg-primary px-2.5 py-1.5 text-white shadow-md">
        <p className="text-[9px] font-bold uppercase leading-none tracking-wider opacity-90">
          Trust Score
        </p>
        <p className="mt-0.5 text-sm font-bold leading-none">
          {property.trustScore}
          <span className="text-[10px] font-semibold opacity-80">/100</span>
        </p>
      </div>
    </div>
  );
}

function PropertyDetails({
  property,
  currencyCode,
}: {
  property: Property;
  currencyCode: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-lg font-bold text-foreground">
          {formatPrice(property.price, currencyCode)}
        </p>
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatListedAgo(property.listedAt)}
        </span>
      </div>

      <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary">
        {property.title}
      </h3>

      <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        {property.city}, {property.state}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Bed className="h-4 w-4" aria-hidden="true" />
          {property.bedrooms} Beds
        </span>
        <span
          className="hidden h-3 w-px bg-border sm:inline"
          aria-hidden="true"
        />
        <span className="inline-flex items-center gap-1.5">
          <Bath className="h-4 w-4" aria-hidden="true" />
          {property.bathrooms} Baths
        </span>
        <span
          className="hidden h-3 w-px bg-border sm:inline"
          aria-hidden="true"
        />
        <span className="inline-flex items-center gap-1.5">
          <Square className="h-4 w-4" aria-hidden="true" />
          {sqmFromSqft(property.squareFootage)} sqm
        </span>
      </div>
    </div>
  );
}

export default function PropertyCard({
  property,
  currencyCode = "NGN",
  layout = "grid",
  agentView = false,
  agentMetrics,
  isHighlighted = false,
  onHover,
  id,
}: PropertyCardProps) {
  if (agentView) {
    return (
      <AgentPropertyCard
        property={property}
        currencyCode={currencyCode}
        agentMetrics={agentMetrics}
      />
    );
  }

  if (layout === "search") {
    return (
      <SearchPropertyCard
        property={property}
        currencyCode={currencyCode}
        isHighlighted={isHighlighted}
        onHover={onHover}
        id={id}
      />
    );
  }

  if (layout === "similar") {
    return (
      <SimilarPropertyCard property={property} currencyCode={currencyCode} />
    );
  }

  const imageUrl = propertyImageUrl(property);

  return (
    <Link
      id={id}
      href={`/property/${property.id}`}
      onMouseEnter={() => onHover?.(property.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        cardBaseStyles,
        "group block overflow-hidden transition-all duration-200 hover:-translate-y-0.5",
        layout === "list" && "flex flex-col sm:flex-row",
        isHighlighted && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <PropertyImage property={property} imageUrl={imageUrl} layout={layout} />
      <PropertyDetails property={property} currencyCode={currencyCode} />
    </Link>
  );
}

export function PropertyCardPreview({
  property,
  currencyCode = "NGN",
}: {
  property: Property;
  currencyCode?: string;
}) {
  const imageUrl = propertyImageUrl(property);

  return (
    <div className="w-64 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative h-32 w-full bg-muted">
        <Image src={imageUrl} alt={property.title} fill className="object-cover" />
      </div>
      <div className="space-y-1 p-3">
        <p className="font-bold text-foreground">
          {formatPrice(property.price, currencyCode)}
        </p>
        <p className="line-clamp-1 text-sm font-medium">{property.title}</p>
        <p className="text-xs text-muted-foreground">
          {property.city}, {property.state}
        </p>
        <Link
          href={`/property/${property.id}`}
          className="inline-block pt-1 text-xs font-semibold text-primary hover:underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
