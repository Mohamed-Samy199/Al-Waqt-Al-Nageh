import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const reasons = ['experience', 'markets', 'workforce', 'flexibility'];

const VIDEO_SRC = '/images/videos/construction-timelapse.mp4';
const POSTER_SRC = '/images/why-us/construction-poster.png';

// 1 = normal speed, lower = slower
const PLAYBACK_RATE = 0.6;

export default function WhyUsSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary-900 py-24 text-white">
      {/* Video background with poster fallback */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Poster: shows while the video loads or if it fails */}
        <img
          src={POSTER_SRC}
          alt="Al Waqt Al Nageh"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = PLAYBACK_RATE;
          }}
          className="absolute inset-0 h-full w-full transform-gpu object-cover motion-reduce:hidden"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Light overlay: keeps the footage visible but text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/75 via-primary-900/55 to-primary-900/75" />
      </div>

      {/* Decorative geometric element */}
      <div className="pointer-events-none absolute -end-28 top-16 z-10 h-80 w-80 rounded-full border border-white/10" />

      <Container className="relative z-20 grid w-full gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        {/* Heading side */}
        <div className={isArabic ? 'text-right' : 'text-left'}>
          <div className="mb-4 flex items-center gap-3">
            {/* <span className="h-px w-8 bg-white" /> */}
            <span className="text-xs md:text-xl font-semibold uppercase tracking-[0.3em] text-white rtl:normal-case rtl:tracking-normal">
              {t('whyUs.eyebrow')}
            </span>
          </div>

          <h2 className={`text-4xl font-extrabold leading-[1.08] md:text-5xl ${isArabic ? 'font-arHeading' : 'font-heading'}`}>
            {t('whyUs.title')}
          </h2>

          <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/80">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <article
              key={reason}
              className="relative border-s-2 border-white/80 ps-6 transition-all duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
            >
              <span className="font-mono text-sm font-bold text-white/90">0{index + 1}</span>

              <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-white">
                {t(`whyUs.items.${reason}.title`)}
              </h3>

              <p className="mt-3 text-sm font-light leading-7 text-white/75">
                {t(`whyUs.items.${reason}.text`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
