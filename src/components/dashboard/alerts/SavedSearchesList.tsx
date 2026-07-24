"use client";

import { Bell, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  formatSavedSearchSummary,
  getFrequencyLabel,
} from "@/lib/alertUtils";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useAlertsStore } from "@/store/useAlertsStore";

interface SavedSearchesListProps {
  onCreateClick: () => void;
}

export default function SavedSearchesList({
  onCreateClick,
}: SavedSearchesListProps) {
  const savedSearches = useAlertsStore((state) => state.savedSearches);
  const toggleSavedSearch = useAlertsStore((state) => state.toggleSavedSearch);
  const deleteSavedSearch = useAlertsStore((state) => state.deleteSavedSearch);

  if (savedSearches.length === 0) {
    return (
      <div
        className={cn(
          cardBaseStyles,
          "flex flex-col items-center justify-center px-6 py-16 text-center"
        )}
      >
        <Bell className="h-10 w-10 text-muted-foreground/60" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-foreground">
          No saved searches yet
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Create an alert to get notified when new listings match your criteria.
        </p>
        <Button type="button" className="mt-6" onClick={onCreateClick}>
          Create Alert
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {savedSearches.map((alert) => (
        <li
          key={alert.id}
          className={cn(
            cardBaseStyles,
            "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between",
            !alert.isActive && "opacity-70"
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">
              {formatSavedSearchSummary(alert)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {getFrequencyLabel(alert.frequency)}
              </span>
              {alert.isActive && alert.matchCount > 0 ? (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {alert.matchCount} new matches
                </span>
              ) : alert.isActive ? (
                <span className="text-xs text-muted-foreground">
                  No new matches yet
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Paused</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:shrink-0">
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Switch
                checked={alert.isActive}
                onCheckedChange={() => toggleSavedSearch(alert.id)}
                aria-label={`Toggle alert for ${alert.location}`}
              />
              Active
            </label>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this saved search alert? This cannot be undone."
                  )
                ) {
                  deleteSavedSearch(alert.id);
                }
              }}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              aria-label="Delete alert"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
