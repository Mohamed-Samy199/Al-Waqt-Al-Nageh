import { useTranslation } from 'react-i18next';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  animate = true, // ابعت animate={false} لو عايز تقفل التأثير في مكان معين
}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  // إنجليزي: النص يدخل من الشمال لموضعه | عربي: من اليمين لموضعه
  const fromStart = isArabic ? 'fade-left' : 'fade-right';

  const aos = (type, delay = 0) =>
    animate ? { 'data-aos': type, 'data-aos-delay': delay } : {};

  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-2xl mb-12 ${alignment}`}>
      {eyebrow && (
        <span
          {...aos('fade-down')}
          className="block text-accent font-semibold text-sm uppercase tracking-wide"
        >
          {eyebrow}
        </span>
      )}
      <h2
        {...aos(fromStart, 100)}
        className="text-3xl md:text-4xl font-bold text-primary-900 mt-2"
      >
        {title}
      </h2>
      {subtitle && (
        <p {...aos(fromStart, 250)} className="text-neutral-500 mt-4 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}