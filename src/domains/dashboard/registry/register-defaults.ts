import { PlaceholderWidget } from "../components/placeholder-widget";
import { widgetRegistry } from "./widget-registry";
import type { WidgetDefinition } from "../types";

const DEFAULT_DEFINITIONS: WidgetDefinition[] = [
  {
    type: "kpi",
    displayName: "KPI",
    description: "A single high-level metric with optional delta and trend.",
    category: "kpi",
    defaultSize: "sm",
  },
  {
    type: "lineChart",
    displayName: "Line Chart",
    description: "Time-series visualisation for continuous metrics.",
    category: "chart",
    defaultSize: "lg",
  },
  {
    type: "barChart",
    displayName: "Bar Chart",
    description: "Categorical comparison across dimensions.",
    category: "chart",
    defaultSize: "md",
  },
  {
    type: "table",
    displayName: "Table",
    description: "Tabular breakdown of records with sortable columns.",
    category: "table",
    defaultSize: "lg",
  },
  {
    type: "progress",
    displayName: "Progress",
    description: "Track progress against a target or goal.",
    category: "progress",
    defaultSize: "sm",
  },
  {
    type: "list",
    displayName: "List",
    description: "Compact list of entities with contextual metadata.",
    category: "list",
    defaultSize: "md",
  },
  {
    type: "calendar",
    displayName: "Calendar",
    description: "Date-based view of scheduled activity.",
    category: "calendar",
    defaultSize: "lg",
  },
  {
    type: "placeholder",
    displayName: "Placeholder",
    description: "Generic placeholder shell used during scaffolding.",
    category: "other",
    defaultSize: "md",
  },
];

let registered = false;

export function registerDefaultWidgets(): void {
  if (registered) return;
  registered = true;

  widgetRegistry.setFallback(PlaceholderWidget);
  for (const def of DEFAULT_DEFINITIONS) {
    widgetRegistry.register(def, PlaceholderWidget);
  }
}
