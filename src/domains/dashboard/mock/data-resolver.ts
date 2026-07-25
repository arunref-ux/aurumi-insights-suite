import {
  eccActivityTimeline,
  eccAiSummary,
  eccBusinessHealth,
  eccKpiCashflow,
  eccKpiCsat,
  eccKpiEmployees,
  eccKpiInventory,
  eccKpiPipeline,
  eccKpiRevenue,
  eccOpenTasks,
  eccPendingActions,
  eccPipelineTable,
  eccProgressRevenue,
  eccFocusToday,
  // Bring in the new mock data we added to this file
  salesKpiPipeline,
  salesKpiWinRate,
  salesListStalled,
  salesTableTopDeals,
  hrKpiHeadcount,
  hrKpiAttrition,
  hrListOOO,
  hrListPending
} from "./ecc-widget-data";

/**
 * Resolves a widget `dataSource` string into a mock dataset.
 * Real dashboards will replace this with an actual data-fetching layer.
 */
const REGISTRY: Record<string, unknown> = {
  // --- CEO / Executive Command Center (Restored) ---
  "mock:ecc.kpi.revenue": eccKpiRevenue,
  "mock:ecc.kpi.pipeline": eccKpiPipeline,
  "mock:ecc.kpi.cashflow": eccKpiCashflow,
  "mock:ecc.kpi.employees": eccKpiEmployees,
  "mock:ecc.kpi.inventory": eccKpiInventory,
  "mock:ecc.kpi.csat": eccKpiCsat,
  "mock:ecc.progress.revenue": eccProgressRevenue,
  "mock:ecc.ai.summary": eccAiSummary,
  "mock:ecc.list.tasks": eccOpenTasks,
  "mock:ecc.table.pipeline": eccPipelineTable,
  "mock:ecc.timeline.activity": eccActivityTimeline,
  "mock:ecc.actions.pending": eccPendingActions,
  "mock:ecc.status.health": eccBusinessHealth,
  "mock:ecc.focus.today": eccFocusToday,

  // --- Sales Manager Data ---
  "mock:sales.kpi.pipeline": salesKpiPipeline,
  "mock:sales.kpi.winRate": salesKpiWinRate,
  "mock:sales.list.stalled": salesListStalled,
  "mock:sales.table.topDeals": salesTableTopDeals,
  
  // --- HR Manager Data ---
  "mock:hr.kpi.headcount": hrKpiHeadcount,
  "mock:hr.kpi.attrition": hrKpiAttrition,
  "mock:hr.list.ooo": hrListOOO,
  "mock:hr.list.pending": hrListPending,
};

export function resolveMockData(dataSource: string | undefined): unknown {
  if (!dataSource) return undefined;
  return REGISTRY[dataSource];
}
