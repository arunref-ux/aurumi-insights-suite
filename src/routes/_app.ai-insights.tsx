import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const Route = createFileRoute("/_app/ai-insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — Aurumi Business Insights" },
      { name: "description", content: "AI-generated insights across your business data." },
      { property: "og:title", content: "AI Insights — Aurumi Business Insights" },
      { property: "og:description", content: "AI-generated insights across your business data." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      title="AI Insights"
      description="Automated recommendations and narrative analysis powered by machine learning."
      icon={<Sparkles className="h-5 w-5" />}
    />
  ),
});
