import { PageHeader } from "@/components/layout/page-header";
import { ReportsTable } from "@/features/admin/reports/components/reports-table";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="User reports awaiting moderation." />
      <ReportsTable />
    </div>
  );
}
