import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getGuestOrder } from "@/features/public/tickets/api/get-order"
import { OrderTickets } from "@/features/public/tickets/components/order-tickets"
import { SiteHeader } from "@/features/public/shell/components/site-header"

export const metadata: Metadata = {
  title: "Your tickets — cheevo",
  robots: { index: false, follow: false },
}

export default async function OrderTicketsPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const order = await getGuestOrder(token).catch(() => null)
  if (!order) notFound()

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <OrderTickets order={order} />
      </div>
    </main>
  )
}
