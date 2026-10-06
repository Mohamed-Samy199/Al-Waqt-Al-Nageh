# Al Waqt Al Nageh — Corporate Website

Official bilingual (English / Arabic) marketing website for **Al Waqt Al Nageh**, a Kuwait-based construction company with nearly 40 years of experience and an expanding presence in Saudi Arabia.

## Tech Stack

- **React 18** + **Vite** — build tooling and dev server
- **Tailwind CSS 3** — styling, with a custom theme (brand colors, fonts, animations) in `tailwind.config.js`
- **React Router v6** — client-side routing
- **react-i18next** — bilingual content (English default, Arabic with full RTL support)

No backend yet — all project/company data lives in `src/data/`, and the contact form currently simulates a submission (see [Known Gaps](#known-gaps--todo)).

## Getting Started

```bash
npm install
npm run dev       # starts the dev server
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar (fixed/overlay), Footer, LanguageSwitcher
│   ├── ui/            # Shared primitives: Button, Container, SectionHeading, StatCounter
│   ├── home/           # Home-page sections (Hero, AboutPreview, CategoriesGrid, FeaturedProjects, CtaSection)
│   ├── about/           # About-page sections (StoryHero, VisionMissionSection, CoreValues)
│   └── CategoryCard/     # Shared category card used on the Home page
├── data/
│   └── projects.js        # All project + category data (single source of truth)
├── i18n/
│   ├── config.js            # i18next setup; also flips <html dir> on language change
│   └── locales/
│       ├── en.json           # English strings (default language)
│       └── ar.json           # Arabic strings
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx           # Project grid with category filtering (?category=)
│   ├── ProjectDetail.jsx       # Single project page with image gallery + lightbox
│   └── Contact.jsx              # Office info + contact form
├── App.jsx                        # Routes
└── main.jsx                        # Entry point
```

## Bilingual / RTL Notes

- English is the default language; switching to Arabic flips `document.documentElement.dir` to `rtl`.
- Layouts use CSS **logical properties** (`start`/`end`, `ms-`/`me-`, `ps-`/`pe-`) instead of hardcoded `left`/`right` wherever a section needs to mirror correctly — this is the pattern to follow for any new section.
- Some decorative elements (skewed images, clip-path shapes, diagonal accents) are mirrored explicitly per language, since `clip-path` and inline `transform` values are physical, not logical.

## Known Gaps / TODO

- **Images**: most sections reference image paths under `public/images/...` that still need the actual brand/project photography dropped in (see each component for exact expected filenames).
- **Contact page**: office addresses, phone numbers, and emails are placeholders (`contactPage.addressPlaceholder` etc. in the locale files). The form currently fakes a successful submission — it needs to be wired to a real backend or a service like Formspree/EmailJS before launch.
- **Logo**: needs exporting from the source `.ai` file to `logo.svg` / `logo-white.svg`.

## Design System

Brand colors, fonts, and animation keyframes are centralized in `tailwind.config.js`:

| Token | Use |
|---|---|
| `primary-900` / `primary-700` | Navy brand color (headings, dark sections) |
| `accent` | Muted gold (About page accents) |
| `accent-bright` | Bright gold (Hero/CTA highlights) |
| `neutral-*` | Backgrounds and body text |

Fonts switch automatically with language (set globally in `src/index.css`): Montserrat for English headings, Tajawal for Arabic.