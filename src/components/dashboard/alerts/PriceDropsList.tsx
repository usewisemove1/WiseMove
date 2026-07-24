"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  calculatePriceDropPercent,
  getPricePeriodSuffix,
} from "@/lib/alertUtils";
import { formatRelativeTime } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn, formatPrice } from "@/lib/utils";
import { useAlertsStore } from "@/store/useAlertsStore";

export default function PriceDropsList() {
  const priceDrops = useAlertsStore((state) => state.priceDrops);
  const togglePriceDropTracking = useAlertsStore(
    (state) => state.togglePriceDropTracking
  );

  if (priceDrops.length === 0) {
    return (
      <div
        className={cn(
          cardBaseStyles,
          "flex flex-col items-center justify-center px-6 py-16 text-center"
        )}
      >
        <TrendingDown
          className="h-10 w-10 text-muted-foreground/60"
          aria-hidden="true"
        />
        <p className="mt-4 text-lg font-semibold text-foreground">
          No price drops yet
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ll notify you when prices change on your saved properties.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/dashboard?view=saved">Browse Saved Properties</Link>
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {priceDrops.map((alert) => {
        const dropPercent = calculatePriceDropPercent(
          alert.originalPrice,
          alert.newPrice
        );
        const period = getPricePeriodSuffix(alert.priceType);

        return (
          <li
            key={alert.id}
            className={cn(
              cardBaseStyles,
              "flex flex-col gap-4 p-4 lg:flex-row lg:items-center",
              !alert.isTrackingEnabled && "opacity-70"
            )}
          >
            <div className="flex min-w-0 flex-1 gap-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={alert.propertyImage}
                  alt={alert.propertyTitle}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  {alert.propertyTitle}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {alert.propertyCity}, {alert.propertyState}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(alert.originalPrice, "NGN")}
                    {period}
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {formatPrice(alert.newPrice, "NGN")}
                    {period}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                    <TrendingDown className="h-3 w-3" aria-hidden="true" />-
                    {dropPercent}%
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {formatRelativeTime(alert.droppedAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Switch
                  checked={alert.isTrackingEnabled}
                  onCheckedChange={() => togglePriceDropTracking(alert.id)}
                  aria-label={`Toggle price tracking for ${alert.propertyTitle}`}
                />
                Tracking
              </label>
              <Button asChild variant="outline" size="sm">
                <Link href={`/property/${alert.propertyId}`}>View Property</Link>
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
