import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function PagePlaceholder({ title, description, icon }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </header>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          {icon ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              {icon}
            </div>
          ) : null}
          <Badge variant="secondary" className="uppercase tracking-wide">
            Coming soon
          </Badge>
          <p className="max-w-md text-sm text-muted-foreground">
            This module is part of the Aurumi Business Operating System. Functionality will be
            introduced in a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
