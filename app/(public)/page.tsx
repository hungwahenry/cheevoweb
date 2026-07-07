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
            q: "Do I need the app to buy a ticket?",
            a: "No. You can buy right here on the web with just your name and email — no account, no download. Your tickets land in your inbox and on a private link you can reopen anytime.",
          },
          {
            q: "How do I get a ticket?",
            a: "Open an event, pick how many you want, and pay with your card or bank. You'll get a QR code for each ticket straight away — nothing to print.",
          },
          {
            q: "Is the app cheaper?",
            a: "Yes. Booking fees are lower in the Cheevo app than on the web, and it keeps every ticket in one place. You always see the exact total before you pay, either way.",
          },
          {
            q: "How do I get in at the door?",
            a: "Show the QR code for your ticket — from the app or the link we emailed you — and the organiser scans it. No printouts or screenshots needed.",
          },
          {
            q: "Is it free to use?",
            a: "Browsing events, RSVPs and free events cost nothing. For paid tickets you only pay the ticket price plus a small booking fee, shown upfront.",
          },
          {
            q: "Can't make it anymore?",
            a: "Get the Cheevo app and sign in with the email you bought with to transfer your ticket to someone else. For refunds, check the event's organiser.",
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
