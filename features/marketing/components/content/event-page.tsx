import type { PublicEvent, PublicPageSummary } from "../../types";
import { isEventEnded } from "../../event-status";
import { SiteFooterBar } from "../shell/site-footer-bar";
import { SiteHeader } from "../shell/site-header";
import { StoreButton } from "../shell/store-button";
import { EventBottomBar } from "./event-bottom-bar";
import { EventDetails } from "./event-details";
import { EventFeatures } from "./event-features";
import { EventFlyer } from "./event-flyer";
import { EventGallery } from "./event-gallery";
import { EventTickets } from "./event-tickets";

export function EventPage({
  event,
  pages,
}: {
  event: PublicEvent;
  pages: PublicPageSummary[];
}) {
  const ended = isEventEnded(event);

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 pb-12 pt-8 md:pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-end">
          <div className="md:col-span-2">
            <EventFlyer event={event} />
          </div>
          <div className="md:col-span-3">
            <EventDetails event={event} />
          </div>
        </div>

        {event.description ? (
          <p className="mt-10 max-w-2xl whitespace-pre-line leading-7 text-foreground/80">
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
  );
}
