import type { ReactNode } from "react";
import { widgetRegistry } from "@/domains/dashboard/registry/widget-registry";
import { bootstrapWidgetRegistry } from "@/domains/dashboard/registry/bootstrap";

bootstrapWidgetRegistry();
import type { DashboardWidget } from "@/domains/dashboard/types";
import type { ConversationCard } from "../types";

/**
 * Renders a conversation response card by delegating to a Widget SDK
 * component from the shared registry. The conversation module owns no
 * widget presentation of its own — it simply wires card payloads into
 * synthetic `DashboardWidget` instances so the SDK renders them inline.
 */
function InlineWidget({
  type,
  title,
  subtitle,
  data,
}: {
  type: string;
  title: string;
  subtitle?: string;
  data: unknown;
}): ReactNode {
  const Component = widgetRegistry.resolve(type);
  const widget: DashboardWidget = {
    id: `conv-${type}-${title}`,
    type,
    title,
    subtitle,
  };
  return <Component widget={widget} data={data} />;
}

export function ResponseCard({ card }: { card: ConversationCard }) {
  switch (card.kind) {
    case "executiveSummary":
      return (
        <InlineWidget
          type="aiSummary"
          title={card.title ?? "Executive summary"}
          data={card.data}
        />
      );

    case "pendingActions":
      return (
        <InlineWidget
          type="pendingActions"
          title={card.title ?? "Pending actions"}
          data={card.data}
        />
      );

    case "timeline":
      return (
        <InlineWidget
          type="timeline"
          title={card.title ?? "Recent activity"}
          data={card.data}
        />
      );

    case "businessHealth":
      return (
        <InlineWidget
          type="statusGrid"
          title={card.title ?? "Business health"}
          data={card.data}
        />
      );

    case "kpiSnapshot":
      return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {card.items.map((item) => (
            <InlineWidget
              key={item.id}
              type={item.trend ? "trendKpi" : "kpi"}
              title={item.label}
              data={item.data}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
