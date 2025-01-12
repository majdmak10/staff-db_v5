import { useState, useRef, useEffect } from "react";

interface ColumnWidths {
  [key: string]: number;
}

export const useColumnResize = (
  initialColumns: { key: string; width?: string }[]
) => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>({});
  const [isResizing, setIsResizing] = useState(false);
  const [currentResizer, setCurrentResizer] = useState<string | null>(null);
  const resizeStartXRef = useRef<number>(0);
  const initialWidthRef = useRef<number>(0);

  useEffect(() => {
    // Initialize column widths
    const initialWidths: ColumnWidths = {};
    initialColumns.forEach((col) => {
      initialWidths[col.key] = col.width ? parseInt(col.width) : 150;
    });
    setColumnWidths(initialWidths);
  }, [initialColumns]);

  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    setIsResizing(true);
    setCurrentResizer(columnKey);
    resizeStartXRef.current = e.clientX;
    initialWidthRef.current = columnWidths[columnKey];
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !currentResizer) return;

    const diff = e.clientX - resizeStartXRef.current;
    const newWidth = Math.max(50, initialWidthRef.current + diff);

    setColumnWidths((prev) => ({
      ...prev,
      [currentResizer]: newWidth,
    }));
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setCurrentResizer(null);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  return {
    columnWidths,
    isResizing,
    handleResizeStart,
  };
};
