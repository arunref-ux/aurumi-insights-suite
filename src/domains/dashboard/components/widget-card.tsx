import type { ReactNode } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface WidgetCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  headerActions?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
  bodyClassName?: string;
  children?: ReactNode;
}

export function WidgetCard({
  title,
  subtitle,
  icon,
  headerActions,
  footer,
  isLoading,
  error,
  isEmpty,
  emptyMessage = "No data available.",
  className,
  bodyClassName,
  children,
}: WidgetCardProps) {
  return (
    <Card
      role="region"
      aria-label={title}
      className={cn(
        "flex h-full flex-col overflow-hidden border-border/60 bg-card shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 border-b border-border/60 pb-3">
        <div className="flex min-w-0 items-start gap-3">
          {icon ? (
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {icon}
            </div>
          ) : null}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold leading-tight tracking-tight">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {headerActions ? (
          <div className="flex shrink-0 items-center gap-1">{headerActions}</div>
        ) : null}
      </CardHeader>

      <CardContent
        className={cn("flex flex-1 flex-col p-4", bodyClassName)}
      >
        {isLoading ? (
          <WidgetLoading />
        ) : error ? (
          <WidgetError error={error} />
        ) : isEmpty ? (
          <WidgetEmpty message={emptyMessage} />
        ) : (
          children
        )}
      </CardContent>

      {footer ? (
        <div className="border-t border-border/60 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

function WidgetLoading() {
  return (
    <div className="flex flex-1 flex-col gap-3" aria-busy="true" aria-live="polite">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

function WidgetError({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
    >
      <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
      <p className="text-sm font-medium">Unable to load widget</p>
      <p className="max-w-xs text-xs text-muted-foreground">{error.message}</p>
    </div>
  );
}

function WidgetEmpty({ message }: { message: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
      <Inbox className="h-6 w-6" aria-hidden="true" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
