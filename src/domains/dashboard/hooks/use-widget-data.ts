import { useMemo } from "react";
import { useWidgetDataProvider } from "@/platform/context";
import type { DashboardWidget } from "../types";

export interface WidgetDataEnvelope<TData = unknown> {
  data: TData | undefined;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Single source of widget data for the Dashboard Engine.
 *
 * The renderer and any host page that inlines a widget must go through
 * this hook — never through fixtures or dataSource lookups directly.
 * The current mock provider resolves synchronously; the envelope shape
 * leaves room for a future async / streaming provider without changing
 * call sites.
 */
export function useWidgetData<TData = unknown>(
  widget: DashboardWidget,
): WidgetDataEnvelope<TData> {
  const provider = useWidgetDataProvider();
  return useMemo<WidgetDataEnvelope<TData>>(() => {
    try {
      const data = provider.resolve(widget) as TData | undefined;
      return { data, isLoading: false, error: null };
    } catch (err) {
      return {
        data: undefined,
        isLoading: false,
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  }, [provider, widget]);
}
