import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function KhobarHighlight() {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 bg-ink">
      <img
        src="/images/projects/avenues-khobar/cover.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <Container className="relative z-10 max-w-2xl">
        <span className="text-accent font-semibold uppercase tracking-widest text-sm">
          {t('khobar.tag')}
        </span>
        <h2 className="text-white text-3xl md:text-5xl font-extrabold mt-4">
          {t('khobar.title')}
        </h2>
        <p className="text-neutral-200 mt-6 text-lg">{t('khobar.text')}</p>
        <Button to="/projects/avenues-khobar" variant="accent" className="mt-8">
          {t('khobar.cta')}
        </Button>
      </Container>
    </section>
  );
}
