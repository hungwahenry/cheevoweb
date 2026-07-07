import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format"
import type { OrderView } from "@/features/public/checkout/types"
import { AppCta } from "@/features/public/shell/components/app-cta"
import { TicketCard } from "./ticket-card"

export function OrderTickets({ order }: { order: OrderView }) {
  const paid = order.status === "paid"
  const tickets = order.issued_tickets ?? []
  const ticketNameById = new Map(
    (order.items ?? []).map((item) => [item.event_ticket_id, item.ticket_name])
  )

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black tracking-tight md:text-3xl">
          Your tickets
        </h1>
        <Badge variant={paid ? "default" : "secondary"} className="uppercase">
          {paid ? "Confirmed" : order.status}
        </Badge>
      </div>

      {order.items && order.items.length > 0 ? (
        <p className="mt-2 text-sm text-foreground/60">
          {order.items
            .map((item) => `${item.quantity} × ${item.ticket_name}`)
            .join(" · ")}{" "}
          — {formatMoney(order.total_minor)}
        </p>
      ) : null}

      {tickets.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              name={ticketNameById.get(ticket.event_ticket_id) ?? "Ticket"}
              code={ticket.code}
              status={ticket.status}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 text-sm text-foreground/60">
          Your tickets will appear here as soon as your payment clears.
          We&apos;ve also emailed them to you.
        </div>
      )}

      <AppCta
        className="mt-10"
        image="/screenshots/app/tickets.png"
        title="Keep your tickets safe"
        body="Get the Cheevo app and sign in to keep every ticket in your pocket."
      />
    </div>
  )
}
