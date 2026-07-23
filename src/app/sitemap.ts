import { MetadataRoute } from "next";
import { regionToSlug, regions, SITE_URL } from "@/lib/constants";
import { guidePosts } from "@/lib/guidePosts";

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
  const guideRoutes = guidePosts.map((post) => `/posts/${post.slug}`);

  return [...staticRoutes, ...guideRoutes, ...regionRoutes, ...monthRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : route.startsWith("/posts/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/festival" || route === "/posts" ? 0.9 : route.startsWith("/posts/") ? 0.85 : 0.7
  }));
}
