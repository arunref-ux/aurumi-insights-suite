import { ArrowDownRight, ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT, STATUS_TEXT, trendToStatus } from "../shared/status";
import type { BaseWidgetProps, TrendDirection } from "../shared/types";
import type { KpiWidgetConfig, TrendKpiWidgetData } from "../kpi/types";

export type TrendKpiWidgetProps = BaseWidgetProps<KpiWidgetConfig, TrendKpiWidgetData>;

const ARROWS: Record<TrendDirection, typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight,
};

export function TrendKpiWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: TrendKpiWidgetProps) {
  const status = data ? trendToStatus(data.trend.direction) : "neutral";
  const Arrow = data ? ARROWS[data.trend.direction] : ArrowRight;

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
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

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BG_SOFT[status]}`}
            >
              <Arrow className="h-3 w-3" aria-hidden="true" />
              <span className="tabular-nums">
                {data.trend.percentage.toFixed(1)}%
              </span>
            </span>
            <span className="text-xs text-muted-foreground">{data.trend.period}</span>
          </div>

          {data.comparison ? (
            <p className={`text-xs ${STATUS_TEXT[data.status ?? "neutral"]}`}>
              {data.comparison}
            </p>
          ) : null}
        </div>
      ) : null}
    </WidgetCard>
  );
}
