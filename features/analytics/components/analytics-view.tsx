"use client";

import { useAnalyticsRange } from "../hooks/use-analytics-range";
import { EngagementChart } from "./engagement-chart";
import { OrdersChart } from "./orders-chart";
import { PaymentsBreakdown } from "./payments-breakdown";
import { RangeKpis } from "./range-kpis";
import { RangePicker } from "./range-picker";
import { RevenueChart } from "./revenue-chart";
import { StatusBreakdowns } from "./status-breakdowns";

export function AnalyticsView() {
  const [{ days, interval }] = useAnalyticsRange();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <RangePicker />
      </div>
      <RangeKpis interval={interval} days={days} />
      <RevenueChart interval={interval} days={days} />
      <div className="grid gap-4 lg:grid-cols-2">
        <OrdersChart interval={interval} days={days} />
        <PaymentsBreakdown days={days} />
      </div>
      <EngagementChart days={days} />
      <StatusBreakdowns />
    </div>
  );
}
