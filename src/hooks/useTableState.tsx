import { useState, useEffect } from "react";

interface TableState {
  visibleColumns: string[];
  columnOrder: string[];
  columnWidths: Record<string, number>;
  filters: Array<{ column: string; operator: string; value: string }>;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

const TABLE_STATE_KEY = "tableState";

export const useTableState = (tableId: string, initialState: TableState) => {
  const [state, setState] = useState<TableState>(() => {
    const savedState = localStorage.getItem(`${TABLE_STATE_KEY}_${tableId}`);
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(
      `${TABLE_STATE_KEY}_${tableId}`,
      JSON.stringify(state)
    );
  }, [tableId, state]);

  const updateState = (updates: Partial<TableState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return {
    state,
    updateState,
    resetState,
  };
};

// TableStateProvider Component
const TableStateContext = React.createContext<{
  state: TableState;
  updateState: (updates: Partial<TableState>) => void;
  resetState: () => void;
} | null>(null);

export const TableStateProvider: React.FC<{
  children: React.ReactNode;
  tableId: string;
  initialState: TableState;
}> = ({ children, tableId, initialState }) => {
  const tableState = useTableState(tableId, initialState);

  return (
    <TableStateContext.Provider value={tableState}>
      {children}
    </TableStateContext.Provider>
  );
};
