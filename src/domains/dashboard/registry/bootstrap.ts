import { widgetRegistry } from "./widget-registry";
import { PLACEHOLDER_RENDERER, WIDGET_MANIFEST } from "./manifest";

let bootstrapped = false;

/**
 * Registers every widget in the manifest with the widget registry.
 *
 * Idempotent and safe to call from multiple entry points (dashboard
 * renderer, conversation panel). Runs once on first call.
 */
export function bootstrapWidgetRegistry(): void {
  if (bootstrapped) return;
  bootstrapped = true;

  widgetRegistry.setFallback(PLACEHOLDER_RENDERER);
  for (const entry of WIDGET_MANIFEST) {
    widgetRegistry.register(entry.definition, entry.renderer);
  }
}

// Register at module load so any importer of the registry gets a
// populated set of widgets without extra ceremony.
bootstrapWidgetRegistry();
