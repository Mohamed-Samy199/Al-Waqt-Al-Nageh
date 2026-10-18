import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';

export default function CvUpload({ file, onChange, error }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  // when the form is reset (file back to null), clear the native input too
  useEffect(() => {
    if (!file && inputRef.current) inputRef.current.value = '';
  }, [file]);

  return (
    <div>
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary-700 rtl:normal-case rtl:tracking-normal">
        {t('careers.apply.form.cv')}
      </span>
      <label
        className={`flex cursor-pointer items-center gap-4 rounded-lg border border-dashed bg-white px-4 py-4 transition hover:border-accent ${
          error ? 'border-red-400' : 'border-neutral-300'
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          <Upload size={20} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-primary-900">
            {file ? file.name : t('careers.apply.form.cvChoose')}
          </span>
          <span className="mt-0.5 block text-xs text-neutral-500">{t('careers.apply.form.cvHint')}</span>
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </label>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{t(error)}</span>}
    </div>
  );
}
