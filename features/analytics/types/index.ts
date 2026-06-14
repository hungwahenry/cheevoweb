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
