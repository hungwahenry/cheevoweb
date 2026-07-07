import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderDetail } from "@/features/admin/orders/components/detail/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/orders">
          <ChevronLeft className="size-4" />
          Orders
        </Link>
      </Button>
      <OrderDetail id={id} />
    </div>
  );
}
