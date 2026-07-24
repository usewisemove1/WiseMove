"use client";

import { useCallback, useMemo, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

import { getCityCoordinates } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PinDropMapViewProps {
  city?: string;
  latitude: number | null;
  longitude: number | null;
  onPinChange: (latitude: number, longitude: number) => void;
  className?: string;
}

export default function PinDropMapView({
  city,
  latitude,
  longitude,
  onPinChange,
  className,
}: PinDropMapViewProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const cityCoords = useMemo(() => getCityCoordinates(city), [city]);

  const initialView = useMemo(
    () => ({
      latitude: latitude ?? cityCoords.latitude,
      longitude: longitude ?? cityCoords.longitude,
      zoom: cityCoords.zoom,
    }),
    [cityCoords, latitude, longitude]
  );

  const [viewState, setViewState] = useState(initialView);

  const handleMapClick = useCallback(
    (event: { lngLat: { lat: number; lng: number } }) => {
      onPinChange(event.lngLat.lat, event.lngLat.lng);
    },
    [onPinChange]
  );

  const handleDragEnd = useCallback(
    (event: { lngLat: { lat: number; lng: number } }) => {
      onPinChange(event.lngLat.lat, event.lngLat.lng);
    },
    [onPinChange]
  );

  if (!mapboxToken) {
    return (
      <div
        className={cn(
          "flex h-72 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center sm:h-80",
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
            to pin your property location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-xl border border-border">
        <Map
          mapboxAccessToken={mapboxToken}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: 320 }}
          cursor="crosshair"
        >
          {latitude !== null && longitude !== null ? (
            <Marker
              latitude={latitude}
              longitude={longitude}
              anchor="bottom"
              draggable
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-1 h-2 w-0.5 bg-primary" aria-hidden="true" />
              </div>
            </Marker>
          ) : null}
        </Map>
      </div>

      {latitude !== null && longitude !== null ? (
        <p className="text-sm text-muted-foreground">
          Selected coordinates:{" "}
          <span className="font-medium text-foreground">
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </span>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click the map to drop a pin, then drag to fine-tune the location.
        </p>
      )}
    </div>
  );
}
