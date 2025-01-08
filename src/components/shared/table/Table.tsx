"use client";

import React, { useState } from "react";
import clsx from "clsx";
import TableControls from "./TableControls";

interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string; // Optional width property
}

interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: string | JSX.Element }>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key) // Initially, all columns are visible
  );

  const handleVisibleColumnsChange = (updatedColumns: string[]) => {
    setVisibleColumns(updatedColumns);
  };

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key)
  );

  return (
    <div className="overflow-x-auto w-full">
      {/* Pass props to TableControls */}
      <TableControls
        columns={columns}
        visibleColumns={visibleColumns}
        onColumnChange={handleVisibleColumnsChange}
      />
      {visibleColumns.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-500">
            No columns to display. Please select columns to show.
          </p>
        </div>
      ) : (
        <table className="mt-8 pb-10 w-full min-w-full table-fixed mb-2">
          <thead>
            <tr className="text-gray-600 text-sm">
              {filteredColumns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    "p-3 border-b border-gray-200 text-gray-600 font-semibold text-left items-center",
                    column.width && `w-[${column.width}]`
                  )}
                >
                  {column.key === "checkbox" ? (
                    <input
                      type="checkbox"
                      aria-label="Select"
                      className="w-4 h-4 accent-mBlue mt-1"
                    />
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-100 text-sm items-center"
              >
                {filteredColumns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      "px-3 py-1 border-b border-gray-200",
                      column.width && `w-[${column.width}]`
                    )}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
