import { Bell, MapPin } from "lucide-react";

import { MOCK_ALERTS } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Alerts
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get notified when new properties match your criteria
        </p>
      </div>

      <ul className="space-y-3">
        {MOCK_ALERTS.map((alert) => (
          <li
            key={alert.id}
            className={cn(
              cardBaseStyles,
              "flex items-start justify-between gap-4 p-4",
              !alert.isActive && "opacity-60"
            )}
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Bell className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{alert.label}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {alert.location}
                </p>
                <p className="mt-1 text-xs capitalize text-muted-foreground">
                  {alert.propertyType} ·{" "}
                  {alert.isActive ? "Active" : "Paused"}
                </p>
              </div>
            </div>
            {alert.isActive && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {alert.matchCount} matches
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
