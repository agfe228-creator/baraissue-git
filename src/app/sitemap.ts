import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { isVerifiedEvent } from "@/lib/events";
import { getRuntimeEvents } from "@/lib/runtimeEvents";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const events = await getRuntimeEvents();
  const verifiedEvents = events.filter(isVerifiedEvent);
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms", ...(verifiedEvents.length ? ["/festival"] : [])];
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: now })),
    ...verifiedEvents
      .map((event) => ({ url: `${SITE_URL}/event/${event.slug}`, lastModified: new Date(event.updatedAt) }))
  ];
}