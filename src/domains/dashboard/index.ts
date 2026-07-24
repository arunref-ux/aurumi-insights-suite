export * from "./types";
export { widgetRegistry } from "./registry/widget-registry";
export { bootstrapWidgetRegistry } from "./registry/bootstrap";
export { WIDGET_MANIFEST, type WidgetManifest } from "./registry/manifest";
export { registerDefaultWidgets } from "./registry/register-defaults";
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
export { executiveDashboard, dashboardCatalog } from "./mock/executiveDashboard";
export { executiveCommandCenter } from "./mock/executiveCommandCenter";
export * from "./widgets";
