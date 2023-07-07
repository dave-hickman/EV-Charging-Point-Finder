"use client";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import MarkerData from "./types";
import { useEffect, useMemo, useRef, useState } from "react";

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

const EVKey = process.env.EV_API_KEY;

export default function Map({ zoomLevel, apikey }: Props) {
  const [location, setLocation] = useState({
    lat: 51.51387,
    lng: -0.098362,
  });
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [markersLoaded, setMarkersLoaded] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  async function getPoints() {
    const res = await fetch(
      `https://api.openchargemap.io/v3/poi?output=json&latitude=${location.lat}&longitude=${location.lng}&maxresults=20&key=${EVKey}`
    );
    const data = res.json();
    return data;
  }

  useEffect(() => {
    setMarkersLoaded(false);
    const fetchPoints = async () => {
      const response = await getPoints();
      setMarkers(response);
      setMarkersLoaded(true);
    };
    fetchPoints();
  }, [location]);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

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
      if (places?.length) {
        const selectedPlace = places[0];
        if (selectedPlace.geometry && selectedPlace.geometry.location) {
          const newCenter = {
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
          };
          setLocation({ lat: newCenter.lat, lng: newCenter.lng });
        }
      }
    }
  };

  const center = useMemo(
    () => ({ lat: location.lat, lng: location.lng }),
    [location]
  );

  return (
    <section className="h-full w-full absolute">
      <div className="h-full w-full">
        {!isLoaded || !markersLoaded ? (
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
                className="mt-40 box-border absolute w-60 h-8 px-4 rounded-2xl shadow-md text-base outline-none text-ellipsis left-2/4 -ml-32"
              />
            </StandaloneSearchBox>
            <Marker position={location} />
            {markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  position={{
                    lat: marker.AddressInfo.Latitude,
                    lng: marker.AddressInfo.Longitude,
                  }}
                  onClick={() => handleMarkerClick(marker)}
                />
              );
            })}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: (selectedMarker.AddressInfo.Latitude)+0.0001,
                  lng: selectedMarker.AddressInfo.Longitude,
                }}
                onCloseClick={() => setSelectedMarker(null)}
              ><><p>Number of Points: {selectedMarker.NumberOfPoints}</p><p>Connection Type ID: {selectedMarker.Connections[0]?.ConnectionTypeID}</p><p>Connection Type: {selectedMarker.Connections[0]?.ConnectionType?.Title}</p></>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </section>
  );
}
