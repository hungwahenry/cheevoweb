import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PayoutDetail } from "@/features/admin/payouts/components/detail/payout-detail"

export default async function PayoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/payouts">
          <ChevronLeft className="size-4" />
          Payouts
        </Link>
      </Button>
      <PayoutDetail id={id} />
    </div>
  )
}
