import { PageHeader } from "@/components/admin/layout/page-header"
import { AuditLogTable } from "@/features/admin/audit-log/components/audit-log-table"

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit log"
        description="Every privileged admin action, immutably recorded."
      />
      <AuditLogTable />
    </div>
  )
}
