import { PageHeader } from "@/components/admin/layout/page-header"
import { OrganisationsTable } from "@/features/admin/organisations/components/organisations-table"

export default function OrganisationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organisations"
        description="Every organisation on the platform."
      />
      <OrganisationsTable />
    </div>
  )
}
