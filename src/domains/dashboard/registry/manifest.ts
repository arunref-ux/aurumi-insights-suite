import type { WidgetComponent, WidgetDefinition } from "../types";
import { PlaceholderWidget } from "../components/placeholder-widget";
import { KpiWidget } from "../widgets/kpi/kpi-widget";
import { TrendKpiWidget } from "../widgets/trend/trend-kpi-widget";
import { ListWidget } from "../widgets/list/list-widget";
import { ProgressWidget } from "../widgets/progress/progress-widget";
import { TableWidget } from "../widgets/table/table-widget";
import { AiSummaryWidget } from "../widgets/ai-summary/ai-summary-widget";
import { TimelineWidget } from "../widgets/timeline/timeline-widget";
import { StatusGridWidget } from "../widgets/status-grid/status-grid-widget";
import { PendingActionsWidget } from "../widgets/pending-actions/pending-actions-widget";
import { FocusTodayWidget } from "../widgets/focus-today/focus-today-widget";

/**
 * Minimal widget manifest.
 *
 * A single, flat description of every widget the SDK ships. This replaces
 * the split "default types" + "SDK components" registration pattern with
 * one source of truth. Kept intentionally small — future milestones may
 * add capability flags, versioning, or generic typing.
 */
export interface WidgetManifest {
  id: string;
  type: string;
  title: string;
  description?: string;
  renderer: WidgetComponent;
  definition: WidgetDefinition;
}

const asComponent = (c: unknown): WidgetComponent => c as WidgetComponent;

export const WIDGET_MANIFEST: readonly WidgetManifest[] = [
  {
    id: "widget.kpi",
    type: "kpi",
    title: "KPI",
    description: "Single metric with optional status and comparison.",
    renderer: asComponent(KpiWidget),
    definition: {
      type: "kpi",
      displayName: "KPI",
      description: "Single metric with optional status and comparison.",
      category: "kpi",
      defaultSize: "sm",
    },
  },
  {
    id: "widget.trendKpi",
    type: "trendKpi",
    title: "Trend KPI",
    description: "KPI with directional trend indicator and period.",
    renderer: asComponent(TrendKpiWidget),
    definition: {
      type: "trendKpi",
      displayName: "Trend KPI",
      description: "KPI with directional trend indicator and period.",
      category: "kpi",
      defaultSize: "sm",
    },
  },
  {
    id: "widget.list",
    type: "list",
    title: "List",
    description: "Compact list of items with optional badges.",
    renderer: asComponent(ListWidget),
    definition: {
      type: "list",
      displayName: "List",
      description: "Compact list of items with optional badges.",
      category: "list",
      defaultSize: "md",
    },
  },
  {
    id: "widget.progress",
    type: "progress",
    title: "Progress",
    description: "Progress toward a target with status indicator.",
    renderer: asComponent(ProgressWidget),
    definition: {
      type: "progress",
      displayName: "Progress",
      description: "Progress toward a target with status indicator.",
      category: "progress",
      defaultSize: "sm",
    },
  },
  {
    id: "widget.table",
    type: "table",
    title: "Data Table",
    description: "Simple tabular breakdown of records.",
    renderer: asComponent(TableWidget),
    definition: {
      type: "table",
      displayName: "Data Table",
      description: "Simple tabular breakdown of records.",
      category: "table",
      defaultSize: "lg",
    },
  },
  {
    id: "widget.aiSummary",
    type: "aiSummary",
    title: "AI Summary",
    description: "Narrative insight with confidence.",
    renderer: asComponent(AiSummaryWidget),
    definition: {
      type: "aiSummary",
      displayName: "AI Summary",
      description: "Narrative insight with confidence.",
      category: "ai",
      defaultSize: "full",
    },
  },
  {
    id: "widget.timeline",
    type: "timeline",
    title: "Timeline",
    description: "Chronological feed of business activity events.",
    renderer: asComponent(TimelineWidget),
    definition: {
      type: "timeline",
      displayName: "Timeline",
      description: "Chronological feed of business activity events.",
      category: "list",
      defaultSize: "lg",
    },
  },
  {
    id: "widget.statusGrid",
    type: "statusGrid",
    title: "Status Grid",
    description: "Grid of business areas with a health status per item.",
    renderer: asComponent(StatusGridWidget),
    definition: {
      type: "statusGrid",
      displayName: "Status Grid",
      description: "Grid of business areas with a health status per item.",
      category: "other",
      defaultSize: "full",
    },
  },
  {
    id: "widget.pendingActions",
    type: "pendingActions",
    title: "Pending Actions",
    description: "Read-only summary of pending approvals and escalations.",
    renderer: asComponent(PendingActionsWidget),
    definition: {
      type: "pendingActions",
      displayName: "Pending Actions",
      description: "Read-only summary of pending approvals and escalations.",
      category: "list",
      defaultSize: "lg",
    },
  },
  {
    id: "widget.focusToday",
    type: "focusToday",
    title: "Focus Today",
    description: "Executive to-do list for the day.",
    renderer: asComponent(FocusTodayWidget),
    definition: {
      type: "focusToday",
      displayName: "Focus Today",
      description: "Executive to-do list for the day.",
      category: "list",
      defaultSize: "md",
    },
  },
];

export const PLACEHOLDER_RENDERER: WidgetComponent = asComponent(PlaceholderWidget);
