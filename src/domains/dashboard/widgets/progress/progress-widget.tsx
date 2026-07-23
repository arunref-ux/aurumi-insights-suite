import { Gauge } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type { ProgressWidgetConfig, ProgressWidgetData } from "./types";

export type ProgressWidgetProps = BaseWidgetProps<ProgressWidgetConfig, ProgressWidgetData>;

export function ProgressWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: ProgressWidgetProps) {
  const showPct = widget.config?.showPercentage ?? true;
  const pct = data ? Math.max(0, Math.min(100, data.percentage)) : 0;
  const status = data?.status ?? "info";

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
    >
      {data ? (
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-2">
            {showPct ? (
              <span className="text-2xl font-semibold tabular-nums">
                {pct.toFixed(0)}%
              </span>
            ) : (
              <span />
            )}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_BG_SOFT[status]}`}
            >
              {status}
            </span>
          </div>

          <Progress
            value={pct}
            aria-label={`${widget.title} progress: ${pct.toFixed(0)}%`}
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{data.currentLabel ?? ""}</span>
            <span>{data.targetLabel ?? ""}</span>
          </div>

          {data.description ? (
            <p className="text-xs text-muted-foreground">{data.description}</p>
          ) : null}
        </div>
      ) : null}
    </WidgetCard>
  );
}
