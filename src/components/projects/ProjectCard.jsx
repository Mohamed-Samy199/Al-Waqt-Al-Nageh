import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import OpenArrowIcon from './OpenArrowIcon';

export default function ProjectCard({ project }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-2xl border border-neutral-100 transition-shadow hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} construction project in ${project.location}`}
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
  );
}
