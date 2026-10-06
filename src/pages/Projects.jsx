import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import { projects, categories } from '../data/projects';
import PageHero from '../components/shared/PageHero';

function OpenArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const setCategory = (key) => {
    if (key === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', key);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <PageHero
      breadcrumbs={[
        { label: t('nav.home'), to: '/' },
        { label: t('projectsPage.breadcrumbCurrent') },
      ]}
      eyebrow={t('projectsPage.breadcrumbCurrent')}
      title={t('projectsPage.heroTitle')}
      subtitle={t('projectsPage.heroSubtitle')}
    />

      {/* قسم المشاريع والفلترة */}
      <section className="py-16 md:py-20">
        <Container>
          {/* Category filter pills */}
          <div className="mb-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === 'all' ? 'bg-primary-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t('projectsPage.filterAll')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.key ? 'bg-primary-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {t(`categories.${cat.key}`)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-neutral-500">{t('projectsPage.noResults')}</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-2xl border border-neutral-100 transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-900">
                      {t(`categories.${project.category}`)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-primary-900">{project.name}</h3>
                      <p className="mt-1 truncate text-sm text-neutral-500">{project.location}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-900 group-hover:text-white">
                      <OpenArrowIcon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}