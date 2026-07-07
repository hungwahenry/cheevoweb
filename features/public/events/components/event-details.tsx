import { CalendarDays, MapPin, Ticket, type LucideIcon } from "lucide-react"
import { formatEventPrice, formatEventWhen } from "@/lib/format"
import type { PublicEvent } from "@/features/public/events/types"
import { isEventEnded } from "@/features/public/events/lib/event-status"

export function EventDetails({ event }: { event: PublicEvent }) {
  const when = formatEventWhen(event.starts_at, event.timezone)
  const where = [event.venue_name, event.city].filter(Boolean).join(", ")
  const ended = isEventEnded(event)
  const price = formatEventPrice(
    event.tickets_min_price,
    event.tickets_max_price,
    event.currency
  )

  return (
    <div className="flex flex-col">
      {ended ? (
        <span className="mb-3 self-start rounded-full bg-muted px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground/55 uppercase">
          Ended
        </span>
      ) : null}
      {event.organisation?.name ? (
        <div className="flex items-center gap-2.5">
          {event.organisation.logo_url ? (
            <img
              src={event.organisation.logo_url}
              alt=""
              className="size-8 rounded-full border border-border object-cover"
            />
          ) : null}
          <div className="leading-tight">
            <p className="text-[11px] tracking-wider text-foreground/45 uppercase">
              Hosted by
            </p>
            <p className="text-sm font-medium text-foreground/80">
              {event.organisation.name}
            </p>
          </div>
        </div>
      ) : null}

      <h1 className="mt-3 text-3xl leading-tight font-black tracking-tight md:text-4xl">
        {event.title}
      </h1>

      <div className="mt-5 flex flex-col gap-2.5 text-sm">
        {when ? <DetailRow icon={CalendarDays}>{when}</DetailRow> : null}
        {where ? <DetailRow icon={MapPin}>{where}</DetailRow> : null}
        <DetailRow icon={Ticket}>
          <span className="font-semibold text-foreground">{price}</span>
        </DetailRow>
      </div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5 text-foreground/75">
      <Icon className="size-4 shrink-0 text-foreground/40" />
      <span>{children}</span>
    </div>
  )
}
