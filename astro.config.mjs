import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import {
  DESTINATION_SITEMAP,
  PACKAGE_SITEMAP,
} from "./src/lib/sitemapMeta.ts";
import { SITE_URL } from "./src/site.ts";

const sitemapImages = {};

for (const destination of DESTINATION_SITEMAP) {
  sitemapImages[`/destinos/${destination.slug}`] = [
    {
      url: `${SITE_URL}/og/destinos/${destination.slug}.jpg`,
      title: destination.title,
      caption: destination.caption,
    },
  ];
}

for (const pkg of PACKAGE_SITEMAP) {
  sitemapImages[`/paquetes/${pkg.slug}`] = [
    {
      url: `${SITE_URL}/og/paquetes/${pkg.slug}.jpg`,
      title: pkg.title,
      caption: pkg.caption,
    },
  ];
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  integrations: [
    react(),
    sitemap({
      namespaces: {
        news: false,
        xhtml: true,
        image: true,
        video: false,
      },
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, "") || "/";
        const images = sitemapImages[pathname];
        if (images) {
          // sitemap package expects `img`, not `images`
          item.img = images;
        }
        return item;
      },
    }),
  ],
});
