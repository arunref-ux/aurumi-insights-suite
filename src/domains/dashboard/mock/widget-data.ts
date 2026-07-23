import type { KpiWidgetData, TrendKpiWidgetData } from "../widgets/kpi/types";
import type { ListWidgetData } from "../widgets/list/types";
import type { ProgressWidgetData } from "../widgets/progress/types";
import type { TableWidgetData } from "../widgets/table/types";
import type { AiSummaryWidgetData } from "../widgets/ai-summary/types";

export const mockKpi: KpiWidgetData = {
  value: "$1.24M",
  label: "Above target",
  status: "positive",
  comparison: "vs $1.10M last month",
};

export const mockTrendKpi: TrendKpiWidgetData = {
  value: "8,432",
  valueSuffix: "orders",
  trend: { direction: "up", percentage: 12.4, period: "vs last 30 days" },
  comparison: "Highest weekly volume this quarter",
};

export const mockTrendKpiDown: TrendKpiWidgetData = {
  value: "3.8%",
  trend: { direction: "down", percentage: 1.2, period: "vs last week" },
  status: "negative",
  comparison: "Churn slightly elevated",
};

export const mockList: ListWidgetData = {
  items: [
    {
      id: "t1",
      label: "Approve Q3 budget revision",
      secondaryText: "Finance · due today",
      badge: { text: "High", status: "negative" },
    },
    {
      id: "t2",
      label: "Sign vendor MSA — Northwind",
      secondaryText: "Legal · due tomorrow",
      badge: { text: "Medium", status: "warning" },
    },
    {
      id: "t3",
      label: "Review hiring plan",
      secondaryText: "People Ops · this week",
      badge: { text: "Normal", status: "info" },
    },
    {
      id: "t4",
      label: "Publish investor update",
      secondaryText: "Comms · Friday",
      badge: { text: "Normal", status: "neutral" },
    },
  ],
};

export const mockProgress: ProgressWidgetData = {
  percentage: 68,
  status: "info",
  description: "On track to hit quarterly commit.",
  currentLabel: "$6.8M booked",
  targetLabel: "$10M target",
};

export interface PipelineRow extends Record<string, unknown> {
  account: string;
  owner: string;
  stage: string;
  value: string;
  close: string;
}

export const mockTable: TableWidgetData<PipelineRow> = {
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
      value: "$480,000",
      close: "2026-08-14",
    },
    {
      account: "Contoso Ltd.",
      owner: "M. Chen",
      stage: "Proposal",
      value: "$312,500",
      close: "2026-08-22",
    },
    {
      account: "Fabrikam Inc.",
      owner: "S. Okafor",
      stage: "Discovery",
      value: "$210,000",
      close: "2026-09-05",
    },
    {
      account: "Adventure Works",
      owner: "J. Park",
      stage: "Negotiation",
      value: "$675,000",
      close: "2026-08-30",
    },
  ],
  getRowId: (r) => r.account,
};

export const mockAiSummary: AiSummaryWidgetData = {
  summaryTitle: "Revenue outlook trending positive",
  insight:
    "Bookings velocity in the enterprise segment is up 14% week over week, driven by expansion in existing accounts. Pipeline coverage for the current quarter now sits at 3.2x, comfortably above the 3.0x threshold. Watch: mid-market win rate has slipped 2 points — worth a targeted review with the commercial team.",
  confidence: "high",
  generatedAt: new Date().toISOString(),
  model: "aurumi-insights-v1",
};
