import {
  mockAiSummary,
  mockKpi,
  mockList,
  mockProgress,
  mockTable,
  mockTrendKpi,
  mockTrendKpiDown,
} from "./widget-data";

/**
 * Resolves a widget `dataSource` string into a mock dataset.
 * Real dashboards will replace this with an actual data-fetching layer.
 */
const REGISTRY: Record<string, unknown> = {
  "mock:kpi.revenue": mockKpi,
  "mock:trendKpi.orders": mockTrendKpi,
  "mock:trendKpi.churn": mockTrendKpiDown,
  "mock:list.tasks": mockList,
  "mock:progress.quota": mockProgress,
  "mock:table.pipeline": mockTable,
  "mock:ai.summary": mockAiSummary,
};

export function resolveMockData(dataSource: string | undefined): unknown {
  if (!dataSource) return undefined;
  return REGISTRY[dataSource];
}
