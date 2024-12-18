"use client";

import React from "react";
// import TableHeader from "./TableHeader";

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: string | JSX.Element }>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full">
      {/* <TableHeader /> */}
      <table className="mt-4 pb-10 w-full min-w-full table-fixed mb-2">
        <thead>
          <tr className="text-gray-600 text-sm">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-gray-600 font-semibold text-left"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 border-b">
                  {row[column.key]}
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
