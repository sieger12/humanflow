import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://www.rewritekit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => [
    { url: `${baseUrl}/${locale}`,               lastModified: new Date(), changeFrequency: "daily" as const,   priority: 1.0 },
    { url: `${baseUrl}/${locale}/about`,          lastModified: new Date(), changeFrequency: "yearly" as const,  priority: 0.5 },
    { url: `${baseUrl}/${locale}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const,  priority: 0.3 },
    { url: `${baseUrl}/${locale}/terms`,          lastModified: new Date(), changeFrequency: "yearly" as const,  priority: 0.3 },
    { url: `${baseUrl}/${locale}/contact`,        lastModified: new Date(), changeFrequency: "yearly" as const,  priority: 0.4 },
  ]);
}
