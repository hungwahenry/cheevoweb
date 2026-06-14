import { PageHeader } from "@/components/layout/page-header";
import { PaymentsTable } from "@/features/payments/components/payments-table";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Provider payment records." />
      <PaymentsTable />
    </div>
  );
}
