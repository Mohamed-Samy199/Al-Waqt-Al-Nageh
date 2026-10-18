import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Building2, Clock3, Sparkles } from 'lucide-react';
import Container from '../ui/Container';

const SHUFFLE_INTERVAL = 3500;

const highlightCards = [
  { key: 'quality', value: '100%', icon: Award, image: '/images/categories/towers.png', tone: 'dark' },
  { key: 'delivery', value: '24/7', icon: Clock3, image: '/images/categories/commercial.png', tone: 'light' },
  { key: 'innovation', value: '360°', icon: Sparkles, image: '/images/categories/coastal.png', tone: 'light' },
  { key: 'experience', value: '40+', icon: Building2, image: '/images/categories/governmental.png', tone: 'dark' },
];

function shuffleCards(ids) {
  let nextOrder;
  do {
    nextOrder = [...ids];
    for (let index = nextOrder.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [nextOrder[index], nextOrder[randomIndex]] = [nextOrder[randomIndex], nextOrder[index]];
    }
  } while (nextOrder.some((id, index) => id === ids[index]));
  return nextOrder;
}

export default function ServiceIntro() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(highlightCards.map((card) => card.key));
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (reduceMotion || activeKey) return undefined;

    const timer = setInterval(() => {
      setOrder((currentOrder) => shuffleCards(currentOrder));
    }, SHUFFLE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeKey, reduceMotion]);

  const orderedCards = order.map((key) => highlightCards.find((card) => card.key === key));

  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Heading — scroll reveal handled by AOS */}
          <div data-aos="fade-up" data-aos-duration="600" data-aos-once="true">
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-primary-900 md:text-5xl">
              {t('servicesPage.introTitle')}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              {t('servicesPage.introText')}
            </p>
          </div>

          {/*
            AOS lives on this wrapper, NOT on the framer-motion grid below:
            both write the CSS transform, so on the same element they would fight each other
            (the shuffle / flip animations would break).
          */}
          <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="120" data-aos-once="true">
            <motion.div layout className="grid grid-cols-2 gap-4 pb-6 sm:gap-5">
              {orderedCards.map((card, index) => {
                const Icon = card.icon;
                const flipped = activeKey === card.key;
                const isDark = card.tone === 'dark';

                return (
                  <motion.div
                    key={card.key}
                    layout
                    transition={{ layout: { type: 'spring', stiffness: 220, damping: 28 } }}
                    onPointerEnter={(event) => event.pointerType === 'mouse' && setActiveKey(card.key)}
                    onPointerLeave={(event) => event.pointerType === 'mouse' && setActiveKey(null)}
                    onPointerUp={(event) => {
                      if (event.pointerType !== 'mouse') {
                        setActiveKey((current) => (current === card.key ? null : card.key));
                      }
                    }}
                    className={`group relative h-56 cursor-pointer [perspective:1000px] sm:h-60 ${index % 2 === 1 ? 'mt-6 sm:mt-8' : ''}`}
                  >
                    <motion.div
                      className="relative h-full w-full [transform-style:preserve-3d]"
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className={`absolute inset-0 overflow-hidden rounded-2xl border p-5 shadow-sm [backface-visibility:hidden] sm:p-6 ${
                          isDark ? 'border-primary-900/20 bg-primary-900 text-white' : 'border-neutral-200 bg-white text-primary-900'
                        }`}
                      >
                        <div className="absolute inset-0 opacity-10">
                          <img src={card.image} alt="Al Waqt Al Nageh" className="h-full w-full object-cover grayscale" />
                        </div>
                        <div className="absolute -end-6 -top-8 h-24 w-24 rounded-full border border-accent/30" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-white/10 text-accent-bright' : 'bg-primary-50 text-primary-700'}`}>
                              <Icon size={20} strokeWidth={1.8} />
                            </span>
                            <span className={`font-mono text-[11px] font-bold tracking-widest ${isDark ? 'text-white/55' : 'text-primary-300'}`}>
                              0{index + 1}
                            </span>
                          </div>
                          <div>
                            <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-accent-bright' : 'text-primary-700'}`}>{card.value}</p>
                            <h3 className="mt-1 text-base font-bold">{t(`servicesPage.highlights.${card.key}.title`)}</h3>
                            <p className={`mt-1 text-xs leading-5 ${isDark ? 'text-white/70' : 'text-neutral-500'}`}>
                              {t(`servicesPage.highlights.${card.key}.text`)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-accent/40 bg-primary-900 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <img src={card.image} alt={t(`servicesPage.highlights.${card.key}.title`)} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
                        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
                          <div>
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-accent-bright rtl:normal-case rtl:tracking-normal">
                              {t('servicesPage.scopeEyebrow')}
                            </span>
                            <span className="text-sm font-bold">{t(`servicesPage.highlights.${card.key}.title`)}</span>
                          </div>
                          <span className="font-mono text-xs text-white/70">0{index + 1}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}