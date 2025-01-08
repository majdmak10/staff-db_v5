import React, { useState, useEffect, useRef } from "react";

interface Column {
  key: string;
  label: string | JSX.Element;
}

interface TableFilterProps {
  columns: Column[];
  onFilterApply: (filters: {
    column: string;
    operator: string;
    value: string;
  }) => void;
  onClose: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  onFilterApply,
  onClose,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [selectedOperator, setSelectedOperator] = useState<string>("contains");
  const [filterValue, setFilterValue] = useState<string>("");

  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the menu
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const handleApplyFilter = () => {
    if (selectedColumn && filterValue) {
      onFilterApply({
        column: selectedColumn,
        operator: selectedOperator,
        value: filterValue,
      });
      // Do not close the menu on apply
    }
  };

  const handleClearFilter = () => {
    setSelectedColumn("");
    setSelectedOperator("contains");
    setFilterValue("");
    // Do not close the menu on clear
  };

  return (
    <div
      ref={filterMenuRef}
      className="absolute bg-white shadow-lg rounded-md p-4 w-80 z-20"
    >
      {/* Column Selection */}
      <div className="mb-4">
        <label
          htmlFor="column"
          className="block text-sm font-medium text-gray-700"
        >
          Column
        </label>
        <select
          id="column"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="" disabled>
            Select column
          </option>
          {columns.map((column) => (
            <option key={column.key} value={column.key}>
              {typeof column.label === "string" ? column.label : column.key}
            </option>
          ))}
        </select>
      </div>

      {/* Operator Selection */}
      <div className="mb-4">
        <label
          htmlFor="operator"
          className="block text-sm font-medium text-gray-700"
        >
          Operator
        </label>
        <select
          id="operator"
          value={selectedOperator}
          onChange={(e) => setSelectedOperator(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts with</option>
          <option value="endsWith">Ends with</option>
        </select>
      </div>

      {/* Filter Value */}
      <div className="mb-4">
        <label
          htmlFor="value"
          className="block text-sm font-medium text-gray-700"
        >
          Value
        </label>
        <input
          id="value"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          placeholder="Enter filter value"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
        >
          Apply Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
