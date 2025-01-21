import { useState, useCallback } from "react";

interface ColumnResizeState {
  [key: string]: number; // Column key mapped to its width
}

export const useColumnResize = (initialWidths: ColumnResizeState = {}) => {
  const [columnWidths, setColumnWidths] =
    useState<ColumnResizeState>(initialWidths);

  const handleMouseDown = useCallback(
    (columnKey: string, startX: number) => {
      const initialWidth = columnWidths[columnKey] || 150; // Default width
      const handleMouseMove = (event: MouseEvent) => {
        const deltaX = event.clientX - startX;
        setColumnWidths((prevWidths) => ({
          ...prevWidths,
          [columnKey]: Math.max(50, initialWidth + deltaX), // Minimum width 50px
        }));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths]
  );

  const resetWidths = useCallback(() => {
    setColumnWidths(initialWidths);
  }, [initialWidths]);

  return {
    columnWidths,
    startResizing: handleMouseDown,
    resetWidths, // Add the reset function
  };
};
