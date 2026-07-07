import { useState } from "react"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { createOrder, type GuestBuyer } from "../api/create-order"
import { activeCheckout } from "../stores/active-checkout"
import type { CheckoutItem } from "../types"

export function useGuestCheckout(eventId: string) {
  const [isProcessing, setIsProcessing] = useState(false)

  async function checkout(buyer: GuestBuyer, items: CheckoutItem[]) {
    if (isProcessing || items.length === 0) return
    setIsProcessing(true)
    try {
      const result = await createOrder(eventId, buyer, items)
      if (result.access_token) activeCheckout.set(result.access_token)

      if (result.authorization_url) {
        window.location.href = result.authorization_url
      } else if (result.access_token) {
        window.location.href = `/orders/${result.access_token}`
      } else {
        toast.error("Could not start checkout. Please try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      toast.error(getErrorMessage(err))
      setIsProcessing(false)
    }
  }

  return { checkout, isProcessing }
}
