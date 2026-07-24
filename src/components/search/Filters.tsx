"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  filtersToSearchParams,
  hasActiveFilters,
  searchParamsToFilters,
} from "@/lib/searchUtils";
import PageShell from "@/components/layout/PageShell";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { Filter } from "@/types";

const transactionTypes = [
  { label: "Buy", value: "sale" as const },
  { label: "Rent", value: "rent" as const },
];

const propertyTypeOptions = [
  { label: "All types", value: undefined },
  { label: "Shortlet", value: "shortlet" as const },
  { label: "Investment", value: "invest" as const },
];

const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = [1, 2, 3, 4];
const stateOptions = ["Lagos", "FCT", "Rivers", "Oyo", "Ogun", "Abuja"];
const amenityOptions = ["Swimming Pool", "Generator", "Parking", "Gym", "Security", "Waterfront"];

const pillButtonClass =
  "h-9 shrink-0 rounded-full border border-border bg-white px-4 text-sm font-medium shadow-sm hover:bg-muted/50";

interface FiltersProps {
  showMap: boolean;
  onShowMapChange: (showMap: boolean) => void;
}

export default function Filters({ showMap, onShowMapChange }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, sortBy, setFilters, updateFilters, clearFilters } =
    usePropertyStore();
  const [locationInput, setLocationInput] = useState(
    filters.location ?? "Lagos"
  );

  useEffect(() => {
    const { filters: parsedFilters, sort } = searchParamsToFilters(searchParams);
    setFilters(parsedFilters);
    setLocationInput(parsedFilters.location ?? "Lagos");
    usePropertyStore.setState({ sortBy: sort });
  }, [searchParams, setFilters]);

  const syncUrl = useCallback(
    (nextFilters: Filter, sort = sortBy) => {
      const params = filtersToSearchParams(nextFilters, sort);
      const query = params.toString();
      router.replace(query ? `/search?${query}` : "/search", { scroll: false });
    },
    [router, sortBy]
  );

  const applyFilters = (partial: Partial<Filter>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    syncUrl(next);
  };

  const handleLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters({ location: locationInput.trim() || "Lagos" });
  };

  const handleClearAll = () => {
    const location = filters.location ?? "Lagos";
    clearFilters(location);
    syncUrl({
      location,
      propertyType: "rent",
      trustScoreMin: 0,
    });
  };

  const active = hasActiveFilters(filters);
  const transactionType =
    filters.propertyType === "sale" ? "sale" : "rent";
  const propertyTypeLabel =
    propertyTypeOptions.find((o) => o.value === filters.propertyType)?.label ??
    (filters.propertyType === "sale" || filters.propertyType === "rent"
      ? "All types"
      : "Property Type");

  return (
    <div data-component="search-filters" className="border-b border-border bg-white shadow-sm">
      <PageShell dataComponent="search-filters" innerClassName="flex items-center gap-2 py-3 sm:gap-3">
        <form
          onSubmit={handleLocationSubmit}
          className="relative hidden min-w-[180px] shrink-0 sm:block lg:min-w-[220px]"
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onBlur={() => {
              if (locationInput.trim() !== (filters.location ?? "Lagos")) {
                applyFilters({ location: locationInput.trim() || "Lagos" });
              }
            }}
            placeholder="Lagos, Nigeria"
            className="h-10 w-full rounded-full border border-border bg-muted/30 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Search location"
          />
        </form>

        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          <div className="flex shrink-0 rounded-full border border-border bg-muted/30 p-0.5">
            {transactionTypes.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => applyFilters({ propertyType: value })}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  transactionType === value
                    ? "bg-[#1c1c1c] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={pillButtonClass}>
                Price
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 rounded-xl" align="start">
              <div className="space-y-3">
                <p className={cn(typography.caption, "font-medium")}>
                  Price range
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">
                      Min
                    </label>
                    <input
                      type="number"
                      value={filters.priceMin ?? ""}
                      onChange={(e) =>
                        applyFilters({
                          priceMin: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder="No min"
                      className="h-9 w-full rounded-lg border border-input px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">
                      Max
                    </label>
                    <input
                      type="number"
                      value={filters.priceMax ?? ""}
                      onChange={(e) =>
                        applyFilters({
                          priceMax: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder="No max"
                      className="h-9 w-full rounded-lg border border-input px-3 text-sm"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={pillButtonClass}>
                Beds{filters.bedrooms ? `: ${filters.bedrooms}+` : ""}
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl">
              <DropdownMenuItem
                onClick={() => applyFilters({ bedrooms: undefined })}
              >
                Any
              </DropdownMenuItem>
              {bedroomOptions.map((value) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => applyFilters({ bedrooms: value })}
                >
                  {value === 5 ? "5+" : `${value}+`} beds
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={pillButtonClass}>
                {filters.state ?? "State"}<ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl">
              <DropdownMenuItem onClick={() => applyFilters({ state: undefined })}>All states</DropdownMenuItem>
              {stateOptions.map((state) => <DropdownMenuItem key={state} onClick={() => applyFilters({ state })}>{state}</DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={pillButtonClass}>
                {propertyTypeLabel === "All types"
                  ? "Property Type"
                  : propertyTypeLabel}
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl">
              <DropdownMenuItem
                onClick={() => applyFilters({ propertyType: transactionType })}
              >
                All types
              </DropdownMenuItem>
              {propertyTypeOptions
                .filter((o) => o.value)
                .map(({ label, value }) => (
                  <DropdownMenuItem
                    key={label}
                    onClick={() => applyFilters({ propertyType: value })}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(pillButtonClass, "gap-2")}>
                <SlidersHorizontal className="h-4 w-4" />
                All Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-xl" align="end">
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium">Bathrooms</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyFilters({ bathrooms: undefined })}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        filters.bathrooms === undefined
                          ? "bg-[#1c1c1c] text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      Any
                    </button>
                    {bathroomOptions.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => applyFilters({ bathrooms: value })}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          filters.bathrooms === value
                            ? "bg-[#1c1c1c] text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {value === 4 ? "4+" : `${value}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Amenities</p>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.map((amenity) => {
                      const selected = filters.amenities?.includes(amenity) ?? false;
                      return <label key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={selected} onChange={() => applyFilters({ amenities: selected ? filters.amenities?.filter((item) => item !== amenity) : [...(filters.amenities ?? []), amenity] })} className="rounded border-border text-primary" />{amenity}</label>;
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Minimum Trust Score</p>
                    <span className="text-sm font-bold text-primary">
                      {filters.trustScoreMin ?? 0}
                    </span>
                  </div>
                  <Slider
                    value={[filters.trustScoreMin ?? 0]}
                    onValueChange={([value]) =>
                      updateFilters({ trustScoreMin: value })
                    }
                    onValueCommit={([value]) =>
                      applyFilters({ trustScoreMin: value })
                    }
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>

                {active && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="ml-auto shrink-0 border-l border-border pl-3 sm:pl-4">
          <div
            role="tablist"
            aria-label="View mode"
            className="flex rounded-lg border border-border bg-white p-1 shadow-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!showMap}
              onClick={() => onShowMapChange(false)}
              className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-semibold transition-all sm:px-4",
                  !showMap
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground hover:bg-muted/40"
              )}
          >
            List view
          </button>
            <button
              type="button"
              role="tab"
              aria-selected={showMap}
              onClick={() => onShowMapChange(true)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold transition-all sm:px-4",
                showMap
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground hover:bg-muted/40"
              )}
            >
              Map view
            </button>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
