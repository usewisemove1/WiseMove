"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MOCK_ALERTS } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";

export default function OverviewAlertsPanel() {
  const activeAlerts = MOCK_ALERTS.filter((alert) => alert.isActive);

  return (
    <section className={cn(cardBaseStyles, "p-5")}>
      <h2 className="text-base font-bold text-foreground">Active Alerts</h2>

      <Button asChild className="mt-4 w-full" size="sm">
        <Link href="/dashboard/alerts">
          <Plus className="h-4 w-4" />
          Create New Alert
        </Link>
      </Button>

      <ul className="mt-4 space-y-3">
        {activeAlerts.map((alert) => (
          <li
            key={alert.id}
            className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{alert.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {alert.location}
                {alert.priceRange ? ` · ${alert.priceRange}` : ""}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={`Remove ${alert.label} alert`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
