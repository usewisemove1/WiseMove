import Link from "next/link";
import { Search } from "lucide-react";

import { MOCK_RECENT_SEARCHES } from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";

export default function RecentSearches() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Searches
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your recent property searches and saved filters
        </p>
      </div>

      <ul className="space-y-3">
        {MOCK_RECENT_SEARCHES.map((search) => (
          <li key={search.id}>
            <Link
              href={`/search?q=${encodeURIComponent(search.query)}`}
              className={cn(
                cardBaseStyles,
                "flex items-center gap-3 p-4 transition-colors hover:bg-muted/30"
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-medium text-foreground">{search.query}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
