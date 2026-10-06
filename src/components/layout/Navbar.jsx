import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

// Navbar sits fixed on top of the page (position: fixed) so it never takes
// up its own layout space -- the Hero (or any first section) renders full
// height right underneath it, and the navbar overlays on top.
//
// `isScrolled` drives the color scheme:
//  - false -> "floating over a dark hero" look: transparent bg, white logo/text
//  - true  -> "solid" look: dark logo/text, light pill bg
//
// On the Home page that choice is tied to scroll position (transparent over
// the dark hero, solid once you pass it, transparent again once you reach
// the dark Featured Projects section -- see updateNavbar below).
//
// Every other page (About, Projects, Contact, ...) has no dark hero to float
// over and is mostly a white page, so there isScrolled is just forced to
// `true` for the whole page -- otherwise the white-on-white logo/text would
// be unreadable.
const NAV_TRIGGER_OFFSET = 100;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Non-home pages: always use the solid/dark-text look, no scroll listener needed.
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const updateNavbar = () => {
      const aboutSection = document.getElementById('about-preview');
      const featuredSection = document.getElementById('featured-projects');

      if (!aboutSection || !featuredSection) {
        setIsScrolled(false);
        return;
      }

      const aboutTop = aboutSection.getBoundingClientRect().top;
      const featuredTop = featuredSection.getBoundingClientRect().top;

      // Before About -> first (transparent) state
      if (aboutTop > NAV_TRIGGER_OFFSET) {
        setIsScrolled(false);
        return;
      }

      // From About up to (not including) Featured Projects -> solid state
      if (featuredTop > NAV_TRIGGER_OFFSET) {
        setIsScrolled(true);
        return;
      }

      // Entering Featured Projects (dark section again) -> back to transparent
      setIsScrolled(false);
    };

    updateNavbar();

    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);

    return () => {
      window.removeEventListener('scroll', updateNavbar);
      window.removeEventListener('resize', updateNavbar);
    };
  }, [isHome]);

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? '' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo: white version floating over the hero, color version once scrolled / on light pages */}
        <Link to="/" className="mt-16 flex shrink-0 items-center gap-2">
          <img
            src={isScrolled ? '/images/logo/logo.png' : '/images/logo/logo-white.png'}
            alt="Al Waqt Al Nageh"
            className="h-24 md:h-36"
          />
        </Link>

        {/* Center pill nav -- desktop only */}
        <nav
          className={`hidden items-center gap-1 rounded-full p-1 transition-colors duration-300 lg:flex ${
            isScrolled ? 'bg-neutral-100' : 'bg-white/10 ring-1 ring-white/15 backdrop-blur-md'
          }`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                [
                  'rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-accent-bright text-primary-900'
                    : isScrolled
                    ? 'text-neutral-700 hover:text-primary-700'
                    : 'text-white/80 hover:text-white',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: language toggle + contact CTA -- desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleLanguage}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isScrolled
                ? 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
          <Link
            to="/contact"
            className="rounded-full bg-accent-bright px-5 py-2 text-sm font-bold text-primary-900 transition hover:bg-accent-glow"
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* Mobile: burger toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
            isScrolled ? 'bg-neutral-100 text-primary-900' : 'bg-white/10 text-white'
          }`}
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </button>
      </Container>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-md px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileOpen(false);
              }}
              className="mt-2 rounded-md border border-neutral-200 px-4 py-3 text-start text-sm font-medium text-neutral-700"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}