import {
  eccAiSummary,
  eccBusinessHealth,
  eccActivityTimeline,
  eccPendingActions,
  eccKpiRevenue,
  eccKpiPipeline,
  eccKpiCashflow,
  eccKpiCsat,
} from "@/domains/dashboard/mock/ecc-widget-data";
import type {
  ConversationMessage,
  ConversationSuggestion,
} from "./types";

export const DEFAULT_SUGGESTIONS: ConversationSuggestion[] = [
  { id: "s1", prompt: "Why did revenue increase?" },
  { id: "s2", prompt: "Which branch needs attention?" },
  { id: "s3", prompt: "Show overdue approvals." },
  { id: "s4", prompt: "Summarize yesterday." },
  { id: "s5", prompt: "Which teams are behind target?" },
  { id: "s6", prompt: "What should I focus on today?" },
];

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  return `msg_${Math.random().toString(36).slice(2, 10)}`;
}

function normalize(q: string): string {
  return q.trim().toLowerCase().replace(/[?.!]+$/g, "");
}

/**
 * Deterministic mock conversation engine.
 *
 * Returns predefined rich responses for well-known executive questions and
 * a graceful fallback otherwise. No AI or backend calls.
 */
export const ConversationService = {
  suggestions(): ConversationSuggestion[] {
    return DEFAULT_SUGGESTIONS;
  },

  ask(prompt: string): Promise<ConversationMessage> {
    const q = normalize(prompt);
    const reply = buildReply(q, prompt);
    // Simulate a small async delay so the UI can render a pending state.
    return new Promise((resolve) => {
      setTimeout(() => resolve(reply), 350);
    });
  },
};

function buildReply(q: string, original: string): ConversationMessage {
  const base = { id: makeId(), role: "assistant" as const, timestamp: nowIso() };

  if (q.includes("how is my business")) {
    return {
      ...base,
      text: "Business is trending healthy overall, with three items to watch.",
      cards: [
        { kind: "executiveSummary", title: "Executive summary", data: eccAiSummary },
        {
          kind: "kpiSnapshot",
          title: "Today's leading indicators",
          items: [
            { id: "revenue", label: "Revenue (MTD)", data: eccKpiRevenue, trend: true },
            { id: "pipeline", label: "Sales pipeline", data: eccKpiPipeline, trend: true },
            { id: "csat", label: "Customer satisfaction", data: eccKpiCsat, trend: true },
          ],
        },
      ],
      references: [
        { label: "Revenue KPI", widgetId: "kpi-revenue" },
        { label: "Business Health", widgetId: "w-business-health" },
      ],
    };
  }

  if (q.includes("attention") || q.includes("what needs")) {
    return {
      ...base,
      text: "Three areas need a decision from you or your team.",
      cards: [
        { kind: "pendingActions", title: "Pending actions", data: eccPendingActions },
      ],
      references: [{ label: "Pending Actions", widgetId: "w-pending-actions" }],
    };
  }

  if (q.includes("revenue") && (q.includes("why") || q.includes("change"))) {
    return {
      ...base,
      text:
        "Revenue increased by 8.6% month over month, driven by enterprise bookings. Mid-market softened by 2 points.",
      cards: [
        {
          kind: "kpiSnapshot",
          title: "Revenue snapshot",
          items: [
            { id: "revenue", label: "Revenue (MTD)", data: eccKpiRevenue, trend: true },
            { id: "cashflow", label: "Cash flow", data: eccKpiCashflow, trend: true },
          ],
        },
      ],
      references: [{ label: "Revenue KPI", widgetId: "kpi-revenue" }],
    };
  }

  if (q.includes("pending") || q.includes("approvals")) {
    return {
      ...base,
      text: "You have 14 pending approvals and 6 overdue tasks across leadership.",
      cards: [
        { kind: "pendingActions", title: "Awaiting decision", data: eccPendingActions },
      ],
      references: [{ label: "Pending Actions", widgetId: "w-pending-actions" }],
    };
  }

  if (q.includes("summarize yesterday") || q.includes("yesterday")) {
    return {
      ...base,
      text: "Here's a recap of the most notable business activity in the last 24 hours.",
      cards: [
        { kind: "timeline", title: "Recent activity", data: eccActivityTimeline },
      ],
      references: [{ label: "Business Activity", widgetId: "w-activity" }],
    };
  }

  if (q.includes("behind target") || q.includes("teams")) {
    return {
      ...base,
      text: "Operations and Finance are showing signals worth investigating.",
      cards: [
        { kind: "businessHealth", title: "Business health by area", data: eccBusinessHealth },
      ],
      references: [{ label: "Business Health", widgetId: "w-business-health" }],
    };
  }

  if (q.includes("branch")) {
    return {
      ...base,
      text:
        "Hyderabad is exceeding target by 12%. Chennai is 4 points behind plan on mid-market and worth a check-in.",
      cards: [
        { kind: "businessHealth", title: "Regional health", data: eccBusinessHealth },
      ],
      references: [{ label: "Business Health", widgetId: "w-business-health" }],
    };
  }

  if (q.includes("focus")) {
    return {
      ...base,
      text: "Here's a suggested focus list for today based on current signals.",
      cards: [
        { kind: "pendingActions", title: "What needs a decision", data: eccPendingActions },
      ],
      references: [
        { label: "Focus Today", widgetId: "w-focus-today" },
        { label: "Pending Actions", widgetId: "w-pending-actions" },
      ],
    };
  }

  return {
    ...base,
    text: `I don't have a prepared answer for "${original.trim()}" yet. In the meantime, here is where your business stands.`,
    cards: [
      { kind: "executiveSummary", title: "Executive summary", data: eccAiSummary },
    ],
  };
}

