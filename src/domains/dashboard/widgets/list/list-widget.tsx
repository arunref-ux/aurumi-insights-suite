import { Circle, ListChecks } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type { ListWidgetConfig, ListWidgetData } from "./types";

export type ListWidgetProps = BaseWidgetProps<ListWidgetConfig, ListWidgetData>;

export function ListWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: ListWidgetProps) {
  const items = data?.items ?? [];
  const max = widget.config?.maxItems;
  const visible = typeof max === "number" ? items.slice(0, max) : items;

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<ListChecks className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && visible.length === 0}
      emptyMessage="No items to display."
      bodyClassName="p-0"
    >
      <ul role="list" className="flex flex-1 flex-col divide-y divide-border/60">
        {visible.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Circle
                className="h-2 w-2 shrink-0 fill-current text-muted-foreground/60"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.label}</p>
                {item.secondaryText ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {item.secondaryText}
                  </p>
                ) : null}
              </div>
            </div>
            {item.badge ? (
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BG_SOFT[item.badge.status ?? "neutral"]}`}
              >
                {item.badge.text}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
