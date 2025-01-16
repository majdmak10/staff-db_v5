import React from "react";

interface SelectedRowsProps {
  count: number;
}

const SelectedRows: React.FC<SelectedRowsProps> = ({ count }) => {
  if (count <= 0) return null;

  return (
    <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">
      {count} selected
    </div>
  );
};

export default SelectedRows;
