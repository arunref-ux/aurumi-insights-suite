import type { WidgetComponent, WidgetDefinition, WidgetType } from "../types";
import { PLACEHOLDER_RENDERER, WIDGET_MANIFEST } from "./manifest";

export interface RegistryEntry {
  definition: WidgetDefinition;
  component: WidgetComponent;
}

class WidgetRegistry {
  private entries = new Map<WidgetType, RegistryEntry>();
  private fallback: WidgetComponent | null = null;
  private defaultsRegistered = false;

  private ensureDefaultsRegistered(): void {
    if (this.defaultsRegistered) return;
    this.defaultsRegistered = true;

    this.setFallback(PLACEHOLDER_RENDERER);
    for (const entry of WIDGET_MANIFEST) {
      this.register(entry.definition, entry.renderer);
    }
  }

  register(definition: WidgetDefinition, component: WidgetComponent): void {
    this.entries.set(definition.type, { definition, component });
  }

  setFallback(component: WidgetComponent): void {
    this.fallback = component;
  }

  get(type: WidgetType): RegistryEntry | undefined {
    this.ensureDefaultsRegistered();
    return this.entries.get(type);
  }

  resolve(type: WidgetType): WidgetComponent {
    this.ensureDefaultsRegistered();
    const entry = this.entries.get(type);
    if (entry) return entry.component;
    if (this.fallback) return this.fallback;
    throw new Error(
      `No widget registered for type "${type}" and no fallback component set.`,
    );
  }

  list(): RegistryEntry[] {
    this.ensureDefaultsRegistered();
    return Array.from(this.entries.values());
  }

  has(type: WidgetType): boolean {
    this.ensureDefaultsRegistered();
    return this.entries.has(type);
  }
}

export const widgetRegistry = new WidgetRegistry();
