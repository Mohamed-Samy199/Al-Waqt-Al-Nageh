import { useTranslation } from 'react-i18next';
import SectionHeading from '../ui/SectionHeading';

function EyeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

// Faint blueprint-style lines fading in from the card's chamfered corner.
// Physical paths drawn for the end (right) corner; rtl:-scale-x-100 on the
// wrapper flips the whole composition to the start (left) corner for Arabic.
function ArchitecturalDetail() {
  return (
    <div className="pointer-events-none absolute bottom-0 end-0 h-[75%] w-[58%] overflow-hidden rtl:-scale-x-100">
      <svg viewBox="0 0 500 420" className="h-full w-full" fill="none" aria-hidden="true">
        <path d="M180 430L500 110" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        <path d="M240 430L500 170" stroke="currentColor" strokeWidth="1" opacity="0.12" />
        <path d="M300 430L500 230" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        <path d="M100 340H500" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
        <path d="M140 370H500" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
        <path d="M190 400H500" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
        <circle cx="395" cy="250" r="115" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
        <circle cx="395" cy="250" r="78" stroke="currentColor" strokeWidth="0.8" opacity="0.07" />
        <circle cx="395" cy="250" r="42" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
        <circle cx="280" cy="365" r="3" fill="currentColor" opacity="0.18" />
        <circle cx="350" cy="295" r="3" fill="currentColor" opacity="0.14" />
        <circle cx="430" cy="215" r="3" fill="currentColor" opacity="0.12" />
        <path d="M330 420L500 250" stroke="currentColor" strokeWidth="0.6" opacity="0.08" />
        <path d="M380 420L500 300" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
        <path d="M430 420L500 350" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
        <path d="M325 420V300" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
        <path d="M355 420V275" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
        <path d="M385 420V250" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
      </svg>
    </div>
  );
}

function VisionMissionCard({ id, titleKey, textKey, Icon, dark, isArabic }) {
  // Both "far" corners are chamfered -- the end side (right) in English,
  // the start side (left) in Arabic. Same mirrored-clip-path trick used on
  // the Our Story card.
  const clipPath = isArabic
    ? 'polygon(100% 0, 8% 0, 0 10%, 0 90%, 9% 100%, 100% 100%)'
    : 'polygon(0 0, 92% 0, 100% 10%, 100% 90%, 91% 100%, 0 100%)';

  return (
    <article
      className={`group relative min-h-[390px] overflow-hidden px-8 py-9 sm:px-10 sm:py-10 lg:min-h-[410px] lg:px-12 lg:py-11 ${
        dark ? 'bg-primary-900 text-white' : 'bg-white text-primary-900'
      }`}
      style={{ clipPath }}
    >
      <div className={dark ? 'text-accent' : 'text-primary-900'}>
        <ArchitecturalDetail />
      </div>

      {/* Large faint background number */}
      <span
        className={`pointer-events-none absolute -bottom-8 end-5 text-[150px] font-black leading-none ${
          dark ? 'text-white/[0.06]' : 'text-primary-900/[0.06]'
        }`}
      >
        {id}
      </span>

      {/* Corner accent lines, following the chamfer */}
      <div className="pointer-events-none absolute end-0 top-0 text-accent rtl:-scale-x-100">
        <svg width="95" height="95" viewBox="0 0 95 95" fill="none" aria-hidden="true">
          <path d="M15 0L95 80" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 0L95 65" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-0 end-0 text-accent rtl:-scale-x-100">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" aria-hidden="true">
          <path d="M100 0V95L70 120" stroke="currentColor" strokeWidth="1.2" />
          <path d="M100 15V88L78 110" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border border-accent ${dark ? 'text-white' : 'text-accent'}`}>
          <Icon />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-[15px] font-bold tracking-[0.08em] text-accent">{id}</span>
          <span className="h-[1.5px] w-10 bg-accent" />
        </div>

        <h3 className={`mt-3 text-[25px] font-bold tracking-[0.02em] sm:text-[27px] ${dark ? 'text-white' : 'text-primary-900'}`}>
          {titleKey}
        </h3>

        <p className={`mt-5 max-w-[500px] text-[14px] leading-[1.9] sm:text-[14.5px] ${dark ? 'text-white/75' : 'text-neutral-500'}`}>
          {textKey}
        </p>

        <div className="absolute start-0 top-[365px] flex items-center gap-0">
          <span className="h-2.5 w-2.5 bg-accent" />
          <span className="h-px w-36 bg-accent" />
        </div>
      </div>
    </article>
  );
}

export default function VisionMissionSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 sm:py-10 lg:py-12">
      {/* Decorative perspective grid + soft light, purely cosmetic */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute bottom-0 start-0 end-0 h-[35%] opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #8b93a1 1px, transparent 1px), linear-gradient(to bottom, #8b93a1 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            transform: 'perspective(500px) rotateX(55deg) scale(1.5)',
            transformOrigin: 'bottom',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-6 lg:px-10">
        <div className="mb-14 text-center sm:mb-16">
          <SectionHeading title={t('aboutPage.visionMissionHeading')} />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_55px_1fr] lg:items-center lg:gap-0">
          <VisionMissionCard
            id="01"
            titleKey={t('aboutPage.visionTitle')}
            textKey={t('aboutPage.visionText')}
            Icon={EyeIcon}
            dark
            isArabic={isArabic}
          />

          <div className="relative z-20 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center text-accent lg:h-14 lg:w-14">
              <PlusIcon />
            </div>
          </div>

          <VisionMissionCard
            id="02"
            titleKey={t('aboutPage.missionTitle')}
            textKey={t('aboutPage.missionText')}
            Icon={TargetIcon}
            dark={false}
            isArabic={isArabic}
          />
        </div>
      </div>
    </section>
  );
}