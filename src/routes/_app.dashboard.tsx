import { createFileRoute } from "@tanstack/react-router";
import { DashboardRenderer } from "@/domains/dashboard/components/dashboard-renderer";
import { useDefaultDashboard } from "@/domains/dashboard/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Executive Command Center — Aurumi Business Insights" },
      {
        name: "description",
        content:
          "A configuration-driven executive command center giving leaders an at-a-glance view of revenue, pipeline, operations, and AI-generated insights.",
      },
      {
        property: "og:title",
        content: "Executive Command Center — Aurumi Business Insights",
      },
      {
        property: "og:description",
        content:
          "At-a-glance business health across revenue, pipeline, operations, and AI insights — powered by the Aurumi dashboard engine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, error, refetch, isFetching } = useDefaultDashboard();

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="col-span-12 h-32 sm:col-span-6 lg:col-span-4" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        role="alert"
        className="mx-auto flex w-full max-w-3xl flex-col gap-2 p-6 text-center"
      >
        <h1 className="text-lg font-semibold">Unable to load dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "The requested dashboard could not be found."}
        </p>
      </div>
    );
  }

  return (
    <DashboardRenderer
      dashboard={data}
      lastRefreshed={
        typeof data.metadata?.updatedAt === "string"
          ? data.metadata.updatedAt
          : new Date().toISOString()
      }
      onRefresh={() => {
        if (!isFetching) void refetch();
      }}
      onExport={() => {
        /* Export is a platform-owned capability; placeholder for now. */
      }}
      onFilter={() => {
        /* Global filters are a platform-owned capability; placeholder for now. */
      }}
    />
  );
}
