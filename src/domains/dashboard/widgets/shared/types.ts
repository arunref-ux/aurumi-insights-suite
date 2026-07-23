import type { ReactNode } from "react";
import type { DashboardWidget } from "../../types";

/** Status semantic used across widgets for consistent color coding. */
export type WidgetStatus = "neutral" | "positive" | "negative" | "warning" | "info";

/** Direction of a trend value. */
export type TrendDirection = "up" | "down" | "flat";

/** Base props shared by every widget in the SDK. */
export interface BaseWidgetProps<TConfig = Record<string, unknown>, TData = unknown> {
  widget: DashboardWidget<TConfig>;
  data?: TData;
  isLoading?: boolean;
  error?: Error | null;
  headerActions?: ReactNode;
}
