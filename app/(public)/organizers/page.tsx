import type { Metadata } from "next"
import { getPricing } from "@/features/public/pricing/api/get-pricing"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { MoneySection } from "@/features/public/organizers/components/money-section"
import { OrganizerHero } from "@/features/public/organizers/components/organizer-hero"
import { ReplacesSection } from "@/features/public/organizers/components/replaces-section"
import { ToolkitGrid } from "@/features/public/organizers/components/toolkit-grid"
import { Faq } from "@/features/public/shell/components/faq"
import { SiteOutro } from "@/features/public/shell/components/site-outro"

export const metadata: Metadata = {
  title: "Cheevo for organizers — Sell tickets. Get paid. Move on.",
  description:
    "Create an event, sell tickets, scan people in at the door, and cash out — all from your phone.",
}

export default async function Organizers() {
  const [pricing, pages] = await Promise.all([
    getPricing(),
    listPublicPages().catch(() => []),
  ])

  return (
    <>
      <OrganizerHero pricing={pricing} />
      <ToolkitGrid />
      <ReplacesSection />
      <MoneySection pricing={pricing} />
      <Faq
        title="Organiser FAQ"
        items={[
          {
            q: "How do I create an event?",
            a: "Everything happens in the Cheevo Organizer app — create your event, add tickets, and publish in minutes. No separate desktop setup needed.",
          },
          {
            q: "What does it cost?",
            a: "Free to start — a small service fee is added at checkout that your buyers pay, so you keep 100% of your ticket price. Free events are free to host. Full breakdown on our pricing page.",
          },
          {
            q: "When do I get paid?",
            a: "Once an event's sales clear a short hold window, request a payout straight to your bank from the app.",
          },
          {
            q: "How do people get in at the door?",
            a: "Scan attendees' QR tickets with the Organizer app and watch live check-in stats as people arrive.",
          },
          {
            q: "Can I message my attendees?",
            a: "Yes — send email broadcasts to your ticket-holders and RSVPers right from the app.",
          },
          {
            q: "What can attendees pay with?",
            a: "Cards and local payment options via Paystack and Flutterwave, in Naira and other supported currencies.",
          },
        ]}
      />
      <SiteOutro
        pages={pages}
        app="organizer"
        title="Your next event is one tap away."
        body="Download the Cheevo Organizer app and start selling tickets today."
        crossLink={{ href: "/", label: "For attendees" }}
      />
    </>
  )
}
