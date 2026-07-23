import type { WidgetStatus } from "../shared/types";

export interface PendingActionMetric {
  id: string;
  label: string;
  count: number;
  status?: WidgetStatus;
  hint?: string;
}

export interface PendingActionsWidgetConfig {
  actionLabel?: string;
}

export interface PendingActionsWidgetData {
  metrics: PendingActionMetric[];
  /** Optional footnote shown under the metrics. */
  footnote?: string;
}
