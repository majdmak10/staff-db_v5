import { useState, useCallback } from "react";
import clsx from "clsx";

interface ColumnWidth {
  [key: string]: number;
}

export const useColumnResize = (initialWidths: ColumnWidth = {}) => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidth>(initialWidths);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  const handleResizeStart = useCallback((columnKey: string) => {
    setResizingColumn(columnKey);
  }, []);

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
  }, []);

  const handleResize = useCallback((columnKey: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnKey]: Math.max(width, 100), // Minimum width of 100px
    }));
  }, []);

  return {
    columnWidths,
    resizingColumn,
    handleResizeStart,
    handleResize,
    handleResizeEnd,
  };
};

// ResizeHandle Component
const ResizeHandle: React.FC<{
  column: string;
  onResizeStart: (column: string) => void;
  onResize: (column: string, width: number) => void;
  onResizeEnd: () => void;
}> = ({ column, onResizeStart, onResize, onResizeEnd }) => {
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 h-full w-1 cursor-col-resize",
        "hover:bg-blue-400 hover:opacity-50",
        "group-hover:visible invisible"
      )}
      onMouseDown={(e) => {
        e.preventDefault();
        onResizeStart(column);

        const startX = e.pageX;
        const startWidth = e.currentTarget.parentElement?.offsetWidth || 0;

        const handleMouseMove = (e: MouseEvent) => {
          const diff = e.pageX - startX;
          onResize(column, startWidth + diff);
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          onResizeEnd();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }}
    />
  );
};
