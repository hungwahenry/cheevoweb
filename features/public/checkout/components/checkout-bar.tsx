import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatEventPrice } from "@/lib/format"

export function CheckoutBar({
  minPrice,
  maxPrice,
  currency,
  buyable,
  onOpen,
}: {
  minPrice: number | null
  maxPrice: number | null
  currency: string
  buyable: boolean
  onOpen: () => void
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">
            {buyable
              ? formatEventPrice(minPrice, maxPrice, currency)
              : "Free entry"}
          </p>
          <p className="text-xs text-foreground/55">
            {buyable ? "Lower fees in the app" : "RSVP in the cheevo app"}
          </p>
        </div>
        {buyable ? (
          <Button size="lg" onClick={onOpen}>
            Get tickets
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link href="/download">Get the app</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
