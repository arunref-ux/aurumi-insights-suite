import type { ReactNode } from "react";

export interface TableColumn<TRow> {
  id: string;
  header: string;
  /** Optional cell renderer; defaults to reading `row[id]`. */
  cell?: (row: TRow) => ReactNode;
  align?: "left" | "right" | "center";
  /** Optional Tailwind width class, e.g. "w-32". */
  widthClassName?: string;
}

export interface TableWidgetConfig {
  emptyMessage?: string;
}

export interface TableWidgetData<TRow = Record<string, unknown>> {
  columns: TableColumn<TRow>[];
  rows: TRow[];
  /** Optional stable id accessor. Defaults to index. */
  getRowId?: (row: TRow, index: number) => string;
}
