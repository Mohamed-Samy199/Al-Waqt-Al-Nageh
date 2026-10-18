import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const stages = ['study', 'planning', 'execution', 'handover'];

export default function MethodologySection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  // إنجليزي: النص يدخل من الشمال لموضعه | عربي: من اليمين لموضعه
  const fromStart = isArabic ? 'fade-left' : 'fade-right';

  return (
    <section className="relative overflow-hidden bg-white py-20 text-primary-900 sm:py-24 lg:py-32">
      {/* Methodology visual (desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-0 top-0 z-0 hidden h-[620px] w-[56%] max-w-[920px] overflow-hidden lg:block"
      >
        <img
          src="/images/about/methodology.png"
          alt="Al Waqt Al Nageh"
          loading="lazy"
          className="h-full w-full animate-gentle-zoom object-cover object-center motion-reduce:animate-none"
        />
        {/* Fade toward the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent rtl:bg-gradient-to-l" />
        {/* Fade toward the cards */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/80 to-transparent" />
        {/* Soft top fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="mb-12 max-w-3xl sm:mb-16 lg:max-w-xl">
          <span
            data-aos="fade-down"
            className="mb-4 flex items-center gap-3 text-xs md:text-xl font-bold uppercase tracking-[0.24em] text-primary-700 rtl:normal-case rtl:tracking-normal"
          >
            {t('methodology.eyebrow')}
          </span>
          <h2
            data-aos={fromStart}
            data-aos-delay="100"
            className={`text-4xl font-extrabold leading-[1.08] text-primary-900 md:text-5xl ${isArabic ? 'font-arHeading' : 'font-heading'}`}
          >
            {t('methodology.title')}
          </h2>
          <p
            data-aos={fromStart}
            data-aos-delay="250"
            className="mt-5 max-w-2xl text-base leading-7 text-neutral-500 sm:mt-6 sm:text-lg"
          >
            {t('methodology.subtitle')}
          </p>
        </div>

        {/* Smaller spacer so the cards sit higher over the visual */}
        <div className="hidden lg:block lg:h-4" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <article
              key={stage}
              className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden border border-primary-900/10 bg-neutral-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-900 hover:bg-primary-900 hover:shadow-xl sm:p-7"
            >
              <img
                src="/images/logo/logo-white.png"
                alt="Al Waqt Al Nageh"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 m-auto w-56 object-contain opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-20"
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-heading text-lg font-extrabold text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-primary-900">
                    0{index + 1}
                  </span>
                  <span className="pt-2 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary-900/40 transition-colors duration-500 group-hover:text-white/50">
                    {isArabic ? 'مرحلة' : 'Phase'} {index + 1}
                  </span>
                </div>

                <h3 className={`mt-8 text-xl font-extrabold leading-tight text-primary-900 transition-colors duration-500 group-hover:text-white sm:text-2xl ${isArabic ? 'font-arHeading' : 'font-heading'}`}>
                  {t(`methodology.stages.${stage}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-500 transition-colors duration-500 group-hover:text-white/70">
                  {t(`methodology.stages.${stage}.text`)}
                </p>
              </div>

              <div className="mt-8 h-1 w-full overflow-hidden bg-primary-900/10 transition-colors duration-500 group-hover:bg-white/20">
                <div className="h-full w-8 bg-accent transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}