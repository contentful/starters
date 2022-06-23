import { writeFileSync } from "node:fs";
import prettier from "prettier";

const deploymentUrl =
  process.env.PRODUCTION_URL || process.env.VERCEL_URL || "YOUR_WEBSITE_DOMAIN";
const deploymentUrlWithProtocol = `https://${deploymentUrl}`;

async function generateSitemap() {
  // a list of static pages
  // for now we only have `index.tsx`, so the url is an empty string
  const staticSlugs = [""];

  const fullUrls = [...staticSlugs].map((staticPagePath) => {
    return `${deploymentUrlWithProtocol}/${staticPagePath}`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${fullUrls
      .map((url) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>
`;

  const formatted = prettier.format(sitemap, {
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

async function generateRobots() {
  // eslint-disable-next-line no-sync
  writeFileSync(
    "public/robots.txt",
    `# *
User-agent: *
Allow: /

# Host
Host: ${deploymentUrlWithProtocol}

# Sitemaps
Sitemap: ${deploymentUrlWithProtocol}/sitemap.xml
`
  );
}

async function run() {
  await generateSitemap();
  await generateRobots();
}

run();
