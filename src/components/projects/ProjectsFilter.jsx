import { useTranslation } from 'react-i18next';
import { categories } from '../../data/projects';

const pill = (active) =>
  `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
    active ? 'bg-primary-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
  }`;

export default function ProjectsFilter({ activeCategory, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      <button type="button" onClick={() => onChange('all')} className={pill(activeCategory === 'all')}>
        {t('projectsPage.filterAll')}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          onClick={() => onChange(cat.key)}
          className={pill(activeCategory === cat.key)}
        >
          {t(`categories.${cat.key}`)}
        </button>
      ))}
    </div>
  );
}
