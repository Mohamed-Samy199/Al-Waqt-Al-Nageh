import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

// Same line-icon set used for the "pillars" in the home page AboutPreview
// section, reused here so the Quality / Experience / Commitment concept
// reads as one consistent visual language across both pages.
function IconQuality() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconExperience() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M9 20v-6h6v6" />
      <path d="M4 10h16" />
    </svg>
  );
}

function IconCommitment() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <rect x="4" y="10" width="5" height="10" />
      <rect x="10.5" y="6" width="5" height="14" />
      <rect x="17" y="13" width="3" height="7" />
    </svg>
  );
}

const VALUE_KEYS = [
  { key: 'quality', Icon: IconQuality, image: '/images/about/value-1.png' },
  { key: 'experience', Icon: IconExperience, image: '/images/about/value-2.png' },
  { key: 'commitment', Icon: IconCommitment, image: '/images/about/value-3.png' },
];

// Lightweight scroll-reveal (no extra animation library): once the section
// enters the viewport, each card fades/slides in with a small stagger.
function useRevealOnScroll() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { sectionRef, visible };
}

function ValueCard({ valueKey, Icon, image, number, visible, delay }) {
  const { t } = useTranslation();

  return (
    <div
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
      }`}
    >
      {/* Architectural image, curved into the card from the top end-corner */}
      <div className="pointer-events-none absolute top-0 end-0 h-48 w-2/3 overflow-hidden rounded-es-[100px]">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Icon + number */}
      <div className="relative z-10 mb-12">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-900 shadow-sm transition-colors duration-300 group-hover:bg-primary-900 group-hover:text-white">
          <Icon />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary-900">{number}</span>
          <div className="h-[2px] w-8 bg-primary-900" />
        </div>
      </div>

      {/* Title + text */}
      <div className="relative z-10 space-y-4 pt-6 text-start">
        <h3 className="text-2xl font-bold text-primary-900 transition-colors group-hover:text-primary-600">
          {t(`aboutPage.values.${valueKey}.title`)}
        </h3>
        <p className="text-sm font-light leading-relaxed text-neutral-500">
          {t(`aboutPage.values.${valueKey}.text`)}
        </p>
      </div>

      {/* Accent line on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function FeaturesCards() {
  const { t } = useTranslation();
  const { sectionRef, visible } = useRevealOnScroll();

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-neutral-50 py-28">
      <Container className="relative z-10">
        <SectionHeading eyebrow={t('aboutPage.valuesEyebrow')} title={t('aboutPage.valuesTitle')} />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {VALUE_KEYS.map(({ key, Icon, image }, index) => (
            <ValueCard
              key={key}
              valueKey={key}
              Icon={Icon}
              image={image}
              number={String(index + 1).padStart(2, '0')}
              visible={visible}
              delay={index * 200}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}