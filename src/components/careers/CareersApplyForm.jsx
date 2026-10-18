import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { careerPositions, pickLang } from '../../data/careers';
import { useSubmitApplication } from '../../hooks/careers/useSubmitApplication';
import CareersField, { FieldShell, fieldClass } from './CareersField';
import CvUpload from './CvUpload';
import { APPLY_INITIAL_VALUES, validateApplication } from './careersSchema';

function SuccessState({ onReset }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
        <CheckCircle2 size={34} strokeWidth={1.6} />
      </span>
      <h3 className="mt-6 text-2xl font-extrabold text-primary-900">{t('careers.apply.successTitle')}</h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">{t('careers.apply.successText')}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-sm border border-primary-900 px-6 text-sm font-bold text-primary-900 transition hover:bg-primary-900 hover:text-white"
      >
        {t('careers.apply.another')}
      </button>
    </div>
  );
}

// `position` lives in the parent page (a role card can pre-select it), so it's a prop, not a Formik field.
export default function CareersApplyForm({ position, onPositionChange }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  const { mutate, isPending, isSuccess, isError, error, reset } = useSubmitApplication();

  // readable position name (current language) for the email
  const positionLabel = () => {
    const selected = careerPositions.find((p) => p.id === position);
    return selected ? pickLang(selected.title, lang) : t('careers.apply.form.general');
  };

  const formik = useFormik({
    initialValues: APPLY_INITIAL_VALUES,
    validate: validateApplication,
    onSubmit: (values, { resetForm }) => {
      mutate(
        {
          ...values,
          position: positionLabel(),
          branch: t(`careers.branches.${values.branch}`),
        },
        {
          onSuccess: () => {
            resetForm();
            onPositionChange('general');
          },
        }
      );
    },
  });

  if (isSuccess) return <SuccessState onReset={reset} />;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <CareersField formik={formik} name="name" type="text" autoComplete="name" label={t('careers.apply.form.name')} />

      <CareersField
        formik={formik}
        name="phone"
        type="tel"
        dir="ltr"
        autoComplete="tel"
        inputClassName="rtl:text-end"
        label={t('careers.apply.form.phone')}
      />

      <CareersField
        formik={formik}
        name="email"
        type="email"
        dir="ltr"
        autoComplete="email"
        inputClassName="rtl:text-end"
        className="sm:col-span-2"
        label={t('careers.apply.form.email')}
      />

      <FieldShell label={t('careers.apply.form.position')}>
        <select
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
          className={fieldClass(false)}
        >
          <option value="general">{t('careers.apply.form.general')}</option>
          {careerPositions.map((p) => (
            <option key={p.id} value={p.id}>
              {pickLang(p.title, lang)}
            </option>
          ))}
        </select>
      </FieldShell>

      <CareersField formik={formik} name="branch" as="select" label={t('careers.apply.form.branch')}>
        <option value="any">{t('careers.branches.any')}</option>
        <option value="Kuwait">{t('careers.branches.Kuwait')}</option>
        <option value="saudi">{t('careers.branches.saudi')}</option>
      </CareersField>

      <CareersField
        formik={formik}
        name="experience"
        type="number"
        min="0"
        max="60"
        className="sm:col-span-2"
        label={t('careers.apply.form.experience')}
      />

      <CareersField
        formik={formik}
        name="message"
        as="textarea"
        rows={4}
        className="sm:col-span-2"
        inputClassName="resize-none"
        label={t('careers.apply.form.message')}
      />

      <div className="sm:col-span-2">
        <CvUpload
          file={formik.values.cv}
          onChange={(file) => formik.setFieldValue('cv', file)}
          error={formik.errors.cv}
        />
      </div>

      {/* honeypot: hidden from real users, bots fill it and get ignored by the backend */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...formik.getFieldProps('website')} />
      </div>

      {isError && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
          {t(error?.status === 429 ? 'careers.apply.errors.tooManyRequests' : 'careers.apply.errors.generic')}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-sm bg-primary-900 px-8 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {isPending ? t('careers.apply.form.sending') : t('careers.apply.form.submit')}
        </button>
      </div>
    </form>
  );
}
