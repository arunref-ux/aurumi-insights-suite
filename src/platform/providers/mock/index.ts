import type { PlatformProviders } from "../../contracts";
import { mockDashboardProvider } from "./dashboard-provider";
import { mockWidgetDataProvider } from "./widget-data-provider";
import { mockConversationProvider } from "./conversation-provider";

/**
 * Local, in-memory implementation of every platform contract used by the
 * Executive Workspace. Replace individual providers with real network-
 * backed adapters as platform services come online.
 */
export const mockPlatform: PlatformProviders = {
  dashboards: mockDashboardProvider,
  widgetData: mockWidgetDataProvider,
  conversation: mockConversationProvider,
};
