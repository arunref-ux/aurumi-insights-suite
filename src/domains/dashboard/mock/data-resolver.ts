import {
  mockAiSummary,
  mockKpi,
  mockList,
  mockProgress,
  mockTable,
  mockTrendKpi,
  mockTrendKpiDown,
} from "./widget-data";
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
} from "./ecc-widget-data";

/**
 * Resolves a widget `dataSource` string into a mock dataset.
 * Real dashboards will replace this with an actual data-fetching layer.
 */
const REGISTRY: Record<string, unknown> = {
  // Executive overview (legacy demo)
  "mock:kpi.revenue": mockKpi,
  "mock:trendKpi.orders": mockTrendKpi,
  "mock:trendKpi.churn": mockTrendKpiDown,
  "mock:list.tasks": mockList,
  "mock:progress.quota": mockProgress,
  "mock:table.pipeline": mockTable,
  "mock:ai.summary": mockAiSummary,

  // Executive Command Center
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
};

export function resolveMockData(dataSource: string | undefined): unknown {
  if (!dataSource) return undefined;
  return REGISTRY[dataSource];
}
