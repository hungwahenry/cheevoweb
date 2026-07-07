import { useEffect, useState } from "react"
import { getErrorMessage } from "@/lib/api/errors"
import { quoteOrder } from "../api/quote-order"
import type { CheckoutItem, Quote } from "../types"

const DEBOUNCE_MS = 350

/** Re-quotes (debounced) whenever the selection changes; the backend is the source of truth for fees. */
export function useGuestQuote(eventId: string, items: CheckoutItem[]) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const key = JSON.stringify(items)

  useEffect(() => {
    if (items.length === 0) {
      setQuote(null)
      setError(null)
      return
    }
    let cancelled = false
    setIsLoading(true)
    setError(null)
    const timer = setTimeout(async () => {
      try {
        const result = await quoteOrder(eventId, items)
        if (!cancelled) setQuote(result)
      } catch (err) {
        if (!cancelled) {
          setQuote(null)
          setError(getErrorMessage(err))
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, DEBOUNCE_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [eventId, key])

  return { quote, isLoading, error }
}
