import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const capabilities = [
  { key: 'formwork', image: '/images/capabilities/formwork-panel.jpg' },
  { key: 'reinforcement', image: '/images/capabilities/rebar-lift.jpg' },
  { key: 'concrete', image: '/images/capabilities/slab-reinforcement.jpg' },
  { key: 'special', image: '/images/capabilities/circular-column.jpg' },
];

export default function ExecutionCapabilities() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.toLowerCase().startsWith('ar');
  
  // حالة للتحكم في الكارت النشط عند الضغط (للأجهزة اللوحية والموبايل)
  const [activeKey, setActiveKey] = useState(null);

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32 text-primary-900">
      {/* خلفية شبكية هندسية ناعمة باللون الداكن الخفيف */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Container className="relative z-10">
        {/* العناوين العلوية */}
        <div className="mb-14 max-w-3xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-primary-700 rtl:normal-case rtl:tracking-normal">
            {t('execution.eyebrow')}
          </span>
          <h2 className={`text-4xl font-extrabold leading-[1.08] text-primary-900 md:text-5xl ${isArabic ? 'font-arHeading' : 'font-heading'}`}>
            {t('execution.title')}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl font-light">
            {t('execution.subtitle')}
          </p>
        </div>

        {/* حاوية الكروت الأكورديون الشفافة بالخلفية الفاتحة */}
        <div className="flex flex-col lg:flex-row h-[580px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-xl divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 rtl:lg:divide-x-reverse transition-all duration-500">
          {capabilities.map((item, index) => {
            const partNumber = `0${index + 1}`;
            const isActive = activeKey === item.key;

            return (
              <article
                key={item.key}
                onClick={() => setActiveKey(isActive ? null : item.key)}
                className={`group relative flex flex-col justify-end overflow-hidden p-6 sm:p-8 cursor-pointer transition-all duration-500 ease-in-out ${
                  isActive
                    ? 'lg:flex-[2.5] bg-primary-900 text-white'
                    : 'lg:flex-1 lg:hover:flex-[2.5] bg-white text-primary-900 hover:bg-primary-900 hover:text-white'
                }`}
              >
                {/* الصورة الخلفية مع تأثيرات الانتقال والتمرير */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`execution.items.${item.key}.title`)}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                      isActive
                        ? 'scale-110 brightness-90 contrast-105'
                        : 'brightness-95 contrast-100 group-hover:scale-110 group-hover:brightness-90'
                    }`}
                  />
                  {/* تدرج ظلي متكيف مع حالة الهوفر والضغط لضمان وضوح النصوص */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent'
                        : 'bg-gradient-to-t from-white via-white/80 to-transparent group-hover:from-primary-900 group-hover:via-primary-900/70 group-hover:to-transparent'
                    }`}
                  />
                </div>

                {/* المحتوى السفلي للبطاقة */}
                <div className="relative z-10 transition-all duration-300">
                  {/* شارة رقم الجزء (PART 01) */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-black tracking-widest uppercase transition-colors duration-300 text-primary-900 group-hover:text-white">
                      PART <span className="text-accent">{partNumber}</span>
                    </span>
                  </div>

                  {/* عنوان العنصر */}
                  <h3
                    className={`mt-2 text-xl sm:text-2xl font-extrabold leading-snug transition-colors duration-300 ${
                      isArabic ? 'font-arHeading' : 'font-heading'
                    }`}
                  >
                    {t(`execution.items.${item.key}.title`)}
                  </h3>

                  {/* الخط الذهبي الصغير */}
                  <div
                    className={`mt-3 h-[3px] rounded-full bg-accent transition-all duration-500 ${
                      isActive ? 'w-16' : 'w-8 group-hover:w-16'
                    }`}
                  />

                  {/* الوصف: مخفي تماماً ويظهر فقط عند الـ Hover أو الـ Active مع أنيميشن سلس */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-hover:mt-4'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-neutral-200 font-light">
                        {t(`execution.items.${item.key}.text`)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}