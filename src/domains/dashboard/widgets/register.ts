// Deprecated shim — SDK widgets are registered by the shared manifest in
// `../registry/bootstrap.ts`. Kept as a compatibility export.
import { bootstrapWidgetRegistry } from "../registry/bootstrap";

export function registerSdkWidgets(): void {
  bootstrapWidgetRegistry();
}
