import { createFileRoute } from "@tanstack/react-router";

import { DashboardToolbar } from "@/domains/dashboard";
import { reportCatalog } from "@/domains/reports/mock/catalog";
import {
  ReportDetail,
  ReportDetailEmpty,
} from "@/domains/reports/components/report-detail";

interface ReportsSearch {
  report?: string;
}

export const Route = createFileRoute("/_app/reports")({
  validateSearch: (search: Record<string, unknown>): ReportsSearch => ({
    report: typeof search.report === "string" ? search.report : undefined,
  }),
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
  const { report: reportId } = Route.useSearch();
  const selected = reportCatalog.reports.find((r) => r.id === reportId) ?? null;
  const app = selected
    ? reportCatalog.apps.find((a) => a.id === selected.appId)
    : undefined;
  const categoryName = app?.categories.find(
    (c) => c.id === selected?.categoryId,
  )?.name;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {selected ? (
        <ReportDetail report={selected} app={app} categoryName={categoryName} />
      ) : (
        <>
          <DashboardToolbar
            title="Reports"
            subtitle="Every report across the Aurumi suite, organised by app and category in the sidebar."
          />
          <ReportDetailEmpty />
        </>
      )}
    </div>
  );
}
