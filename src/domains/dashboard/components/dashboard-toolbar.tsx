import type { ReactNode } from "react";
import { Download, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface DashboardToolbarProps {
  title: string;
  subtitle?: string;
  /** ISO 8601 or displayable string of the last refresh timestamp. */
  lastRefreshed?: string;
  /** Optional callback for the refresh button (built-in primary action). */
  onRefresh?: () => void;
  /** Optional callback for the export button (built-in secondary action). */
  onExport?: () => void;
  /** Optional callback for the global filter button (built-in secondary action). */
  onFilter?: () => void;

  // ─── Extensible slots ────────────────────────────────────────────────
  /** Replaces the default title/subtitle block on the left. */
  leftContent?: ReactNode;
  /** Rendered on the right side, before the built-in refresh action. */
  primaryActions?: ReactNode;
  /** Rendered on the right side, before primary actions and built-ins. */
  secondaryActions?: ReactNode;
  /**
   * Rendered as a contextual band under the header row (filters summary,
   * date range, mode switcher, etc.). Full width.
   */
  contextArea?: ReactNode;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Reusable enterprise toolbar for any dashboard rendered by the engine.
 *
 * The built-in `onRefresh`/`onExport`/`onFilter` actions remain for
 * backward compatibility. Any dashboard can override or extend the toolbar
 * via the `leftContent`, `primaryActions`, `secondaryActions`, and
 * `contextArea` slots without touching engine internals.
 */
export function DashboardToolbar({
  title,
  subtitle,
  lastRefreshed,
  onRefresh,
  onExport,
  onFilter,
  leftContent,
  primaryActions,
  secondaryActions,
  contextArea,
}: DashboardToolbarProps) {
  const today = formatDate(new Date());

  return (
    <div className="flex flex-col gap-4 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        {leftContent ?? (
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{today}</span>
              {lastRefreshed ? (
                <>
                  <Separator orientation="vertical" className="h-3" />
                  <span aria-live="polite">
                    Last refreshed at {formatTime(lastRefreshed)}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        )}

        <div
          role="toolbar"
          aria-label="Dashboard actions"
          className="flex flex-wrap items-center gap-2"
        >
          {secondaryActions}
          {onFilter ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onFilter}
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          ) : null}
          {onExport ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onExport}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </Button>
          ) : null}
          {primaryActions}
          {onRefresh ? (
            <Button size="sm" className="gap-1.5" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </Button>
          ) : null}
        </div>
      </div>

      {contextArea ? <div className="w-full">{contextArea}</div> : null}
    </div>
  );
}
