import type { WidgetStatus } from "../shared/types";

export interface ProgressWidgetData {
  /** Value 0–100. */
  percentage: number;
  status?: WidgetStatus;
  description?: string;
  currentLabel?: string;
  targetLabel?: string;
}

export interface ProgressWidgetConfig {
  showPercentage?: boolean;
}
