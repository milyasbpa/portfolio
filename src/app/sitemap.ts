import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ilyasbashirah.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://ilyasbashirah.com/docs/Resume_CV_Ilyas_Bashirah_v1.pdf",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
