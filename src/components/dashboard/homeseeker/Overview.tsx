"use client";

import Link from "next/link";
import { Bell, Heart, Search } from "lucide-react";

import DashboardPropertyCard from "@/components/dashboard/DashboardPropertyCard";
import StatCard from "@/components/dashboard/StatCard";
import OverviewAlertsPanel from "@/components/dashboard/homeseeker/OverviewAlertsPanel";
import OverviewSearchesPanel from "@/components/dashboard/homeseeker/OverviewSearchesPanel";
import {
  MOCK_HOME_SEEKER_STATS,
  MOCK_SAVED_PROPERTIES,
} from "@/lib/mockDashboardData";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomeSeekerOverview() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? user?.name.split(" ")[0] ?? "there";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your property portfolio and market updates.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={Heart}
          value={MOCK_HOME_SEEKER_STATS.savedCount}
          label="Total Saved Properties"
          badge={`+${MOCK_HOME_SEEKER_STATS.savedThisWeek} this week`}
          iconClassName="bg-emerald-100 text-emerald-700"
          badgeClassName="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          icon={Bell}
          value={MOCK_HOME_SEEKER_STATS.activeAlerts}
          label="Active Alerts"
          badge={`${MOCK_HOME_SEEKER_STATS.priorityAlerts} Priority`}
          iconClassName="bg-amber-100 text-amber-700"
          badgeClassName="bg-amber-50 text-amber-700"
        />
        <StatCard
          icon={Search}
          value={MOCK_HOME_SEEKER_STATS.recentSearches}
          label="Recent Searches"
          badge="Last 30 days"
          iconClassName="bg-sky-100 text-sky-700"
          badgeClassName="bg-sky-50 text-sky-700"
        />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <section className="min-w-0 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-foreground">
              Saved Properties
            </h2>
            <Link
              href="/dashboard?view=saved"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_SAVED_PROPERTIES.map((property) => (
              <DashboardPropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <OverviewAlertsPanel />
          <OverviewSearchesPanel />
        </aside>
      </div>
    </div>
  );
}
