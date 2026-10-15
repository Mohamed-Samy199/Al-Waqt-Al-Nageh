import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/Projectdetail';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/shared/ScrollToTop';
import SeoHead from './components/seo/SeoHead';

export default function App() {
  return (
    <BrowserRouter>
      <SeoHead />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}
