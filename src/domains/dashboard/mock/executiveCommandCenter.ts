import type { Dashboard } from "../types";

export const executiveCommandCenter: Dashboard = {
  id: "ecc-001",
  slug: "executive-command-center",
  title: "Executive Command Center",
  description: "Business Overview",
  metadata: {
    owner: "Aurumi Business Insights",
    version: "1.0.0",
    tags: ["executive", "command-center", "overview"],
    updatedAt: new Date().toISOString(),
    category: "executive",
    icon: "LayoutDashboard",
    defaultRole: "executive",
    order: 1,
    description:
      "The reference executive dashboard: leading indicators, operational signals, and AI-generated summary for daily leadership use.",
  },
  sections: [
    {
      id: "sec-kpis",
      title: "Business at a glance",
      description: "Six leading indicators across revenue, people, and operations.",
      rows: [
        {
          id: "row-kpis-1",
          widgets: [
            {
              id: "kpi-revenue",
              type: "trendKpi",
              title: "Revenue",
              subtitle: "Month to date",
              size: "md",
              dataSource: "mock:ecc.kpi.revenue",
            },
            {
              id: "kpi-pipeline",
              type: "trendKpi",
              title: "Sales Pipeline",
              subtitle: "Weighted, open opportunities",
              size: "md",
              dataSource: "mock:ecc.kpi.pipeline",
            },
            {
              id: "kpi-cashflow",
              type: "trendKpi",
              title: "Cash Flow",
              subtitle: "Net, last 30 days",
              size: "md",
              dataSource: "mock:ecc.kpi.cashflow",
            },
          ],
        },
        {
          id: "row-kpis-2",
          widgets: [
            {
              id: "kpi-employees",
              type: "kpi",
              title: "Active Employees",
              subtitle: "Across all business units",
              size: "md",
              dataSource: "mock:ecc.kpi.employees",
            },
            {
              id: "kpi-inventory",
              type: "kpi",
              title: "Inventory Health",
              subtitle: "SKUs within target thresholds",
              size: "md",
              dataSource: "mock:ecc.kpi.inventory",
            },
            {
              id: "kpi-csat",
              type: "trendKpi",
              title: "Customer Satisfaction",
              subtitle: "Rolling 30-day CSAT",
              size: "md",
              dataSource: "mock:ecc.kpi.csat",
            },
          ],
        },
      ],
    },
    {
      id: "sec-overview",
      title: "Executive overview",
      description: "Signals to focus your day and week.",
      rows: [
        {
          id: "row-overview-1",
          widgets: [
            {
              id: "w-revenue-trend",
              type: "progress",
              title: "Revenue Trend",
              subtitle: "Progress toward quarterly commit",
              size: "xl",
              dataSource: "mock:ecc.progress.revenue",
            },
            {
              id: "w-ai-summary",
              type: "aiSummary",
              title: "AI Executive Summary",
              subtitle: "Signals across the business",
              size: "md",
              dataSource: "mock:ecc.ai.summary",
            },
          ],
        },
        {
          id: "row-overview-2",
          widgets: [
            {
              id: "w-pipeline-table",
              type: "table",
              title: "Sales Pipeline",
              subtitle: "Top open opportunities",
              size: "xl",
              dataSource: "mock:ecc.table.pipeline",
            },
            {
              id: "w-open-tasks",
              type: "list",
              title: "Open Tasks",
              subtitle: "Assigned to leadership",
              size: "md",
              dataSource: "mock:ecc.list.tasks",
              config: { maxItems: 5 },
            },
          ],
        },
      ],
    },
    {
      id: "sec-operations",
      title: "Operations",
      description: "What's happening now and what needs a decision.",
      rows: [
        {
          id: "row-ops-1",
          widgets: [
            {
              id: "w-activity",
              type: "timeline",
              title: "Business Activity",
              subtitle: "Latest events across the platform",
              size: "lg",
              dataSource: "mock:ecc.timeline.activity",
              config: { maxItems: 6 },
            },
            {
              id: "w-pending-actions",
              type: "pendingActions",
              title: "Pending Actions",
              subtitle: "Awaiting a decision from you or your team",
              size: "lg",
              dataSource: "mock:ecc.actions.pending",
              config: { actionLabel: "Open ACTIONS" },
            },
          ],
        },
        {
          id: "row-ops-2",
          widgets: [
            {
              id: "w-business-health",
              type: "statusGrid",
              title: "Business Health",
              subtitle: "Live status across platform areas",
              size: "full",
              dataSource: "mock:ecc.status.health",
              config: { columns: 5 },
            },
          ],
        },
      ],
    },
  ],
};
