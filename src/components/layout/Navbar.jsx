import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

// Navbar overlays the section underneath it. It intentionally takes no layout
// space; the page controls its own top spacing and hero composition.
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
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [mobileOpen, setMobileOpen] = useState(false);
  const isLightPage = !isHome;

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/services', label: t('nav.services') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className="absolute inset-x-0 top-0 z-50 bg-transparent"
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo: white version floating over the hero, color version once scrolled / on light pages */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={isLightPage ? '/images/logo/logo.png' : '/images/logo/logo-white.png'}
            alt="Al Waqt Al Nageh"
            className="h-20 w-auto object-contain md:h-20"
          />
        </Link>

        {/* Center pill nav -- desktop only */}
        {/* Center pill nav -- desktop only */}
<nav
  className={`hidden items-center gap-1 rounded-full p-1 backdrop-blur-md transition-colors duration-300 lg:flex ${
    isLightPage
      ? 'bg-primary-900/5 ring-1 ring-primary-900/10'
      : 'bg-white/10 ring-1 ring-white/15'
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
                    : isLightPage
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
              isLightPage
                ? 'border-primary-900/20 text-primary-900 hover:bg-primary-900/5'
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
            isLightPage ? 'bg-transparent text-primary-900' : 'bg-transparent text-white'
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
