"use client"

import { AuditTrail } from "@/components/admin/common/audit-trail"
import { DetailHeader } from "@/components/admin/common/detail-header"
import { DetailSection, Empty } from "@/components/admin/common/detail-section"
import { EntityRefItem } from "@/components/admin/common/entity-ref"
import { StatGrid } from "@/components/admin/common/stat-grid"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMoney } from "@/lib/format"
import { useOrder } from "../../hooks/detail/use-order"
import { ORDER_STATUS_VARIANT } from "../orders-table"
import { OrderActions } from "./order-actions"

export function OrderDetail({ id }: { id: string }) {
  const { data: order, isLoading, isError } = useOrder(id)

  if (isLoading) {
    return <Skeleton className="h-40 w-full" />
  }
  if (isError || !order) {
    return <Empty>This order could not be loaded.</Empty>
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={`Order ${order.id.slice(-8).toUpperCase()}`}
        subtitle={order.buyer.label}
        badges={
          <Badge
            variant={ORDER_STATUS_VARIANT[order.status]}
            className="capitalize"
          >
            {order.status}
          </Badge>
        }
        actions={<OrderActions order={order} />}
      />

      <StatGrid
        stats={[
          { label: "Total", value: formatMoney(order.total_minor) },
          { label: "Subtotal", value: formatMoney(order.subtotal_minor) },
          { label: "Fees", value: formatMoney(order.fees_minor) },
          { label: "Tickets", value: order.items_count },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Connections">
          <div className="space-y-1">
            <EntityRefItem entity={order.buyer} />
            <EntityRefItem entity={order.event} />
            {order.payment && <EntityRefItem entity={order.payment} />}
          </div>
        </DetailSection>

        <DetailSection title="Line items">
          {order.items.length ? (
            <ul className="space-y-2 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>
                    {item.quantity}× {item.ticket_name}
                  </span>
                  <span className="tabular-nums">
                    {formatMoney(item.subtotal_minor)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No items.</Empty>
          )}
        </DetailSection>
      </div>

      <DetailSection title={`Issued tickets (${order.issued_tickets.length})`}>
        {order.issued_tickets.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {order.issued_tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <code className="text-xs text-muted-foreground">
                  {ticket.code.slice(-10)}
                </code>
                <Badge variant="outline" className="capitalize">
                  {ticket.status}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No tickets issued.</Empty>
        )}
      </DetailSection>

      <DetailSection title="Admin activity">
        <AuditTrail entries={order.audit_trail} />
      </DetailSection>
    </div>
  )
}
