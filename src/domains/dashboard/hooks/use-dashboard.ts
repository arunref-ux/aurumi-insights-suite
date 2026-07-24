import { useQuery } from "@tanstack/react-query";
import { useDashboardProvider } from "@/platform/context";

export const dashboardKeys = {
  all: ["dashboards"] as const,
  list: () => [...dashboardKeys.all, "list"] as const,
  detail: (idOrSlug: string) => [...dashboardKeys.all, "detail", idOrSlug] as const,
  default: () => [...dashboardKeys.all, "default"] as const,
};

export function useDashboards() {
  const provider = useDashboardProvider();
  return useQuery({
    queryKey: dashboardKeys.list(),
    queryFn: () => provider.list(),
  });
}

export function useDashboard(idOrSlug: string) {
  const provider = useDashboardProvider();
  return useQuery({
    queryKey: dashboardKeys.detail(idOrSlug),
    queryFn: () => provider.get(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useDefaultDashboard() {
  const provider = useDashboardProvider();
  return useQuery({
    queryKey: dashboardKeys.default(),
    queryFn: () => provider.getDefault(),
  });
}
