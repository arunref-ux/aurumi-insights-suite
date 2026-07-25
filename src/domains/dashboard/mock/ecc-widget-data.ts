import type { KpiWidgetData, TrendKpiWidgetData } from "../widgets/kpi/types";
import type { ListWidgetData } from "../widgets/list/types";
import type { TableWidgetData } from "../widgets/table/types";

// --- SALES MANAGER MOCK DATA ---
export const salesKpiPipeline: TrendKpiWidgetData = {
  value: "$2.4M",
  trend: { direction: "up", percentage: 12.5, period: "vs last quarter" },
  status: "positive",
  comparison: "On track for Q3 Quota",
};

export const salesKpiWinRate: TrendKpiWidgetData = {
  value: "28.4%",
  trend: { direction: "down", percentage: 1.2, period: "vs last month" },
  status: "warning",
  comparison: "Slight dip in mid-market wins",
};

export const salesListStalled: ListWidgetData = {
  items: [
    { id: "d1", label: "Acme Corp Expansion", secondaryText: "No activity in 14 days", badge: { text: "$150k", status: "negative" } },
    { id: "d2", label: "Globex Initial Contract", secondaryText: "Pending legal review for 9 days", badge: { text: "$85k", status: "warning" } },
  ],
};

export const salesTableTopDeals: TableWidgetData<any> = {
  columns: [
    { id: "account", header: "Account" },
    { id: "rep", header: "Sales Rep" },
    { id: "stage", header: "Stage" },
    { id: "value", header: "Value", align: "right" },
  ],
  rows: [
    { account: "TechCorp", rep: "John Doe", stage: "Proposal", value: "$120,000" },
    { account: "Initech", rep: "Jane Smith", stage: "Negotiation", value: "$95,000" },
  ]
};

// --- HR MANAGER MOCK DATA ---
export const hrKpiHeadcount: TrendKpiWidgetData = {
  value: "142",
  trend: { direction: "up", percentage: 4.0, period: "vs last month" },
  status: "positive",
  comparison: "6 new hires boarded this week",
};

export const hrKpiAttrition: TrendKpiWidgetData = {
  value: "2.1%",
  trend: { direction: "flat", percentage: 0, period: "vs last quarter" },
  status: "info",
  comparison: "Well below industry average of 5%",
};

export const hrListOOO: ListWidgetData = {
  items: [
    { id: "o1", label: "Alex Chen", secondaryText: "Sales · Sick Leave", badge: { text: "Today", status: "negative" } },
    { id: "o2", label: "Maria Garcia", secondaryText: "Engineering · Annual Leave", badge: { text: "Until Friday", status: "info" } },
  ],
};

export const hrListPending: ListWidgetData = {
  items: [
    { id: "p1", label: "Approve Offer Letter: Senior Dev", secondaryText: "Waiting on HR Head", badge: { text: "Action", status: "warning" } },
    { id: "p2", label: "Review Q3 Bonus Payouts", secondaryText: "Due by tomorrow", badge: { text: "Action", status: "warning" } },
  ],
};
