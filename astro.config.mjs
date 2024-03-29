import { defineConfig } from 'astro/config';

// https://astro.build/config
import compress from "astro-compress";
import partytown from "@astrojs/partytown";

import sitemap from "./sitemaps/sitemaps";

// https://astro.build/config
export default defineConfig({
  /*
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "scripts/app.js",
        },
      },
      minify: false,
    },
  },
  */
  integrations: [
    sitemap(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    compress({
      css: true,
      html: true,
      img: false,
      js: true,
      svg: false,
    })]
});
