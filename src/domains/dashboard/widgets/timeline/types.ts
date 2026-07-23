import type { WidgetStatus } from "../shared/types";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  actor?: string;
  /** ISO 8601 timestamp. */
  timestamp: string;
  status?: WidgetStatus;
  /** Lucide icon name string (resolved inside widget in the future). */
  iconName?: string;
}

export interface TimelineWidgetConfig {
  maxItems?: number;
}

export interface TimelineWidgetData {
  items: TimelineItem[];
}
