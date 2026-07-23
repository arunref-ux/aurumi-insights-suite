import { Target } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type { FocusTodayWidgetConfig, FocusTodayWidgetData } from "./types";

export type FocusTodayWidgetProps = BaseWidgetProps<
  FocusTodayWidgetConfig,
  FocusTodayWidgetData
>;

export function FocusTodayWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: FocusTodayWidgetProps) {
  const items = data?.items ?? [];

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle ?? widget.config?.caption}
      icon={<Target className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && items.length === 0}
      emptyMessage="Nothing to focus on right now."
      bodyClassName="p-0"
    >
      <ol className="flex flex-1 flex-col divide-y divide-border/60">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-3 px-4 py-3"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary"
              >
                {idx + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug">{item.label}</p>
                {item.detail ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </div>
            {item.priority ? (
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BG_SOFT[item.priority.status ?? "neutral"]}`}
              >
                {item.priority.text}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {data?.footnote ? (
        <p className="border-t border-border/60 px-4 py-2 text-xs text-muted-foreground">
          {data.footnote}
        </p>
      ) : null}
    </WidgetCard>
  );
}
