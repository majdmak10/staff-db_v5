"use client";

interface Props {
  onExport: (type: "excel" | "word") => void;
}

const TableExport: React.FC<Props> = ({ onExport = () => {} }) => {
  return (
    <div className="p-4 w-48 bg-white rounded shadow-md">
      <button
        onClick={() => onExport("excel")}
        className="w-full mb-2 bg-green-500 text-white px-3 py-2 rounded"
      >
        Export to Excel
      </button>
      <button
        onClick={() => onExport("word")}
        className="w-full bg-blue-500 text-white px-3 py-2 rounded"
      >
        Export to Word
      </button>
    </div>
  );
};

export default TableExport;
