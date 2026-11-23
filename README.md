# Rabi Bhagat - Portfolio

A single-page personal portfolio for Rabi Bhagat, a full-stack (MERN) developer and B.Tech CSE student. Built with React 19, Vite 7, Tailwind CSS 3, Three.js (React Three Fiber), and Framer Motion.

- Production domain: https://rabibhagat.com.np/
- Architecture notes: [DESIGN.md](./DESIGN.md)
- Content editing guide: [HOW_TO_MANAGE_PORTFOLIO.md](./HOW_TO_MANAGE_PORTFOLIO.md)

## Features

### Experience and design

- Aurora mesh, subtle film grain, and a 3D starfield background with pointer/gyroscope parallax and shooting stars
- Dark and light themes, persisted in `localStorage` with a no-flash boot script and system-preference fallback
- Glassmorphism surfaces, animated gradient text, spotlight cards, magnetic CTAs, and 3D tilt cards
- Animated preloader ("Namaste" plus a typed welcome) that can be skipped and only shows once per browser session
- Scroll progress bar, scroll-spy navigation with a sliding active pill, auto-hiding navbar, and a scroll-progress back-to-top button
- Section reveals, staggered grids, filter transitions, and hover micro-interactions
- Full `prefers-reduced-motion` support for the starfield, preloader, and shared animation wrappers
- Custom cursor-follow dot and ring on fine-pointer devices, with hover and press states

### Content and interaction

- Single-column hero with a rotating role typewriter, resume download, social links, and count-up stats
- About section with quick facts and focus areas
- Skills grouped by category with animated filters, proficiency bars, and level badges
- Experience and academic background: two internships, B.Tech CSE (7th semester, CGPA 7.24), Class 12 (66.75%), and Class 10 (82.5%), with prominent score badges
- Project grid with CSS browser-mockup thumbnails, category filters, search, sorting, featured badges, and four actions:
  - Live site in a new tab
  - In-page Frame View (desktop/tablet/mobile sizes, live iframe or mockup fallback)
  - Floating 3D monitor scene rendering the live site
  - GitHub repository
- Certifications and achievements browser with 19 credentials, animated type tabs, search, spotlight cards, keyboard activation, image/PDF preview, and downloads
- Contact section with availability, copy-to-clipboard email, phone, LeetCode, social links, resume download, and a validated Formspree form with a honeypot and inline errors
- Portfolio assistant chat (deterministic keyword intents, not an LLM) with quick prompts, resume/availability intents, section jump buttons, focus management, and Escape-to-close
- Accessible modals: `role="dialog"`, `aria-modal`, focus trapping and restoration, Escape/arrow keys, scroll lock, history integration, and 3D entrance transitions
- Error boundary with a reload fallback
- PWA manifest, Open Graph/Twitter metadata, JSON-LD person schema, `robots.txt`, and `sitemap.xml`

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, React DOM 19 |
| Build | Vite 7, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer, custom CSS utilities |
| Motion | Framer Motion 12 |
| 3D | Three.js 0.182, `@react-three/fiber` 9, `@react-three/drei` 10 |
| Icons | `lucide-react` |
| Linting | ESLint 9 (flat config), `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Forms | Formspree (hosted endpoint) |
| Fonts | Inter (body), Space Grotesk (display), loaded from Google Fonts |

The site is a single scroll page with hash anchors. No router is required.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- npm (a `package-lock.json` is committed)

## Quick Start

```bash
npm install --include=dev   # install dependencies, including dev tools
npm run dev                 # start Vite, usually http://localhost:5173
npm run build               # production build into dist/
npm run preview             # serve the production build locally
npm run lint                # run ESLint
npm run verify              # lint + production build
npm run check-links         # probe project, social, and repo links for HTTP status
```

If your environment has `npm config omit=dev` set, use `npm install --include=dev` so Vite and ESLint are installed.

## Project Structure

```text
.
├── index.html                  # SEO/social meta, JSON-LD, fonts, theme boot script, no-JS fallback
├── vite.config.js              # React plugin + split vendor chunks
├── tailwind.config.js          # Theme colors, fonts, glow shadow
├── postcss.config.js           # Tailwind + Autoprefixer
├── eslint.config.js            # Flat ESLint config
├── check_links.cjs             # Link status checker
├── archive/                    # Raw source documents (not deployed)
├── public/
│   ├── logo.svg, icon-192.png, icon-512.png, apple-touch-icon.png
│   ├── og-image.png            # 1200x630 social share card
│   ├── resume.pdf              # Downloadable resume
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt, sitemap.xml # SEO
│   └── internship and skill certificate and hackathon/
│       └── certificate images and PDFs referenced by achievements
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Error boundary, theme, preloader gate, layers, sections, footer
    ├── styles/index.css        # Tailwind layers, glass/aurora/grain utilities, motion fallbacks
    ├── data/constants.js       # All portfolio content
    ├── hooks/
    │   ├── useFocusTrap.js
    │   ├── useLockBodyScroll.js
    │   ├── useModalHistory.js
    │   └── useScrollSpy.js
    ├── sections/
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Experience.jsx      # Internship timeline + education score cards
    │   ├── Certifications.jsx
    │   ├── Projects.jsx
    │   └── Contact.jsx
    └── components/
        ├── 3d/
        │   ├── StarBackground.jsx
        │   └── ProjectShowcase3D.jsx
        ├── chat/
        │   └── PortfolioBot.jsx
        ├── layout/
        │   ├── Navbar.jsx, Section.jsx, SectionHeading.jsx
        │   ├── ScrollProgress.jsx, BackToTop.jsx
        │   └── Preloader.jsx, ErrorBoundary.jsx
        ├── modals/
        │   ├── CertificateModal.jsx
        │   └── LiveDemoModal.jsx
        └── ui/
            ├── Button3D.jsx, TiltCard3D.jsx, Logo3D.jsx, SpotlightCard.jsx
            ├── Magnetic.jsx, Reveal.jsx, CountUp.jsx, Typewriter.jsx
            ├── StatusPill.jsx, ThemeToggle.jsx, FilterPill.jsx, CursorEffect.jsx
            ├── ProjectThumb.jsx, Toast.jsx
```

## Editing Content

All content lives in `src/data/constants.js`. You normally do not need to touch components.

| Export | Used by | Notes |
|---|---|---|
| `skills` | `Skills.jsx` | Category objects with nested `skills` arrays |
| `projects` | `Projects.jsx` | 9 projects; `category` powers filters, `tech` is comma-separated, `featured` pins to the top |
| `achievements` | `Certifications.jsx` | Certificates, hackathons, internships, LORs |
| `heroRoles` | `Hero.jsx` | Rotating role typewriter words |
| `stats` | `Hero.jsx` | Count-up stat cards |
| `socialLinks` | `Hero.jsx`, `Contact.jsx`, footer | GitHub, LinkedIn, LeetCode |
| `experience` | `Experience.jsx` | Internships (`type: "work"`) and education (`type: "education"`) with optional `score`, `scoreLabel`, and `location` |
| `contactInfo` | `Contact.jsx`, footer | Email, phones, LeetCode, GitHub, LinkedIn |
| `availability` | `Contact.jsx`, `quickFacts` | Status pill text and tone |
| `quickFacts` | `About.jsx` | Six quick-fact cards |
| `location` | `quickFacts` | Display location |
| `resumeUrl` | Hero, navbar, About, Contact, footer | Defaults to `/resume.pdf` |

### Add a Project

Append an object to `projects`:

```js
{
  id: "my-project",
  name: "My Project",
  desc: "One or two sentences about what it does.",
  tech: "React, Tailwind CSS, Node.js",
  category: "Full Stack",       // Full Stack | Web App | Mobile App | Tool | Game
  link: "https://my-project.example.com",
  repo: "https://github.com/Rabi-Bhagat/my-project",
  color: "#3b82f6",             // Accent color for cards, thumbnails, and glows
  features: ["Feature one", "Feature two"],
  status: "Live Production",
  featured: true                // Optional: pins it to the top when sorting by Featured
}
```

New categories are picked up automatically by the filter bar and counts.

### Add a Certification or Achievement

1. Put the preview image and/or PDF in `public/internship and skill certificate and hackathon/`.
2. Append an object to `achievements`:

```js
{
  id: "my-certificate",
  title: "Certificate Title",
  org: "Issuing Organization",
  category: "Certification",    // Display label
  type: "certification",        // certificate | hackathon | internship (drives tabs/icons)
  date: "2025",
  issueDate: "June 2025",
  desc: "What was completed or awarded.",
  previewImage: "/internship and skill certificate and hackathon/my-image.png",
  fileUrl: "/internship and skill certificate and hackathon/my-file.pdf",
  color: "#10b981",
  badge: "Verified Certificate",
  certId: "CERT-12345"
}
```

Paths in `public/` are served from the site root, so reference them with a leading `/`. Keep file names consistent with the existing assets; spaces and parentheses are supported but must match exactly.

### Update Skills, Experience, or Availability

- `skills`: each skill accepts `name`, `desc`, `iconUrl`, `color`, `level`, and `percentage`.
- `experience`: each item accepts `role`, `company`, `date`, `type` (`"work"` or `"education"`), `location`, `desc`, and `skills`. Education entries also support `score` and `scoreLabel`.
- `availability`: update `status`, `detail`, and `tone` (`"emerald"`, `"amber"`, or `"primary"`).
- `quickFacts`: add or remove cards.
- `resumeUrl`: change if the PDF moves.

## Customization

### Theme and Colors

Colors, fonts, shadows, keyframes, and animations are defined in `tailwind.config.js`:

```js
colors: {
  primary: "#3b82f6",
  secondary: "#6366f1",
  tertiary: "#0ea5e9",
  accent: "#14b8a6",
  dark: "#030712",
  aurora: { 1: "#38bdf8", 2: "#6366f1", 3: "#22d3ee", 4: "#2dd4bf" },
}
```

Reusable surface styles live in `src/styles/index.css` (`.glass-card`, `.glass-card-hover`, `.aurora-bg`, `.grain`, `.section-padding`, `.focus-ring`, `.glare`).

Theme behavior:

- The inline script in `index.html` applies the stored theme before React loads to avoid a flash.
- `App.jsx` reads `localStorage.theme`, falls back to `prefers-color-scheme`, and persists changes.
- The `dark` class on `<html>` drives Tailwind variants.

### Fonts

`index.html` loads Inter and Space Grotesk from Google Fonts. Update the `<link>` and `tailwind.config.js` font families together if you change them.

### Resume

Replace `public/resume.pdf`. The URL is exported as `resumeUrl` in `src/data/constants.js` and used by the hero, navbar, About, Contact, and footer.

### Contact Form

The form posts to Formspree in `src/sections/Contact.jsx`:

```js
fetch("https://formspree.io/f/xojjebba", { ... })
```

Replace `xojjebba` with your own Formspree form ID. The form sends `name`, `email`, and `message`, validates them client-side, and includes a hidden `_gotcha` honeypot field.

### Portfolio Assistant

`src/components/chat/PortfolioBot.jsx` is a deterministic intent matcher. It normalizes the message and checks regex intents in order (intro, internships, skills, projects, hackathons, certifications, education, resume, availability, contact, LeetCode, fallback). Responses are hardcoded in `getAIResponse`.

To make it a real chatbot, replace the `setTimeout` in `handleSendMessage` with an API call and keep the existing message contract (`{ text, actionSection? }`).

### SEO, Domain, and Social Preview

Before deploying to a new domain, update:

- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:url`, JSON-LD `url`/`image`
- `public/robots.txt`: the `Sitemap:` URL
- `public/sitemap.xml`: `<loc>` and `<lastmod>`
- `public/og-image.png`: 1200x630 share image

Validate the preview with the Facebook Sharing Debugger and the X/Twitter Card validator after deploying.

## Performance Notes

- Below-the-fold sections and the two project modals are lazy-loaded.
- Three.js is split into `three-core`, `three-fiber`, and `three-drei` chunks to keep each chunk under the warning threshold.
- The background canvas uses a clamped device pixel ratio and pauses when the tab is hidden.
- The starfield reduces particle count on mobile and disables itself under `prefers-reduced-motion`.
- The preloader only runs on the first page view in a browser session (`sessionStorage`).

## Deployment

The build output is a static `dist/` folder and works on any static host.

| Host | Settings |
|---|---|
| Cloudflare Pages | Build command `npm run build`, output directory `dist` |
| Vercel | Framework preset: Vite; build `npm run build`, output `dist` |
| Netlify | Build command `npm run build`, publish directory `dist` |
| GitHub Pages | Publish `dist/` via a GitHub Action or a `gh-pages` branch |

Because navigation uses hash anchors, no SPA rewrite rules are required.

## Link Health

`npm run check-links` performs GET requests against every URL in `check_links.cjs`, follows one redirect, and reports status codes with a 5-second timeout per URL.

Known problem links reported previously (repos may be private, renamed, or nested in a monorepo):

1. `github.com/Rabi-Bhagat/mohanpur_village` (live site is up)
2. `github.com/Rabi-Bhagat/Booking-App-hotelBazaar-` (live site is up)
3. `github.com/Rabi-Bhagat/SecureDocs-document-management-system-` (live site is up)
4. `github.com/Rabi-Bhagat/frontened-project` tree links (E-commerce, Guessing Game, To-Do List)

Update the `repo` fields in `src/data/constants.js` and the URL list in `check_links.cjs` when fixed.

## Troubleshooting

- **Live Frame View shows a mockup instead of the site.** Many hosts send `X-Frame-Options` or a restrictive CSP that blocks iframe embedding. The modal can switch to a built-in project summary with a launch button. This is expected.
- **The 3D background is missing.** It disables itself under `prefers-reduced-motion: reduce` and requires WebGL. On low-power devices, the starfield uses fewer particles.
- **The preloader does not appear on reload.** It is intentionally shown once per browser session. Clear the `rb-preloaded` session storage key to see it again.
- **Dark/light mode resets.** Check that `localStorage` is available; private browsing modes can block it. The boot script falls back to the system preference.
- **Certificate preview fails.** Verify the file exists under `public/internship and skill certificate and hackathon/` and that the path and extension in `constants.js` match exactly.
- **Social icons do not load.** Icons come from `cdn.simpleicons.org` and `cdn.jsdelivr.net`. `Logo3D` falls back to the first two letters if an image fails.
- **Build warns about chunk size.** Three.js vendor chunks are split in `vite.config.js`; check `dist/assets` if a future dependency pushes one over the limit.
- **ESLint or Vite is not found.** Your npm config may set `omit=dev`; run `npm install --include=dev`.

## Scripts Reference

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start the dev server with HMR |
| `build` | `vite build` | Create the production build in `dist/` |
| `preview` | `vite preview` | Serve `dist/` locally |
| `lint` | `eslint .` | Lint all JS/JSX files |
| `verify` | `npm run lint && npm run build` | Full local validation |
| `check-links` | `node check_links.cjs` | Probe external URLs used by the portfolio |

## License

No license file is included in this repository. All rights reserved by Rabi Bhagat unless stated otherwise.
