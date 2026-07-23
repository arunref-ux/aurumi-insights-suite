import { useCallback, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarClock, MessageSquare } from "lucide-react";
import { DashboardRenderer } from "@/domains/dashboard/components/dashboard-renderer";
import { DashboardToolbar } from "@/domains/dashboard/components/dashboard-toolbar";
import { useDefaultDashboard } from "@/domains/dashboard/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ConversationPanel } from "@/domains/conversation";
import type { ConversationSuggestion } from "@/domains/conversation/types";
import { ExecutiveBrief } from "@/components/executive/executive-brief";
import type { BriefHighlight } from "@/components/executive/executive-brief";
import { FocusTodayWidget } from "@/domains/dashboard/widgets/focus-today/focus-today-widget";
import { eccFocusToday } from "@/domains/dashboard/mock/ecc-widget-data";
import { WidgetActionMenu } from "@/domains/dashboard/widgets/shared/widget-action-menu";
import type { DashboardWidget } from "@/domains/dashboard/types";
import type { FocusTodayWidgetConfig } from "@/domains/dashboard/widgets/focus-today/types";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Executive Workspace — Aurumi Business Insights" },
      {
        name: "description",
        content:
          "An executive daily cockpit: today's business brief, KPIs, focus list, and an integrated conversation panel to talk to your business.",
      },
      {
        property: "og:title",
        content: "Executive Workspace — Aurumi Business Insights",
      },
      {
        property: "og:description",
        content:
          "Move naturally between your Business Brief, Executive Dashboard, and the Conversation Panel — one cockpit for your day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const CONTEXTUAL_SUGGESTIONS: ConversationSuggestion[] = [
  { id: "q1", prompt: "Why did revenue increase?" },
  { id: "q2", prompt: "Which branch needs attention?" },
  { id: "q3", prompt: "Show overdue approvals." },
  { id: "q4", prompt: "Summarize yesterday." },
  { id: "q5", prompt: "Which teams are behind target?" },
  { id: "q6", prompt: "What should I focus on today?" },
];

const BRIEF_HIGHLIGHTS: BriefHighlight[] = [
  { id: "h1", text: "Revenue up 8.6% vs last month", tone: "positive" },
  { id: "h2", text: "Hyderabad branch exceeded targets", tone: "positive" },
  { id: "h3", text: "3 approvals need attention", tone: "warning" },
  { id: "h4", text: "Inventory healthy at 94%", tone: "info" },
  { id: "h5", text: "CSAT improved to 4.6 / 5", tone: "positive" },
];

const FOCUS_WIDGET: DashboardWidget<FocusTodayWidgetConfig> = {
  id: "w-focus-today",
  type: "focusToday",
  title: "Focus Today",
  subtitle: "Suggested priorities for the day",
  size: "md",
};

function DashboardPage() {
  const { data, isLoading, error, refetch, isFetching } = useDefaultDashboard();
  const [open, setOpen] = useState(false);
  const generatedAt = useMemo(() => new Date().toISOString(), []);

  const openConversation = useCallback(() => setOpen(true), []);
  const handleOpenReference = useCallback((_widgetId: string, _label: string) => {
    // Reference navigation is intentionally lightweight for this milestone:
    // close the drawer to reveal the underlying dashboard. Scrolling and
    // widget highlighting arrive in a future workspace milestone.
    setOpen(false);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="col-span-12 h-32 sm:col-span-6 lg:col-span-4"
            />
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
        <h1 className="text-lg font-semibold">Unable to load workspace</h1>
        <p className="text-sm text-muted-foreground">
          {error?.message ?? "The requested workspace could not be found."}
        </p>
      </div>
    );
  }

  const lastRefreshed =
    typeof data.metadata?.updatedAt === "string"
      ? data.metadata.updatedAt
      : new Date().toISOString();

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 p-4 sm:p-6 lg:p-8">
        {/* ─── 1. Executive Workspace Header ─────────────────────────── */}
        <DashboardToolbar
          title="Executive Workspace"
          subtitle="Your daily business cockpit — brief, KPIs, focus, and conversation."
          lastRefreshed={lastRefreshed}
          onRefresh={() => {
            if (!isFetching) void refetch();
          }}
          onExport={() => {}}
          onFilter={() => {}}
          secondaryActions={
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={openConversation}
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Ask AI
            </Button>
          }
          contextArea={
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Company-wide
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                Today
              </Badge>
              <span className="text-xs text-muted-foreground">
                Signals refreshed continuously from the Aurumi platform.
              </span>
            </div>
          }
        />

        {/* ─── 2. Executive Brief (Hero) ─────────────────────────────── */}
        <ExecutiveBrief
          narrative="Overall business is trending healthy. Revenue accelerated with strong enterprise bookings, Hyderabad continues to outperform, and customer satisfaction is at a rolling high. A small number of approvals and one distribution issue need your attention today."
          highlights={BRIEF_HIGHLIGHTS}
          generatedAt={generatedAt}
          confidence="high"
        />

        {/* ─── 3. Suggested Questions ────────────────────────────────── */}
        <section
          aria-label="Suggested questions"
          className="flex flex-col gap-3"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Suggested questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Contextual prompts based on today's signals.
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5"
              onClick={openConversation}
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Open conversation
            </Button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {CONTEXTUAL_SUGGESTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={openConversation}
                  className="rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-sm text-foreground/80 transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {s.prompt}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 4. Focus Today ────────────────────────────────────────── */}
        <section aria-label="Focus today" className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              What to focus on
            </h2>
            <p className="text-sm text-muted-foreground">
              A concise list to anchor your day.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6">
              <FocusTodayWidget
                widget={FOCUS_WIDGET}
                data={eccFocusToday}
                headerActions={<WidgetActionMenu widgetTitle={FOCUS_WIDGET.title} />}
              />
            </div>
          </div>
        </section>

        {/* ─── 5. Executive Dashboard (KPIs, overview, operations) ───── */}
        <DashboardRenderer dashboard={data} showToolbar={false} />
      </div>

      {!open ? (
        <Button
          size="lg"
          onClick={openConversation}
          className="fixed bottom-6 right-6 z-40 gap-2 rounded-full shadow-lg"
          aria-label="Open AI assistant"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Ask AI
        </Button>
      ) : null}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md md:max-w-lg"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Business conversation</SheetTitle>
          </SheetHeader>
          <ConversationPanel
            onClose={() => setOpen(false)}
            suggestions={CONTEXTUAL_SUGGESTIONS}
            onOpenReference={handleOpenReference}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
