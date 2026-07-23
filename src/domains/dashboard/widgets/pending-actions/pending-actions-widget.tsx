import { ArrowUpRight, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "../../components/widget-card";
import { STATUS_TEXT } from "../shared/status";
import type { BaseWidgetProps } from "../shared/types";
import type {
  PendingActionsWidgetConfig,
  PendingActionsWidgetData,
} from "./types";

export type PendingActionsWidgetProps = BaseWidgetProps<
  PendingActionsWidgetConfig,
  PendingActionsWidgetData
>;

export function PendingActionsWidget({
  widget,
  data,
  isLoading,
  error,
  headerActions,
}: PendingActionsWidgetProps) {
  const actionLabel = widget.config?.actionLabel ?? "Open ACTIONS";
  const metrics = data?.metrics ?? [];

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Inbox className="h-4 w-4" aria-hidden="true" />}
      headerActions={headerActions}
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && metrics.length === 0}
    >
      <div className="flex flex-1 flex-col gap-4">
        <ul role="list" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {metrics.map((m) => (
            <li
              key={m.id}
              className="flex flex-col gap-1 rounded-md border border-border/60 bg-muted/30 p-3"
            >
              <span className="text-xs font-medium text-muted-foreground">
                {m.label}
              </span>
              <span
                className={`text-2xl font-semibold tabular-nums ${STATUS_TEXT[m.status ?? "neutral"]}`}
              >
                {m.count}
              </span>
              {m.hint ? (
                <span className="text-xs text-muted-foreground">{m.hint}</span>
              ) : null}
            </li>
          ))}
        </ul>

        {data?.footnote ? (
          <p className="text-xs text-muted-foreground">{data.footnote}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <p className="text-xs text-muted-foreground">
            Managed by the ACTIONS workflow app.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            aria-label={actionLabel}
            disabled
          >
            {actionLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </WidgetCard>
  );
}
