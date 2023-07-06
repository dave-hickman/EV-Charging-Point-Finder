"use client";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface Props {
  zoomLevel: number;
  apikey: string;
}

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

export default function Map({zoomLevel, apikey }: Props) {
  const [location, setLocation] = useState({
    lat: 51.51387,
    lng: -0.098362,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
    libraries,
  });
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };
  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places?.length){
        const selectedPlace = places[0];
        if (selectedPlace.geometry && selectedPlace.geometry.location){
        const newCenter = {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };
        setLocation({lat: newCenter.lat, lng: newCenter.lng})
      }
      }
    }
  };

  const center = useMemo(() => ({ lat: location.lat, lng: location.lng }), [location]);

  return (
    <section className="h-full w-full absolute">
      <div className="h-full w-full">
        {!isLoaded ? (
          <p>Loading...</p>
        ) : (
          <GoogleMap
            mapContainerClassName="h-full w-full"
            center={center}
            zoom={zoomLevel}
          >
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Find a charger"
                style={{
                  marginTop: "10rem",
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `40px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                }}
              />
            </StandaloneSearchBox>
            <Marker position={location}/>
          </GoogleMap>
        )}
      </div>
    </section>
  );
}
