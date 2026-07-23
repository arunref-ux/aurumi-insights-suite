import { widgetRegistry } from "../registry/widget-registry";
import type { WidgetComponent, WidgetDefinition } from "../types";
import { KpiWidget } from "./kpi/kpi-widget";
import { TrendKpiWidget } from "./trend/trend-kpi-widget";
import { ListWidget } from "./list/list-widget";
import { ProgressWidget } from "./progress/progress-widget";
import { TableWidget } from "./table/table-widget";
import { AiSummaryWidget } from "./ai-summary/ai-summary-widget";
import { TimelineWidget } from "./timeline/timeline-widget";
import { StatusGridWidget } from "./status-grid/status-grid-widget";
import { PendingActionsWidget } from "./pending-actions/pending-actions-widget";
import { FocusTodayWidget } from "./focus-today/focus-today-widget";

interface SdkEntry {
  definition: WidgetDefinition;
  component: WidgetComponent;
}

const SDK_WIDGETS: SdkEntry[] = [
  {
    definition: {
      type: "kpi",
      displayName: "KPI",
      description: "Single metric with optional status and comparison.",
      category: "kpi",
      defaultSize: "sm",
    },
    component: KpiWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "trendKpi",
      displayName: "Trend KPI",
      description: "KPI with directional trend indicator and period.",
      category: "kpi",
      defaultSize: "sm",
    },
    component: TrendKpiWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "list",
      displayName: "List",
      description: "Compact list of items with optional badges.",
      category: "list",
      defaultSize: "md",
    },
    component: ListWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "progress",
      displayName: "Progress",
      description: "Progress toward a target with status indicator.",
      category: "progress",
      defaultSize: "sm",
    },
    component: ProgressWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "table",
      displayName: "Data Table",
      description: "Simple tabular breakdown of records.",
      category: "table",
      defaultSize: "lg",
    },
    component: TableWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "aiSummary",
      displayName: "AI Summary",
      description: "AI-generated narrative insight with confidence.",
      category: "ai",
      defaultSize: "full",
    },
    component: AiSummaryWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "timeline",
      displayName: "Timeline",
      description: "Chronological feed of business activity events.",
      category: "list",
      defaultSize: "lg",
    },
    component: TimelineWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "statusGrid",
      displayName: "Status Grid",
      description: "Grid of business areas with a health status per item.",
      category: "other",
      defaultSize: "full",
    },
    component: StatusGridWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "pendingActions",
      displayName: "Pending Actions",
      description: "Read-only summary of pending approvals and escalations.",
      category: "list",
      defaultSize: "lg",
    },
    component: PendingActionsWidget as unknown as WidgetComponent,
  },
  {
    definition: {
      type: "focusToday",
      displayName: "Focus Today",
      description: "Executive to-do list for the day.",
      category: "list",
      defaultSize: "md",
    },
    component: FocusTodayWidget as unknown as WidgetComponent,
  },
];

let registered = false;

export function registerSdkWidgets(): void {
  if (registered) return;
  registered = true;
  for (const { definition, component } of SDK_WIDGETS) {
    widgetRegistry.register(definition, component);
  }
}
