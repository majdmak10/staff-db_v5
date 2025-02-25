"use client";

import dynamic from "next/dynamic";

// Dynamically import MapEditor and disable SSR.
const MapEditor = dynamic(() => import("@/components/shared/form/MapEditor"), {
  ssr: false,
});

export default MapEditor;
