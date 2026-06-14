import type { EntityRef } from "@/lib/api/types";

export interface AnalyticsOverview {
  users: {
    total: number;
    new_30d: number;
    suspended: number;
    organisers: number;
  };
  organisations: {
    total: number;
    suspended: number;
    with_payout_account: number;
  };
  events: { total: number; published: number; past: number };
  orders: { total: number; paid: number; refunded: number; pending: number };
  gmv: { currency: string; total_minor: number; last_30d_minor: number };
  action_items: {
    open_reports: number;
    pending_payouts: number;
    failed_payouts: number;
  };
}

export type AnalyticsInterval = "day" | "week" | "month";

export interface RevenuePoint {
  bucket: string;
  gmv_minor: number;
  orders: number;
}

export interface RevenueSeries {
  interval: AnalyticsInterval;
  currency: string;
  series: RevenuePoint[];
}

export interface ProviderStats {
  successful: number;
  failed: number;
  total: number;
  success_rate: number;
}

export interface PaymentsBreakdown {
  by_provider: Record<string, ProviderStats>;
  totals: ProviderStats;
}

export interface EngagementPoint {
  bucket: string;
  comments: number;
  rsvps: number;
  subscriptions: number;
}

export interface EngagementSeries {
  interval: string;
  series: EngagementPoint[];
}

export interface TopEvent {
  event: EntityRef;
  gmv_minor: number;
  orders: number;
  tickets: number;
}

export interface TopOrganiser {
  organisation: EntityRef;
  gmv_minor: number;
  orders: number;
  events: number;
}

export interface CategoryRevenue {
  category: { id: number | null; name: string };
  gmv_minor: number;
}

export interface CityRevenue {
  city: string;
  gmv_minor: number;
  orders: number;
}

export interface Leaderboards {
  currency: string;
  top_events: TopEvent[];
  top_organisers: TopOrganiser[];
  by_category: CategoryRevenue[];
  top_cities: CityRevenue[];
}
