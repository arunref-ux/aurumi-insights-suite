import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Aurumi Business Insights" },
      { name: "description", content: "Configure your workspace and preferences." },
      { property: "og:title", content: "Settings — Aurumi Business Insights" },
      { property: "og:description", content: "Configure your workspace and preferences." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      title="Settings"
      description="Manage workspace, members, integrations and personal preferences."
      icon={<SettingsIcon className="h-5 w-5" />}
    />
  ),
});
