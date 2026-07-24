import Link from "next/link";
import { Search } from "lucide-react";

import { MOCK_RECENT_SEARCHES } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";

export default function OverviewSearchesPanel() {
  return (
    <section className={cn(cardBaseStyles, "p-5")}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Recent Searches</h2>
        <Link
          href="/dashboard?view=searches"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {MOCK_RECENT_SEARCHES.map((search) => (
          <Link
            key={search.id}
            href={`/search?q=${encodeURIComponent(search.query)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Search className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
            {search.query}
          </Link>
        ))}
      </div>
    </section>
  );
}
