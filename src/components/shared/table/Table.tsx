"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import TableControls from "./TableControls";

interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: string | JSX.Element }>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update header checkbox state
    if (headerCheckboxRef.current) {
      if (selectedRows.length === 0) {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = false;
      } else if (selectedRows.length === filteredData.length) {
        headerCheckboxRef.current.checked = true;
        headerCheckboxRef.current.indeterminate = false;
      } else {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = true;
      }
    }
  }, [selectedRows, filteredData.length]);

  const handleVisibleColumnsChange = (updatedColumns: string[]) => {
    setVisibleColumns(updatedColumns);
  };

  const handleFilterApply = (
    filters: { column: string; operator: string; value: string }[]
  ) => {
    const newData = data.filter((row) => {
      return filters.every(({ column, operator, value }) => {
        const cellValue = row[column];
        const cellText =
          typeof cellValue === "string"
            ? cellValue
            : typeof cellValue === "object" && cellValue?.props?.children
            ? String(cellValue.props.children)
            : "";

        if (operator === "contains") {
          return cellText.toLowerCase().includes(value.toLowerCase());
        } else if (operator === "equals") {
          return cellText.toLowerCase() === value.toLowerCase();
        } else if (operator === "starts with") {
          return cellText.toLowerCase().startsWith(value.toLowerCase());
        } else if (operator === "ends with") {
          return cellText.toLowerCase().endsWith(value.toLowerCase());
        }
        return true;
      });
    });
    setFilteredData(newData);
    setSelectedRows([]); // Clear selection when filter changes
  };

  const handleFilterClear = () => {
    setFilteredData(data);
    setSelectedRows([]); // Clear selection when filter is cleared
  };

  const handleRowSelect = (index: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(Array.from({ length: filteredData.length }, (_, i) => i));
    }
  };

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key)
  );

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 py-2">
        <TableControls
          columns={columns}
          visibleColumns={visibleColumns}
          data={filteredData}
          selectedRows={selectedRows}
          onColumnChange={handleVisibleColumnsChange}
          onFilterApply={handleFilterApply}
          onFilterClear={handleFilterClear}
        />
      </div>

      <div className="relative">
        <div className="overflow-x-auto w-full">
          {visibleColumns.length === 0 || filteredData.length === 0 ? (
            <EmptyState
              message={
                visibleColumns.length === 0
                  ? "No columns to display. Please select columns to show."
                  : "No results found. Please check the filter and try again."
              }
            />
          ) : (
            <table className="my-2 w-full min-w-full table-fixed">
              <thead>
                <tr className="text-gray-600 text-sm">
                  {filteredColumns.map((column) => (
                    <th
                      key={column.key}
                      className={clsx(
                        "group p-3 border-b border-gray-200 text-gray-600 font-semibold text-left items-center sticky top-0 tracking-wider",
                        column.width && `w-[${column.width}]`
                      )}
                    >
                      {column.key === "checkbox" ? (
                        <input
                          aria-label="Select all rows"
                          ref={headerCheckboxRef}
                          type="checkbox"
                          checked={selectedRows.length === filteredData.length}
                          onChange={handleSelectAll}
                          className="w-4 h-4 accent-mBlue mt-1"
                        />
                      ) : (
                        <>
                          <span>{column.label}</span>
                          <span className="invisible group-hover:visible ml-2">
                            ↕
                          </span>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="group hover:bg-gray-50 transition-colors duration-150 text-sm items-center"
                  >
                    {filteredColumns.map((column) => (
                      <td
                        key={column.key}
                        className={clsx(
                          "px-3 py-1 border-b border-gray-200",
                          column.width && `w-[${column.width}]`
                        )}
                      >
                        {column.key === "checkbox" ? (
                          <input
                            aria-label="Select row"
                            type="checkbox"
                            checked={selectedRows.includes(rowIndex)}
                            onChange={() => handleRowSelect(rowIndex)}
                            className="w-4 h-4 accent-mBlue"
                          />
                        ) : (
                          <div className="max-w-full truncate">
                            {row[column.key]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <p className="text-gray-500 text-center max-w-md">{message}</p>
  </div>
);

export default Table;
