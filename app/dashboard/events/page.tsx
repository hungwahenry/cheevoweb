import { PageHeader } from "@/components/layout/page-header"
import { EventsTable } from "@/features/admin/events/components/events-table"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Every event across all organisations."
      />
      <EventsTable />
    </div>
  )
}
