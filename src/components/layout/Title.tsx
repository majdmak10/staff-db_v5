"use client";

import React from "react";
import { useEffect, useState } from "react";

const Title: React.FC = () => {
  const [title, setTitle] = useState("Dashboard");

  useEffect(() => {
    const handleMetadataChange = () => {
      const pageTitle = document.title.split(" | ")[0] || "Dashboard";
      setTitle(pageTitle);
    };

    window.addEventListener("dashboardMetadataChange", handleMetadataChange);
    return () =>
      window.removeEventListener(
        "dashboardMetadataChange",
        handleMetadataChange
      );
  }, []);

  return <span>{title}</span>;
};

export default Title;
