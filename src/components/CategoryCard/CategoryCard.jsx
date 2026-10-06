import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import categoryIcons from './CategoryIcons';

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      // The arrow points "forward", so it flips with the reading direction.
      className="rtl:-scale-x-100"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function CategoryCard({ category, index }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  // Cards 2, 4, 6 use the dark panel.
  const isDark = index % 2 === 1;

  // useId returns something like ":r1:" -- colons are not safe inside url(#...),
  // so strip them. Keeps the id unique even if a card is rendered twice.
  const uid = useId().replace(/:/g, '');
  const clipPathId = `category-panel-${uid}`;

  // English label shown as a small sub-label in Arabic mode only
  // (in English it would just repeat the title).
  const englishLabel = isArabic
    ? i18n.getFixedT('en')(`categories.${category.key}`)
    : null;

  // The whole card is drawn for LTR (panel on the start side, image tilting
  // away from it). In RTL we mirror the geometry: panel on the right, image
  // tilted the opposite way, both clip shapes flipped horizontally.
  const imageTransform = isArabic
    ? 'origin-left [transform:perspective(1200px)_rotateY(14deg)] group-hover:[transform:perspective(1200px)_rotateY(9deg)]'
    : 'origin-right [transform:perspective(1200px)_rotateY(-14deg)] group-hover:[transform:perspective(1200px)_rotateY(-9deg)]';

  const imageClip = isArabic
    ? '[clip-path:polygon(0_0,100%_9%,100%_91%,0_100%)]'
    : '[clip-path:polygon(0_9%,100%_0,100%_100%,0_91%)]';

  return (
    <Link
      to={`/projects?category=${category.key}`}
      className="group relative isolate block h-[300px] transform-gpu transition-transform duration-500 hover:z-20 hover:-translate-y-2 sm:h-[310px]"
    >
      {/* Organic "hill" shape used to cut the front panel */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path
              // Mirrored horizontally for Arabic.
              transform={isArabic ? 'translate(1 0) scale(-1 1)' : undefined}
              d="
                M 0 0.17
                C 0 0.07, 0.08 0.015, 0.19 0.015
                L 0.46 0.045
                C 0.58 0.06, 0.65 0.16, 0.69 0.29
                L 0.84 0.86
                C 0.87 0.93, 0.80 0.93, 0.68 0.94

                L 0.12 1

                C 0.04 1, 0 0.94, 0 0.84
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Image: fills the card and tilts away from the panel */}
      <div
        className={[
          'absolute inset-0 z-[1]',
          imageTransform,
          'transition-transform duration-700 ease-out',
          'drop-shadow-[0_22px_28px_rgba(7,31,76,0.22)]',
        ].join(' ')}
      >
        <img
          src={category.image}
          alt=""
          loading="lazy"
          className={`h-full w-full rounded-[28px] object-cover ${imageClip}`}
        />
      </div>

      {/* Front panel: wrapper carries the shadow, inner div carries the clip-path */}
      <div className="absolute inset-y-0 start-0 z-[4] w-[64%] drop-shadow-[0_10px_18px_rgba(7,31,76,0.10)] transition-all duration-500 group-hover:w-[67%]">
        <div
          style={{ clipPath: `url(#${clipPathId})` }}
          className={[
            'relative h-full w-full',
            isDark
              ? 'bg-primary-900/90 text-white'
              : 'bg-white/90 text-primary-900',
          ].join(' ')}
        >
          <div className="absolute inset-y-0 start-0 flex w-[74%] flex-col items-start px-5 py-7 sm:px-7 sm:py-8">
            {/* Icon */}
            <div className="mb-5 h-10 w-10 sm:mb-7 sm:h-11 sm:w-11">
              {categoryIcons[category.key]}
            </div>

            {/* Category name */}
            <h3 className="max-w-[125px] text-[18px] font-extrabold leading-[1.35] sm:text-[21px]">
              {t(`categories.${category.key}`)}
            </h3>

            {/* English sub-label (Arabic mode only) */}
            {englishLabel && (
              <span
                dir="ltr"
                className="mt-2 text-[9px] font-medium uppercase tracking-[0.25em] opacity-70"
              >
                {englishLabel}
              </span>
            )}

            {/* Arrow button */}
            <span className="absolute bottom-6 start-5 flex h-10 w-10 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}