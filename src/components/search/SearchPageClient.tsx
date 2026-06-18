"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { List, Map as MapIcon } from "lucide-react";

import Filters from "@/components/search/Filters";
import ResultsList from "@/components/search/ResultsList";
import { Button } from "@/components/ui/button";
import { getMockSearchProperties } from "@/lib/mockSearchProperties";
import {
  filterProperties,
  filtersToSearchParams,
  searchParamsToFilters,
  sortProperties,
} from "@/lib/searchUtils";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { SortOption } from "@/types";

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#eef0f2] text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mapOpen, setMapOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const { sortBy, setSortBy } = usePropertyStore();

  const { filters } = useMemo(
    () => searchParamsToFilters(searchParams),
    [searchParams]
  );

  const location = filters.location ?? "Lagos";

  // TODO: replace with API call when backend is ready
  const mapProperties = useMemo(() => {
    const all = getMockSearchProperties(location);
    const filtered = filterProperties(all, filters);
    return sortProperties(filtered, sortBy);
  }, [location, filters, sortBy]);

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      const params = filtersToSearchParams(filters, sort);
      const query = params.toString();
      router.replace(query ? `/search?${query}` : "/search", { scroll: false });
    },
    [filters, router, setSortBy]
  );

  const handleShowMapChange = useCallback((next: boolean) => {
    setShowMap(next);
    if (!next) setMapOpen(false);
  }, []);

  return (
    <div data-component="search-page" className="flex h-[calc(100vh-4rem)] flex-col bg-white">
      <div data-component="search-filters-sticky" className="sticky top-16 z-40 shrink-0">
        <Filters showMap={showMap} onShowMapChange={handleShowMapChange} />
      </div>

      <div
        data-component="search-results-layout"
        className={cn(
          "flex min-h-0 flex-1",
          showMap && "gap-5 bg-[#f3f3f3] p-5"
        )}
      >
        <div
          className={cn(
            "flex min-h-0 flex-col overflow-hidden",
            showMap ? "w-full md:w-1/2" : "w-full bg-[#fafafa]"
          )}
        >
          <ResultsList
            onSortChange={handleSortChange}
            isSplitView={showMap}
          />
        </div>

        {showMap && (
          <div className="hidden min-h-0 w-1/2 overflow-hidden rounded-xl shadow-sm md:block">
            <MapView properties={mapProperties} location={location} />
          </div>
        )}
      </div>

      {showMap && (
        <>
          <Button
            onClick={() => setMapOpen(true)}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1c1c1c] px-6 shadow-lg hover:bg-[#333] md:hidden"
          >
            <MapIcon className="h-4 w-4" />
            Map
          </Button>

          {mapOpen && (
            <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
              <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3">
                <p className="font-semibold text-foreground">Map view</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMapOpen(false)}
                  className="rounded-full"
                >
                  <List className="h-4 w-4" />
                  List
                </Button>
              </div>
              <div className="flex-1">
                <MapView properties={mapProperties} location={location} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPageClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          Loading search results…
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
