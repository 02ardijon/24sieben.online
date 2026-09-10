import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://24sieben.online";

  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/impressum`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
