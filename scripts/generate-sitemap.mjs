import { mkdir, writeFile } from 'node:fs/promises';

const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '');
const output = 'public/sitemap.xml';

if (!siteUrl) {
  console.warn('[SEO] VITE_SITE_URL is not configured; sitemap.xml was not generated.');
  process.exit(0);
}

const projectSlugs = [
  'kuwait-airways-hq',
  'kuwait-national-guard',
  'burgan-bank-hq',
  'dhow-tower',
  'arraya-office-tower',
  'nbk-headquarters',
  'assima-tower',
  'arraya-center-marriott',
  'marina-mall',
  'avenues-khobar',
  'eye-center-hospital',
  'ent-mtc-hospital',
  'nbk-children-hospital',
  'salmiya-waterfront',
  'new-airport-hangar',
];

const routes = ['/', '/about', '/services', '/projects', '/contact', ...projectSlugs.map((slug) => `/projects/${slug}`)];
const urls = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await mkdir('public', { recursive: true });
await writeFile(output, xml);
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`[SEO] Generated ${output} with ${routes.length} URLs.`);
