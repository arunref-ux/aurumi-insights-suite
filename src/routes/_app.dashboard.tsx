import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, PanelRightClose, PanelRightOpen } from "lucide-react";
import { DashboardRenderer } from "@/domains/dashboard/components/dashboard-renderer";
import { DashboardToolbar } from "@/domains/dashboard/components/dashboard-toolbar";
import { useDefaultDashboard } from "@/domains/dashboard/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConversationPanel } from "@/domains/conversation";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Executive Command Center — Aurumi Business Insights" },
      {
        name: "description",
        content:
          "A configuration-driven executive command center with an integrated Business Conversation Panel — talk to your business in natural language.",
      },
      {
        property: "og:title",
        content: "Executive Command Center — Aurumi Business Insights",
      },
      {
        property: "og:description",
        content:
          "At-a-glance business health across revenue, pipeline, operations, and AI insights — with a conversation companion to talk to your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, error, refetch, isFetching } = useDefaultDashboard();
  const [panelOpen, setPanelOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const lastRefreshed =
    typeof data.metadata?.updatedAt === "string"
      ? data.metadata.updatedAt
      : new Date().toISOString();

  const askButtonMobile = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5 xl:hidden">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Ask
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Business conversation</SheetTitle>
        </SheetHeader>
        <ConversationPanel onClose={() => setMobileOpen(false)} />
      </SheetContent>
    </Sheet>
  );

  const togglePanelDesktop = (
    <Button
      size="sm"
      variant="outline"
      className="hidden gap-1.5 xl:inline-flex"
      onClick={() => setPanelOpen((v) => !v)}
      aria-pressed={panelOpen}
      aria-label={
        panelOpen ? "Collapse conversation panel" : "Expand conversation panel"
      }
    >
      {panelOpen ? (
        <PanelRightClose className="h-4 w-4" aria-hidden="true" />
      ) : (
        <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
      )}
      {panelOpen ? "Hide chat" : "Ask"}
    </Button>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 w-full">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 p-4 sm:p-6 lg:p-8">
          <DashboardToolbar
            title={data.title}
            subtitle={data.description}
            lastRefreshed={lastRefreshed}
            onRefresh={() => {
              if (!isFetching) void refetch();
            }}
            onExport={() => {
              /* platform-owned */
            }}
            onFilter={() => {
              /* platform-owned */
            }}
            secondaryActions={
              <>
                {askButtonMobile}
                {togglePanelDesktop}
              </>
            }
          />
          <DashboardRenderer dashboard={data} showToolbar={false} />
        </div>
      </div>

      {panelOpen ? (
        <div className="hidden w-[32%] min-w-[380px] max-w-[520px] shrink-0 border-l border-border/60 bg-background xl:block">
          <ConversationPanel onClose={() => setPanelOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
