import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const toggle = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 border border-neutral-200 rounded-md text-sm font-medium hover:bg-neutral-50"
    >
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
