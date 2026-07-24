import { createContext, useContext, type ReactNode } from "react";
import type { PlatformProviders } from "./contracts";
import { mockPlatform } from "./providers/mock";

const PlatformContext = createContext<PlatformProviders | null>(null);

export interface PlatformProviderProps {
  /** Override the default (mock) provider bundle. */
  providers?: PlatformProviders;
  children: ReactNode;
}

/**
 * Application-level composition of platform providers.
 *
 * Wrap the application once (in the root route). Business pages and
 * domain hooks call `usePlatform()` and never import concrete services
 * — that is what allows the mock bundle to be replaced by real platform
 * adapters in a future milestone without touching feature code.
 */
export function PlatformProvider({ providers, children }: PlatformProviderProps) {
  return (
    <PlatformContext.Provider value={providers ?? mockPlatform}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformProviders {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error("usePlatform must be used inside <PlatformProvider>.");
  }
  return ctx;
}

export function useDashboardProvider() {
  return usePlatform().dashboards;
}

export function useWidgetDataProvider() {
  return usePlatform().widgetData;
}

export function useConversationProvider() {
  return usePlatform().conversation;
}
