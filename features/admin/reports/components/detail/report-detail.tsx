"use client"

import { AuditTrail } from "@/components/admin/common/audit-trail"
import { DetailHeader } from "@/components/admin/common/detail-header"
import { DetailSection, Empty } from "@/components/admin/common/detail-section"
import { EntityRefItem } from "@/components/admin/common/entity-ref"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDateTime } from "@/lib/format"
import { useReport } from "../../hooks/detail/use-report"
import { REPORT_STATUS_VARIANT } from "../reports-table"
import { ReportActions } from "./report-actions"

export function ReportDetail({ id }: { id: string }) {
  const { data: report, isLoading, isError } = useReport(id)

  if (isLoading) return <Skeleton className="h-40 w-full" />
  if (isError || !report) {
    return <Empty>This report could not be loaded.</Empty>
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={report.reason.label}
        subtitle={`Reported ${report.target_type.replace("_", " ")}`}
        badges={
          <Badge
            variant={REPORT_STATUS_VARIANT[report.status]}
            className="capitalize"
          >
            {report.status.replace("_", " ")}
          </Badge>
        }
        actions={<ReportActions report={report} />}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Report">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Reporter notes</p>
              <p>{report.details || "—"}</p>
            </div>
            {report.resolution_note && (
              <div>
                <p className="text-xs text-muted-foreground">Resolution</p>
                <p>{report.resolution_note}</p>
              </div>
            )}
            {report.reviewed_at && (
              <p className="text-xs text-muted-foreground">
                Reviewed {formatDateTime(report.reviewed_at)}
                {report.reviewed_by ? ` by ${report.reviewed_by.label}` : ""}
              </p>
            )}
          </div>
        </DetailSection>

        <DetailSection title="Parties">
          <div className="space-y-1">
            {report.target ? (
              <EntityRefItem entity={report.target} />
            ) : (
              <Empty>Target was removed.</Empty>
            )}
            <EntityRefItem entity={report.reporter} sublabel="Reporter" />
          </div>
        </DetailSection>
      </div>

      <DetailSection title="Admin activity">
        <AuditTrail entries={report.audit_trail} />
      </DetailSection>
    </div>
  )
}
