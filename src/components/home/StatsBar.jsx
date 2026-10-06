import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import StatCounter from '../ui/StatCounter';

export default function StatsBar() {
  const { t } = useTranslation();
  const stats = [
    { value: '40+', label: t('stats.years') },
    { value: '20+', label: t('stats.projects') },
    { value: '2', label: t('stats.countries') },
    { value: '6', label: t('stats.sectors') },
  ];
  return (
    <section className="bg-primary-900 py-12">
      <Container className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => <StatCounter key={s.label} {...s} />)}
      </Container>
    </section>
  );
}
