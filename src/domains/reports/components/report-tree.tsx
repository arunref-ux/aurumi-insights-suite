import { useMemo, useState } from "react";
import {
  ChevronRight,
  Factory,
  FileText,
  LayoutDashboard,
  Search,
  Star,
  Table2,
  TrendingUp,
  Users,
  Wallet,
  Download,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ReportCatalog, ReportFormat, ReportItem } from "../types";

const appIcons = {
  Wallet,
  TrendingUp,
  Factory,
  Users,
} as const;

export const formatIcons: Record<ReportFormat, typeof FileText> = {
  dashboard: LayoutDashboard,
  table: Table2,
  document: FileText,
  export: Download,
};

interface ReportTreeProps {
  catalog: ReportCatalog;
  selectedId: string | null;
  onSelect: (report: ReportItem) => void;
}

export function ReportTree({ catalog, selectedId, onSelect }: ReportTreeProps) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      catalog.reports.filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q)),
      ),
    [catalog.reports, q],
  );

  const favorites = catalog.reports.filter((r) => r.favorite);

  const toggle = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reports…"
          aria-label="Search reports"
          className="h-9 pl-8"
        />
      </div>

      <ScrollArea className="min-h-0 flex-1 pr-2">
        <nav aria-label="Report catalog" className="flex flex-col gap-4 pb-4">
          {!q && favorites.length > 0 ? (
            <div className="flex flex-col gap-1">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Pinned
              </p>
              {favorites.map((report) => (
                <ReportLeaf
                  key={`fav-${report.id}`}
                  report={report}
                  depth={1}
                  selected={report.id === selectedId}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ) : null}

          {catalog.apps.map((app) => {
            const appReports = matches.filter((r) => r.appId === app.id);
            if (q && appReports.length === 0) return null;
            const AppIcon = appIcons[app.icon as keyof typeof appIcons] ?? FileText;
            const isOpen = q ? true : !collapsed[app.id];

            return (
              <div key={app.id} className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => toggle(app.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left text-sm font-semibold transition-colors hover:bg-accent"
                >
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-90",
                    )}
                    aria-hidden
                  />
                  <AppIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="truncate">{app.name}</span>
                  <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px]">
                    {appReports.length}
                  </Badge>
                </button>

                {isOpen
                  ? app.categories.map((category) => {
                      const catReports = appReports.filter(
                        (r) => r.categoryId === category.id,
                      );
                      if (catReports.length === 0) return null;
                      const catKey = `${app.id}:${category.id}`;
                      const catOpen = q ? true : !collapsed[catKey];

                      return (
                        <div key={catKey} className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => toggle(catKey)}
                            aria-expanded={catOpen}
                            className="ml-4 flex items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
                            ? catReports.map((report) => (
                                <ReportLeaf
                                  key={report.id}
                                  report={report}
                                  depth={2}
                                  selected={report.id === selectedId}
                                  onSelect={onSelect}
                                />
                              ))
                            : null}
                        </div>
                      );
                    })
                  : null}
              </div>
            );
          })}

          {q && matches.length === 0 ? (
            <p className="px-1 py-6 text-center text-sm text-muted-foreground">
              No reports match “{query}”.
            </p>
          ) : null}
        </nav>
      </ScrollArea>
    </div>
  );
}

function ReportLeaf({
  report,
  depth,
  selected,
  onSelect,
}: {
  report: ReportItem;
  depth: number;
  selected: boolean;
  onSelect: (report: ReportItem) => void;
}) {
  const Icon = formatIcons[report.format];
  return (
    <button
      type="button"
      onClick={() => onSelect(report)}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left text-sm transition-colors",
        depth === 2 ? "pl-10" : "pl-4",
        selected
          ? "bg-primary/10 font-medium text-primary"
          : "text-foreground/90 hover:bg-accent",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="truncate">{report.name}</span>
      {report.favorite ? (
        <Star className="ml-auto h-3 w-3 shrink-0 fill-current text-muted-foreground" aria-hidden />
      ) : null}
    </button>
  );
}
