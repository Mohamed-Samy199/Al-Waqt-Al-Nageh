import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import { careerPositions, pickLang } from '../../data/careers';

export default function CareersPositions({ onApply }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');
  const lang = isArabic ? 'ar' : 'en';

  return (
    <section id="positions" className="scroll-mt-24 bg-neutral-50 py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            {/* <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary-700 rtl:normal-case rtl:tracking-normal">
                {t('careers.positions.eyebrow')}
              </span>
            </div> */}
            <h2
              className={`text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl ${
                isArabic ? 'font-arHeading' : 'font-heading'
              }`}
            >
              {t('careers.positions.title')}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-500">
            {t('careers.positions.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {careerPositions.map((position, index) => (
            <motion.article
              key={position.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold text-primary-700">
                  <MapPin size={12} strokeWidth={2} />
                  {position.branches.map((b) => t(`careers.branches.${b}`)).join(' · ')}
                </span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-accent">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-extrabold leading-snug text-primary-900">
                {pickLang(position.title, lang)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-neutral-500">
                {pickLang(position.summary, lang)}
              </p>

              <div className="mt-6 h-px w-10 bg-accent transition-all duration-300 group-hover:w-20" />

              <button
                type="button"
                onClick={() => onApply(position.id)}
                className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-primary-900 transition-colors hover:text-accent"
              >
                {t('careers.positions.apply')}
                <ArrowRight size={16} strokeWidth={2} className="rtl:-scale-x-100" />
              </button>
            </motion.article>
          ))}

          {/* General application card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-primary-900/20 bg-primary-900 p-6 text-white md:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-900/75 to-primary-700/55" />
            <div className="absolute -end-6 -top-8 h-24 w-24 rounded-full border border-accent/30" />
            <div className="absolute -end-12 -top-14 h-36 w-36 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col">
              <h3 className="text-xl font-extrabold leading-snug">{t('careers.positions.generalTitle')}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/70">
                {t('careers.positions.generalText')}
              </p>
              <button
                type="button"
                onClick={() => onApply('general')}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-sm bg-accent-bright px-6 text-sm font-bold text-primary-900 transition hover:-translate-y-0.5 hover:bg-accent-glow"
              >
                {t('careers.positions.generalCta')}
              </button>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}