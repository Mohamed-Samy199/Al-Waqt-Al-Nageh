import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSendContact } from '../../hooks/contact/useSendContact';
import FormField from './FormField';
import {
  CONTACT_INITIAL_VALUES,
  SUBJECT_KEYS,
  validateContact,
} from './contactSchema';

function SuccessState({ onReset }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 rounded-xl bg-primary-50 p-8 text-center">
      <h3 className="text-lg font-bold text-primary-900">{t('contactPage.formSuccessTitle')}</h3>
      <p className="mt-2 text-neutral-500">{t('contactPage.formSuccessText')}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-semibold text-primary-700 hover:text-primary-900"
      >
        {t('contactPage.formSendAnother')}
      </button>
    </div>
  );
}

export default function ContactForm() {
  const { t } = useTranslation();
  const { mutate, isPending, isSuccess, isError, error, reset } = useSendContact();

  const formik = useFormik({
    initialValues: CONTACT_INITIAL_VALUES,
    validate: validateContact,
    onSubmit: (values, { resetForm }) => {
      mutate(
        // send the readable subject label (in the current language) so it shows nicely in the email
        { ...values, subject: t(`contactPage.subjects.${values.subject}`) },
        { onSuccess: () => resetForm() }
      );
    },
  });

  return (
    <div className="rounded-2xl border border-neutral-100 p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-primary-900">{t('contactPage.formTitle')}</h2>

      {isSuccess ? (
        <SuccessState onReset={reset} />
      ) : (
        <form onSubmit={formik.handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
          <FormField formik={formik} name="name" label={t('contactPage.formName')} />
          <FormField formik={formik} name="email" type="email" label={t('contactPage.formEmail')} />
          <FormField formik={formik} name="phone" type="tel" label={t('contactPage.formPhone')} />
          <FormField formik={formik} name="subject" as="select" label={t('contactPage.formSubject')}>
            {SUBJECT_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`contactPage.subjects.${key}`)}
              </option>
            ))}
          </FormField>
          <FormField
            formik={formik}
            name="message"
            as="textarea"
            rows={5}
            className="sm:col-span-2"
            label={t('contactPage.formMessage')}
            placeholder={t('contactPage.formMessagePlaceholder')}
          />

          {/* honeypot: hidden from real users, bots fill it and get ignored by the backend */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...formik.getFieldProps('website')} />
          </div>

          {isError && (
            <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
              {t(error?.status === 429 ? 'contactPage.errors.tooManyRequests' : 'contactPage.errors.generic')}
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary-700 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-900 disabled:opacity-60"
            >
              {isPending ? t('contactPage.formSending') : t('contactPage.formSubmit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
