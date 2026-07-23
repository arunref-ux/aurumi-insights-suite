import type { KpiWidgetData, TrendKpiWidgetData } from "@/domains/dashboard/widgets/kpi/types";
import type { PendingActionsWidgetData } from "@/domains/dashboard/widgets/pending-actions/types";
import type { TimelineWidgetData } from "@/domains/dashboard/widgets/timeline/types";
import type { StatusGridWidgetData } from "@/domains/dashboard/widgets/status-grid/types";
import type { AiSummaryWidgetData } from "@/domains/dashboard/widgets/ai-summary/types";

export type ConversationRole = "user" | "assistant";

export type ConversationCard =
  | { kind: "executiveSummary"; title?: string; data: AiSummaryWidgetData }
  | {
      kind: "kpiSnapshot";
      title?: string;
      items: {
        id: string;
        label: string;
        data: KpiWidgetData | TrendKpiWidgetData;
        trend?: boolean;
      }[];
    }
  | { kind: "pendingActions"; title?: string; data: PendingActionsWidgetData }
  | { kind: "timeline"; title?: string; data: TimelineWidgetData }
  | { kind: "businessHealth"; title?: string; data: StatusGridWidgetData };

export interface ConversationReference {
  /** Human-readable label ("Revenue KPI"). */
  label: string;
  /** Optional widget id on the current dashboard. */
  widgetId?: string;
}

export interface ConversationMessage {
  id: string;
  role: ConversationRole;
  /** Short text body. Cards carry the rich content. */
  text: string;
  /** Optional rich response cards. */
  cards?: ConversationCard[];
  /** Optional references to dashboard widgets. */
  references?: ConversationReference[];
  /** ISO 8601 timestamp. */
  timestamp: string;
}

export interface ConversationSuggestion {
  id: string;
  prompt: string;
}
