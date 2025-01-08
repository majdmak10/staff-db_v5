"use client";

import { useState } from "react";
import Image from "next/image";
import TableColumnsSelection from "./TableColumnsSelection";

interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string; // Optional width property
}

interface TableControlsProps {
  columns: Column[];
  visibleColumns: string[];
  onColumnChange: (updatedColumns: string[]) => void;
}

const TableControls: React.FC<TableControlsProps> = ({
  columns,
  visibleColumns,
  onColumnChange,
}) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 w-full md:w-auto absolute">
      {/* Columns selection */}
      <div className="flex items-center gap-2">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
          title="Show/Hide Columns"
          aria-label="Show/Hide Columns"
          onClick={() => setShowColumnSelector((prev) => !prev)}
        >
          <Image
            src="/table_icons/columns.png"
            alt="Columns"
            width={14}
            height={14}
          />
        </button>
        <span className="text-sm">Columns</span>
        {showColumnSelector && (
          <div className="absolute top-full left-0 z-10">
            <TableColumnsSelection
              columns={columns}
              visibleColumns={visibleColumns}
              onChange={(updatedColumns) => {
                onColumnChange(updatedColumns); // Immediately apply changes
              }}
              onClose={() => setShowColumnSelector(false)} // Close menu on outside click
            />
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
          title="Filter Data"
          aria-label="Filter Data"
          // onClick={onFilter}
        >
          <Image
            src="/table_icons/filter.png"
            alt="Filter"
            width={14}
            height={14}
          />
        </button>
        <span className="text-sm">Filter</span>
      </div>

      {/* Export */}
      <div className="flex items-center gap-2">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
          title="Export Data"
          aria-label="Export Data"
          // onClick={onExport}
        >
          <Image
            src="/table_icons/export.png"
            alt="Export"
            width={14}
            height={14}
          />
        </button>
        <span className="text-sm">Export</span>
      </div>
    </div>
  );
};

export default TableControls;
