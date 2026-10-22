import { useTranslation } from 'react-i18next';

const milestoneKeys = ['begin', 'expand', 'impact', 'future'];

// Gold "step" outline that traces just the two chamfered corners (drawn
// separately from the card because clip-path alone can't leave a visible
// stroke along the cut). Mirrors to the opposite corners for Arabic.
function ChamferOutline({ mirrored }) {
  const d = mirrored ? 'M16,4 L4,14 L4,86 L16,96' : 'M84,4 L96,14 L96,86 L84,96';
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function TimelineArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function StoryHero() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');

  // إنجليزي: النص يدخل من الشمال لموضعه | عربي: من اليمين لموضعه
  const fromStart = isArabic ? 'fade-left' : 'fade-right';

  // The card's two "far" corners are chamfered. In ltr that's the right
  // side; under rtl the whole composition mirrors (image/card swap sides
  // via logical properties below), so the chamfer needs to mirror too --
  // clip-path coordinates are physical, so we flip them by hand for rtl.
  const cardClipPath = isArabic
    ? 'polygon(100% 0, 12% 0, 0 13%, 0 87%, 12% 100%, 100% 100%)'
    : 'polygon(0 0, 88% 0, 100% 13%, 100% 87%, 88% 100%, 0 100%)';

  // Mobile image: fixed-pixel chamfers (so the cut stays a clean 45deg
  // whatever the image height is) on two opposite corners, mirrored for rtl.
  const mobileImageClipPath = isArabic
    ? 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)'
    : 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))';

  return (
    <section className="relative overflow-hidden bg-neutral-50">
      <div className="mx-auto max-w-[1536px] px-6 lg:px-10">
        {/* Story area */}
        <div className="relative lg:min-h-[620px]">
          {/*
            Background illustration (desktop): bleeds from the viewport's outer edge
            up to where the card begins. `insetInlineStart`/`insetInlineEnd`
            (not left/right) so this flips sides automatically for Arabic,
            same trick used for the About section's image bleed.

            `animate-gentle-zoom` (defined in tailwind.config.js) gives it
            the same slow zoom-in/zoom-out pulse as the AboutPreview image
            on the home page -- the wrapper's overflow-hidden keeps the
            scaled-up image from spilling past its box.
          */}
          <div
            className="absolute bottom-0 top-0 hidden overflow-hidden lg:block"
            style={{
              insetInlineStart: 'calc((1536px - 100vw) / 2)',
              insetInlineEnd: '460px',
            }}
          >
            <img
              src="/images/about/story-bg.png"
              alt={t('aboutPage.storyImageAlt')}
              className="h-full w-full animate-gentle-zoom object-cover object-left rtl:object-right"
            />
          </div>

          {/* Mobile image: shown in full (natural aspect ratio, no cropping),
              with chamfered corners + an offset gold frame to echo the
              desktop design. */}
          <div className="relative block pb-3 pe-3 lg:hidden">
            {/* offset gold frame peeking out behind the image */}
            {/* <div
              className="pointer-events-none absolute bottom-0 end-0 start-3 top-3 border border-accent/60"
              aria-hidden="true"
            /> */}
            <div
              className="relative overflow-hidden bg-neutral-100"
              style={{ clipPath: mobileImageClipPath }}
            >
              <img
                src="/images/about/story-bg.png"
                alt={t('aboutPage.storyImageAlt')}
                className="block h-auto w-full animate-gentle-zoom"
              />
            </div>
          </div>

          {/* Story card -- ms-auto (not ml-auto) so it sits at the inline-end
              side for both languages: right in English, left in Arabic.
              On mobile it overlaps the bottom of the image (-mt-10). */}
          <div className="relative z-10 -mt-10 ms-auto w-full max-w-[460px] lg:mt-0">
            <div
              className="relative min-h-0 bg-white px-9 py-12 sm:px-11 sm:py-14 lg:min-h-[620px]"
              style={{ clipPath: cardClipPath }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[1.5px] w-6 bg-accent" />
                <span
                  data-aos="fade-down"
                  className="text-xl font-bold uppercase tracking-[0.25em] text-accent rtl:normal-case rtl:tracking-normal"
                >
                  {t('aboutPage.storyEyebrow')}
                </span>
              </div>

              <h2
                data-aos={fromStart}
                data-aos-delay="100"
                className="text-[32px] font-extrabold leading-[1.2] text-primary-900 sm:text-[40px]"
              >
                {t('aboutPage.storyTitleLine1')}
                <br />
                {t('aboutPage.storyTitleLine2')}
                <span className="text-accent">.</span>
              </h2>

              <span className="mt-7 block h-[2px] w-12 bg-accent" />

              <p
                data-aos={fromStart}
                data-aos-delay="250"
                className="mt-7 max-w-[360px] text-[15px] leading-[1.95] text-neutral-700"
              >
                {t('aboutPage.storyText1')}
              </p>
              <p
                data-aos={fromStart}
                data-aos-delay="350"
                className="mt-3 max-w-[360px] text-[15px] leading-[1.95] text-neutral-700"
              >
                {t('aboutPage.storyText2')}
              </p>

              {/* extra bottom room on mobile so the footer ornament doesn't touch the text */}
              <div className="h-8 lg:hidden" />

              <div className="absolute bottom-5 start-9 end-[4.5rem] flex items-center gap-4 sm:start-11">
                <span className="h-2.5 w-2.5 bg-accent" />
                <span className="h-px flex-1 bg-accent/50" />
              </div>
            </div>

            <div className="text-accent">
              <ChamferOutline mirrored={isArabic} />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-14 lg:mt-20">
          <div className="absolute top-[9px] start-0 end-[6%] h-px bg-accent/40" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {milestoneKeys.map((key, index) => (
              <div key={key} className="relative pt-9">
                <span className="absolute start-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-accent bg-neutral-50">
                  <span className="h-[6px] w-[6px] rounded-full bg-accent" />
                </span>

                <span
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  className="mb-1 block text-[13px] font-bold tracking-[0.1em] text-accent"
                >
                  {t(`aboutPage.milestones.${key}.era`)}
                </span>
                <h4
                  data-aos="fade-up"
                  data-aos-delay={index * 200 + 100}
                  className="mb-2.5 text-[17px] font-bold text-primary-900"
                >
                  {t(`aboutPage.milestones.${key}.title`)}
                </h4>
                <p
                  data-aos="fade-up"
                  data-aos-delay={index * 200 + 200}
                  className="max-w-[230px] text-[13.5px] leading-[1.8] text-neutral-500"
                >
                  {t(`aboutPage.milestones.${key}.text`)}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute -end-1 top-0 hidden text-accent lg:block">
            <TimelineArrow />
          </div>
        </div>
      </div>
    </section>
  );
}