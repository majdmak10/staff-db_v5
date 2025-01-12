import { useState, useMemo } from "react";

interface UseSortProps {
  initialData: Array<{ [key: string]: string | JSX.Element }>;
  defaultSortKey?: string;
}

const useSort = ({ initialData, defaultSortKey }: UseSortProps) => {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return initialData;

    return [...initialData].sort((a, b) => {
      const aValue =
        typeof a[sortKey] === "string" ? a[sortKey]?.toString() : "";
      const bValue =
        typeof b[sortKey] === "string" ? b[sortKey]?.toString() : "";

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [initialData, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      // Toggle sort direction
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Set new sort key and default direction
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return { sortedData, sortKey, sortDirection, handleSort };
};

export default useSort;
