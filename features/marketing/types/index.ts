export type PublicPageSummary = {
  slug: string;
  title: string;
  updated_at: string | null;
};

export type PublicPage = {
  slug: string;
  title: string;
  body_html: string;
  meta_description: string | null;
  published_at: string | null;
  updated_at: string | null;
};

export type PublicTicket = {
  id: string;
  name: string;
  description: string | null;
  gross_price: number;
};

export type PublicFeature = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
};

export type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  flyer_url: string | null;
  flyer_type: "image" | "video" | null;
  starts_at: string | null;
  ends_at: string | null;
  timezone: string | null;
  venue_name: string | null;
  city: string | null;
  address: string | null;
  tickets_min_price: number | null;
  tickets_max_price: number | null;
  currency: string;
  status: string;
  organisation: {
    name: string | null;
    slug: string | null;
    logo_url: string | null;
  };
  tickets: PublicTicket[];
  features: PublicFeature[];
  images: { id: string; url: string }[];
};

export type Pricing = {
  flatMinor: number;
  percentageBps: number;
  holdWindowDays: number;
  tier1NairaCeiling: number;
  tier2NairaCeiling: number;
  tier1Minor: number;
  tier2Minor: number;
  tier3Minor: number;
};
