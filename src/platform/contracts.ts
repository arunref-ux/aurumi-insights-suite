/**
 * Platform contracts — Aurumi Business Operating System.
 *
 * Business Insights consumes these services from the platform. It does not
 * own authentication, RBAC, workflow execution, notifications, or the
 * AI intent stack. These interfaces exist purely so the workspace can be
 * wired to real platform providers in a future milestone without changing
 * feature code.
 *
 * All methods are declared as async signatures returning `Promise<T>` so
 * consumers can adapt local, in-memory implementations today and swap in
 * network-backed providers later without shape changes.
 */

import type { Dashboard } from "@/domains/dashboard/types";
import type {
  ConversationMessage,
  ConversationSuggestion,
} from "@/domains/conversation/types";

// ─── Dashboards ─────────────────────────────────────────────────────

export interface DashboardListItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  order?: number;
}

export interface DashboardProvider {
  list(): Promise<DashboardListItem[]>;
  get(slug: string): Promise<Dashboard | null>;
  getDefault(): Promise<Dashboard | null>;
}

// ─── Conversation ───────────────────────────────────────────────────

export interface ConversationContext {
  /** Optional dashboard the user is currently viewing. */
  dashboardSlug?: string;
  /** Optional widget currently in focus. */
  widgetId?: string;
  /** Free-form contextual hints supplied by the workspace. */
  hints?: Record<string, unknown>;
}

export interface ConversationProvider {
  suggestions(context?: ConversationContext): Promise<ConversationSuggestion[]>;
  ask(prompt: string, context?: ConversationContext): Promise<ConversationMessage>;
}

// ─── Actions (platform ACTIONS app) ────────────────────────────────

export type ActionStatus = "pending" | "approved" | "rejected" | "expired";

export interface PlatformAction {
  id: string;
  title: string;
  description?: string;
  status: ActionStatus;
  createdAt: string;
  dueAt?: string;
  requester?: string;
  category?: string;
}

export interface ActionsProvider {
  list(filter?: { status?: ActionStatus }): Promise<PlatformAction[]>;
  count(filter?: { status?: ActionStatus }): Promise<number>;
  /** Returns a deep-link URL into the platform ACTIONS app. */
  getDeepLink(actionId?: string): Promise<string>;
}

// ─── Workflows ─────────────────────────────────────────────────────

export interface WorkflowSummary {
  id: string;
  name: string;
  status: "running" | "paused" | "completed" | "failed";
  updatedAt: string;
}

export interface WorkflowProvider {
  list(): Promise<WorkflowSummary[]>;
  get(id: string): Promise<WorkflowSummary | null>;
}

// ─── Notifications ─────────────────────────────────────────────────

export type NotificationSeverity = "info" | "success" | "warning" | "critical";

export interface PlatformNotification {
  id: string;
  title: string;
  body?: string;
  severity: NotificationSeverity;
  createdAt: string;
  read: boolean;
  href?: string;
}

export interface NotificationProvider {
  list(): Promise<PlatformNotification[]>;
  unreadCount(): Promise<number>;
  markRead(id: string): Promise<void>;
  markAllRead(): Promise<void>;
}

// ─── Platform bundle ───────────────────────────────────────────────

/**
 * Aggregate contract used by the future PlatformProvider wiring.
 * Individual providers may be supplied independently during migration.
 */
export interface PlatformProviders {
  dashboards: DashboardProvider;
  conversation: ConversationProvider;
  actions: ActionsProvider;
  workflows: WorkflowProvider;
  notifications: NotificationProvider;
}
