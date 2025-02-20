"use client";

import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface GoogleMapAddressProps {
  onAddressSelect: (lat: string, lng: string) => void; // Now accepts decimal degree values
}

const GoogleMapAddress: React.FC<GoogleMapAddressProps> = ({
  onAddressSelect,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
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

        // Pass **decimal degrees** instead of DMS
        onAddressSelect(lat.toString(), lng.toString());
      }
    },
    [onAddressSelect]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[300px] md:h-full md:col-span-2 rounded-lg border border-gray-300"
      zoom={10}
      center={{ lat: 36.2021, lng: 37.1343 }}
      onClick={onMapClick}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};

export default GoogleMapAddress;
