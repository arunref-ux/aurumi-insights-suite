import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DashboardToolbar } from "@/domains/dashboard";
import { reportCatalog } from "@/domains/reports/mock/catalog";
import { ReportTree } from "@/domains/reports/components/report-tree";
import {
  ReportDetail,
  ReportDetailEmpty,
} from "@/domains/reports/components/report-detail";
import type { ReportItem } from "@/domains/reports/types";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Aurumi Business Insights" },
      {
        name: "description",
        content:
          "Browse every report across the Aurumi suite from one catalog, organised by app and category.",
      },
      { property: "og:title", content: "Reports — Aurumi Business Insights" },
      {
        property: "og:description",
        content:
          "Browse every report across the Aurumi suite from one catalog, organised by app and category.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [selected, setSelected] = useState<ReportItem | null>(null);
  const [browserOpen, setBrowserOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const app = selected
    ? reportCatalog.apps.find((a) => a.id === selected.appId)
    : undefined;
  const categoryName = app?.categories.find(
    (c) => c.id === selected?.categoryId,
  )?.name;

  const tree = (
    <ReportTree
      catalog={reportCatalog}
      selectedId={selected?.id ?? null}
      onSelect={(report) => {
        setSelected(report);
        setMobileOpen(false);
      }}
    />
  );

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <DashboardToolbar
        title="Reports"
        subtitle="Every report across the Aurumi suite, organised by app and category."
        secondaryActions={
          <>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <PanelLeftOpen className="mr-1.5 h-4 w-4" /> Browse
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-4">
                <SheetTitle className="mb-3 text-sm">Report catalog</SheetTitle>
                <div className="h-[calc(100vh-6rem)]">{tree}</div>
              </SheetContent>
            </Sheet>

            <Button
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => setBrowserOpen((v) => !v)}
              aria-pressed={browserOpen}
            >
              {browserOpen ? (
                <PanelLeftClose className="mr-1.5 h-4 w-4" />
              ) : (
                <PanelLeftOpen className="mr-1.5 h-4 w-4" />
              )}
              {browserOpen ? "Hide catalog" : "Show catalog"}
            </Button>
          </>
        }
      />

      <div className="flex min-h-[60vh] gap-6">
        {browserOpen ? (
          <aside className="hidden w-[300px] shrink-0 rounded-lg border bg-card p-3 lg:block">
            <div className="sticky top-20 h-[calc(100vh-9rem)]">{tree}</div>
          </aside>
        ) : null}

        <section className="min-w-0 flex-1">
          {selected ? (
            <ReportDetail report={selected} app={app} categoryName={categoryName} />
          ) : (
            <ReportDetailEmpty />
          )}
        </section>
      </div>
    </div>
  );
}
