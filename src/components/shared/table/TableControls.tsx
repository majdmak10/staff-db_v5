"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TableColumnsSelection from "./TableColumnsSelection";
import TableFilter from "./TableFilter";
import TableExport from "./TableExport";

interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string;
}

interface TableControlsProps {
  columns: Column[];
  visibleColumns: string[];
  data: Array<{ [key: string]: string | JSX.Element }>;
  selectedRows?: number[];
  onColumnChange: (updatedColumns: string[]) => void;
  onFilterApply: (
    filters: { column: string; operator: string; value: string }[]
  ) => void;
  onFilterClear: () => void;
}

const TableControls: React.FC<TableControlsProps> = ({
  columns,
  visibleColumns,
  data,
  selectedRows,
  onColumnChange,
  onFilterApply,
  onFilterClear,
}) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredColumns = columns.filter(
    (col) => col.key !== "checkbox" && col.key !== "profilePicture"
  );

  return (
    <div className="relative flex items-center justify-center gap-2 w-full md:flex-row md:justify-start md:items-center md:w-auto">
      {/* Columns selection */}
      <div className="relative flex items-center gap-2">
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
        <span className="text-sm font-medium text-gray-600">Columns</span>
        {showColumnSelector && (
          <div className="absolute top-full left-0 z-50">
            <TableColumnsSelection
              columns={columns}
              visibleColumns={visibleColumns}
              onChange={onColumnChange}
              onClose={() => setShowColumnSelector(false)}
            />
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="relative flex items-center gap-2" ref={filterRef}>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
          title="Filter Data"
          aria-label="Filter Data"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <Image
            src="/table_icons/filter.png"
            alt="Filter"
            width={14}
            height={14}
          />
        </button>
        <span className="text-sm font-medium text-gray-600">Filter</span>
        {showFilter && (
          <div className="absolute top-full left-0 z-50">
            <TableFilter
              columns={filteredColumns}
              onApply={onFilterApply}
              onClear={onFilterClear}
            />
          </div>
        )}
      </div>

      {/* Export */}
      <div className="relative flex items-center gap-2" ref={exportRef}>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
          title="Export Data"
          aria-label="Export Data"
          onClick={() => setShowExport((prev) => !prev)}
        >
          <Image
            src="/table_icons/export.png"
            alt="Export"
            width={14}
            height={14}
          />
        </button>
        <span className="text-sm font-medium text-gray-600">Export</span>
        {showExport && (
          <TableExport
            columns={columns}
            visibleColumns={visibleColumns}
            data={data}
            selectedRows={selectedRows}
            onClose={() => setShowExport(false)}
          />
        )}
      </div>
      {/* Add selection count if rows are selected */}
      {selectedRows && selectedRows.length > 0 && (
        <div className="ml-auto px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
          {selectedRows.length} selected
        </div>
      )}
    </div>
  );
};

export default TableControls;
