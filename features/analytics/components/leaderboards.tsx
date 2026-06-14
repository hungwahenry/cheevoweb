"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboards } from "../hooks/use-leaderboards";
import { LeaderboardCard } from "./leaderboard-card";
import { RevenueByCategory } from "./revenue-by-category";
import { TopCities } from "./top-cities";

export function Leaderboards({ days }: { days: number }) {
  const { data, isLoading } = useLeaderboards(days);

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-56" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <LeaderboardCard
        title="Top events"
        empty="No paid orders in this range."
        rows={data.top_events.map((event) => ({
          entity: event.event,
          sublabel: `${event.tickets.toLocaleString()} tickets · ${event.orders} orders`,
          value: event.gmv_minor,
        }))}
      />
      <LeaderboardCard
        title="Top organisers"
        empty="No paid orders in this range."
        rows={data.top_organisers.map((organiser) => ({
          entity: organiser.organisation,
          sublabel: `${organiser.events} events · ${organiser.orders} orders`,
          value: organiser.gmv_minor,
        }))}
      />
      <RevenueByCategory items={data.by_category} />
      <TopCities items={data.top_cities} />
    </div>
  );
}
