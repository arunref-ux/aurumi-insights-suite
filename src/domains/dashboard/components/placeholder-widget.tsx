import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WidgetCard } from "./widget-card";
import type { WidgetProps } from "../types";

export function PlaceholderWidget({ widget }: WidgetProps) {
  const displayType = widget.type;

  return (
    <WidgetCard
      title={widget.title}
      subtitle={widget.subtitle}
      icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      footer={
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider">
            id: {widget.id}
          </span>
          <span>Aurumi Insights</span>
        </div>
      }
    >
      <div className="flex flex-1 flex-col items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="uppercase tracking-wide">
            {displayType}
          </Badge>
          <Badge variant="outline" className="uppercase tracking-wide">
            Coming soon
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          This widget is registered in the dashboard engine and will be implemented
          in a future release.
        </p>

        <div className="mt-auto w-full rounded-md border border-dashed border-border/70 bg-muted/40 p-4 text-center text-xs text-muted-foreground">
          Placeholder rendering — configuration-driven widget shell
        </div>
      </div>
    </WidgetCard>
  );
}
