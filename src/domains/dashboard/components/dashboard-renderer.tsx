import type {
  Dashboard,
  DashboardRow,
  DashboardSection,
  DashboardWidget,
} from "../types";
import { widgetRegistry } from "../registry/widget-registry";
import { bootstrapWidgetRegistry } from "../registry/bootstrap";

bootstrapWidgetRegistry();
import { useWidgetData } from "../hooks/use-widget-data";
import { getWidgetColSpan } from "../layouts/grid";
import { WidgetActionMenu } from "../widgets/shared/widget-action-menu";
import { DashboardToolbar } from "./dashboard-toolbar";

export interface DashboardRendererProps {
  dashboard: Dashboard;
  /**
   * When true (default), renders the reusable DashboardToolbar above the sections.
   * Set to false when the host page provides its own toolbar.
   */
  showToolbar?: boolean;
  /** Optional override for the last-refreshed timestamp shown in the toolbar. */
  lastRefreshed?: string;
  onRefresh?: () => void;
}

export function DashboardRenderer({
  dashboard,
  showToolbar = true,
  lastRefreshed,
  onRefresh,
}: DashboardRendererProps) {
  const refreshedAt =
    lastRefreshed ??
    (typeof dashboard.metadata?.updatedAt === "string"
      ? dashboard.metadata.updatedAt
      : new Date().toISOString());

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 p-4 sm:p-6 lg:p-8">
      {showToolbar ? (
        <DashboardToolbar
          title={dashboard.title}
          subtitle={dashboard.description}
          lastRefreshed={refreshedAt}
          onRefresh={onRefresh}
        />
      ) : null}

      <div className="flex flex-col gap-10">
        {dashboard.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({ section }: { section: DashboardSection }) {
  return (
    <section aria-label={section.title ?? undefined} className="flex flex-col gap-4">
      {section.title || section.description ? (
        <div className="flex flex-col gap-1">
          {section.title ? (
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
          ) : null}
          {section.description ? (
            <p className="text-sm text-muted-foreground">{section.description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {section.rows.map((row) => (
          <RowRenderer key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
}

function RowRenderer({ row }: { row: DashboardRow }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {row.widgets.map((widget) => (
        <div key={widget.id} className={getWidgetColSpan(widget.size)}>
          <RenderWidget widget={widget} />
        </div>
      ))}
    </div>
  );
}

/**
 * Renders a single widget via the same provider pipeline every other
 * widget uses. Host pages that want to inline a widget outside a
 * dashboard grid should use this component — not fixture imports.
 */
export function RenderWidget({ widget }: { widget: DashboardWidget }) {
  const Component = widgetRegistry.resolve(widget.type);
  const { data, isLoading, error } = useWidgetData(widget);
  return (
    <Component
      widget={widget}
      data={data}
      isLoading={isLoading}
      error={error}
      headerActions={<WidgetActionMenu widgetTitle={widget.title} />}
    />
  );
}
