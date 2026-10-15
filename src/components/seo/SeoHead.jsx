import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../../data/projects';
import { absoluteUrl, DEFAULT_IMAGE, SITE_NAME, SITE_URL, getPageSeo } from '../../seo/siteConfig';

function setMeta(attribute, value, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel, href) {
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function setJsonLd(data) {
  let element = document.head.querySelector('#seo-json-ld');
  if (!element) {
    element = document.createElement('script');
    element.id = 'seo-json-ld';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function getBreadcrumbs(pathname, project, language) {
  const home = language === 'ar' ? 'الرئيسية' : 'Home';
  const projectsLabel = language === 'ar' ? 'المشاريع' : 'Projects';
  const projectLabel = project?.name || '';
  const items = [{ name: home, path: '/' }];
  if (pathname.startsWith('/projects')) items.push({ name: projectsLabel, path: '/projects' });
  if (project) items.push({ name: projectLabel, path: pathname });
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  }));
}

export default function SeoHead() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language === 'ar' ? 'ar' : 'en';
    const project = pathname.startsWith('/projects/')
      ? projects.find((item) => item.slug === decodeURIComponent(pathname.split('/').pop() || ''))
      : undefined;
    const seo = getPageSeo(pathname, language, project);
    const canonical = absoluteUrl(pathname);
    const imagePath = seo.image || DEFAULT_IMAGE;
    const image = absoluteUrl(imagePath);

    document.title = seo.title;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords);
    setMeta('name', 'author', SITE_NAME);
    setMeta('name', 'robots', seo.noindex ? 'noindex,follow' : 'index,follow');
    setMeta('name', 'theme-color', '#010C4F');
    setMeta('property', 'og:type', seo.type);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', language === 'ar' ? 'ar_EG' : 'en_US');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', seo.title);
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', seo.title);
    setLink('canonical', canonical);

    const organization = {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      url: SITE_URL || undefined,
      logo: absoluteUrl('/images/logo/logo.png'),
      description: language === 'ar' ? 'شركة مقاولات وإنشاءات وتشطيبات في الكويت والمملكة العربية السعودية.' : 'Construction and finishing contractor operating in Kuwait and Saudi Arabia.',
      telephone: ['+966567743453', '+201220102014'],
      slogan: 'We build with time, not just concrete',
    };
    const website = {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      url: SITE_URL || undefined,
      publisher: { '@id': absoluteUrl('/#organization') },
      inLanguage: language,
    };
    const graph = [organization, website, {
      '@type': 'BreadcrumbList',
      itemListElement: getBreadcrumbs(pathname, project, language),
    }];

    if (pathname === '/') {
      graph.push({
        '@type': 'LocalBusiness',
        '@id': absoluteUrl('/#business'),
        name: SITE_NAME,
        url: SITE_URL || undefined,
        image,
        telephone: '+966567743453',
        priceRange: '$$',
        areaServed: ['Kuwait', 'Saudi Arabia'],
        parentOrganization: { '@id': absoluteUrl('/#organization') },
      });
    }
    if (pathname === '/services') {
      graph.push({
        '@type': 'Service',
        serviceType: 'Construction and structural works',
        provider: { '@id': absoluteUrl('/#organization') },
        areaServed: ['Kuwait', 'Saudi Arabia'],
        description: seo.description,
        url: canonical,
      });
    }
    if (pathname === '/projects') {
      graph.push({
        '@type': 'CollectionPage',
        name: seo.title,
        url: canonical,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projects.length,
          itemListElement: projects.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/projects/${item.slug}`),
            name: item.name,
          })),
        },
      });
    }
    if (project) {
      graph.push({
        '@type': 'CreativeWork',
        name: project.name,
        url: canonical,
        image: project.gallery?.map((item) => absoluteUrl(item)).filter(Boolean),
        description: project.description,
        locationCreated: project.location,
        temporalCoverage: project.year,
        creator: { '@id': absoluteUrl('/#organization') },
      });
    }
    setJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  }, [i18n.language, pathname]);

  return null;
}
