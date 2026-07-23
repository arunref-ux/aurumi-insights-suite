import { AlertTriangle, CheckCircle2, HeartPulse, ShieldAlert } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import type { BaseWidgetProps } from "../shared/types";
import type {
  HealthStatus,
  StatusGridWidgetConfig,
  StatusGridWidgetData,
} from "./types";

export type StatusGridWidgetProps = BaseWidgetProps<
  StatusGridWidgetConfig,
  StatusGridWidgetData
>;

const STATUS_META: Record<
  HealthStatus,
  {
    label: string;
    dot: string;
    ring: string;
    text: string;
    icon: typeof CheckCircle2;
  }
> = {
  healthy: {
    label: "Healthy",
    dot: "bg-emerald-500",
    ring: "border-emerald-500/30 bg-emerald-500/5",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  warning: {
    label: "Warning",
    dot: "bg-amber-500",
    ring: "border-amber-500/30 bg-amber-500/5",
    text: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  attention: {
    label: "Attention",
    dot: "bg-red-500",
    ring: "border-red-500/30 bg-red-500/5",
    text: "text-red-600 dark:text-red-400",
    icon: ShieldAlert,
  },
};

const COL_CLASS: Record<NonNullable<StatusGridWidgetConfig["columns"]>, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

export function StatusGridWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: StatusGridWidgetProps) {
  const items = data?.items ?? [];
  const columns = widget.config?.columns ?? 5;

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<HeartPulse className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && items.length === 0}
    >
      <div className={`grid gap-3 ${COL_CLASS[columns]}`} role="list">
        {items.map((item) => {
          const meta = STATUS_META[item.status];
          const Icon = meta.icon;
          return (
            <div
              key={item.id}
              role="listitem"
              className={`flex flex-col gap-2 rounded-md border p-3 ${meta.ring}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${meta.dot}`}
                  aria-hidden="true"
                />
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-medium ${meta.text}`}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{meta.label}</span>
              </div>
              {item.message ? (
                <p className="text-xs text-muted-foreground">{item.message}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
