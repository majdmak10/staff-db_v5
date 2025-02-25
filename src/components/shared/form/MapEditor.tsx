"use client";

import { useState } from "react";
import MapPicker from "@/components/shared/form/MapPicker";
import { convertToDMS } from "@/utils/convertToDMS";

interface MapEditorProps {
  initialLatitude: string;
  initialLongitude: string;
}

const MapEditor: React.FC<MapEditorProps> = ({
  initialLatitude,
  initialLongitude,
}) => {
  // Use the provided initial values for editing
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Display section: show DMS values and include hidden inputs for submission */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Latitude (DMS)
          </label>
          <input
            type="text"
            aria-label="latitude"
            value={latitude ? convertToDMS(parseFloat(latitude), true) : ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Longitude (DMS)
          </label>
          <input
            type="text"
            aria-label="longitude"
            value={longitude ? convertToDMS(parseFloat(longitude), false) : ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {/* Hidden inputs to include decimal values in form submission */}
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />
      </div>

      {/* Editable map section */}
      <div>
        <MapPicker
          latitude={latitude}
          longitude={longitude}
          onLocationChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
      </div>
    </div>
  );
};

export default MapEditor;
