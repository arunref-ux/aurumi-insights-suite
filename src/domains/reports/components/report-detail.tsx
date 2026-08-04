import { Clock, Download, Filter, Play, Share2, Star, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ReportApp, ReportItem, ReportStatus } from "../types";
import { formatIcons } from "./report-tree";

const statusVariant: Record<ReportStatus, string> = {
  live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  scheduled: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  draft: "bg-muted text-muted-foreground",
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ReportDetail({
  report,
  app,
  categoryName,
}: {
  report: ReportItem;
  app?: ReportApp;
  categoryName?: string;
}) {
  const Icon = formatIcons[report.format];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 border-b border-border/60 pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{app?.name ?? "Suite"}</span>
          <span aria-hidden>/</span>
          <span>{categoryName ?? "Reports"}</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="truncate text-xl font-semibold tracking-tight">
                {report.name}
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {report.description}
              </p>
            </div>
          </div>

          <div role="toolbar" aria-label="Report actions" className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" disabled>
              <Star className="mr-1.5 h-4 w-4" /> Pin
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Filter className="mr-1.5 h-4 w-4" /> Parameters
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Share2 className="mr-1.5 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="mr-1.5 h-4 w-4" /> Export
            </Button>
            <Button size="sm" disabled>
              <Play className="mr-1.5 h-4 w-4" /> Run report
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <Badge className={statusVariant[report.status]} variant="secondary">
            {report.status}
          </Badge>
          <Separator orientation="vertical" className="h-3" />
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" aria-hidden /> {report.owner}
          </span>
          <Separator orientation="vertical" className="h-3" />
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden /> Updated{" "}
            {formatWhen(report.updatedAt)}
          </span>
          <Badge variant="outline" className="uppercase tracking-wide">
            Demo data
          </Badge>
        </div>
      </header>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Report preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <Badge variant="secondary" className="uppercase tracking-wide">
            Coming soon
          </Badge>
          <p className="max-w-md text-sm text-muted-foreground">
            The Reports Runtime will render this {report.format} using the same
            widget engine as dashboards. Selection, parameters and export are
            placeholders in this prototype.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReportDetailEmpty() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <Badge variant="secondary" className="uppercase tracking-wide">
          Select a report
        </Badge>
        <p className="max-w-md text-sm text-muted-foreground">
          Browse the catalog by app and category, or search across every app to
          jump straight to a report.
        </p>
      </CardContent>
    </Card>
  );
}
