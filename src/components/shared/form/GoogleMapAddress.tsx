"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface GoogleMapAddressProps {
  onAddressSelect: (lat: number, lng: number) => void;
}

const GoogleMapAddress: React.FC<GoogleMapAddressProps> = ({
  onAddressSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Make sure your API key is here
  });

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedPosition({ lat, lng });
        onAddressSelect(lat, lng);
      }
    },
    [onAddressSelect]
  );

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 36.2021, lng: 37.1343 }} // Default center on Aleppo
      mapContainerStyle={{
        width: "100%",
        height: "400px",
        marginTop: "6px",
        borderRadius: 10,
      }} // Set size of the map
      onClick={onMapClick}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};

export default GoogleMapAddress;
