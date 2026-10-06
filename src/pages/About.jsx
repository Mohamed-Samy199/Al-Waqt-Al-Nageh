import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import StatCounter from '../components/ui/StatCounter';
import AboutStory from '../components/about/AboutStory';
import VisionMissionSection from '../components/about/VisionMissionSection';
import FeaturesCards from '../components/about/FeaturesCards';
import PageHero from '../components/shared/PageHero';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { value: '40+', label: t('stats.years') },
    { value: '2', label: t('stats.countries') },
    { value: '15+', label: t('stats.projects') },
    { value: '6', label: t('stats.sectors') },
  ];

  return (
    <>
      <PageHero
      breadcrumbs={[
        { label: t('aboutPage.breadcrumbHome'), to: '/' },
        { label: t('aboutPage.breadcrumbCurrent') },
      ]}
      eyebrow={t('aboutPage.heroEyebrow')}
      title={t('aboutPage.heroTitle')}
      subtitle={t('aboutPage.heroSubtitle')}
    />

      {/* Story + timeline */}
      <AboutStory />

      {/* Vision & Mission */}
      <VisionMissionSection />

      {/* Stats */}
      <section className="bg-primary-900 py-16 text-white">
        <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => <StatCounter key={s.label} {...s} />)}
        </Container>
      </section>

      {/* Values */}
      <FeaturesCards />
    </>
  );
}