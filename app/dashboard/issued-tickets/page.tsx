import { PageHeader } from "@/components/layout/page-header";
import { IssuedTicketsTable } from "@/features/issued-tickets/components/issued-tickets-table";

export default function IssuedTicketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tickets" description="Every issued ticket across all events." />
      <IssuedTicketsTable />
    </div>
  );
}
