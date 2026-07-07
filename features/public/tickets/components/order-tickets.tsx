import { formatMoney } from "@/lib/format"
import type { OrderView } from "@/features/public/checkout/types"
import { TicketQr } from "./ticket-qr"

export function OrderTickets({ order }: { order: OrderView }) {
  const paid = order.status === "paid"
  const tickets = order.issued_tickets ?? []

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black tracking-tight md:text-3xl">
          Your tickets
        </h1>
        <span
          className={
            paid
              ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
              : "rounded-full bg-muted px-3 py-1 text-xs font-semibold tracking-wide text-foreground/60 uppercase"
          }
        >
          {paid ? "Confirmed" : order.status}
        </span>
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
          {tickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="flex items-center gap-4 rounded-2xl border border-border p-4"
            >
              <TicketQr value={ticket.code} />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-foreground/45 uppercase">
                  Ticket {index + 1}
                </p>
                <p className="mt-1 font-mono text-xs break-all text-foreground/70">
                  {ticket.code}
                </p>
                <p className="mt-2 text-xs text-foreground/55">
                  {ticket.status === "scanned"
                    ? "Checked in"
                    : ticket.status === "revoked"
                      ? "Revoked"
                      : "Show this QR at the door"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 text-sm text-foreground/60">
          Your tickets will appear here as soon as your payment clears.
          We&apos;ve also emailed them to you.
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
        <p className="font-semibold">Keep your tickets safe</p>
        <p className="mt-1 text-sm text-foreground/65">
          Get the cheevo app and sign in with this email to keep every ticket in
          your pocket — and check in faster at the door.
        </p>
      </div>
    </div>
  )
}
