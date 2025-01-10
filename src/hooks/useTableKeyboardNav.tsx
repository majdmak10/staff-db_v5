import { useEffect, useRef, useState } from "react";

interface UseTableKeyboardNavProps {
  rowCount: number;
  columnCount: number;
  onSelectRow: (index: number) => void;
  onSelectAll: () => void;
}

export const useTableKeyboardNav = ({
  rowCount,
  columnCount,
  onSelectRow,
  onSelectAll,
}: UseTableKeyboardNavProps) => {
  const [focusedCell, setFocusedCell] = useState<[number, number]>([0, 0]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const [currentRow, currentCol] = focusedCell;

      switch (e.key) {
        case "ArrowUp":
          if (currentRow > 0) {
            e.preventDefault();
            setFocusedCell([currentRow - 1, currentCol]);
          }
          break;
        case "ArrowDown":
          if (currentRow < rowCount - 1) {
            e.preventDefault();
            setFocusedCell([currentRow + 1, currentCol]);
          }
          break;
        case "ArrowLeft":
          if (currentCol > 0) {
            e.preventDefault();
            setFocusedCell([currentRow, currentCol - 1]);
          }
          break;
        case "ArrowRight":
          if (currentCol < columnCount - 1) {
            e.preventDefault();
            setFocusedCell([currentRow, currentCol + 1]);
          }
          break;
        case " ":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            onSelectRow(currentRow);
          }
          break;
        case "a":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onSelectAll();
          }
          break;
      }
    };

    const table = tableRef.current;
    table?.addEventListener("keydown", handleKeyDown);
    return () => table?.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell, rowCount, columnCount, onSelectRow, onSelectAll]);

  return { tableRef, focusedCell };
};
