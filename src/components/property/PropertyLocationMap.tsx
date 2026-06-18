"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { cn } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyLocationMapProps {
  property: Property;
  className?: string;
}

const PROPERTY_MAP_ZOOM = 15;

export default function PropertyLocationMap({
  property,
  className,
}: PropertyLocationMapProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const propertyCenter = useMemo(
    () => ({
      latitude: property.latitude,
      longitude: property.longitude,
    }),
    [property.latitude, property.longitude]
  );

  const [viewState, setViewState] = useState({
    latitude: propertyCenter.latitude,
    longitude: propertyCenter.longitude,
    zoom: PROPERTY_MAP_ZOOM,
  });

  useEffect(() => {
    setViewState({
      latitude: propertyCenter.latitude,
      longitude: propertyCenter.longitude,
      zoom: PROPERTY_MAP_ZOOM,
    });
  }, [propertyCenter.latitude, propertyCenter.longitude]);

  const handleMapLoad = useCallback(
    (event: { target: MapboxMap }) => {
      event.target.jumpTo({
        center: [propertyCenter.longitude, propertyCenter.latitude],
        zoom: PROPERTY_MAP_ZOOM,
      });
    },
    [propertyCenter.latitude, propertyCenter.longitude]
  );

  if (!mapboxToken) {
    return (
      <div
        className={cn(
          "flex h-[400px] items-center justify-center rounded-xl bg-muted p-6 text-center",
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
            to <code className="rounded bg-white px-1 py-0.5 text-xs">.env.local</code>{" "}
            to enable the location map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-[400px] overflow-hidden rounded-xl border border-border",
        className
      )}
    >
      <Map
        key={`${property.id}-${propertyCenter.latitude}-${propertyCenter.longitude}`}
        mapboxAccessToken={mapboxToken}
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        onLoad={handleMapLoad}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Marker
          latitude={propertyCenter.latitude}
          longitude={propertyCenter.longitude}
          anchor="bottom"
        >
          <span className="flex flex-col items-center">
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-md">
              {property.city}
            </span>
            <span className="mt-0 h-2 w-0.5 bg-primary" aria-hidden="true" />
          </span>
        </Marker>
      </Map>
    </div>
  );
}
