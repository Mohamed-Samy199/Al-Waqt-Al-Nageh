import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CareersWhy from '../components/careers/CareersWhy';
// import CareersPositions from '../components/careers/CareersPositions';
import CareersApply from '../components/careers/CareersApply';
import PageHero from '../components/shared/PageHero';

export default function Careers() {
  const [position, setPosition] = useState('general');
  const { t } = useTranslation();

  // Choosing a role pre-selects it in the form and scrolls down to it
  const handleApply = (id) => {
    setPosition(id);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero
                breadcrumbs={[
                  { label: t('nav.home'), to: '/' },
                  { label: t('careers.eyebrow') },
                ]}
                eyebrow={t('careers.eyebrow')}
                title={t('careers.title')}
                subtitle={t('careers.subtitle')}
              />
      <CareersWhy />
      {/* <CareersPositions onApply={handleApply} /> */}
      <CareersApply position={position} onPositionChange={setPosition} />
    </>
  );
}