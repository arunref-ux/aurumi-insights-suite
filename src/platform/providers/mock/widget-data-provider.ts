import type { DashboardWidget } from "@/domains/dashboard/types";
import { resolveMockData } from "@/domains/dashboard/mock/data-resolver";
import type { WidgetDataProvider } from "../../contracts";

/**
 * Mock widget-data provider. Wraps the fixture resolver so no consumer
 * of the Dashboard Engine imports mock data directly.
 */
export const mockWidgetDataProvider: WidgetDataProvider = {
  resolve(widget: DashboardWidget) {
    return resolveMockData(widget.dataSource);
  },
};
