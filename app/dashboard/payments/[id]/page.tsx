import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PaymentDetail } from "@/features/admin/payments/components/detail/payment-detail"

export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/payments">
          <ChevronLeft className="size-4" />
          Payments
        </Link>
      </Button>
      <PaymentDetail id={id} />
    </div>
  )
}
