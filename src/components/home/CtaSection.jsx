import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function CtaSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-primary-700">
      <Container className="text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold">{t('cta.title')}</h2>
        <p className="text-primary-100 mt-4 text-lg">{t('cta.subtitle')}</p>
        <Button to="/contact" variant="accent" className="mt-8">
          {t('cta.button')}
        </Button>
      </Container>
    </section>
  );
}
