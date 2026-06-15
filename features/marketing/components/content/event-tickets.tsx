import { Ticket } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { PublicTicket } from "../../types";

export function EventTickets({ tickets }: { tickets: PublicTicket[] }) {
  if (tickets.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Ticket className="size-4 text-foreground/40" />
        Tickets
      </h2>
      <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <p className="font-semibold">{ticket.name}</p>
              {ticket.description ? (
                <p className="mt-0.5 text-sm text-foreground/60">
                  {ticket.description}
                </p>
              ) : null}
            </div>
            <p className="shrink-0 font-semibold">
              {formatMoney(ticket.gross_price)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
