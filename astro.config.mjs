import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://incentitours.com.mx",
  trailingSlash: "never",
  integrations: [react(), sitemap()],
});
