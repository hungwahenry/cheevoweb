"use client";

import { AuditTrail } from "@/components/common/audit-trail";
import { DetailHeader } from "@/components/common/detail-header";
import { DetailSection, Empty } from "@/components/common/detail-section";
import { EntityRefItem } from "@/components/common/entity-ref";
import { StatGrid } from "@/components/common/stat-grid";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime, formatMoney } from "@/lib/format";
import { usePayment } from "../../hooks/detail/use-payment";
import { PAYMENT_STATUS_VARIANT } from "../payments-table";
import { PaymentActions } from "./payment-actions";

function Json({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <Empty>None.</Empty>;
  return (
    <pre className="bg-muted text-muted-foreground max-h-64 overflow-auto rounded-md p-3 text-xs">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export function PaymentDetail({ id }: { id: string }) {
  const { data: payment, isLoading, isError } = usePayment(id);

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (isError || !payment) {
    return <Empty>This payment could not be loaded.</Empty>;
  }

  return (
    <div className="space-y-6">
      <DetailHeader
        title={payment.reference}
        subtitle={payment.user.label}
        badges={
          <>
            <Badge variant="secondary" className="capitalize">
              {payment.provider}
            </Badge>
            <Badge
              variant={PAYMENT_STATUS_VARIANT[payment.status]}
              className="capitalize"
            >
              {payment.status}
            </Badge>
          </>
        }
        actions={<PaymentActions payment={payment} />}
      />

      <StatGrid
        stats={[
          { label: "Amount", value: formatMoney(payment.amount_minor) },
          {
            label: "Authorized",
            value: payment.authorized_at
              ? formatDateTime(payment.authorized_at)
              : "—",
          },
          {
            label: "Provider ref",
            value: (
              <span className="text-sm">{payment.provider_reference ?? "—"}</span>
            ),
          },
        ]}
      />

      <DetailSection title="Connections">
        <div className="space-y-1">
          <EntityRefItem entity={payment.user} />
          {payment.order && <EntityRefItem entity={payment.order} />}
          {payment.event && <EntityRefItem entity={payment.event} />}
        </div>
      </DetailSection>

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSection title="Provider response">
          <Json value={payment.provider_response} />
        </DetailSection>
        <DetailSection title="Metadata">
          <Json value={payment.metadata} />
        </DetailSection>
      </div>

      <DetailSection title="Admin activity">
        <AuditTrail entries={payment.audit_trail} />
      </DetailSection>
    </div>
  );
}
