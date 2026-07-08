import Link from "next/link"
import { formatDate, formatEventPrice } from "@/lib/format"
import type { FeedEvent } from "../types"

export function EventCard({ event }: { event: FeedEvent }) {
  const poster =
    event.flyer_type === "video" ? event.flyer_poster_url : event.flyer_url
  const when = formatDate(event.starts_at, "EEE, d MMM")
  const place = [event.venue_name, event.city].filter(Boolean).join(" · ")
  const price = formatEventPrice(
    event.tickets_min_price,
    event.tickets_max_price,
    event.currency
  )

  return (
    <Link href={`/events/${event.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
        {poster ? (
          <img
            src={poster}
            alt={event.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          {price}
        </span>
      </div>

      <div className="mt-3">
        {when !== "—" ? (
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            {when}
          </p>
        ) : null}
        <h3 className="mt-1 line-clamp-2 leading-snug font-bold tracking-tight">
          {event.title}
        </h3>
        {place ? (
          <p className="mt-1 line-clamp-1 text-sm text-foreground/55">
            {place}
          </p>
        ) : null}
        <div className="mt-2 flex items-center gap-2">
          {event.organisation.logo_url ? (
            <img
              src={event.organisation.logo_url}
              alt=""
              className="size-5 rounded-full object-cover"
            />
          ) : null}
          <span className="line-clamp-1 text-xs text-foreground/60">
            {event.organisation.name}
          </span>
        </div>
      </div>
    </Link>
  )
}
