import type { PublicEvent } from "@/features/public/events/types"
import type { PublicPageSummary } from "@/features/public/pages/types"
import { isEventEnded } from "@/features/public/events/lib/event-status"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { StoreButton } from "@/features/public/shell/components/store-button"
import { EventBottomBar } from "@/features/public/events/components/event-bottom-bar"
import { EventDetails } from "@/features/public/events/components/event-details"
import { EventJsonLd } from "@/features/public/events/components/event-jsonld"
import { EventFeatures } from "@/features/public/events/components/event-features"
import { EventFlyer } from "@/features/public/events/components/event-flyer"
import { EventGallery } from "@/features/public/events/components/event-gallery"
import { EventTickets } from "@/features/public/events/components/event-tickets"

export function EventPage({
  event,
  pages,
}: {
  event: PublicEvent
  pages: PublicPageSummary[]
}) {
  const ended = isEventEnded(event)

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

        <EventTickets tickets={event.tickets} />
        <EventFeatures features={event.features} />

        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
            {ended ? "This event has ended" : "Get tickets in the cheevo app"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
            {ended
              ? "Catch the next one — download cheevo to discover events near you."
              : "Download cheevo to RSVP, buy your ticket, and keep it in your pocket. Already have the app? This link opens it automatically."}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>
        </div>
      </div>

      <div className="pb-28">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>

      <EventBottomBar event={event} />
    </main>
  )
}
