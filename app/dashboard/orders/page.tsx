import { PageHeader } from "@/components/layout/page-header";
import { OrdersTable } from "@/features/orders/components/orders-table";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Every ticket order on the platform." />
      <OrdersTable />
    </div>
  );
}
