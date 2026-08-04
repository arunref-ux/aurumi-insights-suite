import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronRight,
  Download,
  Factory,
  FileText,
  LayoutDashboard,
  Search,
  Table2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { reportCatalog } from "@/domains/reports/mock/catalog";
import type { ReportFormat } from "@/domains/reports/types";

const appIcons = { Wallet, TrendingUp, Factory, Users } as const;

const formatIcons: Record<ReportFormat, typeof FileText> = {
  dashboard: LayoutDashboard,
  table: Table2,
  document: FileText,
  export: Download,
};

/**
 * Report catalog rendered inside the app sidebar, nested under the
 * "Reports" navigation item. Selection is expressed as a URL search
 * param so the Reports page stays a pure consumer of the route.
 */
export function ReportsNavTree() {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const selectedId = useRouterState({
    select: (s) => (s.location.search as { report?: string }).report ?? null,
  });

  const q = query.trim().toLowerCase();
  const matches = reportCatalog.reports.filter(
    (r) =>
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags?.some((t) => t.toLowerCase().includes(q)),
  );

  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-1.5 pt-1 group-data-[collapsible=icon]:hidden">
      <div className="relative px-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a report…"
          aria-label="Search reports"
          className="h-8 pl-7 text-xs"
        />
      </div>

      <SidebarMenuSub className="mr-0 pr-0">
        {reportCatalog.apps.map((app) => {
          const appReports = matches.filter((r) => r.appId === app.id);
          if (q && appReports.length === 0) return null;
          const AppIcon = appIcons[app.icon as keyof typeof appIcons] ?? FileText;
          const open = q ? true : !collapsed[app.id];

          return (
            <SidebarMenuSubItem key={app.id}>
              <button
                type="button"
                onClick={() => toggle(app.id)}
                aria-expanded={open}
                className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-xs font-semibold transition-colors hover:bg-sidebar-accent"
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 shrink-0 text-muted-foreground transition-transform",
                    open && "rotate-90",
                  )}
                  aria-hidden
                />
                <AppIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                <span className="truncate">{app.name}</span>
                <span className="ml-auto text-[10px] font-normal text-muted-foreground">
                  {appReports.length}
                </span>
              </button>

              {open
                ? app.categories.map((category) => {
                    const catReports = appReports.filter(
                      (r) => r.categoryId === category.id,
                    );
                    if (catReports.length === 0) return null;
                    const catKey = `${app.id}:${category.id}`;
                    const catOpen = q ? true : !collapsed[catKey];

                    return (
                      <div key={catKey} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => toggle(catKey)}
                          aria-expanded={catOpen}
                          className="ml-3 flex items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[11px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 shrink-0 transition-transform",
                              catOpen && "rotate-90",
                            )}
                            aria-hidden
                          />
                          <span className="truncate">{category.name}</span>
                        </button>

                        {catOpen
                          ? catReports.map((report) => {
                              const Icon = formatIcons[report.format];
                              return (
                                <SidebarMenuSubButton
                                  key={report.id}
                                  asChild
                                  size="sm"
                                  isActive={report.id === selectedId}
                                  className="ml-6 w-auto"
                                >
                                  <Link to="/reports" search={{ report: report.id }}>
                                    <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />
                                    <span className="truncate">{report.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              );
                            })
                          : null}
                      </div>
                    );
                  })
                : null}
            </SidebarMenuSubItem>
          );
        })}

        {q && matches.length === 0 ? (
          <p className="px-2 py-3 text-xs text-muted-foreground">No matches.</p>
        ) : null}
      </SidebarMenuSub>
    </div>
  );
}
