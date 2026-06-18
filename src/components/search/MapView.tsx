"use client";

import { useCallback, useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { Crosshair, Minus, Plus } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

import { PropertyCardPreview } from "@/components/property/PropertyCard";
import { getCityCoordinates } from "@/lib/constants";
import { formatAbbreviatedPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { Property } from "@/types";

interface MapViewProps {
  properties: Property[];
  location?: string;
  className?: string;
}

function PriceMarker({
  property,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  property: Property;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col items-center"
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-md transition-transform",
          isActive
            ? "scale-110 bg-primary ring-2 ring-white"
            : "bg-primary hover:bg-primary-light"
        )}
      >
        {formatAbbreviatedPrice(property.price)}
      </span>
      <span
        className={cn(
          "mt-0 h-2 w-0.5 bg-primary transition-all",
          isActive ? "h-3" : "group-hover:h-2.5"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export default function MapView({
  properties,
  location,
  className,
}: MapViewProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const {
    hoveredPropertyId,
    selectedPropertyId,
    setHoveredPropertyId,
    setSelectedPropertyId,
  } = usePropertyStore();
  const [popupPropertyId, setPopupPropertyId] = useState<string | null>(null);
  const [searchOnMove, setSearchOnMove] = useState(true);
  const [viewState, setViewState] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
  } | null>(null);

  const city = useMemo(() => getCityCoordinates(location), [location]);

  const initialView = useMemo(
    () => ({
      latitude: city.latitude,
      longitude: city.longitude,
      zoom: city.zoom,
    }),
    [city]
  );

  const currentView = viewState ?? initialView;

  const activePopupId = popupPropertyId ?? selectedPropertyId;
  const popupProperty = properties.find((p) => p.id === activePopupId);

  const handleZoom = useCallback((delta: number) => {
    setViewState((prev) => {
      const base = prev ?? initialView;
      return { ...base, zoom: Math.min(18, Math.max(8, base.zoom + delta)) };
    });
  }, [initialView]);

  const handleLocate = useCallback(() => {
    setViewState(initialView);
  }, [initialView]);

  if (!mapboxToken) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center bg-[#eef0f2] p-6 text-center",
          className
        )}
      >
        <div>
          <p className="font-semibold text-foreground">Map unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </code>{" "}
            to <code className="rounded bg-white px-1 py-0.5 text-xs">.env.local</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full bg-[#eef0f2]", className)}>
      <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2">
        <label className="pointer-events-auto flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-md">
          <input
            type="checkbox"
            checked={searchOnMove}
            onChange={(e) => setSearchOnMove(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Search as I move the map
        </label>
      </div>

      <Map
        mapboxAccessToken={mapboxToken}
        {...currentView}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        {properties.map((property) => {
          const isActive =
            hoveredPropertyId === property.id ||
            selectedPropertyId === property.id;

          return (
            <Marker
              key={property.id}
              latitude={property.latitude}
              longitude={property.longitude}
              anchor="bottom"
            >
              <PriceMarker
                property={property}
                isActive={isActive}
                onClick={() => {
                  setPopupPropertyId(property.id);
                  setSelectedPropertyId(property.id);
                }}
                onMouseEnter={() => setHoveredPropertyId(property.id)}
                onMouseLeave={() => setHoveredPropertyId(null)}
              />
            </Marker>
          );
        })}

        {popupProperty && activePopupId && (
          <Popup
            latitude={popupProperty.latitude}
            longitude={popupProperty.longitude}
            anchor="top"
            onClose={() => setPopupPropertyId(null)}
            closeOnClick={false}
            offset={16}
            className="[&_.mapboxgl-popup-content]:rounded-xl [&_.mapboxgl-popup-content]:p-0"
          >
            <PropertyCardPreview property={popupProperty} />
          </Popup>
        )}
      </Map>

      <div className="absolute bottom-6 right-4 z-10 flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-lg">
        <button
          type="button"
          onClick={() => handleZoom(1)}
          className="flex h-10 w-10 items-center justify-center border-b border-border hover:bg-muted"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom(-1)}
          className="flex h-10 w-10 items-center justify-center border-b border-border hover:bg-muted"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleLocate}
          className="flex h-10 w-10 items-center justify-center hover:bg-muted"
          aria-label="Reset map view"
        >
          <Crosshair className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
