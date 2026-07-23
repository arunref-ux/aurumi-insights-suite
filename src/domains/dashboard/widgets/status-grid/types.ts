export type HealthStatus = "healthy" | "warning" | "attention";

export interface StatusGridItem {
  id: string;
  label: string;
  status: HealthStatus;
  message?: string;
}

export interface StatusGridWidgetConfig {
  columns?: 2 | 3 | 4 | 5;
}

export interface StatusGridWidgetData {
  items: StatusGridItem[];
}
