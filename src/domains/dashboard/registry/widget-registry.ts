import type { WidgetComponent, WidgetDefinition, WidgetType } from "../types";

export interface RegistryEntry {
  definition: WidgetDefinition;
  component: WidgetComponent;
}

class WidgetRegistry {
  private entries = new Map<WidgetType, RegistryEntry>();
  private fallback: WidgetComponent | null = null;

  register(definition: WidgetDefinition, component: WidgetComponent): void {
    this.entries.set(definition.type, { definition, component });
  }

  setFallback(component: WidgetComponent): void {
    this.fallback = component;
  }

  get(type: WidgetType): RegistryEntry | undefined {
    return this.entries.get(type);
  }

  resolve(type: WidgetType): WidgetComponent {
    const entry = this.entries.get(type);
    if (entry) return entry.component;
    if (this.fallback) return this.fallback;
    throw new Error(
      `No widget registered for type "${type}" and no fallback component set.`,
    );
  }

  list(): RegistryEntry[] {
    return Array.from(this.entries.values());
  }

  has(type: WidgetType): boolean {
    return this.entries.has(type);
  }
}

export const widgetRegistry = new WidgetRegistry();
