import { Download, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface DashboardToolbarProps {
  title: string;
  subtitle?: string;
  /** ISO 8601 or displayable string of the last refresh timestamp. */
  lastRefreshed?: string;
  /** Optional callback for the refresh button. */
  onRefresh?: () => void;
  /** Optional callback for the export button. */
  onExport?: () => void;
  /** Optional callback for the global filter button. */
  onFilter?: () => void;
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
 * Reusable toolbar that sits above any dashboard rendered by the engine.
 * Actions are optional and non-functional by default so future dashboards
 * can drop it in without wiring the platform-owned services.
 */
export function DashboardToolbar({
  title,
  subtitle,
  lastRefreshed,
  onRefresh,
  onExport,
  onFilter,
}: DashboardToolbarProps) {
  const today = formatDate(new Date());

  return (
    <div className="flex flex-col gap-4 border-b border-border/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
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

      <div
        role="toolbar"
        aria-label="Dashboard actions"
        className="flex flex-wrap items-center gap-2"
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onFilter}
          disabled={!onFilter}
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={onExport}
          disabled={!onExport}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export
        </Button>
        <Button
          size="sm"
          className="gap-1.5"
          onClick={onRefresh}
          disabled={!onRefresh}
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
