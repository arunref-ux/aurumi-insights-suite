import { Activity } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type { TimelineWidgetConfig, TimelineWidgetData } from "./types";

export type TimelineWidgetProps = BaseWidgetProps<TimelineWidgetConfig, TimelineWidgetData>;

function formatRelative(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const diffMs = Date.now() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function TimelineWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: TimelineWidgetProps) {
  const items = data?.items ?? [];
  const max = widget.config?.maxItems;
  const visible = typeof max === "number" ? items.slice(0, max) : items;

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Activity className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && visible.length === 0}
      emptyMessage="No recent activity."
      bodyClassName="p-0"
    >
      <ol role="list" className="flex flex-1 flex-col">
        {visible.map((item, idx) => {
          const status = item.status ?? "neutral";
          const isLast = idx === visible.length - 1;
          return (
            <li key={item.id} className="relative flex gap-3 px-4 py-3">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-background ${STATUS_BG_SOFT[status]}`}
                  aria-hidden="true"
                />
                {!isLast ? (
                  <span
                    className="mt-1 w-px flex-1 bg-border/70"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {formatRelative(item.timestamp)}
                  </span>
                </div>
                {item.description ? (
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
                {item.actor ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.actor}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </WidgetCard>
  );
}
