import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ritznaturevilla.com";

  // Static routes
  const staticRoutes = [
    "",
    "/packages",
    "/pool-access",
    "/gallery",
    "/about",
    "/contact",
    "/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Policy routes
  const policies = ["privacy", "booking", "cancellation", "pool-rules", "terms"];
  const policyRoutes = policies.map((slug) => ({
    url: `${baseUrl}/policies/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...policyRoutes];
}
