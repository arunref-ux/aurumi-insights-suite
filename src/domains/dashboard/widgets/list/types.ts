import type { WidgetStatus } from "../shared/types";

export interface ListItem {
  id: string;
  label: string;
  secondaryText?: string;
  /** Lucide icon name resolved by the widget. */
  iconName?: string;
  badge?: {
    text: string;
    status?: WidgetStatus;
  };
}

export interface ListWidgetConfig {
  maxItems?: number;
}

export interface ListWidgetData {
  items: ListItem[];
}
