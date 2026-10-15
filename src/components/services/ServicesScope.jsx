import { useTranslation } from 'react-i18next';
import {
  Blocks,
  ClipboardCheck,
  Droplets,
  HardHat,
  Layers3,
  Paintbrush,
  Wrench,
} from 'lucide-react';
import Container from '../ui/Container';

const serviceItems = [
  { key: 'reinforcedConcrete', icon: Blocks, index: '01', image: '/images/categories/towers.png' },
  { key: 'formwork', icon: HardHat, index: '02', image: '/images/categories/commercial.png' },
  { key: 'rebar', icon: Wrench, index: '03', image: '/images/categories/governmental.png' },
  { key: 'massPours', icon: Blocks, index: '04', image: '/images/categories/health.png' },
  { key: 'excavation', icon: Droplets, index: '05', image: '/images/categories/coastal.png' },
  { key: 'finishes', icon: Paintbrush, index: '06', image: '/images/categories/commercial.png' },
  { key: 'electromechanical', icon: Layers3, index: '07', image: '/images/categories/airports.png' },
  { key: 'projectManagement', icon: ClipboardCheck, index: '08', image: '/images/categories/towers.png' },
];

export default function ServicesScope() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-50 py-10 md:py-14">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xl font-bold text-accent">{t('servicesPage.scopeEyebrow')}</p>
            <h2 className="text-3xl font-extrabold text-primary-900 md:text-4xl">{t('servicesPage.scopeTitle')}</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-500">{t('servicesPage.scopeText')}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map(({ key, icon: Icon, index, image }) => (
            <article
              key={key}
              className="group relative overflow-visible rounded-2xl border border-neutral-200 bg-white shadow-[0_12px_30px_rgba(1,10,82,0.08)] transition-shadow duration-300 hover:shadow-none"
            >
              <div className="relative h-40 overflow-hidden rounded-t-2xl bg-neutral-200">
                <img
                  src={image}
                  alt={t(`servicesPage.items.${key}.title`)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary-900/25 via-primary-900/8 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                <span className="absolute end-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-primary-900 shadow-sm">
                  {index}
                </span>
              </div>

              <div className="relative p-6 pt-9">
                <span className="absolute -top-6 start-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white text-primary-900 shadow-md transition-colors duration-300 group-hover:bg-primary-900 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="text-lg font-bold leading-snug text-primary-900">
                  {t(`servicesPage.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-500">{t(`servicesPage.items.${key}.text`)}</p>
                <div className="mt-5 h-0.5 w-8 bg-accent transition-all duration-300 group-hover:w-14" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
