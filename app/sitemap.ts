import type { MetadataRoute } from "next";
import { listPublicEvents } from "@/features/marketing/api/list-events";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { SITE_URL } from "@/features/marketing/config/site";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, pages] = await Promise.all([
    listPublicEvents().catch(() => []),
    listPublicPages().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/organizers`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/download`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/events/${event.slug}`,
    lastModified: event.updated_at ? new Date(event.updated_at) : undefined,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}/pages/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...eventRoutes, ...pageRoutes];
}
