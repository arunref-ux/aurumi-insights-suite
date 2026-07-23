import { Table as TableIcon } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import type { BaseWidgetProps } from "../shared/types";
import type { TableWidgetConfig, TableWidgetData } from "./types";

export type TableWidgetProps<TRow = Record<string, unknown>> = BaseWidgetProps<
  TableWidgetConfig,
  TableWidgetData<TRow>
>;

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

export function TableWidget<TRow extends Record<string, unknown>>({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: TableWidgetProps<TRow>) {
  const rows = data?.rows ?? [];
  const columns = data?.columns ?? [];
  const emptyMessage = widget.config?.emptyMessage ?? "No records to display.";

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<TableIcon className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && rows.length === 0}
      emptyMessage={emptyMessage}
      bodyClassName="p-0"
    >
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={`px-4 py-2 font-medium ${alignClass[col.align ?? "left"]} ${col.widthClassName ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const rowId = data?.getRowId?.(row, i) ?? String(i);
              return (
                <tr
                  key={rowId}
                  className="border-t border-border/60 transition-colors hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={`px-4 py-2.5 ${alignClass[col.align ?? "left"]}`}
                    >
                      {col.cell ? col.cell(row) : String(row[col.id] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  );
}
