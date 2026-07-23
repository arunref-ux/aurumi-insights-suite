import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard-service";

export const dashboardKeys = {
  all: ["dashboards"] as const,
  list: () => [...dashboardKeys.all, "list"] as const,
  detail: (idOrSlug: string) => [...dashboardKeys.all, "detail", idOrSlug] as const,
  default: () => [...dashboardKeys.all, "default"] as const,
};

export function useDashboards() {
  return useQuery({
    queryKey: dashboardKeys.list(),
    queryFn: () => DashboardService.getDashboards(),
  });
}

export function useDashboard(idOrSlug: string) {
  return useQuery({
    queryKey: dashboardKeys.detail(idOrSlug),
    queryFn: () => DashboardService.getDashboard(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useDefaultDashboard() {
  return useQuery({
    queryKey: dashboardKeys.default(),
    queryFn: () => DashboardService.getDefaultDashboard(),
  });
}
