import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SLIDE_DURATION = 5000;

const slides = [
  {
    id: "editorial",
    type: "image",
    src: "/images/hero/hero-editorial.png",
    ar: {
      eyebrow: "الوقت الناجح للإنشاءات والمباني",
      title: "الناجح... بالوقت نبني و بالجودة ننجح",
      description:
        "خبرة تمتد لأكثر من 40 عامًا في تنفيذ المشاريع الإنشائية الكبرى في الكويت والمملكة العربية السعودية.",
    },
    en: {
      eyebrow: "AL NAGEH CONSTRUCTION & BUILDINGS",
      title: "Al-Nageh... Building with time, succeeding with quality.",
      description:
        "More than 40 years of experience delivering landmark construction projects across Kuwait and Saudi Arabia.",
    },
  },
  {
    id: "daylight",
    type: "video",
    src: "/images/hero/hero-daylight.mp4",
    poster: "/images/hero/hero-daylight.png",
    ar: {
      eyebrow: "تميّز هندسي",
      title: "مساحات تليق بالمستقبل",
      description:
        "نحوّل الرؤية المعمارية إلى مشاريع متكاملة تجمع بين الجودة والدقة والاستدامة.",
    },
    en: {
      eyebrow: "ENGINEERING EXCELLENCE",
      title: "Spaces designed for what comes next.",
      description:
        "We turn architectural vision into integrated projects shaped by quality, precision, and lasting value.",
    },
  },
  {
    id: "composite",
    type: "video",
    src: "/images/hero/hero-composite.mp4",
    poster: "/images/hero/hero-composite.png",
    ar: {
      eyebrow: "إرث من المعالم",
      title: "من الكويت إلى السعودية",
      description:
        "مشاريع بارزة صنعت حضورًا حقيقيًا في الأبراج، المؤسسات، الواجهات البحرية، والمشروعات التجارية.",
    },
    en: {
      eyebrow: "A LEGACY OF LANDMARKS",
      title: "From Kuwait to Saudi Arabia.",
      description:
        "Landmark work across towers, institutions, waterfronts, commercial destinations, and more.",
    },
  },
];

export default function Hero() {
  const { i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const isArabic = i18n.language?.toLowerCase().startsWith("ar");
  const language = isArabic ? "ar" : "en";
  const activeSlide = slides[activeIndex];
  const copy = activeSlide[language];

  // Advance to the next slide automatically every SLIDE_DURATION ms.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  // Jump straight to a given slide (used by the clickable progress dots)
  // and restart its 7s timer -- changing activeIndex re-triggers the
  // effect above automatically since it's in the dependency array.
  const goToSlide = (index) => setActiveIndex(index);

  // Play only the active video; pause and reset the others.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={
        isArabic ? "الواجهة الرئيسية لشركة الوقت الناجح" : "Al Nageh main hero"
      }
      className="relative isolate min-h-[720px] overflow-hidden bg-primary-900 text-white md:min-h-[min(820px,100svh)]"
    >
      {/*
        Media layer.
        Every slide is shot/composed with the empty (negative) space on the
        LEFT side of the frame -- that's where the English copy sits by default.
        When the site is in Arabic, we flip the whole media horizontally
        (-scale-x-100) so the empty space moves to the RIGHT, and the copy
        block below moves with it automatically (see the copy block below).
      */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const mediaClass = [
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            isActive ? "opacity-100" : "opacity-0",
            // Ken Burns "drone push-in" zoom, only for the first (image) slide.
            isActive && slide.type === "image" ? "animate-aerial-push" : "",
            isActive && slide.type === "video" ? "animate-video-settle" : "",
          ].join(" ");

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 overflow-hidden ${isArabic ? "-scale-x-100" : ""} ${isActive ? "z-10" : "z-0"}`}
            >
              {slide.type === "video" ? (
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  className={mediaClass}
                  src={slide.src}
                  poster={slide.poster}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              ) : (
                <img
                  className={mediaClass}
                  src={slide.src}
                  alt=""
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Directional scrim so copy stays readable over the empty side of the frame */}
      <div
        className={`absolute inset-0 -z-10 ${
          isArabic
            ? "bg-[linear-gradient(270deg,rgba(1,10,82,0.82)_0%,rgba(1,10,82,0.62)_24%,rgba(1,10,82,0.2)_58%,rgba(1,10,82,0.05)_100%),linear-gradient(180deg,rgba(1,10,82,0.1),rgba(1,10,82,0.24))]"
            : "bg-[linear-gradient(90deg,rgba(1,10,82,0.82)_0%,rgba(1,10,82,0.62)_24%,rgba(1,10,82,0.2)_58%,rgba(1,10,82,0.05)_100%),linear-gradient(180deg,rgba(1,10,82,0.1),rgba(1,10,82,0.24))]"
        }`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(135deg,transparent_0_49.7%,rgba(255,255,255,0.23)_49.8%_50%,transparent_50.1%),linear-gradient(90deg,transparent_0_14%,rgba(255,255,255,0.12)_14.1%_14.2%,transparent_14.3%)] [mask-image:linear-gradient(90deg,#000_0%,transparent_52%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-[-8%] bottom-[5.5%] -z-10 h-[2px] rotate-[-3deg] bg-accent-bright shadow-[0_0_22px_rgba(255,205,92,0.6)]"
        aria-hidden="true"
      />

      {/*
        Copy block.
        FIX: always `justify-start`, never a language-based justify-end/start
        switch. The <section> above sets dir="rtl"/"ltr", and `direction` is
        an inherited CSS property, so flexbox's "start" side automatically
        flips with it: under ltr, flex-start = left; under rtl,
        flex-start = right. So plain `justify-start` alone lands the block
        on the left for English and on the right for Arabic -- exactly the
        empty side of the (mirrored) media. Using `justify-end` for Arabic
        was the bug: under rtl, flex-end resolves to the LEFT, not the right.
      */}
      <div className="mx-auto flex min-h-[720px] w-[calc(100%-36px)] items-end justify-start pb-[145px] md:min-h-[min(820px,100svh)] md:w-[min(1280px,calc(100%-48px))] md:items-center md:pb-0">
        <div
          key={`${activeSlide.id}-${language}`}
          className={`w-full max-w-[570px] animate-copy-reveal ${isArabic ? "text-right" : "text-left"}`}
        >
          <span className="mb-[18px] block font-heading text-xs font-semibold tracking-[0.18em] text-accent-bright">
            {/* {copy.eyebrow} */}
          </span>
          <h1 className="m-0 max-w-[690px] font-arHeading text-[clamp(36px,11vw,54px)] font-extrabold leading-[1.08] tracking-[-0.04em] md:text-[clamp(38px,5vw,76px)] mt-16">
            {copy.title}
          </h1>
          <p className="mt-[17px] max-w-[500px] font-arBody text-base leading-[1.9] text-white/80 md:mt-6 md:text-xl">
            {copy.description}
          </p>
          <div className="mt-[26px] flex flex-wrap gap-3 md:mt-[34px]">
            <a
              className="inline-flex min-h-[52px] items-center justify-center rounded-sm bg-accent-bright px-[25px] font-arBody font-bold text-primary-900 shadow-[0_8px_30px_rgba(255,205,92,0.2)] transition hover:-translate-y-0.5 hover:bg-accent-glow"
              href="#projects"
            >
              {isArabic ? "استكشف مشاريعنا" : "Explore our projects"}
            </a>
            <a
              className="inline-flex min-h-[52px] items-center justify-center rounded-sm border border-white/50 bg-white/[0.04] px-[25px] font-arBody font-bold text-white transition hover:-translate-y-0.5 hover:border-accent-bright hover:bg-accent-bright/15"
              href="#contact"
            >
              {isArabic ? "تواصل معنا" : "Get in touch"}
            </a>
          </div>
        </div>
      </div>

      {/*
        Slide progress dots. Each dash fills white, over exactly
        SLIDE_DURATION -- finishing right as that slide ends.
      */}
      <div className="absolute bottom-[27px] left-[18px] right-[18px] z-20 flex items-center justify-start md:bottom-[38px] md:left-[max(24px,calc((100%-1280px)/2))] md:right-[max(24px,calc((100%-1280px)/2))]">
        <div
          className="flex gap-[9px]"
          role="tablist"
          aria-label={isArabic ? "شرائح الواجهة الرئيسية" : "Hero slides"}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${isArabic ? "الشريحة" : "Slide"} ${index + 1}`}
              className="block h-[3px] w-[38px] cursor-pointer overflow-hidden bg-white/25 transition-colors hover:bg-white/40 md:w-[54px]"
            >
              <span
                className={`block h-full bg-white ${index === activeIndex ? "animate-progress" : "w-0"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
