import type { WidgetStatus, TrendDirection } from "../shared/types";

export interface KpiWidgetConfig {
  /** Optional lucide icon name — resolved by the widget. */
  iconName?: string;
}

export interface KpiWidgetData {
  value: string | number;
  valueSuffix?: string;
  label?: string;
  status?: WidgetStatus;
  comparison?: string;
}

export interface TrendKpiWidgetData extends KpiWidgetData {
  trend: {
    direction: TrendDirection;
    percentage: number;
    period: string;
  };
}
