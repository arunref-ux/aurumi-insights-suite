import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Aurumi Business Insights" },
      { name: "description", content: "Executive dashboard for Aurumi Business Insights." },
      { property: "og:title", content: "Dashboard — Aurumi Business Insights" },
      { property: "og:description", content: "Executive dashboard for Aurumi Business Insights." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      title="Dashboard"
      description="A consolidated view of your organisation's key metrics and activity."
      icon={<LayoutDashboard className="h-5 w-5" />}
    />
  ),
});
