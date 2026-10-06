import { Link } from 'react-router-dom';
import Container from '../ui/Container';

export default function PageHero({
  breadcrumbs = [],
  eyebrow,
  title,
  subtitle,
  image = '/images/hero/hero-editorial.png',
  imageAlt = '',
  showImage = true,
  className = '',
}) {
  return (
    <section
      className={`relative overflow-hidden bg-neutral-50 pt-36 pb-20 text-primary-900 border-b border-neutral-200 ${className}`}
    >
      {/* خلفية معمارية هندسية على الجانب الأيمن مع تدرج شفاف ونظيف */}
      {showImage && image && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neutral-50/80 to-neutral-50 z-10" />
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover object-center opacity-60 mix-blend-multiply"
          />
        </div>
      )}

      <Container className="relative z-20">
        <div className="max-w-2xl">
          {/* مسار التنقل (Breadcrumb) */}
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-neutral-400 mb-6"
            >
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {isLast || !crumb.to ? (
                      <span className="text-primary-900 font-medium">{crumb.label}</span>
                    ) : (
                      <Link to={crumb.to} className="hover:text-primary-900 transition-colors">
                        {crumb.label}
                      </Link>
                    )}
                    {!isLast && <span>/</span>}
                  </span>
                );
              })}
            </nav>
          )}

          {/* العنوان التمهيدي (Eyebrow) */}
          {eyebrow && (
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-900" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-900 rtl:normal-case rtl:tracking-normal">
                {eyebrow}
              </span>
            </div>
          )}

          {/* العنوان الرئيسي */}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary-900 md:text-5xl font-heading">
            {title}
          </h1>

          {/* الوصف */}
          {subtitle && (
            <p className="mt-5 text-neutral-500 font-body text-base md:text-lg leading-relaxed font-light">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}