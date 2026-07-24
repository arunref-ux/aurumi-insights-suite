import type { Dashboard } from "@/domains/dashboard/types";
import { executiveDashboard } from "@/domains/dashboard/mock/executiveDashboard";
import { executiveCommandCenter } from "@/domains/dashboard/mock/executiveCommandCenter";
import type { DashboardListItem, DashboardProvider } from "../../contracts";

const CATALOG: readonly Dashboard[] = [executiveCommandCenter, executiveDashboard];

const delay = <T,>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

function toListItem(d: Dashboard): DashboardListItem {
  return {
    id: d.id,
    slug: d.slug,
    title: d.title,
    description: d.description,
    category: d.metadata?.category,
    icon: d.metadata?.icon,
    order: d.metadata?.order,
  };
}

export const mockDashboardProvider: DashboardProvider = {
  list: () => delay(CATALOG.map(toListItem)),
  get: (idOrSlug) =>
    delay(CATALOG.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null),
  getDefault: () => delay(executiveCommandCenter satisfies Dashboard),
};
