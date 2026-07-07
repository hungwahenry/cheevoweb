import type { Metadata } from "next"
import { CheckoutReturn } from "@/features/public/checkout/components/checkout-return"

export const metadata: Metadata = {
  title: "Confirming payment — Cheevo",
  robots: { index: false, follow: false },
}

export default function CheckoutReturnPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <CheckoutReturn />
    </main>
  )
}
