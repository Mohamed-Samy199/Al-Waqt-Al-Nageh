import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

// Small line icons, drawn inline so no icon-library dependency is needed.
// Kept strictly to the brand's blue/black/white palette for this section
// (no accent-bright here, by request).
function IconQuality() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconExperience() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M9 20v-6h6v6" />
      <path d="M4 10h16" />
    </svg>
  );
}

function IconCommitment() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="10" width="5" height="10" />
      <rect x="10.5" y="6" width="5" height="14" />
      <rect x="17" y="13" width="3" height="7" />
    </svg>
  );
}

export default function AboutPreview() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  // إنجليزي: النص يطلع من الشمال لموضعه | عربي: من اليمين لموضعه
  const fromStart = isArabic ? 'fade-left' : 'fade-right';

  const pillars = [
    { key: 'quality', Icon: IconQuality },
    { key: 'experience', Icon: IconExperience },
    { key: 'commitment', Icon: IconCommitment },
  ];

  return (
    <section id="about-preview" className="py-24 bg-white">
      {/* ...خلّي الكومنت الطويل زي ما هو... */}
      <Container className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.6fr]">
        <div className={isArabic ? 'text-right' : 'text-left'}>
          <div className={`flex items-center gap-3 mb-4 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span
              data-aos="fade-down"
              className="text-xl font-semibold tracking-wide text-primary-700"
            >
              {t('about.eyebrow')}
            </span>
          </div>

          <h2
            data-aos={fromStart}
            data-aos-delay="100"
            className="text-3xl md:text-[2.6rem] font-bold text-primary-900 leading-tight max-w-xl"
          >
            {t('about.heading')}
          </h2>

          <p
            data-aos={fromStart}
            data-aos-delay="250"
            className="text-neutral-500 mt-6 text-lg leading-relaxed max-w-xl"
          >
            {t('about.text')}
          </p>

          {/* Three pillars: Quality / Experience / Commitment */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {pillars.map(({ key, Icon }, i) => (
              <div key={key} className={isArabic ? 'text-right' : 'text-left'}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700 mb-3">
                  <Icon />
                </div>
                <h3
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                  className="font-semibold text-primary-900 text-sm md:text-base"
                >
                  {t(`about.pillars.${key}.title`)}
                </h3>
                <p
                  data-aos="fade-up"
                  data-aos-delay={i * 200 + 100}
                  className="text-neutral-500 text-xs md:text-sm mt-1 leading-relaxed"
                >
                  {t(`about.pillars.${key}.text`)}
                </p>
              </div>
            ))}
          </div>

          <Button to="/about" variant="outline" className="mt-10">
            {t('about.cta')}
          </Button>
        </div>

        <div className="relative overflow-hidden lg:-me-[calc(max((100vw-80rem)/2,0px)+2rem)]">
          <img
            src="/images/about/about-illustration.png"
            alt={t('about.imageAlt')}
            className="w-full h-auto select-none animate-gentle-zoom"
          />
        </div>
      </Container>
    </section>
  );
}
