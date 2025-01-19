import React from "react";
import clsx from "clsx";
import { Column } from "./Table";

interface TableHeaderProps {
  columns: Column[];
  sortState?: {
    column: string | number | null;
    direction: "asc" | "desc" | null;
  };
  handleSort: (key: string) => void;
  headerCheckboxRef: React.RefObject<HTMLInputElement>;
  handleSelectAll: () => void;
  disableSortingFor: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortState,
  handleSort,
  headerCheckboxRef,
  handleSelectAll,
  disableSortingFor,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => {
              if (!disableSortingFor.includes(column.key))
                handleSort(column.key);
            }}
            className={clsx(
              "group p-3 border-b border-gray-200 font-semibold text-left",
              column.width && `w-[${column.width}]`,
              {
                "cursor-pointer": !disableSortingFor.includes(column.key),
                "cursor-default": disableSortingFor.includes(column.key),
                "bg-blue-50 text-blue-600": sortState?.column === column.key, // Highlight active sorting column
              }
            )}
          >
            {column.key === "checkbox" ? (
              <input
                aria-label="Select all"
                type="checkbox"
                ref={headerCheckboxRef}
                onChange={handleSelectAll}
                className="w-4 h-4"
              />
            ) : (
              <div className="flex items-center">
                <span>{column.label}</span>
                {!disableSortingFor.includes(column.key) && (
                  <>
                    {sortState?.column === column.key ? (
                      <span className="ml-2">
                        {sortState.direction === "asc" ? "↑" : "↓"}
                      </span>
                    ) : (
                      <span className="ml-2 opacity-0 group-hover:opacity-100">
                        ↕
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
