import type { ConversationMessage } from "../types";

/**
 * Pure domain factories for conversation messages.
 *
 * This module is intentionally free of provider, mock, fixture, or
 * runtime dependencies. UI components (e.g. ConversationPanel) depend
 * only on this lightweight domain model to construct outbound messages;
 * inbound assistant replies are produced by the conversation provider.
 */

function makeId(): string {
  return `msg_${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function makeUserMessage(text: string): ConversationMessage {
  return {
    id: makeId(),
    role: "user",
    text,
    timestamp: nowIso(),
  };
}
