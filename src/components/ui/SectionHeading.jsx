export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-2xl mb-12 ${alignment}`}>
      {eyebrow && (
        <span className="text-accent font-semibold text-sm uppercase tracking-wide">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2">
        {title}
      </h2>
      {subtitle && <p className="text-neutral-500 mt-4 text-lg">{subtitle}</p>}
    </div>
  );
}
