import type { MetadataRoute } from "next";

import { META_THEME_COLORS, SITE_INFO } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_INFO.name,
    short_name: SITE_INFO.shortName,
    description: SITE_INFO.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: META_THEME_COLORS.dark,
    theme_color: META_THEME_COLORS.dark,
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
