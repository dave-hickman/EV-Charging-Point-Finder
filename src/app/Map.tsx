"use client";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Props {
  location: Location;
  zoomLevel: number;
  apikey: string;
}

export default function Map({ location, zoomLevel, apikey }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
  });
  const center = useMemo(() => ({ lat: location.lat, lng: location.lng }), []);
  return (
    <section className="h-4/5 w-full absolute">
      <div className="h-full w-full">
        {!isLoaded ? (
          <p>Loading...</p>
        ) : (
          <GoogleMap
            mapContainerClassName="h-full w-full"
            center={center}
            zoom={zoomLevel}
          >
          </GoogleMap>
        )}
      </div>
    </section>
  );
}
