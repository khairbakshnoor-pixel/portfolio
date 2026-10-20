import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: portfolio.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
