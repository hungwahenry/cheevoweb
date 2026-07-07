import type { PublicEvent } from "@/features/public/events/types"
import type { PublicPageSummary } from "@/features/public/pages/types"
import { isEventEnded } from "@/features/public/events/lib/event-status"
import { EventCheckout } from "@/features/public/checkout/components/event-checkout"
import { AppCta } from "@/features/public/shell/components/app-cta"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { EventDetails } from "@/features/public/events/components/event-details"
import { EventJsonLd } from "@/features/public/events/components/event-jsonld"
import { EventFeatures } from "@/features/public/events/components/event-features"
import { EventFlyer } from "@/features/public/events/components/event-flyer"
import { EventGallery } from "@/features/public/events/components/event-gallery"

function appCard(ended: boolean, hasTickets: boolean) {
  if (ended) {
    return {
      image: "/screenshots/app/feed.png",
      title: "This event has ended",
      body: "Catch the next one — download Cheevo to discover events near you.",
    }
  }
  if (!hasTickets) {
    return {
      image: "/screenshots/app/event-detail.png",
      title: "RSVP in the Cheevo app",
      body: "This event uses RSVPs — download Cheevo to reserve your spot and keep it in your pocket.",
    }
  }
  return {
    image: "/screenshots/app/event-detail.png",
    title: "Prefer the app?",
    body: "Buy in the Cheevo app for lower fees, and keep every ticket in your pocket.",
  }
}

export function EventPage({
  event,
  pages,
}: {
  event: PublicEvent
  pages: PublicPageSummary[]
}) {
  const ended = isEventEnded(event)
  const card = appCard(ended, event.tickets.length > 0)

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <EventJsonLd event={event} />
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 pt-8 pb-12 md:pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-end">
          <div className="md:col-span-2">
            <EventFlyer event={event} />
          </div>
          <div className="md:col-span-3">
            <EventDetails event={event} />
          </div>
        </div>

        {event.description ? (
          <p className="mt-10 max-w-2xl leading-7 whitespace-pre-line text-foreground/80">
            {event.description}
          </p>
        ) : null}

        <EventGallery images={event.images} />
        <EventFeatures features={event.features} timezone={event.timezone} />

        <AppCta
          className="mt-12"
          image={card.image}
          title={card.title}
          body={card.body}
        />
      </div>

      <div className="pb-28">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>

      {ended ? null : <EventCheckout event={event} />}
    </main>
  )
}
