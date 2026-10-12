import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import AboutPreview from '../components/home/AboutPreview';
import CategoriesGrid from '../components/home/CategoriesGrid';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ExecutionCapabilities from '../components/home/ExecutionCapabilities';
import MethodologySection from '../components/home/MethodologySection';
import WhyUsSection from '../components/home/WhyUsSection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutPreview />
      <CategoriesGrid />
      <FeaturedProjects />
      <ExecutionCapabilities />
      <MethodologySection />
      <WhyUsSection />
      {/* <KhobarHighlight />
      <CtaSection /> */}
    </>
  );
}
