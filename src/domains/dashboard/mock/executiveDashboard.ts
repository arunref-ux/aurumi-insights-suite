import type { Dashboard } from "../types";

export const executiveDashboard: Dashboard = {
  id: "exec-001",
  slug: "executive",
  title: "Executive Overview",
  description:
    "A high-level view of revenue, pipeline, operations, and AI-generated insights across the organisation.",
  metadata: {
    owner: "Aurumi Insights",
    version: "0.1.0",
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
              title: "Revenue Overview",
              subtitle: "Month to date",
              size: "sm",
            },
            {
              id: "w-pipeline",
              type: "kpi",
              title: "Sales Pipeline",
              subtitle: "Weighted value",
              size: "sm",
            },
            {
              id: "w-attendance",
              type: "progress",
              title: "Employee Attendance",
              subtitle: "This week",
              size: "sm",
            },
            {
              id: "w-inventory",
              type: "progress",
              title: "Inventory Health",
              subtitle: "Across warehouses",
              size: "sm",
            },
          ],
        },
        {
          id: "row-trend",
          widgets: [
            {
              id: "w-revenue-trend",
              type: "lineChart",
              title: "Revenue Trend",
              subtitle: "Last 12 months",
              size: "xl",
            },
            {
              id: "w-tasks",
              type: "list",
              title: "Open Tasks",
              subtitle: "Assigned to leadership",
              size: "md",
            },
          ],
        },
      ],
    },
    {
      id: "sec-operations",
      title: "Operations",
      description: "Day-to-day operational signals.",
      rows: [
        {
          id: "row-ops",
          widgets: [
            {
              id: "w-pipeline-table",
              type: "table",
              title: "Sales Pipeline Detail",
              subtitle: "Top opportunities",
              size: "lg",
            },
            {
              id: "w-calendar",
              type: "calendar",
              title: "Upcoming Milestones",
              subtitle: "Next 30 days",
              size: "lg",
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
              type: "placeholder",
              title: "AI Summary",
              subtitle: "Generated narrative of business performance",
              size: "full",
            },
          ],
        },
      ],
    },
  ],
};

export const dashboardCatalog: readonly Dashboard[] = [executiveDashboard];
