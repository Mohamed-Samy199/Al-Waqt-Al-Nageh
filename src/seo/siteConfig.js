const runtimeSiteUrl = typeof process !== 'undefined' ? process.env.VITE_SITE_URL : '';
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || runtimeSiteUrl || '').replace(/\/$/, '');
export const SITE_NAME = 'Al Waqt Al Nageh Construction and Buildings';
export const DEFAULT_IMAGE = '/images/hero/hero-editorial.png';

const copy = {
  en: {
    home: {
      title: 'Al Waqt Al Nageh | Construction & Building Contractor',
      description: 'Al Waqt Al Nageh delivers construction and finishing works across Kuwait and Saudi Arabia, from reinforced concrete and formwork to complete structural packages.',
      keywords: 'construction company Kuwait, construction contractor Saudi Arabia, reinforced concrete, formwork, structural works, finishing works',
    },
    about: {
      title: 'About Al Waqt Al Nageh | Construction & Buildings',
      description: 'Learn about Al Waqt Al Nageh, a construction and finishing contractor built on disciplined execution, quality, safety, and on-time delivery.',
      keywords: 'about Al Waqt Al Nageh, construction company profile, building contractor Kuwait Saudi Arabia',
    },
    projects: {
      title: 'Construction Projects | Al Waqt Al Nageh',
      description: 'Explore Al Waqt Al Nageh project experience across towers, governmental facilities, commercial developments, hospitals, coastal projects, and airports.',
      keywords: 'construction projects, high-rise construction, Kuwait construction projects, commercial construction, hospital construction',
    },
    services: {
      title: 'Construction Services | Al Waqt Al Nageh',
      description: 'Explore reinforced concrete, formwork, rebar, mass concrete pours, excavation, shoring, dewatering, and finishing services from Al Waqt Al Nageh.',
      keywords: 'reinforced concrete contractor, formwork and scaffolding, rebar fixing, mass concrete pours, excavation and dewatering, finishing contractor',
    },
    careers: {
      title: 'Careers at Al Waqt Al Nageh | Construction & Buildings',
      description: 'Join the team at Al Waqt Al Nageh, a construction and finishing contractor delivering projects across Kuwait and Saudi Arabia.',
      keywords: 'construction careers, construction jobs Kuwait, construction jobs Saudi Arabia, construction company careers',
    },
    contact: {
      title: 'Contact Al Waqt Al Nageh | Construction Contractor',
      description: 'Contact Al Waqt Al Nageh for construction, structural, finishing, and specialist work packages in Kuwait and Saudi Arabia.',
      keywords: 'contact construction contractor, construction company Kuwait contact, construction company Saudi Arabia contact',
    },
    notFound: {
      title: 'Page Not Found | Al Waqt Al Nageh',
      description: 'The requested page could not be found.',
      keywords: 'Al Waqt Al Nageh',
    },
  },
  ar: {
    home: {
      title: 'شركة الوقت الناجح للتشييد والمباني | مقاولات وإنشاءات',
      description: 'شركة الوقت الناجح تقدم أعمال الإنشاءات والتشطيبات في الكويت والمملكة العربية السعودية، من الخرسانة المسلحة والشدات حتى الحزم الإنشائية المتكاملة.',
      keywords: 'شركة مقاولات الكويت, شركة إنشاءات السعودية, خرسانة مسلحة, شدات وسقالات, أعمال إنشائية, تشطيبات',
    },
    about: {
      title: 'عن شركة الوقت الناجح | التشييد والمباني',
      description: 'تعرف على شركة الوقت الناجح للمقاولات والإنشاءات، وخبرتها في التنفيذ المنضبط والجودة والسلامة والالتزام بمواعيد التسليم.',
      keywords: 'عن شركة الوقت الناجح, شركة مقاولات, شركة إنشاءات الكويت والسعودية',
    },
    projects: {
      title: 'مشاريع الإنشاءات | شركة الوقت الناجح',
      description: 'استكشف خبرة شركة الوقت الناجح في الأبراج والمنشآت الحكومية والمشاريع التجارية والمستشفيات والمشاريع الساحلية والمطارات.',
      keywords: 'مشاريع إنشائية, إنشاء أبراج, مقاولات تجارية, إنشاء مستشفيات, مشاريع بنية تحتية',
    },
    services: {
      title: 'خدمات الإنشاءات والمقاولات | شركة الوقت الناجح',
      description: 'تعرف على خدمات الخرسانة المسلحة والشدات والتسليح والصبات الكبيرة والحفر والتدعيم وخفض المياه وأعمال التشطيبات.',
      keywords: 'مقاول خرسانة مسلحة, شدات وسقالات, تثبيت حديد التسليح, صبات خرسانة, حفر وتدعيم, مقاول تشطيبات',
    },
    careers: {
      title: 'وظائف شركة الوقت الناجح | التشييد والمباني',
      description: 'انضم إلى فريق شركة الوقت الناجح للمقاولات والإنشاءات، والتي تنفذ المشاريع في الكويت والمملكة العربية السعودية.',
      keywords: 'وظائف المقاولات, وظائف الإنشاءات الكويت, وظائف الإنشاءات السعودية, وظائف شركات المقاولات',
    },
    contact: {
      title: 'تواصل مع شركة الوقت الناجح | مقاولات وإنشاءات',
      description: 'تواصل مع شركة الوقت الناجح لتنفيذ الأعمال الإنشائية والهيكلية والتشطيبات وحزم الأعمال المتخصصة في الكويت والسعودية.',
      keywords: 'تواصل مع شركة مقاولات, شركة إنشاءات الكويت, شركة مقاولات السعودية',
    },
    notFound: {
      title: 'الصفحة غير موجودة | شركة الوقت الناجح',
      description: 'الصفحة المطلوبة غير موجودة.',
      keywords: 'شركة الوقت الناجح',
    },
  },
};

export function getPageSeo(pathname, language, project) {
  const lang = language === 'ar' ? 'ar' : 'en';
  const dictionary = copy[lang];
  if (project) {
    return {
      title: `${project.name} | Construction Project | Al Waqt Al Nageh`,
      description: `${project.name} in ${project.location}. ${project.description}`,
      keywords: `${project.name}, ${project.location}, construction project, Al Waqt Al Nageh`,
      image: project.image,
      type: 'article',
      section: 'projects',
    };
  }
  if (pathname === '/') return { ...dictionary.home, type: 'website', section: 'home' };
  if (pathname === '/about') return { ...dictionary.about, type: 'website', section: 'about' };
  if (pathname === '/projects') return { ...dictionary.projects, type: 'website', section: 'projects' };
  if (pathname === '/services') return { ...dictionary.services, type: 'website', section: 'services' };
  if (pathname === '/careers') return { ...dictionary.careers, type: 'website', section: 'careers' };
  if (pathname === '/contact') return { ...dictionary.contact, type: 'website', section: 'contact' };
  return { ...dictionary.notFound, type: 'website', section: 'not-found', noindex: true };
}

export function absoluteUrl(path = '/') {
  if (!SITE_URL) return undefined;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
