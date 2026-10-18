import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { careerContacts } from '../../data/careers';

// Left column: heading + direct phone numbers
export default function CareersContactCard() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl ${
          isArabic ? 'font-arHeading' : 'font-heading'
        }`}
      >
        {t('careers.apply.title')}
      </h2>
      <p className="mt-5 max-w-md text-base leading-8 text-neutral-500">{t('careers.apply.subtitle')}</p>

      {/* Contact card with the site's blue shade */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary-900/20 bg-primary-900 p-6 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-900/75 to-primary-700/55" />
        <div className="absolute -end-6 -top-8 h-24 w-24 rounded-full border border-accent/30" />
        <div className="absolute -end-12 -top-14 h-36 w-36 rounded-full border border-white/10" />

        <div className="relative">
          <h3 className="text-lg font-extrabold">{t('careers.apply.callTitle')}</h3>
          <p className="mt-2 text-sm leading-7 text-white/70">{t('careers.apply.callText')}</p>

          <ul className="mt-5 space-y-3">
            {careerContacts.map(({ key, phone }) => (
              <li key={key}>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="group flex items-center justify-between gap-4 border-b border-white/15 pb-3 transition-colors hover:border-accent-bright"
                >
                  <bdi dir="ltr" className="font-heading text-sm font-bold tracking-wide group-hover:text-accent-bright">
                    {phone}
                  </bdi>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
