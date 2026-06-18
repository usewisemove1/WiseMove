import {
  Droplet,
  ParkingCircle,
  Shield,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { DetailedAmenity } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  droplet: Droplet,
  shield: Shield,
  waves: Waves,
  "parking-circle": ParkingCircle,
  wifi: Wifi,
};

interface AmenitiesGridProps {
  amenities: DetailedAmenity[];
  className?: string;
}

export default function AmenitiesGrid({
  amenities,
  className,
}: AmenitiesGridProps) {
  return (
    <section className={cn("space-y-5", className)}>
      <h2 className={typography.h2}>Detailed Amenities</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {amenities.map((amenity) => {
          const Icon = iconMap[amenity.icon] ?? Zap;

          return (
            <div
              key={amenity.label}
              className="flex gap-3.5 rounded-xl border border-border/60 bg-white p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-foreground">{amenity.label}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {amenity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
