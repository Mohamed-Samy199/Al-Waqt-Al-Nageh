// import { useTranslation } from 'react-i18next';
// import Container from '../ui/Container';

// const safetyItems = [
//   { key: 'siteSafetyPlan', image: '/images/categories/governmental.png' },
//   { key: 'ppe', image: '/images/categories/towers.png' },
//   { key: 'formworkInspection', image: '/images/categories/commercial.png' },
//   { key: 'testing', image: '/images/categories/health.png' },
//   { key: 'inspectionSignOff', image: '/images/categories/coastal.png' },
//   { key: 'reporting', image: '/images/categories/airports.png' },
// ];

// export default function ServicesSafetyQuality() {
//   const { t } = useTranslation();

//   return (
//     <section className="bg-white py-16 md:py-24">
//       <Container>
//         <div className="mb-10 max-w-3xl">
//           <div className="mb-4 flex items-center gap-3">
//             <span className="h-px w-10 bg-accent" />
//             <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary-700 rtl:normal-case rtl:tracking-normal">
//               {t('servicesPage.safety.eyebrow')}
//             </span>
//           </div>
//           <h2 className="text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl">
//             {t('servicesPage.safety.title')}
//           </h2>
//           <p className="mt-5 text-lg leading-8 text-neutral-500">{t('servicesPage.safety.subtitle')}</p>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {safetyItems.map(({ key, image }, index) => (
//             <article
//               key={key}
//               className="group relative overflow-hidden border border-neutral-200 bg-neutral-50 p-6 transition-colors duration-300 hover:border-primary-200 hover:bg-primary-50/40"
//             >
//               <div className="mb-8 flex items-center justify-between border-s-2 border-primary-900 ps-4">
//                 <h3 className="text-base font-bold leading-6 text-primary-900">
//                   {t(`servicesPage.safety.items.${key}.title`)}
//                 </h3>
//                 <span className="font-mono text-xs font-bold tracking-widest text-accent">0{index + 1}</span>
//               </div>
//               <p className="max-w-sm text-sm leading-7 text-neutral-600">
//                 {t(`servicesPage.safety.items.${key}.text`)}
//               </p>
//               <div className="mt-8 h-1 w-12 bg-accent transition-all duration-300 group-hover:w-20" />
//             </article>
//           ))}
//         </div>

//         <div className="mt-5 grid h-36 gap-4 sm:grid-cols-3">
//           {safetyItems.slice(0, 3).map(({ key, image }) => (
//             <div key={key} className="relative overflow-hidden bg-primary-900">
//               <img
//                 src={image}
//                 alt=""
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-full object-cover opacity-80 grayscale transition duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-primary-900/45 to-transparent" />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }








// import { useTranslation } from 'react-i18next';
// import Container from '../ui/Container';

// const safetyItems = [
//   { key: 'siteSafetyPlan', image: '/images/categories/governmental.png' },
//   { key: 'ppe', image: '/images/categories/towers.png' },
//   { key: 'formworkInspection', image: '/images/categories/commercial.png' },
//   { key: 'testing', image: '/images/categories/health.png' },
//   { key: 'inspectionSignOff', image: '/images/categories/coastal.png' },
//   { key: 'reporting', image: '/images/categories/airports.png' },
// ];

// /* ---------- Geometry (viewBox 1000 x 1000) ---------- */
// const C = 500;
// const R_OUT = 480; // الحافة الخارجية
// const R_IN = 170; // فتحة النص
// const START = -90; // أول قطاع يبدأ من فوق ويلف مع عقارب الساعة
// const N = safetyItems.length;
// const STEP = 360 / N; // 60° لكل قطاع
// const OVERLAP = 32; // كم درجة القطاع بيمتد تحت القطاع اللي بعده
// const SPAN = STEP + OVERLAP;

// /* ---------- القطاعات المرفوعة (من 1 لـ 6) ---------- */
// const FIRST_LIFT = 90; // القطاع الأول
// const SECOND_LIFT = FIRST_LIFT * 2; // التاني بضعف الأول
// const THIRD_LIFT = 130; // التالت أقرب لمكانه الأصلي
// const FOURTH_LIFT = 110; // الرابع
// const FIFTH_LIFT = 110; // الخامس
// const SIXTH_LIFT = 110; // السادس
// const LIFTS = [FIRST_LIFT, SECOND_LIFT, THIRD_LIFT, FOURTH_LIFT, FIFTH_LIFT, SIXTH_LIFT];

// const SECOND_UP = 70; // رفع التاني لفوق
// const THIRD_UP = 40; // رفع التالت لفوق
// const FOURTH_UP = -40; // رفع الرابع (سالب = ينزل)
// const FIFTH_UP = -80; // رفع الخامس
// const SIXTH_UP = -70; // رفع السادس
// const UPS = [0, SECOND_UP, THIRD_UP, FOURTH_UP, FIFTH_UP, SIXTH_UP];

// const THIRD_RIGHT = 100; // زحزحة التالت لليمين
// const FOURTH_RIGHT = 120; // زحزحة الرابع
// const FIFTH_RIGHT = 50; // زحزحة الخامس
// const SIXTH_RIGHT = -20; // زحزحة السادس (موجب = يمين، سالب = شمال)
// const RIGHTS = [0, 0, THIRD_RIGHT, FOURTH_RIGHT, FIFTH_RIGHT, SIXTH_RIGHT];

// // ترتيب الرسم من تحت لفوق: الأول، السادس، الخامس، الرابع، التالت، والتاني فوق الكل
// const LIFT_ORDER = [0, 5, 4, 3, 2, 1];

// // إزاحة كل قطاع في اتجاه منتصفه
// const liftVector = (index, dist) => {
//   const a = ((START + index * STEP + STEP / 2) * Math.PI) / 180;
//   return [dist * Math.cos(a), dist * Math.sin(a)];
// };

// /* ---------- Border ---------- */
// const BORDER_COLOR = '#d6eaff'; // أزرق فاتح مبيض
// const BORDER_OPACITY = 0.7;
// const BORDER_W = 14;

// /* ---------- Depth ---------- */
// const SHADOW_BLUR = 18; // ظل القطاعات المرفوعة
// const SHADOW_OPACITY = 0.5;

// /* ---------- الطبقة الزرقاء المتدرجة ---------- */
// const TINT_TOP = 0.15; // شفافية الطبقة من فوق (0 = مخفية)
// const TINT_BOTTOM = 0.65; // شفافية الطبقة من تحت (أقوى)
// const SATURATION = 0.75; // تشبّع الصورة وهي مغطاة (1 = طبيعي)

// const rad = (d) => (d * Math.PI) / 180;
// const pt = (r, a) => [C + r * Math.cos(rad(a)), C + r * Math.sin(rad(a))];
// const f = (n) => n.toFixed(2);

// const segments = safetyItems.map((item, i) => {
//   const a0 = START + i * STEP;
//   const a1 = a0 + SPAN;

//   const [ox1, oy1] = pt(R_OUT, a0);
//   const [ox2, oy2] = pt(R_OUT, a1);
//   const [ix2, iy2] = pt(R_IN, a1);
//   const [ix1, iy1] = pt(R_IN, a0);

//   const d =
//     `M${f(ox1)} ${f(oy1)} A${R_OUT} ${R_OUT} 0 0 1 ${f(ox2)} ${f(oy2)} ` +
//     `L${f(ix2)} ${f(iy2)} A${R_IN} ${R_IN} 0 0 0 ${f(ix1)} ${f(iy1)} Z`;

//   const xs = [];
//   const ys = [];
//   for (let k = 0; k <= 30; k++) {
//     const a = a0 + (SPAN * k) / 30;
//     const [x1, y1] = pt(R_OUT, a);
//     const [x2, y2] = pt(R_IN, a);
//     xs.push(x1, x2);
//     ys.push(y1, y2);
//   }
//   const x = Math.min(...xs);
//   const y = Math.min(...ys);

//   return { ...item, d, x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
// });

// function Piece({ s, clip }) {
//   return (
//     <g filter="url(#safety-shadow)" className="group cursor-pointer">
//       <g clipPath={`url(#${clip})`}>
//         {/* الصورة: باهتة شوية وهي مغطاة، وترجع لطبيعتها مع الـ hover */}
//         <image
//           href={s.image}
//           x={s.x}
//           y={s.y}
//           width={s.w}
//           height={s.h}
//           preserveAspectRatio="xMidYMid slice"
//           style={{ filter: `saturate(${SATURATION})` }}
//           className="transition-[filter] duration-500 group-hover:![filter:saturate(1)]"
//         />
//         {/* الطبقة الزرقاء المتدرجة: بتختفي مع الـ hover */}
//         <rect
//           x={s.x}
//           y={s.y}
//           width={s.w}
//           height={s.h}
//           fill="url(#safety-tint)"
//           className="transition-opacity duration-500 group-hover:opacity-0"
//         />
//         <path
//           d={s.d}
//           fill="none"
//           stroke={BORDER_COLOR}
//           strokeOpacity={BORDER_OPACITY}
//           strokeWidth={BORDER_W * 2}
//           strokeLinejoin="round"
//         />
//       </g>
//     </g>
//   );
// }

// export default function ServicesSafetyQuality() {
//   const { t } = useTranslation();

//   return (
//     <section className="bg-white py-16 md:py-24">
//       <Container>
//         <div className="mb-10 max-w-3xl">
//           <div className="mb-4 flex items-center gap-3">
//             <span className="h-px w-10 bg-accent" />
//             <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary-700 rtl:normal-case rtl:tracking-normal">
//               {t('servicesPage.safety.eyebrow')}
//             </span>
//           </div>
//           <h2 className="text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl">
//             {t('servicesPage.safety.title')}
//           </h2>
//           <p className="mt-5 text-lg leading-8 text-neutral-500">{t('servicesPage.safety.subtitle')}</p>
//         </div>

//         <div className="mx-auto aspect-square w-full max-w-[800px]">
//           {/* text-primary-700 هو لون الطبقة الزرقاء (stopColor="currentColor") */}
//           <svg viewBox="-160 -130 1460 1460" className="h-full w-full text-primary-700">
//             <defs>
//               <filter
//                 id="safety-shadow"
//                 filterUnits="userSpaceOnUse"
//                 x="-300"
//                 y="-300"
//                 width="1800"
//                 height="1800"
//               >
//                 <feDropShadow
//                   dx="0"
//                   dy="6"
//                   stdDeviation={SHADOW_BLUR}
//                   floodColor="#0b1b33"
//                   floodOpacity={SHADOW_OPACITY}
//                 />
//               </filter>

//               <linearGradient id="safety-tint" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0" stopColor="currentColor" stopOpacity={TINT_TOP} />
//                 <stop offset="1" stopColor="currentColor" stopOpacity={TINT_BOTTOM} />
//               </linearGradient>

//               {segments.map((s, i) => (
//                 <clipPath id={`safety-clip-${i}`} key={s.key}>
//                   <path d={s.d} />
//                 </clipPath>
//               ))}
//             </defs>

//             {/* كل القطاعات مرفوعة، بترتيب LIFT_ORDER (الأول في المصفوفة هو الأسفل) */}
//             {LIFT_ORDER.map((i) => {
//               const [vx, vy] = liftVector(i, LIFTS[i]);
//               return (
//                 <g
//                   key={segments[i].key}
//                   transform={`translate(${f(vx + RIGHTS[i])} ${f(vy - UPS[i])})`}
//                 >
//                   <Piece s={segments[i]} clip={`safety-clip-${i}`} />
//                 </g>
//               );
//             })}
//           </svg>
//         </div>
//       </Container>
//     </section>
//   );
// }

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const safetyItems = [
  { key: 'siteSafetyPlan', image: '/images/categories/governmental.png' },
  { key: 'ppe', image: '/images/categories/towers.png' },
  { key: 'formworkInspection', image: '/images/categories/commercial.png' },
  { key: 'testing', image: '/images/categories/health.png' },
  { key: 'inspectionSignOff', image: '/images/categories/coastal.png' },
  { key: 'reporting', image: '/images/categories/airports.png' },
];

/* ---------- Geometry (viewBox 1000 x 1000) ---------- */
const C = 500;
const R_OUT = 480; // الحافة الخارجية
const R_IN = 170; // فتحة النص
const START = -90; // أول قطاع يبدأ من فوق ويلف مع عقارب الساعة
const N = safetyItems.length;
const STEP = 360 / N; // 60° لكل قطاع
const OVERLAP = 32; // كم درجة القطاع بيمتد تحت القطاع اللي بعده
const SPAN = STEP + OVERLAP;

/* ---------- القطاعات المرفوعة (من 1 لـ 6) ---------- */
const FIRST_LIFT = 90; // القطاع الأول
const SECOND_LIFT = FIRST_LIFT * 2; // التاني بضعف الأول
const THIRD_LIFT = 130; // التالت أقرب لمكانه الأصلي
const FOURTH_LIFT = 110; // الرابع
const FIFTH_LIFT = 110; // الخامس
const SIXTH_LIFT = 110; // السادس
const LIFTS = [FIRST_LIFT, SECOND_LIFT, THIRD_LIFT, FOURTH_LIFT, FIFTH_LIFT, SIXTH_LIFT];

const SECOND_UP = 70; // رفع التاني لفوق
const THIRD_UP = 40; // رفع التالت لفوق
const FOURTH_UP = -40; // رفع الرابع (سالب = ينزل)
const FIFTH_UP = -80; // رفع الخامس
const SIXTH_UP = -70; // رفع السادس
const UPS = [0, SECOND_UP, THIRD_UP, FOURTH_UP, FIFTH_UP, SIXTH_UP];

const THIRD_RIGHT = 100; // زحزحة التالت لليمين
const FOURTH_RIGHT = 120; // زحزحة الرابع
const FIFTH_RIGHT = 50; // زحزحة الخامس
const SIXTH_RIGHT = -20; // زحزحة السادس (موجب = يمين، سالب = شمال)
const RIGHTS = [0, 0, THIRD_RIGHT, FOURTH_RIGHT, FIFTH_RIGHT, SIXTH_RIGHT];

// ترتيب الرسم من تحت لفوق: الأول، السادس، الخامس، الرابع، التالت، والتاني فوق الكل
const LIFT_ORDER = [0, 5, 4, 3, 2, 1];

// إزاحة كل قطاع في اتجاه منتصفه
const liftVector = (index, dist) => {
  const a = ((START + index * STEP + STEP / 2) * Math.PI) / 180;
  return [dist * Math.cos(a), dist * Math.sin(a)];
};

/* ---------- Border ---------- */
const BORDER_COLOR = '#d6eaff'; // أزرق فاتح مبيض
const BORDER_OPACITY = 0.7;
const BORDER_W = 14;

/* ---------- Depth ---------- */
const SHADOW_BLUR = 18; // ظل القطاعات المرفوعة
const SHADOW_OPACITY = 0.5;

/* ---------- الطبقة الزرقاء المتدرجة ---------- */
const TINT_TOP = 0.15; // شفافية الطبقة من فوق (0 = مخفية)
const TINT_BOTTOM = 0.65; // شفافية الطبقة من تحت (أقوى)
const SATURATION = 0.75; // تشبّع الصورة وهي مغطاة (1 = طبيعي)

/* ---------- العناوين على القطاعات ---------- */
const TITLE_R = 330; // بُعد العنوان عن مركز الدايرة
const TITLE_FONT = 34; // حجم الخط (بوحدات الرسم، مش بكسل الشاشة)
const TITLE_W = 300; // أقصى عرض للعنوان قبل ما ينزل سطر جديد
const TITLE_H = 130; // ارتفاع صندوق العنوان
const TITLE_SHIFT = [16, 16, 32, 32, 32, 32]; // إزاحة زاوية العنوان لكل قطاع

/* ---------- العنوان اللي في السنتر ---------- */
const CENTER_FONT = 56; // حجم كلمتي Safety / Quality (صغّره لو الحروف زحمة)
const CENTER_SPACING = 0; // المسافة بين الحروف (em) - 0 زي الـ title
const CENTER_SHIFT_X = 40; // زحزحة العنوان لليمين (موجب = يمين، سالب = شمال)

/* ---------- حركة الـ popup ---------- */
const POPUP_MS = 350; // مدة الفتح والقفل بالمللي ثانية

const rad = (d) => (d * Math.PI) / 180;
const pt = (r, a) => [C + r * Math.cos(rad(a)), C + r * Math.sin(rad(a))];
const f = (n) => n.toFixed(2);

const segments = safetyItems.map((item, i) => {
  const a0 = START + i * STEP;
  const a1 = a0 + SPAN;

  const [ox1, oy1] = pt(R_OUT, a0);
  const [ox2, oy2] = pt(R_OUT, a1);
  const [ix2, iy2] = pt(R_IN, a1);
  const [ix1, iy1] = pt(R_IN, a0);

  const d =
    `M${f(ox1)} ${f(oy1)} A${R_OUT} ${R_OUT} 0 0 1 ${f(ox2)} ${f(oy2)} ` +
    `L${f(ix2)} ${f(iy2)} A${R_IN} ${R_IN} 0 0 0 ${f(ix1)} ${f(iy1)} Z`;

  const xs = [];
  const ys = [];
  for (let k = 0; k <= 30; k++) {
    const a = a0 + (SPAN * k) / 30;
    const [x1, y1] = pt(R_OUT, a);
    const [x2, y2] = pt(R_IN, a);
    xs.push(x1, x2);
    ys.push(y1, y2);
  }
  const x = Math.min(...xs);
  const y = Math.min(...ys);

  // مكان العنوان (قبل الإزاحة، فبيتحرك مع القطاع)
  const [tx, ty] = pt(TITLE_R, a0 + STEP / 2 + TITLE_SHIFT[i]);

  return { ...item, d, x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y, tx, ty };
});

function Piece({ s, clip, index, title, onOpen }) {
  return (
    <g
      className="group cursor-pointer outline-none"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={title}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(index);
        }
      }}
    >
      <g filter="url(#safety-shadow)">
        <g clipPath={`url(#${clip})`}>
          {/* الصورة: باهتة شوية وهي مغطاة، وترجع لطبيعتها مع الـ hover */}
          <image
            href={s.image}
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: `saturate(${SATURATION})` }}
            className="transition-[filter] duration-500 group-hover:![filter:saturate(1)]"
          />
          {/* الطبقة الزرقاء المتدرجة: بتختفي مع الـ hover */}
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            fill="url(#safety-tint)"
            className="transition-opacity duration-500 group-hover:opacity-0"
          />
          <path
            d={s.d}
            fill="none"
            stroke={BORDER_COLOR}
            strokeOpacity={BORDER_OPACITY}
            strokeWidth={BORDER_W * 2}
            strokeLinejoin="round"
            className="transition-colors duration-300 group-focus-visible:stroke-accent group-focus-visible:[stroke-opacity:1]"
          />
        </g>
      </g>

      {/* العنوان (بره الفلتر عشان يظهر صح في كل المتصفحات) */}
      <foreignObject
        x={s.tx - TITLE_W / 2}
        y={s.ty - TITLE_H / 2}
        width={TITLE_W}
        height={TITLE_H}
        style={{ pointerEvents: 'none', overflow: 'visible' }}
      >
        <div
          className="flex h-full flex-col items-center justify-center text-center text-white"
          style={{ fontSize: TITLE_FONT, lineHeight: 1.25 }}
        >
          <h3 className="font-extrabold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.65)' }}>
            {title}
          </h3>
          <span className="mt-3 block bg-accent" style={{ width: 60, height: 6 }} />
        </div>
      </foreignObject>
    </g>
  );
}

export default function ServicesSafetyQuality() {
  const { t, i18n } = useTranslation();

  // active = القطاع الموجود في الـ popup (بيفضل موجود لحد ما حركة القفل تخلص)
  // visible = بيتحكم في حركة الفتح والقفل
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef(null);
  const activeItem = active !== null ? safetyItems[active] : null;

  const title = (key) => t(`servicesPage.safety.items.${key}.title`);

  const openPopup = useCallback((i) => {
    clearTimeout(closeTimer.current);
    setActive(i);
    // frame مرتين عشان الـ popup يترسم مخفي الأول وبعدين يتحرك للظهور
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closePopup = useCallback(() => {
    setVisible(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), POPUP_MS);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Esc بيقفل الـ popup + قفل سكرول الصفحة وهو مفتوح
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => e.key === 'Escape' && closePopup();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active, closePopup]);

  // عنوان السنتر: لو عايز تغيّره أو تترجمه ضيف المفتاح servicesPage.safety.center
  // (لازم يفضل فيه & عشان يتقسم لسطرين)
  const isRtl = i18n.dir() === 'rtl';
  const centerText = t('servicesPage.safety.center', { defaultValue: 'Safety & Quality' });
  const [centerFirst, centerSecond] = centerText.split('&').map((p) => p.trim());

  return (
    <section className="bg-white py-10">
      <Container>
        <div className="mx-auto aspect-square w-full max-w-[800px]">
          {/* text-primary-700 هو لون الطبقة الزرقاء (stopColor="currentColor") */}
          <svg viewBox="-160 -130 1460 1460" className="h-full w-full text-primary-700">
            <defs>
              <filter
                id="safety-shadow"
                filterUnits="userSpaceOnUse"
                x="-300"
                y="-300"
                width="1800"
                height="1800"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation={SHADOW_BLUR}
                  floodColor="#0b1b33"
                  floodOpacity={SHADOW_OPACITY}
                />
              </filter>

              <linearGradient id="safety-tint" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity={TINT_TOP} />
                <stop offset="1" stopColor="currentColor" stopOpacity={TINT_BOTTOM} />
              </linearGradient>

              {segments.map((s, i) => (
                <clipPath id={`safety-clip-${i}`} key={s.key}>
                  <path d={s.d} />
                </clipPath>
              ))}
            </defs>

            {/* كل القطاعات مرفوعة، بترتيب LIFT_ORDER (الأول في المصفوفة هو الأسفل) */}
            {LIFT_ORDER.map((i) => {
              const [vx, vy] = liftVector(i, LIFTS[i]);
              return (
                <g
                  key={segments[i].key}
                  transform={`translate(${f(vx + RIGHTS[i])} ${f(vy - UPS[i])})`}
                >
                  <Piece
                    s={segments[i]}
                    clip={`safety-clip-${i}`}
                    index={i}
                    title={title(segments[i].key)}
                    onOpen={openPopup}
                  />
                </g>
              );
            })}

            {/* عنوان السنتر: SVG text ومرسوم فوق القطاعات */}
            <g style={{ pointerEvents: 'none' }} textAnchor="middle">
              <text
                className="fill-primary-900"
                x={C + CENTER_SHIFT_X}
                y={C - 50}
                fontSize={CENTER_FONT}
                fontWeight="800"
                style={{ letterSpacing: isRtl ? 0 : `${CENTER_SPACING}em` }}
              >
                {centerFirst}
              </text>

              {centerSecond && (
                <>
                  <text
                    className="fill-primary-900"
                    x={C + CENTER_SHIFT_X}
                    y={C + 15}
                    fontSize={CENTER_FONT * 0.9}
                    fontWeight="800"
                  >
                    &amp;
                  </text>
                  <text
                    className="fill-primary-900"
                    x={C + CENTER_SHIFT_X}
                    y={C + 80}
                    fontSize={CENTER_FONT}
                    fontWeight="800"
                    style={{ letterSpacing: isRtl ? 0 : `${CENTER_SPACING}em` }}
                  >
                    {centerSecond}
                  </text>
                </>
              )}
            </g>
          </svg>
        </div>
      </Container>

      {/* ===== Popup (حركة ناعمة للفتح والقفل) ===== */}
      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity ease-out motion-reduce:transition-none ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDuration: `${POPUP_MS}ms` }}
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-label={title(activeItem.key)}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl transition-all ease-out motion-reduce:transition-none ${
              visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
            }`}
            style={{ transitionDuration: `${POPUP_MS}ms` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close"
              className="absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-white/90 text-2xl leading-none text-primary-900 transition hover:bg-accent hover:text-white"
            >
              ×
            </button>

            <div className="relative h-56 overflow-hidden md:h-72">
              <img
                src={activeItem.image}
                alt=""
                className={`h-full w-full object-cover transition-transform ease-out motion-reduce:transition-none ${
                  visible ? 'scale-100' : 'scale-110'
                }`}
                style={{ transitionDuration: '900ms' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
              <span className="absolute bottom-4 start-6 font-mono text-sm font-bold tracking-widest text-accent">
                0{active + 1}
              </span>
            </div>

            <div
              className={`p-6 transition-all duration-500 ease-out motion-reduce:transition-none md:p-8 ${
                visible ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <h3 className="border-s-4 border-accent ps-4 text-2xl font-extrabold text-primary-900">
                {title(activeItem.key)}
              </h3>
              <p className="mt-5 text-base leading-8 text-neutral-600">
                {t(`servicesPage.safety.items.${activeItem.key}.text`)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}