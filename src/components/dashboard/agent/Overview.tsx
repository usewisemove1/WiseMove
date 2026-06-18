"use client";

import Link from "next/link";
import { Building2, MessageSquare, Shield } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import {
  formatRelativeTime,
  MOCK_AGENT_STATS,
  MOCK_INQUIRIES,
} from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

export default function AgentOverview() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? user?.name.split(" ")[0] ?? "there";
  const recentInquiries = MOCK_INQUIRIES.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your listings and respond to inquiries.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Building2}
          value={MOCK_AGENT_STATS.activeListings}
          label="Active Listings"
        />
        <StatCard
          icon={MessageSquare}
          value={MOCK_AGENT_STATS.totalInquiries}
          label="Total Inquiries"
        />
        <StatCard
          icon={Shield}
          value={MOCK_AGENT_STATS.avgTrustScore}
          label="Avg. Trust Score"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Recent Inquiries
          </h2>
          <Link
            href="/dashboard?view=inquiries"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <ul className="space-y-3">
          {recentInquiries.map((inquiry) => (
            <li
              key={inquiry.id}
              className={cn(
                cardBaseStyles,
                "flex items-center justify-between gap-4 p-4"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {inquiry.senderName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {inquiry.propertyTitle}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatRelativeTime(inquiry.timestamp)}
                </p>
              </div>
              <Link
                href="/dashboard?view=inquiries"
                className="shrink-0 text-sm font-semibold text-primary hover:underline"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
