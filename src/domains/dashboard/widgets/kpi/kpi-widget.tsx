import { Activity } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_TEXT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type { KpiWidgetConfig, KpiWidgetData } from "./types";

export type KpiWidgetProps = BaseWidgetProps<KpiWidgetConfig, KpiWidgetData>;

export function KpiWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: KpiWidgetProps) {
  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Activity className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
    >
      {data ? (
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {data.value}
            </span>
            {data.valueSuffix ? (
              <span className="text-sm text-muted-foreground">{data.valueSuffix}</span>
            ) : null}
          </div>
          {data.label ? (
            <p className={`text-xs ${STATUS_TEXT[data.status ?? "neutral"]}`}>
              {data.label}
            </p>
          ) : null}
          {data.comparison ? (
            <p className="text-xs text-muted-foreground">{data.comparison}</p>
          ) : null}
        </div>
      ) : null}
    </WidgetCard>
  );
}
