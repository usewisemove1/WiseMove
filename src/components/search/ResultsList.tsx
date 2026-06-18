"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, SearchX } from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMockSearchProperties } from "@/lib/mockSearchProperties";
import {
  filterProperties,
  getResultsTitle,
  searchParamsToFilters,
  sortProperties,
} from "@/lib/searchUtils";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { SortOption } from "@/types";

const sortLabels: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "trust-desc": "Trust Score: High to Low",
};

interface ResultsListProps {
  onSortChange: (sort: SortOption) => void;
  isSplitView?: boolean;
}

export default function ResultsList({
  onSortChange,
  isSplitView = false,
}: ResultsListProps) {
  const searchParams = useSearchParams();
  const listRef = useRef<HTMLDivElement>(null);
  const {
    sortBy,
    hoveredPropertyId,
    selectedPropertyId,
    setHoveredPropertyId,
    setSelectedPropertyId,
  } = usePropertyStore();

  const { filters } = useMemo(
    () => searchParamsToFilters(searchParams),
    [searchParams]
  );

  const location = filters.location ?? "Lagos";

  // TODO: replace with API call when backend is ready
  const allProperties = useMemo(
    () => getMockSearchProperties(location),
    [location]
  );

  const results = useMemo(() => {
    const filtered = filterProperties(allProperties, filters);
    return sortProperties(filtered, sortBy);
  }, [allProperties, filters, sortBy]);

  useEffect(() => {
    if (!selectedPropertyId) return;
    const element = document.getElementById(`property-${selectedPropertyId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    setSelectedPropertyId(null);
  }, [selectedPropertyId, setSelectedPropertyId]);

  const contentPadding = isSplitView ? "px-5" : "px-4 sm:px-6";

  return (
    <div ref={listRef} className="flex h-full flex-col">
      <div
        className={cn(
          "flex shrink-0 items-center justify-between gap-4 pb-3 pt-1",
          contentPadding
        )}
      >
        <h2 className="min-w-0 truncate text-base font-bold text-foreground">
          {getResultsTitle(filters.propertyType, location)}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {results.length.toLocaleString()} results
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-8 w-8 text-muted-foreground lg:inline-flex"
                aria-label="Sort results"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => onSortChange(option)}
                >
                  {sortLabels[option]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className={cn(
          "flex-1 space-y-3 overflow-y-auto pb-5",
          contentPadding
        )}
      >
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className={cn(typography.h3, "text-lg")}>No properties found</h3>
            <p className={cn(typography.caption, "mt-2 max-w-sm text-base")}>
              Try adjusting your filters or searching a different area.
            </p>
          </div>
        ) : (
          results.map((property) => (
            <PropertyCard
              key={property.id}
              id={`property-${property.id}`}
              property={property}
              layout="search"
              isHighlighted={hoveredPropertyId === property.id}
              onHover={setHoveredPropertyId}
            />
          ))
        )}
      </div>
    </div>
  );
}
