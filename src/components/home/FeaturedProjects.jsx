import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projectHome } from '../../data/projects';

const VISIBLE_COUNT = 4;
const AUTO_PLAY_DELAY = 2000;
const SKEW_DEG = 5;

function NavArrowIcon({ pointLeft = false }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={pointLeft ? '-scale-x-100' : ''}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function OpenArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function ProjectSlide({ project, number, isActive, skew }) {
  return (
    <div className="h-full shrink-0 px-[7px]">
      <Link to={`/projects/${project.slug}`} className="group block h-full">
        <div
          className={`relative h-[360px] w-full overflow-hidden bg-primary-900 transition-all duration-500 sm:h-[400px] lg:h-[440px] xl:h-[460px] ${
            isActive
              ? 'z-20 scale-[1.035] border-[3px] border-white shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85)]'
              : 'border border-white/15 opacity-90 hover:border-white/40 hover:opacity-100'
          }`}
          style={{ transform: `skewX(${skew}deg)` }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.78] transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            style={{ transform: `skewX(${-skew}deg) scale(1.16)` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/25 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6" style={{ transform: `skewX(${-skew}deg)` }}>
            <div className="flex items-start justify-between">
              <span className="text-2xl font-bold tracking-wide text-white">{number}</span>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-white transition-opacity duration-300 group-hover:opacity-80 sm:text-lg lg:text-xl">
                  {project.name}
                </h3>
                <p className="mt-1 truncate text-xs text-white/65 sm:text-sm">{project.location}</p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary-900 sm:h-11 sm:w-11">
                <OpenArrowIcon />
              </span>
            </div>
          </div>

          {isActive && <span className="absolute bottom-0 start-0 h-[5px] w-24 bg-white" />}
        </div>
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');
  const skew = isArabic ? SKEW_DEG : -SKEW_DEG;

  // Only the 5 flagship projects (flagged `featured: true` in projects.js)
  // appear in this carousel -- the full 15-project catalog lives on /projects.
  const featuredProjects = useMemo(() => projectHome.filter((p) => p.featured), []);

  const carouselProjects = useMemo(() => {
    if (featuredProjects.length <= VISIBLE_COUNT) return featuredProjects;
    return [...featuredProjects, ...featuredProjects.slice(0, VISIBLE_COUNT)];
  }, [featuredProjects]);

  const total = featuredProjects.length;
  const maxIndex = Math.max(total - VISIBLE_COUNT, 0);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goNext = () => {
    if (total <= VISIBLE_COUNT) return;
    setIndex((current) => current + 1);
  };

  const goPrev = () => {
    if (total <= VISIBLE_COUNT) return;
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  useEffect(() => {
    if (isPaused || total <= VISIBLE_COUNT) return;
    const timer = setInterval(goNext, AUTO_PLAY_DELAY);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  useEffect(() => {
    if (index !== total) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setIndex(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
    }, 520);
    return () => clearTimeout(timer);
  }, [index, total]);

  const activeIndex = index >= total ? 0 : index;

  return (
    <section
      id="featured-projects"
      className="relative w-full overflow-hidden bg-primary-900 py-20 text-white lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <svg aria-hidden="true" className="pointer-events-none absolute bottom-0 start-0 h-40 w-64 text-white/10 rtl:-scale-x-100" viewBox="0 0 260 160" fill="none">
        <path d="M10 160V70l20-14 20 14v90M60 160V40l22-16 22 16v120M114 160V90l18-12 18 12v70" stroke="currentColor" />
        <path d="M0 160h260" stroke="currentColor" />
      </svg>

      <div className="relative z-10 flex w-full flex-col gap-10 lg:flex-row lg:items-center">
        <div className="shrink-0 px-6 sm:px-10 lg:w-[290px] lg:px-0 lg:ps-8 xl:w-[340px] xl:ps-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-white" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/70 rtl:normal-case rtl:tracking-normal">
              {t('featured.eyebrow')}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.2] md:text-4xl xl:text-5xl">{t('featured.headingLine1')}</h2>

          <span className="mt-5 block h-[3px] w-10 bg-white" />

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t('featured.subtitle')}</p>

          <Link
            to="/projects"
            className="group mt-7 inline-flex items-center gap-4 border border-white px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-primary-900"
          >
            <span>{t('featured.cta')}</span>
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              <NavArrowIcon />
            </span>
          </Link>

          {total > VISIBLE_COUNT && (
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-primary-900"
              >
                <NavArrowIcon pointLeft />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-primary-900"
              >
                <NavArrowIcon />
              </button>

              <div className="ms-2 flex items-center gap-2 text-xs text-white/50">
                <span className="font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span>/</span>
                <span>{String(total).padStart(2, '0')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden p-3">
          <div
            className={`flex h-[360px] sm:h-[400px] lg:h-[440px] xl:h-[460px] ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{
              width: `${(carouselProjects.length / VISIBLE_COUNT) * 100}%`,
              transform: `translateX(${(isArabic ? index : -index) * (100 / carouselProjects.length)}%)`,
            }}
          >
            {carouselProjects.map((project, i) => {
              const realIndex = i % total;
              return (
                <div key={`${project.slug}-${i}`} className="h-full shrink-0" style={{ width: `${100 / carouselProjects.length}%` }}>
                  <ProjectSlide
                    project={project}
                    number={String(realIndex + 1).padStart(2, '0')}
                    isActive={realIndex === activeIndex && i === index}
                    skew={skew}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}