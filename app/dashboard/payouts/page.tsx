import { PageHeader } from "@/components/layout/page-header";
import { PayoutsTable } from "@/features/admin/payouts/components/payouts-table";

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payouts" description="Organiser payout requests and settlements." />
      <PayoutsTable />
    </div>
  );
}
