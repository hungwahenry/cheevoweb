"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import type { PublicEvent } from "@/features/public/events/types"
import { CheckoutBar } from "./checkout-bar"
import { CheckoutPanel } from "./checkout-panel"

export function EventCheckout({ event }: { event: PublicEvent }) {
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
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Get tickets</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto px-2 pb-4">
              <CheckoutPanel event={{ id: event.id, tickets: event.tickets }} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  )
}
