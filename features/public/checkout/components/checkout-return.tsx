"use client"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePaymentReturn } from "../hooks/use-payment-return"

export function CheckoutReturn() {
  const { phase, token } = usePaymentReturn()
  const router = useRouter()

  useEffect(() => {
    if (phase === "paid" && token) router.replace(`/orders/${token}`)
  }, [phase, token, router])

  const ticketsLink = token ? (
    <Link
      href={`/orders/${token}`}
      className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
    >
      View your tickets
    </Link>
  ) : null

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center px-6 text-center">
      {phase === "confirming" || phase === "paid" ? (
        <>
          <Loader2 className="size-8 animate-spin text-primary" />
          <h1 className="mt-6 text-2xl font-black tracking-tight">
            Confirming your payment…
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Hang tight — this only takes a moment.
          </p>
        </>
      ) : phase === "pending" ? (
        <>
          <h1 className="text-2xl font-black tracking-tight">Almost there</h1>
          <p className="mt-2 text-sm text-foreground/60">
            We&apos;re still confirming your payment. Your ticket will arrive by
            email shortly.
          </p>
          {ticketsLink}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-black tracking-tight">
            We couldn&apos;t confirm your payment
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            If you were charged, your ticket will arrive by email — no need to
            pay again.
          </p>
          {ticketsLink}
        </>
      )}
    </div>
  )
}
