export type NavKey = "dashboard" | "reports" | "analytics" | "ai-insights" | "settings";

export interface NavItem {
  key: NavKey;
  label: string;
  to: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/dashboard" },
  { key: "reports", label: "Reports", to: "/reports" },
  { key: "analytics", label: "Analytics", to: "/analytics" },
  { key: "ai-insights", label: "AI Insights", to: "/ai-insights" },
  { key: "settings", label: "Settings", to: "/settings" },
] as const;

export const NAV_LABEL_BY_PATH: Record<string, string> = Object.fromEntries(
  NAV_ITEMS.map((i) => [i.to, i.label]),
);
