import { useTranslation } from 'react-i18next';

const baseClass =
  'w-full rounded-md border px-4 py-3 text-sm text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1';
const normalClass = 'border-neutral-200 focus:border-primary-700 focus:ring-primary-700';
const errorClass = 'border-red-400 focus:border-red-500 focus:ring-red-500';

/**
 * Label + control (input | select | textarea) + error message, wired to a Formik instance.
 * `formik.errors[name]` is an i18n key, translated here.
 */
export default function FormField({
  formik,
  name,
  label,
  as: Control = 'input',
  className = '',
  children,
  ...props
}) {
  const { t } = useTranslation();
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <Control
        id={name}
        {...formik.getFieldProps(name)}
        aria-invalid={Boolean(error)}
        className={`${baseClass} ${error ? errorClass : normalClass}`}
        {...props}
      >
        {children}
      </Control>
      {error && <p className="mt-1 text-xs text-red-600">{t(error)}</p>}
    </div>
  );
}
