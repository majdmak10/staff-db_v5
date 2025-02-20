"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface StaffProfileMapProps {
  latitude: number | null;
  longitude: number | null;
}

const StaffProfileMap: React.FC<StaffProfileMapProps> = ({
  latitude,
  longitude,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <div>Loading map...</div>;
  if (latitude === null || longitude === null)
    return <div>No location selected</div>;

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[400px] rounded-lg border border-gray-300"
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default StaffProfileMap;
