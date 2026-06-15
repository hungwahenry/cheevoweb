import type { Metadata } from "next";
import { getPricing } from "@/features/marketing/api/get-pricing";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { MoneySection } from "@/features/marketing/components/organizer/money-section";
import { OrganizerHero } from "@/features/marketing/components/organizer/organizer-hero";
import { ReplacesSection } from "@/features/marketing/components/organizer/replaces-section";
import { ToolkitGrid } from "@/features/marketing/components/organizer/toolkit-grid";
import { SiteOutro } from "@/features/marketing/components/shell/site-outro";

export const metadata: Metadata = {
  title: "cheevo for organizers — Sell tickets. Get paid. Move on.",
  description:
    "Create an event, sell tickets, scan people in at the door, and cash out — all from your phone.",
};

export default async function Organizers() {
  const [pricing, pages] = await Promise.all([
    getPricing(),
    listPublicPages().catch(() => []),
  ]);

  return (
    <>
      <OrganizerHero pricing={pricing} />
      <ToolkitGrid />
      <ReplacesSection />
      <MoneySection pricing={pricing} />
      <SiteOutro
        pages={pages}
        title="Your next event is one tap away."
        body="Download cheevo and start selling tickets today."
        crossLink={{ href: "/", label: "For attendees" }}
      />
    </>
  );
}
