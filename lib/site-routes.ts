/**
 * Static site-route manifest. Used by the sitemap + anywhere else that
 * needs to know the full public URL list.
 *
 * Update this whenever a new public page is added so the sitemap doesn't
 * drift out of sync.
 */

export type SiteRoute = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

export const siteRoutes: SiteRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/quote", changeFrequency: "yearly", priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];
