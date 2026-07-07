import { useState } from "react"
import { getErrorMessage } from "@/lib/api/errors"
import { createOrder, type GuestBuyer } from "../api/create-order"
import { activeCheckout } from "../stores/active-checkout"
import type { CheckoutItem } from "../types"

export function useGuestCheckout(eventId: string) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function checkout(buyer: GuestBuyer, items: CheckoutItem[]) {
    if (isProcessing || items.length === 0) return
    setIsProcessing(true)
    setError(null)
    try {
      const result = await createOrder(eventId, buyer, items)
      if (result.access_token) activeCheckout.set(result.access_token)

      if (result.authorization_url) {
        window.location.href = result.authorization_url
      } else if (result.access_token) {
        window.location.href = `/orders/${result.access_token}`
      } else {
        setError("Could not start checkout. Please try again.")
        setIsProcessing(false)
      }
    } catch (err) {
      setError(getErrorMessage(err))
      setIsProcessing(false)
    }
  }

  return { checkout, isProcessing, error }
}
