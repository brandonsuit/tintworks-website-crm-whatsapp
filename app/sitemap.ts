import type { MetadataRoute } from "next";

import { publicEnv } from "@/lib/env";
import { siteRoutes } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();
  return siteRoutes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
