import { defineConfig } from 'astro/config';

// https://astro.build/config
import compress from "astro-compress";

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
  integrations: [compress({
    css: true,
		html: true,
		img: false,
		js: true,
		svg: false,
  })]
});
