import React from "react";
import clsx from "clsx";

interface ResizeHandleProps {
  column: string;
  onResizeStart: (column: string) => void;
  onResize: (column: string, width: number) => void;
  onResizeEnd: () => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  column,
  onResizeStart,
  onResize,
  onResizeEnd,
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onResizeStart(column);

    const startX = e.pageX;
    const startWidth = e.currentTarget.parentElement?.offsetWidth || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.pageX - startX;
      const newWidth = Math.max(startWidth + diff, 100); // Minimum column width: 100px
      onResize(column, newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      onResizeEnd();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={clsx(
        "absolute right-0 top-0 h-full w-2 cursor-col-resize",
        "hover:bg-blue-400 hover:opacity-50"
      )}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizeHandle;
