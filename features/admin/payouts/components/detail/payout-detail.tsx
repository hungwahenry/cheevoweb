"use client"

import Link from "next/link"
import { DetailHeader } from "@/components/common/detail-header"
import { DetailSection, Empty } from "@/components/common/detail-section"
import { StatGrid } from "@/components/common/stat-grid"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDateTime, formatMoney } from "@/lib/format"
import { usePayout } from "../../hooks/detail/use-payout"
import { PAYOUT_STATUS_VARIANT } from "../payouts-table"
import { PayoutActions } from "./payout-actions"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value || "—"}</span>
    </div>
  )
}

export function PayoutDetail({ id }: { id: string }) {
  const { data: payout, isLoading, isError } = usePayout(id)

  if (isLoading) return <Skeleton className="h-40 w-full" />
  if (isError || !payout) {
    return <Empty>This payout could not be loaded.</Empty>
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={payout.organisation.name}
        subtitle={`Payout · ${formatMoney(payout.net_minor)} net`}
        badges={
          <Badge
            variant={PAYOUT_STATUS_VARIANT[payout.status]}
            className="capitalize"
          >
            {payout.status}
          </Badge>
        }
        actions={<PayoutActions payout={payout} />}
      />

      {payout.failed_reason && (
        <Card className="border-destructive/40">
          <CardContent className="text-sm">
            <span className="font-medium">Failed:</span> {payout.failed_reason}
          </CardContent>
        </Card>
      )}

      <StatGrid
        stats={[
          { label: "Amount", value: formatMoney(payout.amount_minor) },
          { label: "Fees", value: formatMoney(payout.fees_minor) },
          { label: "Net payout", value: formatMoney(payout.net_minor) },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Bank details">
          <div className="space-y-2">
            <Row label="Bank" value={payout.bank_name} />
            <Row label="Account name" value={payout.account_name} />
            <Row label="Account number" value={payout.account_number} />
            <Row label="Provider" value={payout.provider} />
            <Row label="Transfer method" value={payout.transfer_method} />
            <Row label="Provider ref" value={payout.provider_reference} />
          </div>
        </DetailSection>

        <DetailSection title="Review">
          <div className="space-y-2">
            <Row
              label="Organisation"
              value={
                <Link
                  href={`/dashboard/organisations/${payout.organisation.id}`}
                  className="hover:underline"
                >
                  {payout.organisation.name}
                </Link>
              }
            />
            <Row label="Requested by" value={payout.requested_by.email} />
            <Row label="Reviewed by" value={payout.reviewed_by?.email ?? "—"} />
            <Row
              label="Requested"
              value={formatDateTime(payout.requested_at)}
            />
            {payout.approved_at && (
              <Row
                label="Approved"
                value={formatDateTime(payout.approved_at)}
              />
            )}
            {payout.paid_at && (
              <Row label="Paid" value={formatDateTime(payout.paid_at)} />
            )}
            {payout.review_notes && (
              <Row label="Notes" value={payout.review_notes} />
            )}
          </div>
        </DetailSection>
      </div>
    </div>
  )
}
