import type { KpiWidgetData, TrendKpiWidgetData } from "../widgets/kpi/types";
import type { ListWidgetData } from "../widgets/list/types";
import type { ProgressWidgetData } from "../widgets/progress/types";
import type { TableWidgetData } from "../widgets/table/types";
import type { AiSummaryWidgetData } from "../widgets/ai-summary/types";
import type { TimelineWidgetData } from "../widgets/timeline/types";
import type { StatusGridWidgetData } from "../widgets/status-grid/types";
import type { PendingActionsWidgetData } from "../widgets/pending-actions/types";

const nowIso = () => new Date().toISOString();
const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString();

// ─── KPIs ────────────────────────────────────────────────────────────────
export const eccKpiRevenue: TrendKpiWidgetData = {
  value: "$4.82M",
  trend: { direction: "up", percentage: 8.6, period: "vs last month" },
  status: "positive",
  comparison: "Ahead of forecast by $340K",
};

export const eccKpiPipeline: TrendKpiWidgetData = {
  value: "$18.4M",
  trend: { direction: "up", percentage: 4.1, period: "vs last week" },
  status: "positive",
  comparison: "3.2x coverage on quarterly quota",
};

export const eccKpiCashflow: TrendKpiWidgetData = {
  value: "$1.12M",
  trend: { direction: "down", percentage: 2.3, period: "vs prior 30 days" },
  status: "warning",
  comparison: "Two large receivables slipped past due",
};

export const eccKpiEmployees: KpiWidgetData = {
  value: "742",
  label: "12 new hires this month",
  status: "info",
  comparison: "Attrition steady at 4.1% annualised",
};

export const eccKpiInventory: KpiWidgetData = {
  value: "94",
  valueSuffix: "%",
  label: "Within target thresholds",
  status: "positive",
  comparison: "6 SKUs flagged for reorder review",
};

export const eccKpiCsat: TrendKpiWidgetData = {
  value: "4.6",
  valueSuffix: "/ 5",
  trend: { direction: "up", percentage: 1.4, period: "vs prior 30 days" },
  status: "positive",
  comparison: "NPS trending upward across all regions",
};

// ─── Revenue trend / progress ────────────────────────────────────────────
export const eccProgressRevenue: ProgressWidgetData = {
  percentage: 72,
  status: "positive",
  description:
    "Bookings velocity is trending 6 points above plan. Enterprise segment leading, mid-market lagging.",
  currentLabel: "$7.2M booked",
  targetLabel: "$10M quarterly commit",
};

// ─── AI Executive Summary ────────────────────────────────────────────────
export const eccAiSummary: AiSummaryWidgetData = {
  summaryTitle: "Business is trending healthy with three items to watch",
  insight:
    "Revenue is up 8.6% month over month and pipeline coverage sits comfortably above target. Inventory levels remain within acceptable ranges across 94% of SKUs, and customer satisfaction is at a rolling high. Three high-priority operational issues need attention: two enterprise receivables have slipped past due, mid-market win rate has softened by 2 points, and one distribution centre is showing intermittent fulfilment delays.",
  confidence: "high",
  generatedAt: nowIso(),
  model: "aurumi-insights-v1",
};

// ─── Open tasks list ─────────────────────────────────────────────────────
export const eccOpenTasks: ListWidgetData = {
  items: [
    {
      id: "task-1",
      label: "Approve Q4 headcount plan",
      secondaryText: "People Ops · due today",
      badge: { text: "High", status: "negative" },
    },
    {
      id: "task-2",
      label: "Review enterprise renewal — Northwind",
      secondaryText: "Sales · due tomorrow",
      badge: { text: "High", status: "negative" },
    },
    {
      id: "task-3",
      label: "Sign vendor MSA — Fabrikam Logistics",
      secondaryText: "Legal · this week",
      badge: { text: "Medium", status: "warning" },
    },
    {
      id: "task-4",
      label: "Publish quarterly investor update",
      secondaryText: "Comms · Friday",
      badge: { text: "Normal", status: "info" },
    },
    {
      id: "task-5",
      label: "Confirm distribution centre remediation plan",
      secondaryText: "Operations · next Monday",
      badge: { text: "Normal", status: "neutral" },
    },
  ],
};

// ─── Sales pipeline table ────────────────────────────────────────────────
export interface EccPipelineRow extends Record<string, unknown> {
  account: string;
  owner: string;
  stage: string;
  value: string;
  close: string;
}

export const eccPipelineTable: TableWidgetData<EccPipelineRow> = {
  columns: [
    { id: "account", header: "Account" },
    { id: "owner", header: "Owner" },
    { id: "stage", header: "Stage" },
    { id: "value", header: "Value", align: "right" },
    { id: "close", header: "Close date", align: "right" },
  ],
  rows: [
    {
      account: "Northwind Traders",
      owner: "A. Rivera",
      stage: "Negotiation",
      value: "$680,000",
      close: "2026-08-14",
    },
    {
      account: "Contoso Ltd.",
      owner: "M. Chen",
      stage: "Proposal",
      value: "$412,500",
      close: "2026-08-22",
    },
    {
      account: "Fabrikam Inc.",
      owner: "S. Okafor",
      stage: "Discovery",
      value: "$260,000",
      close: "2026-09-05",
    },
    {
      account: "Adventure Works",
      owner: "J. Park",
      stage: "Negotiation",
      value: "$895,000",
      close: "2026-08-30",
    },
    {
      account: "Litware Systems",
      owner: "T. Nakamura",
      stage: "Contracting",
      value: "$540,000",
      close: "2026-08-11",
    },
  ],
  getRowId: (r) => r.account,
};

// ─── Business activity timeline ──────────────────────────────────────────
export const eccActivityTimeline: TimelineWidgetData = {
  items: [
    {
      id: "a1",
      title: "Purchase approved",
      description: "PO-4821 for $124,000 — Enterprise servers, Q3 refresh.",
      actor: "Approved by CFO",
      timestamp: minutesAgo(6),
      status: "positive",
    },
    {
      id: "a2",
      title: "Deal closed — Litware Systems",
      description: "$540K, Contracting → Closed Won.",
      actor: "T. Nakamura",
      timestamp: minutesAgo(48),
      status: "positive",
    },
    {
      id: "a3",
      title: "New employee joined",
      description: "Priya Shah — Senior Solutions Engineer, EMEA.",
      actor: "People Ops",
      timestamp: minutesAgo(180),
      status: "info",
    },
    {
      id: "a4",
      title: "Expense submitted for review",
      description: "$3,240 — Customer summit travel, batch of 4 reports.",
      actor: "Finance queue",
      timestamp: minutesAgo(320),
      status: "neutral",
    },
    {
      id: "a5",
      title: "Leave approved",
      description: "5 days PTO — A. Rivera (Sales, NA).",
      actor: "People Ops",
      timestamp: minutesAgo(540),
      status: "neutral",
    },
    {
      id: "a6",
      title: "Vendor invoice escalated",
      description: "INV-9921 · Fabrikam Logistics — payment 12 days overdue.",
      actor: "AP team",
      timestamp: minutesAgo(1200),
      status: "warning",
    },
  ],
};

// ─── Pending actions ─────────────────────────────────────────────────────
export const eccPendingActions: PendingActionsWidgetData = {
  metrics: [
    {
      id: "approvals",
      label: "Pending approvals",
      count: 14,
      status: "warning",
      hint: "Finance, HR, procurement",
    },
    {
      id: "overdue",
      label: "Overdue tasks",
      count: 6,
      status: "negative",
      hint: "Assigned across leadership",
    },
    {
      id: "escalations",
      label: "Open escalations",
      count: 3,
      status: "info",
      hint: "Customer + operational",
    },
  ],
  footnote:
    "Approvals and escalations are managed in ACTIONS. This view is read-only.",
};

// ─── Business health status grid ─────────────────────────────────────────
export const eccBusinessHealth: StatusGridWidgetData = {
  items: [
    {
      id: "sales",
      label: "Sales",
      status: "healthy",
      message: "Pipeline coverage 3.2x, win rate steady.",
    },
    {
      id: "hr",
      label: "HR",
      status: "healthy",
      message: "Hiring on plan, attrition within target.",
    },
    {
      id: "finance",
      label: "Finance",
      status: "warning",
      message: "Two enterprise receivables past due.",
    },
    {
      id: "inventory",
      label: "Inventory",
      status: "healthy",
      message: "94% of SKUs within thresholds.",
    },
    {
      id: "operations",
      label: "Operations",
      status: "attention",
      message: "Fulfilment delays at DC-West.",
    },
  ],
};

// ─── Focus Today ─────────────────────────────────────────────────────────
import type { FocusTodayWidgetData } from "../widgets/focus-today/types";

export const eccFocusToday: FocusTodayWidgetData = {
  items: [
    {
      id: "f1",
      label: "Review pending approvals",
      detail: "14 approvals awaiting your decision in ACTIONS.",
      priority: { text: "High", status: "negative" },
    },
    {
      id: "f2",
      label: "Contact Hyderabad sales team",
      detail: "Branch exceeded target by 12% — reinforce and share playbook.",
      priority: { text: "Medium", status: "warning" },
    },
    {
      id: "f3",
      label: "Follow up on delayed purchase",
      detail: "PO-4832 to Fabrikam Logistics is 3 days past ETA.",
      priority: { text: "Medium", status: "warning" },
    },
    {
      id: "f4",
      label: "Review hiring pipeline",
      detail: "6 senior roles enter final loop this week.",
      priority: { text: "Normal", status: "info" },
    },
  ],
  footnote: "Suggested focus based on today's signals.",
};




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
