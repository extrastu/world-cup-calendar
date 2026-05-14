import { MetadataRoute } from "next";
import { matches } from "@/lib/matches-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://worldcup2026.vercel.app";

  // 主页
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/data`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 所有比赛详情页
  const matchPages: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${baseUrl}/match/${match.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...mainPages, ...matchPages];
}
