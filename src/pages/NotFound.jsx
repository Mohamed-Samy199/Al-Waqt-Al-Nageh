import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-primary-900 md:text-6xl">{t('notFound.title')}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-500">{t('notFound.text')}</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary-900 px-6 py-3 font-bold text-white transition hover:bg-primary-700">
          {t('notFound.cta')}
        </Link>
      </Container>
    </section>
  );
}
