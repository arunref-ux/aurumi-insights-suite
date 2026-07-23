import { Download, HelpCircle, Maximize2, MoreHorizontal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface WidgetActionMenuProps {
  widgetTitle?: string;
}

/**
 * Placeholder action menu attached to every widget's header.
 * Actions are intentionally non-functional — they represent the
 * standard widget affordances that the platform will wire up.
 */
export function WidgetActionMenu({ widgetTitle }: WidgetActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          aria-label={widgetTitle ? `${widgetTitle} actions` : "Widget actions"}
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Widget
        </DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Refresh
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Maximize2 className="mr-2 h-4 w-4" aria-hidden="true" />
          Full screen
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <HelpCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
