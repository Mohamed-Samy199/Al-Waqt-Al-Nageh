import { useTranslation } from 'react-i18next';
import { Building2, HardHat, MapPin, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container';

const items = [
  { key: 'landmark', icon: Building2 },
  { key: 'crews', icon: HardHat },
  { key: 'safety', icon: ShieldCheck },
  { key: 'branches', icon: MapPin },
];

export default function CareersWhy() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Heading — scroll reveal handled by AOS */}
        <div data-aos="fade-up" data-aos-duration="600" data-aos-once="true" className="mb-12 max-w-3xl">
          {/* <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary-700 rtl:normal-case rtl:tracking-normal">
              {t('careers.why.eyebrow')}
            </span>
          </div> */}
          <h2
            className={`text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl ${
              isArabic ? 'font-arHeading' : 'font-heading'
            }`}
          >
            {t('careers.why.title')}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }, index) => (
            // AOS is on this wrapper, not on the <article>: the card has its own hover
            // transform (-translate-y-1) and `transition-all`, which AOS would override.
            <div
              key={key}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay={index * 80}
              data-aos-once="true"
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:bg-white hover:shadow-lg">
                <div className="mb-6 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-900 group-hover:text-white">
                    <Icon size={23} strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-accent">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary-900">
                  {t(`careers.why.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-500">
                  {t(`careers.why.items.${key}.text`)}
                </p>
                <div className="mt-6 h-px w-10 bg-accent transition-all duration-300 group-hover:w-20" />
              </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}