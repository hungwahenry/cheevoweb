import { useEffect, useState } from "react"
import { getOrder } from "../api/get-order"
import { verifyOrder } from "../api/verify-order"
import { activeCheckout } from "../stores/active-checkout"
import type { OrderView } from "../types"

export type ReturnPhase = "confirming" | "paid" | "pending" | "error"

const MAX_POLLS = 8
const POLL_MS = 2000

/** Confirms the guest order after the provider redirect: verify once, then poll until fulfilled. */
export function usePaymentReturn() {
  const [phase, setPhase] = useState<ReturnPhase>("confirming")
  const [order, setOrder] = useState<OrderView | null>(null)
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    const fromUrl = new URLSearchParams(window.location.search).get("token")
    return fromUrl ?? activeCheckout.get()
  })

  useEffect(() => {
    if (!token) {
      setPhase("pending")
      return
    }
    let cancelled = false
    let polls = 0

    async function tick() {
      try {
        const result =
          polls === 0 ? await verifyOrder(token!) : await getOrder(token!)
        if (cancelled) return
        setOrder(result)

        if (result.status === "paid") {
          setPhase("paid")
          activeCheckout.clear()
          return
        }
        if (result.status === "cancelled" || result.status === "refunded") {
          setPhase("pending")
          return
        }
        polls += 1
        if (polls > MAX_POLLS) {
          setPhase("pending")
          return
        }
        setTimeout(tick, POLL_MS)
      } catch {
        if (!cancelled) setPhase("error")
      }
    }

    tick()
    return () => {
      cancelled = true
    }
  }, [token])

  return { phase, order, token }
}
