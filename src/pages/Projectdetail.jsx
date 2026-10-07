import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { projects } from '../data/projects';

function ChevronIcon({ pointLeft }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={pointLeft ? '-scale-x-100' : ''}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

// Lightbox: full-screen overlay with the selected image, and prev/next
// controls that are logical (`pointLeft` is which way the arrow POINTS,
// not which physical side it's on), so they read correctly in Arabic too.
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute start-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronIcon pointLeft />
      </button>

      <img
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
      />

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute end-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <ChevronIcon />
      </button>

      <span className="absolute bottom-6 text-sm text-white/60">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

export default function ProjectDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!project) return <Navigate to="/projects" replace />;

  const images = project.gallery?.length ? project.gallery : [project.image];

  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setLightboxIndex((i) => (i + 1) % images.length);

  const facts = [
    project.contractValue && { label: t('projectsPage.contractValue'), value: project.contractValue },
    project.year && { label: t('projectsPage.constructionPeriod'), value: project.year },
    project.duration && { label: t('projectsPage.duration'), value: project.duration },
    { label: t('projectsPage.category'), value: t(`categories.${project.category}`) },
    { label: t('projectsPage.location'), value: project.location },
  ].filter(Boolean);

  const others = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden bg-primary-900">
        <img src={project.image} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />

        <Container className="absolute inset-x-0 bottom-10 text-white">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white">{t('nav.home')}</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-white">{t('projectsPage.breadcrumbCurrent')}</Link>
            <span>/</span>
            <span className="text-white">{project.name}</span>
          </div>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">{project.name}</h1>
          <p className="mt-2 text-white/70">{project.location}</p>
        </Container>
      </section>

      {/* Facts + description */}
      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-2xl font-bold text-primary-900">{t('projectsPage.overview')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-500">{project.description}</p>

            {project.keyFeatures?.length > 0 && (
              <div className="mt-8 rounded-2xl bg-primary-50/60 p-6">
                <h3 className="text-lg font-bold text-primary-900">{t('projectsPage.keyFeatures')}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery: click any image to open it full-size with prev/next */}
            {images.length > 1 && (
              <div className="mt-8 grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openAt(i)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}

            <Button to="/projects" variant="outline" className="mt-8">
              {t('projectsPage.backToProjects')}
            </Button>
          </div>

          <div className="h-fit rounded-2xl border border-neutral-100 p-6">
            <dl className="space-y-5">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{fact.label}</dt>
                  <dd className="mt-1 font-bold text-primary-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Related projects */}
      {others.length > 0 && (
        <section className="bg-neutral-50 py-16 md:py-20">
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-primary-900">{t('projectsPage.otherProjects')}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-shadow hover:shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="truncate font-bold text-primary-900">{p.name}</h3>
                    <p className="mt-1 truncate text-sm text-neutral-500">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  );
}
