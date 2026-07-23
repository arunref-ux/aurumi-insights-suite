import { useMemo } from "react";
import { CalendarDays, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type BriefConfidence = "high" | "medium" | "low";

export interface BriefHighlight {
  id: string;
  text: string;
  tone?: "positive" | "warning" | "neutral" | "info";
}

export interface ExecutiveBriefProps {
  /** Optional user name for the greeting ("Good morning, Priya"). */
  userName?: string;
  /** Overrides the default "Today's Business Brief" title. */
  title?: string;
  /** Executive narrative — a short paragraph. */
  narrative: string;
  /** Bullet-style highlights shown as chips beneath the narrative. */
  highlights: BriefHighlight[];
  /** ISO 8601 timestamp for when the brief was generated. */
  generatedAt: string;
  /** Optional visual confidence indicator. */
  confidence?: BriefConfidence;
  className?: string;
}

function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const TONE_CLASSES: Record<NonNullable<BriefHighlight["tone"]>, string> = {
  positive:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  neutral: "border-border bg-muted/50 text-foreground/80",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
};

const CONFIDENCE_LABEL: Record<BriefConfidence, string> = {
  high: "High confidence",
  medium: "Moderate confidence",
  low: "Low confidence",
};

const CONFIDENCE_DOTS: Record<BriefConfidence, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Executive Brief hero.
 *
 * A presentation-only briefing card meant to sit at the top of the
 * Executive Workspace. Not an "AI Summary" — this is framed as a
 * daily executive briefing.
 */
export function ExecutiveBrief({
  userName,
  title = "Today's Business Brief",
  narrative,
  highlights,
  generatedAt,
  confidence,
  className,
}: ExecutiveBriefProps) {
  const today = useMemo(() => new Date(), []);
  const dots = confidence ? CONFIDENCE_DOTS[confidence] : 0;

  return (
    <section
      aria-label="Today's business brief"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(today)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Generated {formatTime(generatedAt)}
            </span>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              {greetingFor(today)}
              {userName ? `, ${userName}` : ""}.
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
            {narrative}
          </p>

          {highlights.length > 0 ? (
            <ul
              aria-label="Highlights"
              className="mt-1 flex flex-wrap gap-2"
            >
              {highlights.map((h) => (
                <li
                  key={h.id}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium",
                    TONE_CLASSES[h.tone ?? "neutral"],
                  )}
                >
                  {h.text}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {confidence ? (
          <div
            className="flex shrink-0 flex-col items-start gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-xs backdrop-blur"
            aria-label={`Briefing confidence: ${CONFIDENCE_LABEL[confidence]}`}
          >
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Briefing signal
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "h-2 w-6 rounded-full",
                    i <= dots ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
            <span className="font-medium text-foreground/80">
              {CONFIDENCE_LABEL[confidence]}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
