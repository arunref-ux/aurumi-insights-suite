import { resolveMockData as legacyResolver } from "./data-resolver-legacy"; // If you want to keep old ones
import * as roleData from "./ecc-widget-data"; // Assuming you put the data above in here

const REGISTRY: Record<string, unknown> = {
  // Sales
  "mock:sales.kpi.pipeline": roleData.salesKpiPipeline,
  "mock:sales.kpi.winRate": roleData.salesKpiWinRate,
  "mock:sales.list.stalled": roleData.salesListStalled,
  "mock:sales.table.topDeals": roleData.salesTableTopDeals,
  
  // HR
  "mock:hr.kpi.headcount": roleData.hrKpiHeadcount,
  "mock:hr.kpi.attrition": roleData.hrKpiAttrition,
  "mock:hr.list.ooo": roleData.hrListOOO,
  "mock:hr.list.pending": roleData.hrListPending,
};

export function resolveMockData(dataSource: string | undefined): unknown {
  if (!dataSource) return undefined;
  // Fallback to existing ecc widgets if not found in our new list
  return REGISTRY[dataSource] || (roleData as any)[dataSource.replace('mock:ecc.', 'ecc')]; 
}
