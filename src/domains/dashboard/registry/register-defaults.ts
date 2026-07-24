// Deprecated shim — widget registration is now performed by
// `./bootstrap.ts`, which reads a single manifest. Kept exported so any
// external caller continues to compile; safe to remove in a future
// milestone.
import { bootstrapWidgetRegistry } from "./bootstrap";

export function registerDefaultWidgets(): void {
  bootstrapWidgetRegistry();
}
