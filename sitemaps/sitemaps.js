import { AstroIntegration } from "astro";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";

export default function sitemap() {
  return {
    name: "examples.com/sitemap",
    hooks: {
      "astro:build:done": async ({ dir, pages }) => {
        const hostname = "https://examples.com/";
        const sms = new SitemapStream({
          hostname,
        });
        const excludeSlugs = ["404"];
        const destinationDir = fileURLToPath(dir);
        const outputFileName = "sitemap.xml";

        pages.forEach(({ pathname }) => {
          const slug = pathname.slice(0, -1);
          if (!excludeSlugs.includes(slug)) {
            sms.write(hostname + pathname);
          }
        });
        sms.end();
        sms.pipe(createWriteStream(destinationDir + outputFileName));

        console.log(`%s${outputFileName} is generated!\n`, "\x1b[32m");
      },
    },
  };
}
