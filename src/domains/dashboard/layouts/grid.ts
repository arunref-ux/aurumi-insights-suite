import type { WidgetSize } from "../types";

/**
 * Column span (out of 12) each widget occupies at the `lg` breakpoint.
 * Smaller breakpoints collapse gracefully via Tailwind utilities.
 */
export const WIDGET_SIZE_TO_COL_SPAN: Record<WidgetSize, string> = {
  xs: "col-span-12 sm:col-span-6 lg:col-span-2",
  sm: "col-span-12 sm:col-span-6 lg:col-span-3",
  md: "col-span-12 sm:col-span-6 lg:col-span-4",
  lg: "col-span-12 lg:col-span-6",
  xl: "col-span-12 lg:col-span-8",
  full: "col-span-12",
};

export function getWidgetColSpan(size: WidgetSize | undefined): string {
  return WIDGET_SIZE_TO_COL_SPAN[size ?? "md"];
}
