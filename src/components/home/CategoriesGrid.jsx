import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import CategoryCard from '../CategoryCard/CategoryCard';
import { categories } from '../../data/projects';

export default function CategoriesGrid() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 lg:py-28">
      {/* Decorative arc at the bottom edge (logical props so it mirrors in RTL) */}
      <div className="pointer-events-none absolute -bottom-8 -start-20 h-32 w-80 rounded-se-[100%] border-t border-primary-700/30" />

      {/* Decorative circle */}
      <div className="pointer-events-none absolute -end-32 top-16 h-72 w-72 rounded-full border border-primary-700/10" />

      <Container>
        {/* Header */}
        <div className="relative z-10 mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-extrabold leading-[1.08] text-primary-900 md:text-5xl">
              {t('categories.title')}
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.key}
              category={category}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
