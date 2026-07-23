import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Aurumi Business Insights" },
      { name: "description", content: "Explore performance and trend analytics." },
      { property: "og:title", content: "Analytics — Aurumi Business Insights" },
      { property: "og:description", content: "Explore performance and trend analytics." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      title="Analytics"
      description="Explore performance, trends and cohort behaviour across the business."
      icon={<LineChart className="h-5 w-5" />}
    />
  ),
});
