import type { Dashboard } from "../types";
import { executiveDashboard } from "../mock/executiveDashboard";
import { executiveCommandCenter } from "../mock/executiveCommandCenter";

const CATALOG: readonly Dashboard[] = [executiveCommandCenter, executiveDashboard];

const delay = <T,>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const DashboardService = {
  /** List all dashboards available to the current tenant. */
  getDashboards(): Promise<Dashboard[]> {
    return delay([...CATALOG]);
  },

  /** Fetch a single dashboard by id or slug. */
  getDashboard(idOrSlug: string): Promise<Dashboard | null> {
    const match = CATALOG.find((d) => d.id === idOrSlug || d.slug === idOrSlug);
    return delay(match ?? null);
  },

  /** Default dashboard used by the shell landing route. */
  getDefaultDashboard(): Promise<Dashboard> {
    return delay(executiveCommandCenter);
  },
};
