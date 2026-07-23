import type { ReactNode } from "react";

export type WidgetSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type WidgetCategory =
  | "kpi"
  | "chart"
  | "table"
  | "list"
  | "calendar"
  | "progress"
  | "ai"
  | "other";

export type WidgetType =
  | "kpi"
  | "lineChart"
  | "barChart"
  | "table"
  | "progress"
  | "list"
  | "calendar"
  | "placeholder"
  | (string & {});

export interface WidgetDefinition {
  /** Unique widget type identifier used to look up the component in the registry. */
  type: WidgetType;
  /** Human-readable display name for the widget type. */
  displayName: string;
  /** Optional description used by widget pickers and placeholder rendering. */
  description?: string;
  /** Category grouping used for organisation and filtering. */
  category: WidgetCategory;
  /** Default size to use when a widget instance does not specify one. */
  defaultSize?: WidgetSize;
}

export interface WidgetProps<TConfig = Record<string, unknown>, TData = unknown> {
  widget: DashboardWidget<TConfig>;
  data?: TData;
  isLoading?: boolean;
  error?: Error | null;
}

export interface DashboardWidget<TConfig = Record<string, unknown>> {
  id: string;
  type: WidgetType;
  title: string;
  subtitle?: string;
  /** Optional lucide icon name; the renderer resolves it. */
  icon?: string;
  size?: WidgetSize;
  /** Arbitrary widget-specific configuration. */
  config?: TConfig;
  /** Optional hint for the data source that will hydrate this widget later. */
  dataSource?: string;
}

export interface DashboardRow {
  id: string;
  widgets: DashboardWidget[];
}

export interface DashboardSection {
  id: string;
  title?: string;
  description?: string;
  rows: DashboardRow[];
}

export type DashboardFilterType = "text" | "select" | "dateRange" | "boolean";

export interface DashboardFilter {
  id: string;
  label: string;
  type: DashboardFilterType;
  options?: readonly { label: string; value: string }[];
  defaultValue?: unknown;
}

export interface DashboardMetadata {
  owner?: string;
  version?: string;
  tags?: readonly string[];
  updatedAt?: string;
  [key: string]: unknown;
}

export interface Dashboard {
  id: string;
  slug: string;
  title: string;
  description?: string;
  sections: DashboardSection[];
  filters?: DashboardFilter[];
  metadata?: DashboardMetadata;
}

export type WidgetComponent = (props: WidgetProps) => ReactNode;
