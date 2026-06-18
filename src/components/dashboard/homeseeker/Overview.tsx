"use client";

import Link from "next/link";
import { Bell, Eye, Heart } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import PropertyCard from "@/components/property/PropertyCard";
import {
  MOCK_HOME_SEEKER_STATS,
  MOCK_RECENTLY_VIEWED,
} from "@/lib/mockDashboardData";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomeSeekerOverview() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? user?.name.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your property search.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Heart}
          value={MOCK_HOME_SEEKER_STATS.savedCount}
          label="Saved Properties"
        />
        <StatCard
          icon={Bell}
          value={MOCK_HOME_SEEKER_STATS.activeAlerts}
          label="Active Alerts"
        />
        <StatCard
          icon={Eye}
          value={MOCK_HOME_SEEKER_STATS.propertiesViewed}
          label="Properties Viewed"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Recently Viewed</h2>
          <Link
            href="/dashboard?view=activity"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MOCK_RECENTLY_VIEWED.map((property) => (
            <div key={property.id} className="w-[260px] shrink-0 sm:w-[280px]">
              <PropertyCard property={property} layout="similar" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
