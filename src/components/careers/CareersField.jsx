import { useTranslation } from 'react-i18next';

const baseClass =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary-900 outline-none transition placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

export const fieldClass = (hasError) =>
  `${baseClass} ${hasError ? 'border-red-400' : 'border-neutral-200'}`;

// Label + control + error message (error is an i18n key)
export function FieldShell({ label, error, className = '', children }) {
  const { t } = useTranslation();

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary-700 rtl:normal-case rtl:tracking-normal">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{t(error)}</span>}
    </label>
  );
}

// FieldShell wired to a Formik instance
export default function CareersField({
  formik,
  name,
  label,
  as: Control = 'input',
  className = '',
  inputClassName = '',
  children,
  ...props
}) {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <FieldShell label={label} error={error} className={className}>
      <Control
        {...formik.getFieldProps(name)}
        aria-invalid={Boolean(error)}
        className={`${fieldClass(error)} ${inputClassName}`}
        {...props}
      >
        {children}
      </Control>
    </FieldShell>
  );
}
