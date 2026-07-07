"use client"

import { useState } from "react"
import type { PublicEvent } from "@/features/public/events/types"
import type { AppFee } from "../utils/fees"
import { CheckoutBar } from "./checkout-bar"
import { CheckoutDrawer } from "./checkout-drawer"
import { CheckoutPanel } from "./checkout-panel"

export function EventCheckout({
  event,
  appFee,
}: {
  event: PublicEvent
  appFee: AppFee
}) {
  const [open, setOpen] = useState(false)
  const buyable = event.tickets.length > 0

  return (
    <>
      <CheckoutBar
        minPrice={event.tickets_min_price}
        maxPrice={event.tickets_max_price}
        currency={event.currency}
        buyable={buyable}
        onOpen={() => setOpen(true)}
      />
      {buyable ? (
        <CheckoutDrawer
          open={open}
          onClose={() => setOpen(false)}
          title="Get tickets"
        >
          <CheckoutPanel
            event={{ id: event.id, tickets: event.tickets }}
            appFee={appFee}
          />
        </CheckoutDrawer>
      ) : null}
    </>
  )
}
