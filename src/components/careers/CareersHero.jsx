import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

export default function CareersHero() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  return (
    <section className="relative isolate overflow-hidden bg-primary-900 pb-24 pt-36 text-white lg:pb-28 lg:pt-44">
      <img
        src="/images/categories/governmental.png"
        alt="Al Waqt Al Nageh"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
      />
      {/* Same blue shade used across the site */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900 via-primary-900/80 to-primary-700/55" />
      <div className="pointer-events-none absolute -end-24 -top-24 -z-10 h-96 w-96 rounded-full border border-accent/30" />
      <div className="pointer-events-none absolute -end-48 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full border border-white/10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-accent-bright" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent-bright rtl:normal-case rtl:tracking-normal">
              {t('careers.eyebrow')}
            </span>
          </div>

          <h1
            className={`text-4xl font-extrabold leading-[1.08] md:text-6xl ${
              isArabic ? 'font-arHeading' : 'font-heading'
            }`}
          >
            {t('careers.title')}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            {t('careers.subtitle')}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#positions"
              className="inline-flex min-h-[52px] items-center justify-center rounded-sm bg-accent-bright px-7 font-bold text-primary-900 shadow-[0_8px_30px_rgba(255,205,92,0.2)] transition hover:-translate-y-0.5 hover:bg-accent-glow"
            >
              {t('careers.ctaPositions')}
            </a>
            <a
              href="#apply"
              className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-white/50 bg-white/[0.04] px-7 font-bold text-white transition hover:-translate-y-0.5 hover:border-accent-bright hover:bg-accent-bright/15"
            >
              {t('careers.ctaApply')}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}