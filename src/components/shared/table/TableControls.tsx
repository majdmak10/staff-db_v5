"use client";

import Image from "next/image";

const TableControls = () => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
        title="Show/Hide Columns"
        aria-label="Show/Hide Columns"
        // onClick={onColumns}
      >
        <Image
          src="/table_icons/columns.png"
          alt="Columns"
          width={14}
          height={14}
        />
      </button>
      <span className="text-sm">Columns</span>
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
  );
};

export default TableControls;
