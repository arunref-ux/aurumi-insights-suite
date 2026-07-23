import type { WidgetStatus } from "../shared/types";

export interface FocusTodayItem {
  id: string;
  label: string;
  detail?: string;
  /** Optional priority pill: High / Medium / Normal. */
  priority?: {
    text: string;
    status?: WidgetStatus;
  };
}

export interface FocusTodayWidgetConfig {
  /** Optional short caption shown under the title. */
  caption?: string;
}

export interface FocusTodayWidgetData {
  items: FocusTodayItem[];
  /** Optional footnote shown under the list. */
  footnote?: string;
}
