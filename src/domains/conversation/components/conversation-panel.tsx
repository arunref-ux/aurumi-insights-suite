import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { makeUserMessage } from "../service";
import { useConversationProvider } from "@/platform/context";
import type {
  ConversationMessage,
  ConversationSuggestion,
} from "../types";
import { ResponseCard } from "./response-cards";

// ─── ConversationHeader ─────────────────────────────────────────────
export interface ConversationHeaderProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

export function ConversationHeader({
  title = "Talk to your Business",
  subtitle = "Ask about performance, actions, or anything on the dashboard.",
  onClose,
}: ConversationHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
      <div className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary"
        >
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {onClose ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onClose}
          aria-label="Close conversation panel"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : null}
    </header>
  );
}

// ─── SuggestionChips ────────────────────────────────────────────────
export interface SuggestionChipsProps {
  suggestions: ConversationSuggestion[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function SuggestionChips({
  suggestions,
  onSelect,
  disabled,
  compact,
}: SuggestionChipsProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-2",
        compact ? "" : "mt-1",
      )}
      aria-label="Suggested questions"
    >
      {suggestions.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(s.prompt)}
            className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground/80 transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {s.prompt}
          </button>
        </li>
      ))}
    </ul>
  );
}

// ─── ConversationMessage ────────────────────────────────────────────
function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ConversationMessageView({
  message,
  onOpenReference,
}: {
  message: ConversationMessage;
  onOpenReference?: (widgetId: string, label: string) => void;
}) {
  const isUser = message.role === "user";
  return (
    <article
      className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}
      aria-label={isUser ? "You said" : "Assistant said"}
    >
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-transparent text-foreground",
        )}
      >
        {message.text}
      </div>

      {!isUser && message.cards && message.cards.length > 0 ? (
        <div className="flex w-full flex-col gap-2">
          {message.cards.map((card, idx) => (
            <ResponseCard key={idx} card={card} />
          ))}
        </div>
      ) : null}

      {!isUser && message.references && message.references.length > 0 ? (
        <div className="flex w-full flex-col gap-1.5">
          <p className="text-xs text-muted-foreground">Related on the dashboard</p>
          <div className="flex flex-wrap gap-1.5">
            {message.references.map((r) => (
              <Button
                key={r.label}
                type="button"
                size="sm"
                variant="outline"
                className="h-7 gap-1 rounded-full px-2.5 text-xs"
                disabled={!r.widgetId || !onOpenReference}
                onClick={() =>
                  r.widgetId && onOpenReference?.(r.widgetId, r.label)
                }
              >
                View {r.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {formatTimestamp(message.timestamp)}
      </span>
    </article>
  );
}

// ─── ConversationHistory ────────────────────────────────────────────
export interface ConversationHistoryProps {
  messages: ConversationMessage[];
  isThinking?: boolean;
  emptyState?: React.ReactNode;
  onOpenReference?: (widgetId: string, label: string) => void;
}

export const ConversationHistory = forwardRef<
  HTMLDivElement,
  ConversationHistoryProps
>(function ConversationHistory(
  { messages, isThinking, emptyState, onOpenReference },
  ref,
) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isThinking]);

  if (messages.length === 0 && emptyState) {
    return <div ref={ref}>{emptyState}</div>;
  }

  return (
    <div ref={ref} className="flex flex-col gap-6 px-5 py-5">
      {messages.map((m) => (
        <ConversationMessageView
          key={m.id}
          message={m}
          onOpenReference={onOpenReference}
        />
      ))}
      {isThinking ? (
        <div
          className="flex items-center gap-2 text-xs text-muted-foreground"
          aria-live="polite"
        >
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Thinking…
        </div>
      ) : null}
      <div ref={endRef} />
    </div>
  );
});

// ─── ConversationInput ──────────────────────────────────────────────
export interface ConversationInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ConversationInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Ask about revenue, actions, or any KPI…",
}: ConversationInputProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <form
      className="flex items-end gap-2 border-t border-border/60 bg-background px-4 py-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="conversation-input" className="sr-only">
        Ask a question about your business
      </label>
      <Textarea
        id="conversation-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-[40px] resize-none"
      />
      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 shrink-0"
        disabled={disabled || value.trim().length === 0}
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

// ─── ConversationPanel ──────────────────────────────────────────────
export interface ConversationPanelProps {
  onClose?: () => void;
  className?: string;
  /** Overrides the default suggestion list with context-aware prompts. */
  suggestions?: ConversationSuggestion[];
  /** Called when the user clicks a "View X" reference button. */
  onOpenReference?: (widgetId: string, label: string) => void;
}

export function ConversationPanel({
  onClose,
  className,
  suggestions: suggestionsProp,
  onOpenReference,
}: ConversationPanelProps) {
  const conversation = useConversationProvider();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [defaultSuggestions, setDefaultSuggestions] = useState<
    ConversationSuggestion[]
  >([]);

  useEffect(() => {
    if (suggestionsProp) return;
    let cancelled = false;
    void conversation.suggestions().then((s) => {
      if (!cancelled) setDefaultSuggestions(s);
    });
    return () => {
      cancelled = true;
    };
  }, [conversation, suggestionsProp]);

  const suggestions = useMemo(
    () => suggestionsProp ?? defaultSuggestions,
    [suggestionsProp, defaultSuggestions],
  );

  const send = useCallback(
    async (prompt: string) => {
      const text = prompt.trim();
      if (!text) return;
      setDraft("");
      setMessages((prev) => [...prev, makeUserMessage(text)]);
      setIsThinking(true);
      try {
        const reply = await conversation.ask(text);
        setMessages((prev) => [...prev, reply]);
      } finally {
        setIsThinking(false);
      }
    },
    [conversation],
  );

  const emptyState = (
    <div className="flex flex-col gap-4 px-5 py-6">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary"
        >
          <MessageSquare className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">
            Good to see you. What would you like to know?
          </p>
          <p className="text-xs text-muted-foreground">
            Try one of these questions to get started.
          </p>
        </div>
      </div>
      <SuggestionChips suggestions={suggestions} onSelect={send} />
    </div>
  );

  return (
    <aside
      aria-label="Business conversation panel"
      className={cn(
        "flex h-full min-h-0 flex-col bg-card/40",
        className,
      )}
    >
      <ConversationHeader onClose={onClose} />
      <ScrollArea className="min-h-0 flex-1">
        <ConversationHistory
          messages={messages}
          isThinking={isThinking}
          emptyState={emptyState}
          onOpenReference={onOpenReference}
        />
      </ScrollArea>
      {messages.length > 0 ? (
        <div className="border-t border-border/60 px-4 py-3">
          <SuggestionChips
            suggestions={suggestions.slice(0, 3)}
            onSelect={send}
            disabled={isThinking}
            compact
          />
        </div>
      ) : null}
      <ConversationInput
        value={draft}
        onChange={setDraft}
        onSubmit={() => send(draft)}
        disabled={isThinking}
      />
    </aside>
  );
}
