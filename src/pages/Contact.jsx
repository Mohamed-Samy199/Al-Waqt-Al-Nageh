import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import PageHero from '../components/shared/PageHero';
import LocationMap from '../components/contact/LocationMap';

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 5c0 8.3 6.7 15 15 15l2-4-5-2-2 2a11.5 11.5 0 0 1-6-6l2-2-2-5-4 2Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function OfficeCard({ title, address, phone, email }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-neutral-100 p-6">
      <h3 className="font-bold text-primary-900">{title}</h3>
      <dl className="mt-4 space-y-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-primary-700"><PinIcon /></span>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t('contactPage.addressLabel')}</dt>
            <dd className="mt-0.5 text-sm text-neutral-700">{address}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-primary-700"><PhoneIcon /></span>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t('contactPage.phoneLabel')}</dt>
            <dd className="mt-0.5 text-sm text-neutral-700">{phone}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-primary-700"><MailIcon /></span>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t('contactPage.emailLabel')}</dt>
            <dd className="mt-0.5 text-sm text-neutral-700">{email}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

const inputClass =
  'w-full rounded-md border border-neutral-200 px-4 py-3 text-sm text-primary-900 placeholder:text-neutral-400 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet -- this just simulates a send so the form
    // is testable end to end. Hook this up to a real endpoint/email
    // service (e.g. your own API route, Formspree, EmailJS) before launch.
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  const subjectKeys = ['general', 'project', 'career', 'other'];

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

      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[380px_1fr]">
          {/* Offices */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary-700" />
              <span className="text-sm font-semibold tracking-wide text-primary-700">{t('contactPage.officesEyebrow')}</span>
            </div>
            <div className="space-y-6">
              {/* <OfficeCard
                title={t('contactPage.kuwaitOffice')}
                address={t('contactPage.addressPlaceholder')}
                phone={t('contactPage.phonePlaceholder')}
                email={t('contactPage.emailPlaceholder')}
              /> */}
              <OfficeCard
                title={t('contactPage.ksaOffice')}
                address={t('contactPage.addressPlaceholder')}
                phone={t('contactPage.phonePlaceholder2')}
                email={t('contactPage.emailPlaceholder')}
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-neutral-100 p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-primary-900">{t('contactPage.formTitle')}</h2>

            {status === 'sent' ? (
              <div className="mt-8 rounded-xl bg-primary-50 p-8 text-center">
                <h3 className="text-lg font-bold text-primary-900">{t('contactPage.formSuccessTitle')}</h3>
                <p className="mt-2 text-neutral-500">{t('contactPage.formSuccessText')}</p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', email: '', phone: '', subject: 'general', message: '' });
                    setStatus('idle');
                  }}
                  className="mt-5 text-sm font-semibold text-primary-700 hover:text-primary-900"
                >
                  {t('contactPage.formSendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">{t('contactPage.formName')}</label>
                  <input required value={form.name} onChange={update('name')} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">{t('contactPage.formEmail')}</label>
                  <input required type="email" value={form.email} onChange={update('email')} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">{t('contactPage.formPhone')}</label>
                  <input value={form.phone} onChange={update('phone')} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">{t('contactPage.formSubject')}</label>
                  <select value={form.subject} onChange={update('subject')} className={inputClass}>
                    {subjectKeys.map((key) => (
                      <option key={key} value={key}>{t(`contactPage.subjects.${key}`)}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">{t('contactPage.formMessage')}</label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t('contactPage.formMessagePlaceholder')}
                    value={form.message}
                    onChange={update('message')}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="rounded-md bg-primary-700 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-900 disabled:opacity-60"
                  >
                    {status === 'sending' ? t('contactPage.formSending') : t('contactPage.formSubmit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <LocationMap />

    </>
  );
}