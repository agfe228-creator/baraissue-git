import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { guidePosts } from "@/lib/guidePosts";

export const runtime = "edge";

const staticRoutes = [
  "",
  "/festival",
  "/posts",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/source-policy",
  "/policy"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guideRoutes = guidePosts.map((post) => `/posts/${post.slug}`);

  return [...staticRoutes, ...guideRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : route.startsWith("/posts/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/festival" || route === "/posts" ? 0.9 : route.startsWith("/posts/") ? 0.85 : 0.7
  }));
}
