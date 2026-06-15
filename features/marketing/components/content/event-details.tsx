import { CalendarDays, MapPin, Ticket, type LucideIcon } from "lucide-react";
import { formatEventPrice, formatEventWhen } from "@/lib/format";
import type { PublicEvent } from "../../types";

export function EventDetails({ event }: { event: PublicEvent }) {
  const when = formatEventWhen(event.starts_at, event.timezone);
  const where = [event.venue_name, event.city].filter(Boolean).join(", ");
  const price = formatEventPrice(
    event.tickets_min_price,
    event.tickets_max_price,
    event.currency,
  );

  return (
    <div className="flex flex-col">
      {event.organisation?.name ? (
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          {event.organisation.logo_url ? (
            <img
              src={event.organisation.logo_url}
              alt=""
              className="size-6 rounded-md object-cover"
            />
          ) : null}
          <span>{event.organisation.name}</span>
        </div>
      ) : null}

      <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-4xl">
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
  );
}

function DetailRow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 text-foreground/75">
      <Icon className="size-4 shrink-0 text-foreground/40" />
      <span>{children}</span>
    </div>
  );
}
