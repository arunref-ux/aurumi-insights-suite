import type { WidgetStatus, TrendDirection } from "./types";

/** Tailwind classes for status pills / accents. Uses semantic tokens only. */
export const STATUS_TEXT: Record<WidgetStatus, string> = {
  neutral: "text-muted-foreground",
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-red-600 dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-sky-600 dark:text-sky-400",
};

export const STATUS_BG_SOFT: Record<WidgetStatus, string> = {
  neutral: "bg-muted text-muted-foreground",
  positive: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  negative: "bg-red-500/10 text-red-600 dark:text-red-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export function trendToStatus(direction: TrendDirection): WidgetStatus {
  if (direction === "up") return "positive";
  if (direction === "down") return "negative";
  return "neutral";
}
