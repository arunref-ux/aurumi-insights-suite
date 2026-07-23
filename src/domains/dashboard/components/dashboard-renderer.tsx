import { useMemo } from "react";
import type {
  Dashboard,
  DashboardRow,
  DashboardSection,
  DashboardWidget,
} from "../types";
import { widgetRegistry } from "../registry/widget-registry";
import { registerDefaultWidgets } from "../registry/register-defaults";
import { getWidgetColSpan } from "../layouts/grid";

export interface DashboardRendererProps {
  dashboard: Dashboard;
}

export function DashboardRenderer({ dashboard }: DashboardRendererProps) {
  useMemo(() => registerDefaultWidgets(), []);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {dashboard.title}
        </h1>
        {dashboard.description ? (
          <p className="max-w-3xl text-sm text-muted-foreground">
            {dashboard.description}
          </p>
        ) : null}
      </header>

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
  return (
    <div className={getWidgetColSpan(widget.size)}>
      <Component widget={widget} />
    </div>
  );
}
