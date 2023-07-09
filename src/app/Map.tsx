"use client";

import {
  useLoadScript,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {MarkerData, DirectionsResult} from "./types";
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
  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResult | null>(null);

  async function getPoints() {
    const res = await fetch(
      `https://api.openchargemap.io/v3/poi?output=json&countrycode=GB&latitude=${location.lat}&longitude=${location.lng}&maxresults=10&key=${EVKey}`
    );
    const data = res.json();
    return data;
  }

  async function routeCalculator(marker : MarkerData) {
    if(window.google && isLoaded){
    const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: { lat: location.lat, lng: location.lng },
        destination: {
          lat: marker?.AddressInfo.Latitude,
          lng: marker?.AddressInfo.Longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(result);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      setMarkersLoaded(false);
      const response = await getPoints();
      setMarkers(response);
      setMarkersLoaded(true);
    };
    fetchPoints();
  }, [location]);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    setDirectionsResponse(null);
    routeCalculator(marker);
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
          setDirectionsResponse(null);
          setSelectedMarker(null);
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
          <div className="bg-gray-200 w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-indigo-500 to-pink-500">
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
              </div>
              <p className="p-4">Loading Charging Points Near You...</p>
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerClassName="h-full w-full"
            center={center}
            zoom={zoomLevel}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <div className="min-w-full flex justify-center">
                <input
                  type="text"
                  placeholder="Find a charger"
                  className="mt-24 ml-4 mr-4 box-border absolute w-80 h-16 px-4 rounded-2xl shadow-md text-base outline-none text-ellipsis "
                />
              </div>
            </StandaloneSearchBox>
            <Marker position={location} />
            {markers.map((marker, index) => {
              const markerIcon = {
                url: "https://img.icons8.com/3d-fluency/94/lightning-bolt.png",
                scaledSize: new google.maps.Size(40, 40),
              };
              return (
                <Marker
                  key={index}
                  position={{
                    lat: marker.AddressInfo.Latitude,
                    lng: marker.AddressInfo.Longitude,
                  }}
                  onClick={() => handleMarkerClick(marker)}
                  icon={markerIcon}
                />
              );
            })}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker.AddressInfo.Latitude + 0.0001,
                  lng: selectedMarker.AddressInfo.Longitude,
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <>
                  <p>Number of Points: {selectedMarker.NumberOfPoints}</p>
                  <p>
                    Connection Type ID:{" "}
                    {selectedMarker.Connections[0]?.ConnectionTypeID}
                  </p>
                  <p>
                    Connection Type:{" "}
                    {selectedMarker.Connections[0]?.ConnectionType?.Title}
                  </p>
                </>
              </InfoWindow>
            )}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
      </div>
    </section>
  );
}
