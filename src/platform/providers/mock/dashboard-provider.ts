import type { Dashboard } from "@/domains/dashboard/types";
import { executiveCommandCenter } from "@/domains/dashboard/mock/executiveCommandCenter";
import type { DashboardListItem, DashboardProvider } from "../../contracts";

// --- DEFINE SALES DASHBOARD ---
const salesDashboard: Dashboard = {
  id: "dash-sales-01", slug: "sales-manager-dashboard", title: "Sales Command Center", description: "Pipeline & Team Performance",
  sections: [
    {
      id: "sec-sales-kpi", title: "Pipeline Health",
      rows: [
        { id: "r1", widgets: [
          { id: "w-pipe", type: "trendKpi", title: "Total Pipeline", size: "md", dataSource: "mock:sales.kpi.pipeline" },
          { id: "w-win", type: "trendKpi", title: "Win Rate", size: "md", dataSource: "mock:sales.kpi.winRate" }
        ]}
      ]
    },
    {
      id: "sec-sales-ops", title: "Execution",
      rows: [
        { id: "r2", widgets: [
          { id: "w-stalled", type: "list", title: "Stalled Deals", subtitle: "Requires intervention", size: "md", dataSource: "mock:sales.list.stalled" },
          { id: "w-topdeals", type: "table", title: "Top Open Deals", size: "xl", dataSource: "mock:sales.table.topDeals" }
        ]}
      ]
    }
  ]
};

// --- DEFINE HR DASHBOARD ---
const hrDashboard: Dashboard = {
  id: "dash-hr-01", slug: "hr-manager-dashboard", title: "People Operations", description: "Headcount & Team Availability",
  sections: [
    {
      id: "sec-hr-kpi", title: "Company Metrics",
      rows: [
        { id: "r1", widgets: [
          { id: "w-headcount", type: "trendKpi", title: "Active Headcount", size: "md", dataSource: "mock:hr.kpi.headcount" },
          { id: "w-attrition", type: "trendKpi", title: "Annual Attrition", size: "md", dataSource: "mock:hr.kpi.attrition" }
        ]}
      ]
    },
    {
      id: "sec-hr-ops", title: "Daily Operations",
      rows: [
        { id: "r2", widgets: [
          { id: "w-ooo", type: "list", title: "Out of Office Today", size: "md", dataSource: "mock:hr.list.ooo" },
          { id: "w-hr-pending", type: "list", title: "Pending HR Actions", size: "md", dataSource: "mock:hr.list.pending" }
        ]}
      ]
    }
  ]
};

const CATALOG: readonly Dashboard[] = [executiveCommandCenter, salesDashboard, hrDashboard];
const delay = <T,>(value: T, ms = 120): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const mockDashboardProvider: DashboardProvider = {
  list: () => delay(CATALOG.map(d => ({ id: d.id, slug: d.slug, title: d.title }))),
  get: (idOrSlug) => delay(CATALOG.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null),
  getDefault: () => delay(executiveCommandCenter),
};
