import type { Metadata } from "next";
import { getPricing } from "@/features/marketing/api/get-pricing";
import { OrganizerLanding } from "@/features/marketing/components/organizer-landing";

export const metadata: Metadata = {
  title: "cheevo for organizers — Sell tickets. Get paid. Move on.",
  description:
    "Create an event, sell tickets, scan people in at the door, and cash out — all from your phone.",
};

export default async function Organizers() {
  const pricing = await getPricing();
  return <OrganizerLanding pricing={pricing} />;
}
