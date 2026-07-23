import type { Dashboard } from "../types";

export const executiveDashboard: Dashboard = {
  id: "exec-001",
  slug: "executive",
  title: "Executive Overview",
  description:
    "A high-level view of revenue, pipeline, operations, and AI-generated insights across the organisation.",
  metadata: {
    owner: "Aurumi Insights",
    version: "0.2.0",
    tags: ["executive", "overview"],
    updatedAt: "2026-07-23",
  },
  sections: [
    {
      id: "sec-performance",
      title: "Performance",
      description: "Key financial and commercial indicators.",
      rows: [
        {
          id: "row-kpis",
          widgets: [
            {
              id: "w-revenue",
              type: "kpi",
              title: "Revenue",
              subtitle: "Month to date",
              size: "sm",
              dataSource: "mock:kpi.revenue",
            },
            {
              id: "w-orders",
              type: "trendKpi",
              title: "Orders",
              subtitle: "Last 30 days",
              size: "sm",
              dataSource: "mock:trendKpi.orders",
            },
            {
              id: "w-churn",
              type: "trendKpi",
              title: "Churn Rate",
              subtitle: "Rolling 7 days",
              size: "sm",
              dataSource: "mock:trendKpi.churn",
            },
            {
              id: "w-quota",
              type: "progress",
              title: "Quarterly Quota",
              subtitle: "Bookings vs target",
              size: "sm",
              dataSource: "mock:progress.quota",
            },
          ],
        },
        {
          id: "row-ops",
          widgets: [
            {
              id: "w-pipeline",
              type: "table",
              title: "Sales Pipeline",
              subtitle: "Top opportunities",
              size: "xl",
              dataSource: "mock:table.pipeline",
            },
            {
              id: "w-tasks",
              type: "list",
              title: "Leadership Tasks",
              subtitle: "Assigned to you",
              size: "md",
              dataSource: "mock:list.tasks",
            },
          ],
        },
      ],
    },
    {
      id: "sec-intelligence",
      title: "Intelligence",
      rows: [
        {
          id: "row-ai",
          widgets: [
            {
              id: "w-ai-summary",
              type: "aiSummary",
              title: "AI Summary",
              subtitle: "Generated narrative of business performance",
              size: "full",
              dataSource: "mock:ai.summary",
            },
          ],
        },
      ],
    },
  ],
};

export const dashboardCatalog: readonly Dashboard[] = [executiveDashboard];
