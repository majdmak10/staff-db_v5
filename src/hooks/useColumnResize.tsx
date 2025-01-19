import { useRef, useCallback } from "react";

interface ColumnResizeState {
  columnWidths: { [key: string]: string };
  setColumnWidth: (key: string, width: string) => void;
}

export const useColumnResize = (columns: string[]): ColumnResizeState => {
  const columnWidthsRef = useRef<{ [key: string]: string }>(
    columns.reduce((acc, key) => {
      acc[key] = "auto"; // Default width
      return acc;
    }, {} as { [key: string]: string })
  );

  const setColumnWidth = useCallback((key: string, width: string) => {
    columnWidthsRef.current[key] = width;
  }, []);

  return {
    columnWidths: columnWidthsRef.current,
    setColumnWidth,
  };
};
