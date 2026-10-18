import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import PageHero from '../components/shared/PageHero';
import ProjectsFilter from '../components/projects/ProjectsFilter';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import { projects } from '../data/projects';

export default function Projects() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const setCategory = (key) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') {
      next.delete('category');
    } else {
      next.set('category', key);
    }
    setSearchParams(next);
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

      {/* Projects + category filter */}
      <section className="py-16 md:py-20">
        <Container>
          <ProjectsFilter activeCategory={activeCategory} onChange={setCategory} />
          <ProjectsGrid projects={filtered} />
        </Container>
      </section>
    </>
  );
}
