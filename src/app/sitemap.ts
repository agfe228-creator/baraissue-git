import { MetadataRoute } from "next";
import { regionToSlug, regions, SITE_URL } from "@/lib/constants";

export const runtime = "edge";

const staticRoutes = [
  "",
  "/festival",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/source-policy",
  "/policy",
  "/posts"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const regionRoutes = regions.map((region) => `/region/${regionToSlug(region)}`);
  const monthRoutes = Array.from({ length: 12 }, (_, index) => `/month/${index + 1}`);

  return [...staticRoutes, ...regionRoutes, ...monthRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/festival" ? 0.9 : 0.7
  }));
}
