import { Sparkles } from "lucide-react";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_BG_SOFT } from "../shared/status";
import type { BaseWidgetProps, WidgetStatus } from "../shared/types";
import type {
  AiConfidence,
  AiSummaryWidgetConfig,
  AiSummaryWidgetData,
} from "./types";

export type AiSummaryWidgetProps = BaseWidgetProps<
  AiSummaryWidgetConfig,
  AiSummaryWidgetData
>;

const CONFIDENCE_STATUS: Record<AiConfidence, WidgetStatus> = {
  low: "warning",
  medium: "info",
  high: "positive",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AiSummaryWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: AiSummaryWidgetProps) {
  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!data}
      footer={
        data ? (
          <div className="flex items-center justify-between">
            <span>Generated {formatTimestamp(data.generatedAt)}</span>
            {data.model ? <span className="font-mono">{data.model}</span> : null}
          </div>
        ) : null
      }
    >
      {data ? (
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold tracking-tight">
              {data.summaryTitle}
            </h4>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STATUS_BG_SOFT[CONFIDENCE_STATUS[data.confidence]]}`}
            >
              {data.confidence} confidence
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {data.insight}
          </p>
        </div>
      ) : null}
    </WidgetCard>
  );
}
