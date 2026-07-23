import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Aurumi Business Insights" },
      { name: "description", content: "Generate and manage business reports." },
      { property: "og:title", content: "Reports — Aurumi Business Insights" },
      { property: "og:description", content: "Generate and manage business reports." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      title="Reports"
      description="Create, schedule and share structured reports across your organisation."
      icon={<BarChart3 className="h-5 w-5" />}
    />
  ),
});
