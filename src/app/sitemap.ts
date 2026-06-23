import { MetadataRoute } from "next";
import { categories, regions, regionToSlug, SITE_URL } from "@/lib/constants";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const events = await getRuntimeEvents();
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms", "/favorites", "/search"];
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: now })),
    ...categories.map((category) => ({ url: `${SITE_URL}${category.href}`, lastModified: now })),
    ...regions.map((region) => ({ url: `${SITE_URL}/region/${regionToSlug(region)}`, lastModified: now })),
    ...Array.from({ length: 12 }, (_, index) => ({ url: `${SITE_URL}/month/${index + 1}`, lastModified: now })),
    ...events
      .filter((event) => event.slug.startsWith("tourapi-"))
      .map((event) => ({ url: `${SITE_URL}/event/${event.slug}`, lastModified: new Date(event.updatedAt) }))
  ];
}
