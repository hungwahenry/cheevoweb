"use client"

import { useEffect, useState } from "react"
import { formatMoney } from "@/lib/format"
import type { PublicTicket } from "@/features/public/events/types"
import { useGuestCheckout } from "../hooks/use-guest-checkout"
import { useGuestQuote } from "../hooks/use-guest-quote"
import { useTicketSelection } from "../hooks/use-ticket-selection"
import { GuestDetailsForm } from "./guest-details-form"
import { OrderSummary } from "./order-summary"
import { TicketSelector } from "./ticket-selector"

function subtotalMinor(
  tickets: PublicTicket[],
  quantities: Record<string, number>
): number {
  return tickets.reduce(
    (sum, ticket) => sum + ticket.gross_price * (quantities[ticket.id] ?? 0),
    0
  )
}

export function CheckoutPanel({
  event,
}: {
  event: { id: string; tickets: PublicTicket[] }
}) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const { quantities, setQuantity, items, hasSelection } = useTicketSelection()
  const { quote, isLoading } = useGuestQuote(event.id, items)
  const { checkout, isProcessing } = useGuestCheckout(event.id)

  const subtotal = subtotalMinor(event.tickets, quantities)
  const savings = quote?.app_savings_minor ?? 0

  return (
    <div>
      <TicketSelector
        tickets={event.tickets}
        quantities={quantities}
        onChange={setQuantity}
        disabled={isProcessing}
        now={now}
      />

      {hasSelection ? (
        <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-5">
          <OrderSummary
            subtotal={subtotal}
            quote={quote}
            isLoading={isLoading}
            savings={savings}
          />

          <div className="mt-4">
            <GuestDetailsForm
              submitLabel={
                quote ? `Pay ${formatMoney(quote.total_minor)}` : "Pay"
              }
              submitting={isProcessing}
              disabled={isLoading || !quote}
              onSubmit={(buyer) => checkout(buyer, items)}
            />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center text-sm text-foreground/50">
          Select a ticket to continue.
        </p>
      )}
    </div>
  )
}
