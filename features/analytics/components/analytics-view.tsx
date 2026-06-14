"use client";

import { useAnalyticsRange } from "../hooks/use-analytics-range";
import { EngagementChart } from "./engagement-chart";
import { PaymentsBreakdown } from "./payments-breakdown";
import { RangePicker } from "./range-picker";
import { RevenueChart } from "./revenue-chart";

export function AnalyticsView() {
  const [{ days, interval }] = useAnalyticsRange();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <RangePicker />
      </div>
      <RevenueChart interval={interval} days={days} />
      <div className="grid gap-4 lg:grid-cols-2">
        <PaymentsBreakdown days={days} />
        <EngagementChart days={days} />
      </div>
    </div>
  );
}
