import { useTranslation } from 'react-i18next';
import PageHero from '../components/shared/PageHero';
import ServicesSafetyQuality from '../components/services/ServicesSafetyQuality';
import ServicesScope from '../components/services/ServicesScope';
import ServiceIntro from '../components/services/ServiceIntro';

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('servicesPage.breadcrumbCurrent') },
        ]}
        eyebrow={t('servicesPage.heroEyebrow')}
        title={t('servicesPage.heroTitle')}
        subtitle={t('servicesPage.heroSubtitle')}
      />

      <main>
        <ServiceIntro />

        <ServicesScope />

        <ServicesSafetyQuality />
      </main>
    </>
  );
}
