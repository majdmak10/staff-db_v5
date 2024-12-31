"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [checkedState, setCheckedState] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [headerChecked, setHeaderChecked] = useState(false);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const totalChecked = checkedState.filter((state) => state).length;

    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        totalChecked > 0 && totalChecked < data.length;
    }

    setHeaderChecked(totalChecked === data.length);
  }, [checkedState, data.length]);

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = Array(data.length).fill(!headerChecked);
    setCheckedState(newCheckedState);
  };

  const handleRowCheckboxChange = (index: number) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedState(newCheckedState);
  };

  const getColumnWidthClass = (width: string | undefined) => {
    if (!width) return "";
    const numericWidth = parseInt(width, 10);
    if (isNaN(numericWidth)) return "";
    return `w-[${numericWidth}px]`;
  };

  return (
    <div className="overflow-x-auto w-full">
      <TableControls />
      <table className="mt-4 pb-10 w-full min-w-full table-fixed mb-2">
        <thead>
          <tr className="text-gray-600 text-sm">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-4 border-b border-gray-200 text-gray-600 font-semibold text-left ${getColumnWidthClass(
                  column.width
                )}`}
              >
                {column.key === "checkbox" ? (
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={headerChecked}
                    onChange={handleHeaderCheckboxChange}
                    aria-label="Select all rows"
                    className="w-4 h-4 accent-mBlue rounded"
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
            <tr key={rowIndex} className="hover:bg-gray-100 text-sm">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-1 border-b border-gray-200 ${getColumnWidthClass(
                    column.width
                  )}`}
                >
                  {column.key === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={checkedState[rowIndex]}
                      onChange={() => handleRowCheckboxChange(rowIndex)}
                      aria-label={`Select row ${rowIndex + 1}`}
                      className="w-4 h-4 accent-mBlue rounded"
                    />
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
