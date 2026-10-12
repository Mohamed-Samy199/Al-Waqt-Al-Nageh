import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Upload } from 'lucide-react';
import Container from '../ui/Container';
import { careerContacts, careerPositions, pickLang } from '../../data/careers';

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const initialForm = { name: '', phone: '', email: '', branch: 'any', experience: '', message: '' };

const inputClass =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary-900 outline-none transition placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary-700 rtl:normal-case rtl:tracking-normal">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

export default function CareersApply({ position, onPositionChange }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');
  const lang = isArabic ? 'ar' : 'en';

  const [form, setForm] = useState(initialForm);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const fileRef = useRef(null);

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const border = (key) => (errors[key] ? 'border-red-400' : 'border-neutral-200');

  const handleFile = (e) => {
    const file = e.target.files?.[0] ?? null;
    setCv(file);
    setErrors((prev) => ({ ...prev, cv: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('careers.apply.errors.required');
    if (!form.phone.trim()) next.phone = t('careers.apply.errors.required');
    else if (!/^[+\d\s()-]{7,}$/.test(form.phone.trim())) next.phone = t('careers.apply.errors.phone');
    if (cv && !ALLOWED_CV_TYPES.includes(cv.type)) next.cv = t('careers.apply.errors.cvType');
    else if (cv && cv.size > MAX_CV_SIZE) next.cv = t('careers.apply.errors.cvSize');
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    // TODO: wire this to a real service (Formspree / EmailJS / your own API)
    // and send `form`, `position` and the `cv` file. For now it only simulates success.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
  };

  const reset = () => {
    setForm(initialForm);
    setCv(null);
    setErrors({});
    onPositionChange('general');
    if (fileRef.current) fileRef.current.value = '';
    setStatus('idle');
  };

  return (
    <section id="apply" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Heading + direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary-700 rtl:normal-case rtl:tracking-normal">
                {t('careers.apply.eyebrow')}
              </span>
            </div> */}
            <h2
              className={`text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl ${
                isArabic ? 'font-arHeading' : 'font-heading'
              }`}
            >
              {t('careers.apply.title')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-neutral-500">
              {t('careers.apply.subtitle')}
            </p>

            {/* Contact card with the site's blue shade */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary-900/20 bg-primary-900 p-6 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-900/75 to-primary-700/55" />
              <div className="absolute -end-6 -top-8 h-24 w-24 rounded-full border border-accent/30" />
              <div className="absolute -end-12 -top-14 h-36 w-36 rounded-full border border-white/10" />

              <div className="relative">
                <h3 className="text-lg font-extrabold">{t('careers.apply.callTitle')}</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">{t('careers.apply.callText')}</p>

                <ul className="mt-5 space-y-3">
                  {careerContacts.map(({ key, phone }) => (
                    <li key={key}>
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="group flex items-center justify-between gap-4 border-b border-white/15 pb-3 transition-colors hover:border-accent-bright"
                      >
                        {/* <span className="flex items-center gap-3 text-sm text-white/70">
                          <Phone size={16} strokeWidth={1.8} className="text-accent-bright" />
                          {t(`careers.branches.${key}`)}
                        </span> */}
                        <bdi dir="ltr" className="font-heading text-sm font-bold tracking-wide group-hover:text-accent-bright">
                          {phone}
                        </bdi>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8"
          >
            {status === 'success' ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 size={34} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold text-primary-900">
                  {t('careers.apply.successTitle')}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                  {t('careers.apply.successText')}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-sm border border-primary-900 px-6 text-sm font-bold text-primary-900 transition hover:bg-primary-900 hover:text-white"
                >
                  {t('careers.apply.another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field label={t('careers.apply.form.name')} error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={setField('name')}
                    autoComplete="name"
                    className={`${inputClass} ${border('name')}`}
                  />
                </Field>

                <Field label={t('careers.apply.form.phone')} error={errors.phone}>
                  <input
                    type="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={setField('phone')}
                    autoComplete="tel"
                    className={`${inputClass} ${border('phone')} rtl:text-end`}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label={t('careers.apply.form.email')}>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={setField('email')}
                      autoComplete="email"
                      className={`${inputClass} ${border('email')} rtl:text-end`}
                    />
                  </Field>
                </div>

                <Field label={t('careers.apply.form.position')}>
                  <select
                    value={position}
                    onChange={(e) => onPositionChange(e.target.value)}
                    className={`${inputClass} ${border('position')}`}
                  >
                    <option value="general">{t('careers.apply.form.general')}</option>
                    {careerPositions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {pickLang(p.title, lang)}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={t('careers.apply.form.branch')}>
                  <select value={form.branch} onChange={setField('branch')} className={`${inputClass} ${border('branch')}`}>
                    <option value="any">{t('careers.branches.any')}</option>
                    <option value="Kuwait">{t('careers.branches.Kuwait')}</option>
                    <option value="saudi">{t('careers.branches.saudi')}</option>
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label={t('careers.apply.form.experience')}>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={form.experience}
                      onChange={setField('experience')}
                      className={`${inputClass} ${border('experience')}`}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label={t('careers.apply.form.message')}>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={setField('message')}
                      className={`${inputClass} ${border('message')} resize-none`}
                    />
                  </Field>
                </div>

                {/* CV upload */}
                <div className="sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary-700 rtl:normal-case rtl:tracking-normal">
                    {t('careers.apply.form.cv')}
                  </span>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border border-dashed bg-white px-4 py-4 transition hover:border-accent ${
                      errors.cv ? 'border-red-400' : 'border-neutral-300'
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                      <Upload size={20} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-primary-900">
                        {cv ? cv.name : t('careers.apply.form.cvChoose')}
                      </span>
                      <span className="mt-0.5 block text-xs text-neutral-500">
                        {t('careers.apply.form.cvHint')}
                      </span>
                    </span>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className="sr-only"
                    />
                  </label>
                  {errors.cv && <span className="mt-1.5 block text-xs font-medium text-red-600">{errors.cv}</span>}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-sm bg-primary-900 px-8 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {status === 'sending' ? t('careers.apply.form.sending') : t('careers.apply.form.submit')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}