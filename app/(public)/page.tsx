import type { Metadata } from "next"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { ConsumerHero } from "@/features/public/home/components/consumer-hero"
import { ProductStory } from "@/features/public/home/components/product-story"
import { Faq } from "@/features/public/shell/components/faq"
import { SiteOutro } from "@/features/public/shell/components/site-outro"

export const metadata: Metadata = {
  title: "Cheevo — Find what's on near you",
  description:
    "Concerts, parties, popups and more — discover events near you, RSVP or grab a ticket, and walk in with it in your pocket.",
}

export default async function Home() {
  const pages = await listPublicPages().catch(() => [])

  return (
    <>
      <ConsumerHero />
      <ProductStory />
      <Faq
        title="Good to know"
        items={[
          {
            q: "How do I get a ticket?",
            a: "Find an event, tap through to buy, and pay in a couple of taps. Your ticket lives in the Cheevo app as a QR code you scan at the door.",
          },
          {
            q: "Do I need the app?",
            a: "Yes — Cheevo is a free iOS and Android app. Download it to browse events, RSVP, and keep your tickets in your pocket.",
          },
          {
            q: "Is it free?",
            a: "Browsing, RSVPs and free events cost nothing. For paid tickets you always see the exact total before you pay.",
          },
          {
            q: "How do I get in at the door?",
            a: "Open your ticket in the app and the organiser scans its QR code — no printing, no screenshots.",
          },
          {
            q: "Can't make it anymore?",
            a: "You can transfer your ticket to another Cheevo user right from the app.",
          },
        ]}
      />
      <SiteOutro
        pages={pages}
        title="Never miss what's on."
        body="Get Cheevo to see what's happening near you and grab your spot."
        crossLink={{ href: "/organizers", label: "For organizers" }}
      />
    </>
  )
}
