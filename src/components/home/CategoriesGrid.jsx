// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import Container from '../ui/Container';
// import { categories } from '../../data/projects';
// import CategoryCard from '../CategoryCard/CategoryCard';

// export default function CategoriesGrid() {
//   const { t } = useTranslation();

//   return (
//     <section className="relative overflow-hidden bg-[#F7F8FA] py-20 lg:py-28">
//       {/* خط ديكوري أسفل القسم */}
//       <div className="pointer-events-none absolute -bottom-8 -left-20 h-32 w-80 rounded-tr-[100%] border-t border-[#0868D8]/30" />

//       {/* دائرة ديكورية */}
//       <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full border border-[#0868D8]/10" />

//       <Container>
//         {/* Header */}
//         <div className="relative z-10 mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
//           <div className="lg:col-span-7">
//             <div className="mb-5 flex items-center gap-4">
//               <span className="h-[2px] w-8 bg-[#0868D8]" />

//               <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#0868D8]">
//                 {t('categories.eyebrow', 'Our Categories')}
//               </span>
//             </div>

//             <h2 className="text-4xl font-extrabold leading-tight text-[#061A41] md:text-6xl">
//               {t('categories.title', 'مجالات خبرتنا')}
//             </h2>

//             <p className="mt-6 max-w-xl text-base leading-8 text-[#061A41]/60 md:text-lg">
//               {t(
//                 'categories.description',
//                 'نقدم مشروعات متنوعة في قطاعات حيوية مختلفة لتلبية احتياجات عملائنا في كل قطاع.'
//               )}
//             </p>
//           </div>
//         </div>

//         {/* الكروت */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {categories.map((category, index) => (
//             <CategoryCard
//               key={category.key}
//               category={category}
//               index={index}
//             />
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }








import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import CategoryCard from '../CategoryCard/CategoryCard';
import { categories } from '../../data/projects';

export default function CategoriesGrid() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 lg:py-28">
      {/* Decorative arc at the bottom edge (logical props so it mirrors in RTL) */}
      <div className="pointer-events-none absolute -bottom-8 -start-20 h-32 w-80 rounded-se-[100%] border-t border-primary-700/30" />

      {/* Decorative circle */}
      <div className="pointer-events-none absolute -end-32 top-16 h-72 w-72 rounded-full border border-primary-700/10" />

      <Container>
        {/* Header */}
        <div className="relative z-10 mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-[2px] w-8 bg-primary-700" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary-700">
                {t('categories.eyebrow')}
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-primary-900 md:text-6xl">
              {t('categories.title')}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-primary-900/60 md:text-lg">
              {t('categories.description')}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.key}
              category={category}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}