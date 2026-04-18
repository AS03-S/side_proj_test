import type { MetadataRoute } from "next";

const BASE_URL = "https://migradocs.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/documents/", "/settings/", "/guidance/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
