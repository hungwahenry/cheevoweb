"use client"

import { useEffect, useState } from "react"
import { formatMoney } from "@/lib/format"
import type { PublicTicket } from "@/features/public/events/types"
import { useGuestCheckout } from "../hooks/use-guest-checkout"
import { useGuestQuote } from "../hooks/use-guest-quote"
import { useTicketSelection } from "../hooks/use-ticket-selection"
import { type AppFee, savingsMinor, subtotalMinor } from "../utils/fees"
import { GuestDetailsForm } from "./guest-details-form"
import { OrderSummary } from "./order-summary"
import { TicketSelector } from "./ticket-selector"

export function CheckoutPanel({
  event,
  appFee,
}: {
  event: { id: string; tickets: PublicTicket[] }
  appFee: AppFee
}) {
  const [step, setStep] = useState<"select" | "details">("select")
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const { quantities, setQuantity, items, hasSelection } = useTicketSelection()
  const { quote, isLoading, error: quoteError } = useGuestQuote(event.id, items)
  const {
    checkout,
    isProcessing,
    error: checkoutError,
  } = useGuestCheckout(event.id)

  const subtotal = subtotalMinor(event.tickets, quantities)
  const savings = quote ? savingsMinor(quote.fees_minor, subtotal, appFee) : 0
  const error = checkoutError ?? quoteError

  function onSelectChange(ticketId: string, quantity: number) {
    setStep("select")
    setQuantity(ticketId, quantity)
  }

  return (
    <div>
      <TicketSelector
        tickets={event.tickets}
        quantities={quantities}
        onChange={onSelectChange}
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

          {error ? (
            <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          {step === "select" ? (
            <button
              type="button"
              disabled={isLoading || !quote}
              onClick={() => setStep("details")}
              className="mt-4 w-full rounded-full bg-foreground py-3 font-medium text-background transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <div className="mt-4">
              <GuestDetailsForm
                submitLabel={
                  quote ? `Pay ${formatMoney(quote.total_minor)}` : "Pay"
                }
                submitting={isProcessing}
                onSubmit={(buyer) => checkout(buyer, items)}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-center text-sm text-foreground/50">
          Select a ticket to continue.
        </p>
      )}
    </div>
  )
}
