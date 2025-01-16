export interface TableData {
  id?: string;
  [key: string]: string | JSX.Element | undefined;
}

export interface DeleteActionResult {
  success: boolean;
  error?: unknown;
}
