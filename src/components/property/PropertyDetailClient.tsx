"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  Bed,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";

import AgentContactCard from "@/components/agent/AgentContactCard";
import BackToResultsButton from "@/components/agent/BackToResultsButton";
import PageShell from "@/components/layout/PageShell";
import AmenitiesGrid from "@/components/property/AmenitiesGrid";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyGallery from "@/components/property/PropertyGallery";
import TrustScoreBreakdown from "@/components/property/TrustScoreBreakdown";
import { Button } from "@/components/ui/button";
import { getPricePeriodSuffix } from "@/lib/mockPropertyDetail";
import { typography } from "@/lib/typography";
import { cn, formatPrice } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import { useCountryStore } from "@/store/useCountryStore";
import type { Agent, Property } from "@/types";

const PropertyLocationMap = dynamic(
  () => import("@/components/property/PropertyLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[400px] animate-pulse rounded-xl bg-muted"
        aria-label="Loading map"
      />
    ),
  }
);

interface PropertyDetailClientProps {
  property: Property;
  agent: Agent;
  similarProperties: Property[];
}

function PropertyPrice({
  property,
  currencyCode,
  className,
}: {
  property: Property;
  currencyCode: string;
  className?: string;
}) {
  const period = getPricePeriodSuffix(property.priceType);

  return (
    <p className={cn("font-bold text-accent", className)}>
      {formatPrice(property.price, currencyCode)}
      {period && (
        <span className="font-semibold text-accent/90">{period}</span>
      )}
    </p>
  );
}

function PropertySidebar({
  property,
  agent,
  currencyCode,
}: {
  property: Property;
  agent: Agent;
  currencyCode: string;
}) {
  return (
    <div className="space-y-4">
      <PropertyPrice
        property={property}
        currencyCode={currencyCode}
        className="text-3xl lg:text-[2rem] lg:leading-tight"
      />
      {property.detailTrustBreakdown && (
        <TrustScoreBreakdown breakdown={property.detailTrustBreakdown} />
      )}
      <AgentContactCard agent={agent} property={property} />
    </div>
  );
}

export default function PropertyDetailClient({
  property,
  agent,
  similarProperties,
}: PropertyDetailClientProps) {
  const { selectedCountry } = useCountryStore();
  const { isPropertySaved, saveProperty, unsaveProperty } = usePropertyStore();
  const [toast, setToast] = useState<string | null>(null);

  const saved = isPropertySaved(property.id);
  const currencyCode = selectedCountry.currency;
  const searchLocation = encodeURIComponent(`${property.state}, Nigeria`);
  const rentalsLabel = `${property.state} Rentals`;

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const shareData = {
      title: property.title,
      text: `Check out ${property.title} on WiseMove`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Unable to share link");
    }
  }, [property.title, showToast]);

  const handleSave = useCallback(() => {
    if (saved) {
      unsaveProperty(property.id);
      showToast("Removed from saved properties");
    } else {
      saveProperty(property);
      showToast("Saved to your properties");
    }
  }, [property, saveProperty, saved, showToast, unsaveProperty]);

  const bathroomLabel =
    property.bathrooms % 1 === 0
      ? String(property.bathrooms)
      : String(property.bathrooms);

  const descriptionParagraphs = property.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div data-component="property-detail" className="bg-background">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lg"
        >
          {toast}
        </div>
      )}

      <PageShell dataComponent="property-detail" innerClassName="py-5">
        <div className="mb-4">
          <BackToResultsButton label="Back to search results" fallback="/search" />
        </div>
        {/* Breadcrumb + actions */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/60">
                &gt;
              </li>
              <li>
                <Link
                  href={`/search?location=${searchLocation}`}
                  className="hover:text-foreground"
                >
                  {rentalsLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/60">
                &gt;
              </li>
              <li className="truncate font-medium text-foreground">
                {property.title}
              </li>
            </ol>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2 rounded-lg border-border bg-white px-4 font-medium shadow-sm"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSave}
              className={cn(
                "gap-2 rounded-lg border-border bg-white px-4 font-medium shadow-sm",
                saved && "border-primary/40 text-primary"
              )}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-primary")} />
              Save
            </Button>
          </div>
        </div>

        {/* Gallery — full width */}
        <PropertyGallery
          images={property.images}
          title={property.title}
          isOwnershipVerified={property.isOwnershipVerified}
        />

        {/* Two-column content */}
        <div className="mt-8 lg:flex lg:items-start lg:gap-12">
          {/* Left column */}
          <div className="min-w-0 flex-1 space-y-8 lg:max-w-[62%]">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-foreground/70"
                    aria-hidden="true"
                  />
                  {property.city}, {property.state}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Bed
                    className="h-4 w-4 shrink-0 text-foreground/70"
                    aria-hidden="true"
                  />
                  {property.bedrooms} Bedrooms
                </span>
                <span className="inline-flex items-center gap-2">
                  <Bath
                    className="h-4 w-4 shrink-0 text-foreground/70"
                    aria-hidden="true"
                  />
                  {bathroomLabel} Baths
                </span>
              </div>
            </div>

            {/* Mobile sidebar — price + trust + agent */}
            <div className="lg:hidden">
              <PropertySidebar
                property={property}
                agent={agent}
                currencyCode={currencyCode}
              />
            </div>

            <section className="space-y-4">
              <h2 className={typography.h2}>Property Description</h2>
              <div className="space-y-4">
                {descriptionParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-foreground/90"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {property.detailedAmenities && (
              <AmenitiesGrid amenities={property.detailedAmenities} />
            )}
          </div>

          {/* Right sidebar — desktop */}
          <aside className="hidden lg:block lg:w-[340px] lg:shrink-0 xl:w-[380px]">
            <div className="sticky top-24">
              <PropertySidebar
                property={property}
                agent={agent}
                currencyCode={currencyCode}
              />
            </div>
          </aside>
        </div>

        {/* Full-width sections */}
        <section className="mt-10 space-y-4">
          <h2 className={typography.h2}>Location</h2>
          <PropertyLocationMap property={property} />
        </section>

        <section className="mt-10 space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={typography.h2}>Similar Properties</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Recommended based on your interest in {property.city}
              </p>
            </div>
            <Link
              href={`/search?location=${encodeURIComponent(property.city)}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary"
            >
              See All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similarProperties.map((similar) => (
              <PropertyCard
                key={similar.id}
                property={similar}
                currencyCode={currencyCode}
                layout="similar"
              />
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  );
}
