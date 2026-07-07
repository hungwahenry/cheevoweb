import { PageHeader } from "@/components/admin/layout/page-header"
import { CommentsTable } from "@/features/admin/comments/components/comments-table"

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Comments"
        description="Moderate event comments and flags."
      />
      <CommentsTable />
    </div>
  )
}
