import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getPageSeo, SITE_URL, absoluteUrl, DEFAULT_IMAGE } from '../src/seo/siteConfig.js';
import { projects } from '../src/data/projects.js';

const template = await readFile('dist/index.html', 'utf8');
const routes = ['/', '/about', '/services', '/projects', '/contact', ...projects.map((project) => `/projects/${project.slug}`)];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function metaTag(attribute, name, content) {
  if (!content) return '';
  return `<meta ${attribute}="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
}

function routeBody(pathname, seo) {
  const heading = escapeHtml(seo.title.split(' | ')[0]);
  return `<main><h1>${heading}</h1><p>${escapeHtml(seo.description)}</p><nav><a href="/">Home</a> <a href="/services">Services</a> <a href="/projects">Projects</a> <a href="/contact">Contact</a></nav></main>`;
}

for (const pathname of routes) {
  const project = pathname.startsWith('/projects/')
    ? projects.find((item) => item.slug === pathname.split('/').pop())
    : undefined;
  const seo = getPageSeo(pathname, 'en', project);
  const canonical = absoluteUrl(pathname);
  const image = absoluteUrl(seo.image || DEFAULT_IMAGE);
  let html = template
    .replace(/<html lang="[^"]+"[^>]*>/, '<html lang="en" dir="ltr">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, metaTag('name', 'description', seo.description))
    .replace(/<meta name="keywords" content="[^"]*" \/>/, metaTag('name', 'keywords', seo.keywords));

  const socialTags = [
    metaTag('property', 'og:type', seo.type),
    metaTag('property', 'og:title', seo.title),
    metaTag('property', 'og:description', seo.description),
    metaTag('property', 'og:site_name', 'Al Waqt Al Nageh Construction and Buildings'),
    canonical ? metaTag('property', 'og:url', canonical) : '',
    image ? metaTag('property', 'og:image', image) : '',
    metaTag('name', 'twitter:card', image ? 'summary_large_image' : 'summary'),
    metaTag('name', 'twitter:title', seo.title),
    metaTag('name', 'twitter:description', seo.description),
    image ? metaTag('name', 'twitter:image', image) : '',
    canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}" />` : '',
  ].join('\n    ');
  html = html.replace('</head>', `    ${socialTags}\n  </head>`);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${routeBody(pathname, seo)}</noscript>`);

  const outputDir = pathname === '/' ? 'dist' : `dist${pathname}`;
  await mkdir(outputDir, { recursive: true });
  await writeFile(`${outputDir}/index.html`, html);
}

console.log(`[SEO] Prerendered ${routes.length} public routes${SITE_URL ? ` for ${SITE_URL}` : ''}.`);
