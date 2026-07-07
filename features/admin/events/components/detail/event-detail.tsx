"use client"

import { AuditTrail } from "@/components/admin/common/audit-trail"
import { DetailHeader } from "@/components/admin/common/detail-header"
import { DetailSection, Empty } from "@/components/admin/common/detail-section"
import { EntityRefItem } from "@/components/admin/common/entity-ref"
import { StatGrid } from "@/components/admin/common/stat-grid"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, formatDateTime, formatMoney } from "@/lib/format"
import { useEvent } from "../../hooks/detail/use-event"
import { EventActions } from "./event-actions"

export function EventDetail({ id }: { id: string }) {
  const { data: event, isLoading, isError } = useEvent(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }
  if (isError || !event) {
    return <Empty>This event could not be loaded.</Empty>
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={event.title}
        subtitle={event.organisation.label}
        badges={
          <>
            <Badge variant="secondary" className="capitalize">
              {event.status}
            </Badge>
            {event.comments_locked_at && (
              <Badge variant="outline">Comments locked</Badge>
            )}
            {event.starts_at && (
              <span className="text-sm text-muted-foreground">
                {formatDateTime(event.starts_at)}
              </span>
            )}
          </>
        }
        actions={<EventActions event={event} />}
      />

      <StatGrid
        stats={[
          { label: "Revenue", value: formatMoney(event.stats.revenue_minor) },
          {
            label: "Tickets sold",
            value: event.stats.tickets_sold.toLocaleString(),
          },
          { label: "Orders", value: event.stats.orders_count },
          { label: "RSVPs", value: event.stats.rsvps_count },
          { label: "Comments", value: event.stats.comments_count },
          { label: "Flagged", value: event.stats.flagged_comments },
          { label: "Reports", value: event.stats.reports_against },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Ticket types">
          {event.ticket_types.length ? (
            <ul className="space-y-2.5">
              {event.ticket_types.map((ticket) => (
                <li
                  key={ticket.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{ticket.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.sold_count}
                      {ticket.quantity ? ` / ${ticket.quantity}` : ""} sold ·{" "}
                      {ticket.status}
                    </p>
                  </div>
                  <span className="shrink-0 font-medium tabular-nums">
                    {formatMoney(ticket.gross_price)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No ticket types.</Empty>
          )}
        </DetailSection>

        <DetailSection title="Recent orders">
          {event.orders_recent.length ? (
            <div className="space-y-1">
              {event.orders_recent.map((order) => (
                <EntityRefItem
                  key={order.id}
                  entity={order.buyer}
                  sublabel={formatDate(order.created_at)}
                  trailing={
                    <span className="text-sm font-medium tabular-nums">
                      {formatMoney(order.total_minor)}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <Empty>No orders.</Empty>
          )}
        </DetailSection>
      </div>

      <DetailSection title="Admin activity">
        <AuditTrail entries={event.audit_trail} />
      </DetailSection>
    </div>
  )
}
