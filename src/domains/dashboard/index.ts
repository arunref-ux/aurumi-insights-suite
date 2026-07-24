export * from "./types";
export { widgetRegistry } from "./registry/widget-registry";
export { WIDGET_MANIFEST, type WidgetManifest } from "./registry/manifest";
export { WidgetCard } from "./components/widget-card";
export { PlaceholderWidget } from "./components/placeholder-widget";
export { DashboardRenderer, RenderWidget } from "./components/dashboard-renderer";
export { DashboardToolbar } from "./components/dashboard-toolbar";
export { useWidgetData } from "./hooks/use-widget-data";
export {
  useDashboard,
  useDashboards,
  useDefaultDashboard,
  dashboardKeys,
} from "./hooks/use-dashboard";
export * from "./widgets";
