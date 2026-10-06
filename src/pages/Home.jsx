import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import AboutPreview from '../components/home/AboutPreview';
import CategoriesGrid from '../components/home/CategoriesGrid';
import FeaturedProjects from '../components/home/FeaturedProjects';
import KhobarHighlight from '../components/home/KhobarHighlight';
import CtaSection from '../components/home/CtaSection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutPreview />
      <CategoriesGrid />
      <FeaturedProjects />
      {/* <KhobarHighlight />
      <CtaSection /> */}
    </>
  );
}
