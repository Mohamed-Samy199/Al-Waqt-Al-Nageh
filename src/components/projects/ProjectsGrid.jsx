import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }) {
  const { t } = useTranslation();

  if (projects.length === 0) {
    return <p className="py-20 text-center text-neutral-500">{t('projectsPage.noResults')}</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}