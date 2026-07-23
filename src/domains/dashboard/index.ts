export * from "./types";
export { widgetRegistry } from "./registry/widget-registry";
export { registerDefaultWidgets } from "./registry/register-defaults";
export { WidgetCard } from "./components/widget-card";
export { PlaceholderWidget } from "./components/placeholder-widget";
export { DashboardRenderer } from "./components/dashboard-renderer";
export { DashboardToolbar } from "./components/dashboard-toolbar";
export { DashboardService } from "./services/dashboard-service";
export {
  useDashboard,
  useDashboards,
  useDefaultDashboard,
  dashboardKeys,
} from "./hooks/use-dashboard";
export { executiveDashboard, dashboardCatalog } from "./mock/executiveDashboard";
export { executiveCommandCenter } from "./mock/executiveCommandCenter";
export * from "./widgets";
