import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format"
import type { PublicTicket } from "@/features/public/events/types"
import { ticketStatus } from "../utils/availability"

type TicketSelectorProps = {
  tickets: PublicTicket[]
  quantities: Record<string, number>
  onChange: (ticketId: string, quantity: number) => void
  disabled?: boolean
  now: number | null
}

function TicketRow({
  ticket,
  qty,
  onChange,
  disabled,
  now,
}: {
  ticket: PublicTicket
  qty: number
  onChange: (ticketId: string, quantity: number) => void
  disabled?: boolean
  now: number | null
}) {
  const status = ticketStatus(ticket, now)

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="font-semibold">{ticket.name}</p>
        {ticket.description ? (
          <p className="mt-0.5 text-sm text-foreground/60">
            {ticket.description}
          </p>
        ) : null}
        <p className="mt-1 text-sm font-medium text-foreground/80">
          {ticket.gross_price === 0 ? "Free" : formatMoney(ticket.gross_price)}
        </p>

        {status.startsAt ? (
          <p className="mt-1 text-xs text-primary">
            On sale{" "}
            {new Date(status.startsAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        ) : status.remaining !== null ? (
          <p className="mt-1 text-xs text-primary">
            Only {status.remaining} left
          </p>
        ) : status.endsSoonAt ? (
          <p className="mt-1 text-xs text-destructive">Sales ending soon</p>
        ) : null}
      </div>

      {status.buyable ? (
        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Remove one ${ticket.name}`}
            disabled={disabled || qty === 0}
            onClick={() => onChange(ticket.id, qty - 1)}
          >
            <Minus />
          </Button>
          <span className="w-5 text-center font-semibold tabular-nums">
            {qty}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Add one ${ticket.name}`}
            disabled={disabled || qty >= status.max}
            onClick={() => onChange(ticket.id, Math.min(qty + 1, status.max))}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <span className="shrink-0 text-xs font-medium text-foreground/50">
          {status.label}
        </span>
      )}
    </div>
  )
}

export function TicketSelector({
  tickets,
  quantities,
  onChange,
  disabled,
  now,
}: TicketSelectorProps) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border">
      {tickets.map((ticket) => (
        <TicketRow
          key={ticket.id}
          ticket={ticket}
          qty={quantities[ticket.id] ?? 0}
          onChange={onChange}
          disabled={disabled}
          now={now}
        />
      ))}
    </div>
  )
}
