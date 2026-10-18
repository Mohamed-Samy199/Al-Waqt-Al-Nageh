import { useTranslation } from 'react-i18next';
import PageHero from '../components/shared/PageHero';
import ContactSection from '../components/contact/ContactSection';
import LocationMap from '../components/contact/LocationMap';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.contact') },
        ]}
        eyebrow={t('nav.contact')}
        title={t('contactPage.heroTitle')}
        subtitle={t('contactPage.heroSubtitle')}
      />

      <ContactSection />

      {/* Map placeholder */}
      <LocationMap />
    </>
  );
}
