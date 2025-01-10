// TableExport.tsx
"use client";

import { useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, Table, TableRow, TableCell } from "docx";
import { saveAs } from "file-saver";

// Add the Column interface
interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string;
}

interface ExportProps {
  columns: Column[];
  visibleColumns: string[];
  data: Array<{ [key: string]: string | JSX.Element }>;
  selectedRows?: number[];
  onClose: () => void;
}

const TableExport: React.FC<ExportProps> = ({
  columns,
  visibleColumns,
  data,
  selectedRows,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const processData = () => {
    // Filter columns to exclude checkbox and profilePicture
    const exportableColumns = columns.filter(
      (col) =>
        visibleColumns.includes(col.key) &&
        col.key !== "checkbox" &&
        col.key !== "profilePicture"
    );

    // Filter rows if selectedRows is provided
    const rowsToExport = selectedRows
      ? data.filter((_, index) => selectedRows.includes(index))
      : data;

    // Process data for export
    return rowsToExport.map((row) => {
      const processedRow: { [key: string]: string } = {};
      exportableColumns.forEach((col) => {
        const value = row[col.key];
        processedRow[col.key] =
          typeof value === "string"
            ? value
            : value?.props?.children
            ? String(value.props.children)
            : "";
      });
      return processedRow;
    });
  };

  const exportToExcel = () => {
    const processedData = processData();
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "table-export.xlsx");
    onClose();
  };

  const exportToWord = async () => {
    const processedData = processData();
    const exportableColumns = columns.filter(
      (col) =>
        visibleColumns.includes(col.key) &&
        col.key !== "checkbox" &&
        col.key !== "profilePicture"
    );

    // Create header row
    const headerRow = new TableRow({
      children: exportableColumns.map(
        (col) =>
          new TableCell({
            children: [new Paragraph({ text: String(col.label) })],
          })
      ),
    });

    // Create data rows
    const dataRows = processedData.map(
      (row) =>
        new TableRow({
          children: exportableColumns.map(
            (col) =>
              new TableCell({
                children: [new Paragraph({ text: row[col.key] || "" })],
              })
          ),
        })
    );

    // Create document
    const doc = new Document({
      sections: [
        {
          children: [
            new Table({
              rows: [headerRow, ...dataRows],
            }),
          ],
        },
      ],
    });

    // Generate and save document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "table-export.docx");
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px]"
    >
      <button
        onClick={exportToExcel}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        Export to Excel
      </button>
      <button
        onClick={exportToWord}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        Export to Word
      </button>
    </div>
  );
};

export default TableExport;
