import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const events = await getRuntimeEvents();
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms", "/festival"];
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: now })),
    ...events
      .filter((event) => event.slug.startsWith("tourapi-"))
      .map((event) => ({ url: `${SITE_URL}/event/${event.slug}`, lastModified: new Date(event.updatedAt) }))
  ];
}
