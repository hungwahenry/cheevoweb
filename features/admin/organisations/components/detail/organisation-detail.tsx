"use client"

import { AuditTrail } from "@/components/admin/common/audit-trail"
import { DetailHeader } from "@/components/admin/common/detail-header"
import { DetailSection, Empty } from "@/components/admin/common/detail-section"
import { EntityRefItem } from "@/components/admin/common/entity-ref"
import { StatGrid } from "@/components/admin/common/stat-grid"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, formatMoney } from "@/lib/format"
import { useOrganisation } from "../../hooks/detail/use-organisation"
import { OrganisationActions } from "./organisation-actions"

export function OrganisationDetail({ id }: { id: string }) {
  const { data: org, isLoading, isError } = useOrganisation(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }
  if (isError || !org) {
    return <Empty>This organisation could not be loaded.</Empty>
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={org.name}
        subtitle={org.slug}
        square
        badges={
          <>
            {org.category && <Badge variant="secondary">{org.category}</Badge>}
            {org.suspended_at ? (
              <Badge variant="destructive">Suspended</Badge>
            ) : (
              <Badge variant="outline">Active</Badge>
            )}
          </>
        }
        actions={<OrganisationActions org={org} />}
      />

      {org.suspended_at && org.suspended_reason && (
        <Card className="border-destructive/40">
          <CardContent className="text-sm">
            <span className="font-medium">Suspended:</span>{" "}
            {org.suspended_reason}
          </CardContent>
        </Card>
      )}

      <StatGrid
        stats={[
          {
            label: "Revenue",
            value: formatMoney(org.stats.total_revenue_minor),
          },
          {
            label: "Tickets sold",
            value: org.stats.tickets_sold.toLocaleString(),
          },
          { label: "Events", value: org.stats.events_count },
          { label: "Members", value: org.stats.members_count },
          {
            label: "Subscribers",
            value: org.stats.subscribers_count.toLocaleString(),
          },
          { label: "Paid out", value: formatMoney(org.stats.paid_out_minor) },
          { label: "Reports against", value: org.stats.reports_against },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Members">
          {org.members.length ? (
            <div className="space-y-1">
              {org.members.map((member) => (
                <EntityRefItem
                  key={member.id}
                  entity={member}
                  trailing={<Badge variant="secondary">{member.role}</Badge>}
                />
              ))}
            </div>
          ) : (
            <Empty>No members.</Empty>
          )}
        </DetailSection>

        <DetailSection title="Recent events">
          {org.events_recent.length ? (
            <div className="space-y-1">
              {org.events_recent.map((event) => (
                <EntityRefItem key={event.id} entity={event} />
              ))}
            </div>
          ) : (
            <Empty>No events.</Empty>
          )}
        </DetailSection>

        <DetailSection title="Recent payouts">
          {org.payouts_recent.length ? (
            <div className="space-y-1">
              {org.payouts_recent.map((payout) => (
                <EntityRefItem
                  key={payout.id}
                  entity={payout}
                  sublabel={formatDate(payout.requested_at)}
                  trailing={
                    <span className="text-sm font-medium tabular-nums">
                      {formatMoney(payout.amount_minor)}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <Empty>No payouts.</Empty>
          )}
        </DetailSection>

        <DetailSection title="Recent broadcasts">
          {org.broadcasts_recent.length ? (
            <div className="space-y-1">
              {org.broadcasts_recent.map((broadcast) => (
                <EntityRefItem
                  key={broadcast.id}
                  entity={broadcast}
                  sublabel={`${broadcast.sent_count} sent · ${formatDate(broadcast.created_at)}`}
                />
              ))}
            </div>
          ) : (
            <Empty>No broadcasts.</Empty>
          )}
        </DetailSection>
      </div>

      <DetailSection title="Admin activity">
        <AuditTrail entries={org.audit_trail} />
      </DetailSection>
    </div>
  )
}
