import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Juvel Bergantin | AI Automation Specialist" },
      { name: "description", content: "Juvel Bergantin builds practical n8n and AI automations for small businesses and agencies: lead follow-up, CRM pipelines, document extraction and workflow rescue." },
      { property: "og:title", content: "Juvel Bergantin | AI Automation Specialist" },
      { property: "og:description", content: "Less admin, more business. Explore Juvel’s AI automation demo builds for lead follow-up, CRM updates and invoice processing." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});
