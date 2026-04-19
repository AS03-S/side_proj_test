import type { MetadataRoute } from "next";

const BASE_URL = "https://migradocs.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/dashboard/", "/documents/", "/settings/", "/guidance/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
