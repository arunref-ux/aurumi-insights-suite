import { Activity, Inbox, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { STATUS_TEXT } from "@/domains/dashboard/widgets/shared/status";
import type { ConversationCard } from "../types";

function CardShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/60 p-4 shadow-sm">
      <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span aria-hidden="true" className="text-foreground/70">
          {icon}
        </span>
        {title}
      </header>
      {children}
    </section>
  );
}

export function ResponseCard({ card }: { card: ConversationCard }) {
  switch (card.kind) {
    case "executiveSummary":
      return (
        <CardShell
          title={card.title ?? "Executive summary"}
          icon={<Sparkles className="h-3.5 w-3.5" />}
        >
          {card.data.summaryTitle ? (
            <p className="mb-2 text-sm font-medium">{card.data.summaryTitle}</p>
          ) : null}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {card.data.insight}
          </p>
        </CardShell>
      );

    case "kpiSnapshot":
      return (
        <CardShell
          title={card.title ?? "KPI snapshot"}
          icon={<LineChart className="h-3.5 w-3.5" />}
        >
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {card.items.map((item) => {
              const value = `${item.data.value ?? ""}${item.data.valueSuffix ?? ""}`;
              const trend = "trend" in item.data ? item.data.trend : undefined;
              return (
                <li
                  key={item.id}
                  className="rounded-md border border-border/60 bg-muted/30 p-3"
                >
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p
                    className={`mt-1 text-lg font-semibold tabular-nums ${STATUS_TEXT[item.data.status ?? "neutral"]}`}
                  >
                    {value}
                  </p>
                  {trend ? (
                    <p className="text-xs text-muted-foreground">
                      {trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "▬"}{" "}
                      {trend.percentage}% {trend.period}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </CardShell>
      );

    case "pendingActions":
      return (
        <CardShell
          title={card.title ?? "Pending actions"}
          icon={<Inbox className="h-3.5 w-3.5" />}
        >
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {card.data.metrics.map((m) => (
              <li
                key={m.id}
                className="rounded-md border border-border/60 bg-muted/30 p-3"
              >
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p
                  className={`mt-1 text-xl font-semibold tabular-nums ${STATUS_TEXT[m.status ?? "neutral"]}`}
                >
                  {m.count}
                </p>
                {m.hint ? (
                  <p className="text-xs text-muted-foreground">{m.hint}</p>
                ) : null}
              </li>
            ))}
          </ul>
          {card.data.footnote ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {card.data.footnote}
            </p>
          ) : null}
        </CardShell>
      );

    case "timeline":
      return (
        <CardShell
          title={card.title ?? "Timeline"}
          icon={<Activity className="h-3.5 w-3.5" />}
        >
          <ol className="flex flex-col gap-3">
            {card.data.items.slice(0, 5).map((i) => (
              <li key={i.id} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS_TEXT[i.status ?? "neutral"]}`}
                  style={{ backgroundColor: "currentColor" }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.title}</p>
                  {i.description ? (
                    <p className="text-xs text-muted-foreground">
                      {i.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </CardShell>
      );

    case "businessHealth":
      return (
        <CardShell
          title={card.title ?? "Business health"}
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
        >
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {card.data.items.map((i) => (
              <li
                key={i.id}
                className="flex flex-col gap-0.5 rounded-md border border-border/60 bg-muted/30 p-3"
              >
                <span className="text-sm font-medium">{i.label}</span>
                <span className="text-xs capitalize text-muted-foreground">
                  {i.status}
                </span>
                {i.message ? (
                  <span className="text-xs text-muted-foreground">
                    {i.message}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </CardShell>
      );

    default:
      return null;
  }
}
