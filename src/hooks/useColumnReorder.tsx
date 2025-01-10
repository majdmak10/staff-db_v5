import { useState, useCallback } from "react";
import clsx from "clsx";

export const useColumnReorder = (initialColumns: string[]) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleDragStart = useCallback((columnKey: string) => {
    setDraggedColumn(columnKey);
  }, []);

  const handleDragOver = useCallback(
    (columnKey: string) => {
      if (!draggedColumn || draggedColumn === columnKey) return;

      setColumnOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const draggedIdx = newOrder.indexOf(draggedColumn);
        const targetIdx = newOrder.indexOf(columnKey);

        newOrder.splice(draggedIdx, 1);
        newOrder.splice(targetIdx, 0, draggedColumn);

        return newOrder;
      });
    },
    [draggedColumn]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedColumn(null);
  }, []);

  return {
    columnOrder,
    draggedColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

// DraggableHeader Component
const DraggableHeader: React.FC<{
  column: string;
  label: string | JSX.Element;
  onDragStart: (column: string) => void;
  onDragOver: (column: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}> = ({ column, label, onDragStart, onDragOver, onDragEnd, isDragging }) => {
  return (
    <th
      draggable
      onDragStart={() => onDragStart(column)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(column);
      }}
      onDragEnd={onDragEnd}
      className={clsx(
        "group relative cursor-move",
        "px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        isDragging && "opacity-50 bg-gray-100",
        "transition-colors duration-200"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="invisible group-hover:visible">⋮⋮</span>
        {label}
      </div>
    </th>
  );
};
