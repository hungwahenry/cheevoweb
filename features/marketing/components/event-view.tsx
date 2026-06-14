import { Calendar, MapPin, Ticket } from "lucide-react";
import { formatEventTime, formatMoney } from "@/lib/format";
import type { PublicEvent } from "../types";
import { StoreButtons } from "./store-buttons";

export function EventView({ event }: { event: PublicEvent }) {
  const when = formatEventTime(event.starts_at, event.timezone);
  const where = [event.venue_name, event.city].filter(Boolean).join(" · ");
  const fromPrice =
    event.tickets_min_price != null ? formatMoney(event.tickets_min_price) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      {event.flyer_url && event.flyer_type === "image" ? (
        <img
          src={event.flyer_url}
          alt={event.title}
          className="aspect-[4/5] w-full rounded-3xl object-cover sm:aspect-[16/10]"
        />
      ) : null}

      <div className="mt-8">
        {event.organisation.name ? (
          <p className="text-sm text-foreground/55">{event.organisation.name}</p>
        ) : null}
        <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
          {event.title}
        </h1>

        <div className="mt-4 flex flex-col gap-2 text-foreground/70">
          {when ? (
            <p className="flex items-center gap-2">
              <Calendar className="size-4 text-foreground/40" />
              {when}
            </p>
          ) : null}
          {where ? (
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-foreground/40" />
              {where}
            </p>
          ) : null}
          {fromPrice ? (
            <p className="flex items-center gap-2">
              <Ticket className="size-4 text-foreground/40" />
              From {fromPrice}
            </p>
          ) : null}
        </div>

        {event.description ? (
          <p className="mt-6 whitespace-pre-line text-foreground/75">
            {event.description}
          </p>
        ) : null}

        <div className="mt-8 rounded-2xl border border-foreground/10 bg-muted/40 p-6">
          <p className="font-semibold">Get tickets in the cheevo app</p>
          <p className="mt-1 text-sm text-foreground/60">
            Download cheevo to buy and hold your ticket.
          </p>
          <StoreButtons className="mt-4" />
        </div>
      </div>
    </div>
  );
}
