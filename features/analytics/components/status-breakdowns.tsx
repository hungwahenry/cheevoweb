"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOverview } from "../hooks/use-overview";
import { BreakdownDonut } from "./breakdown-donut";

export function StatusBreakdowns() {
  const { data, isLoading } = useOverview();

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <BreakdownDonut
        title="Orders by status"
        slices={[
          {
            key: "paid",
            label: "Paid",
            value: data.orders.paid,
            color: "var(--chart-1)",
          },
          {
            key: "pending",
            label: "Pending",
            value: data.orders.pending,
            color: "var(--chart-3)",
          },
          {
            key: "refunded",
            label: "Refunded",
            value: data.orders.refunded,
            color: "var(--chart-4)",
          },
        ]}
      />
      <BreakdownDonut
        title="Events by status"
        slices={[
          {
            key: "published",
            label: "Published",
            value: data.events.published,
            color: "var(--chart-1)",
          },
          {
            key: "past",
            label: "Past",
            value: data.events.past,
            color: "var(--chart-2)",
          },
        ]}
      />
    </div>
  );
}
