import { useMemo } from "react";
import type {
  Dashboard,
  DashboardRow,
  DashboardSection,
  DashboardWidget,
} from "../types";
import { widgetRegistry } from "../registry/widget-registry";
import { registerDefaultWidgets } from "../registry/register-defaults";
import { registerSdkWidgets } from "../widgets/register";
import { resolveMockData } from "../mock/data-resolver";
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
  onExport?: () => void;
  onFilter?: () => void;
}

export function DashboardRenderer({
  dashboard,
  showToolbar = true,
  lastRefreshed,
  onRefresh,
  onExport,
  onFilter,
}: DashboardRendererProps) {
  useMemo(() => {
    registerDefaultWidgets();
    registerSdkWidgets();
  }, []);

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
          onExport={onExport}
          onFilter={onFilter}
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
        <WidgetSlot key={widget.id} widget={widget} />
      ))}
    </div>
  );
}

function WidgetSlot({ widget }: { widget: DashboardWidget }) {
  const Component = widgetRegistry.resolve(widget.type);
  const data = resolveMockData(widget.dataSource);
  return (
    <div className={getWidgetColSpan(widget.size)}>
      <Component
        widget={widget}
        data={data}
        headerActions={<WidgetActionMenu widgetTitle={widget.title} />}
      />
    </div>
  );
}
