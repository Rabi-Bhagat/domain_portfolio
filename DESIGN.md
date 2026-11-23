# Design Document - Rabi Bhagat Portfolio

This document describes how the portfolio is built: architecture, data model, rendering pipeline, visual system, interaction flows, and trade-offs. For setup and content editing, see [README.md](./README.md).

## 1. Purpose and Scope

The project is a static, single-page portfolio for Rabi Bhagat. Its goals are:

- Present profile, skills, experience, projects, and credentials in one scrollable experience.
- Make project demos and credential documents inspectable without leaving the page.
- Feel interactive and modern through 3D, motion, glass surfaces, and theme switching.
- Keep content editing centralized in one data module.
- Deploy as plain static files with no server runtime or database.
- Be usable with a keyboard and respectful of reduced-motion preferences.

Non-goals: multi-page routing, server-side rendering, authentication, a real CMS, analytics, or an LLM-backed assistant.

## 2. High-Level Architecture

```text
index.html
  ├─ inline theme boot script (applies stored/system theme before React)
  └─ src/main.jsx (React 19 root, StrictMode)
       └─ App.jsx
            ├─ <ErrorBoundary>
            ├─ state: loading (preloader gate), dark (theme), pageVisible (3D pause)
            ├─ <ScrollProgress />                 (fixed, z-60)
            ├─ <Preloader />                       (first visit per session)
            └─ when !loading
                 ├─ <div class="aurora-bg" />      (z-0)
                 ├─ fixed <Canvas> -> StarBackground (z-1)
                 ├─ <div class="grain" />           (z-2)
                 ├─ <Navbar /> <BackToTop /> <PortfolioBot />  (fixed, z-40..z-50)
                 └─ <main id="main"> (z-10)
                      ├─ Hero (eager)
                      ├─ About
                      ├─ Skills
                      └─ <Suspense>
                           ├─ Experience     (lazy)
                           ├─ Certifications (lazy)
                           ├─ Projects       (lazy, modal chunks on demand)
                           └─ Contact        (lazy)
                      └─ Footer
```

There is no router or global store. State is local to the component that needs it. Content flows one way:

```text
src/data/constants.js -> sections/* -> components/*
```

Theme state is owned by `App` and passed to `Navbar` (toggle) and `Hero`/`StarField` (3D colors). Page visibility is also owned by `App` and used to pause the starfield canvas.

### Architectural decisions

| Decision | Rationale | Trade-off |
|---|---|---|
| Single page with hash anchors | Static deployment, no rewrites, fast navigation | No per-section URLs or SEO pages |
| Centralized `constants.js` | Content changes need no component edits | Content is bundled into JS |
| Local state only | Minimal complexity and bundle weight | No shared cross-cutting store |
| Portals for modals | Escape section stacking contexts | Manual scroll-lock, history, and focus management |
| Shared modal hooks | Consistent behavior and less duplication | Hooks must be used in a fixed order |
| 3D as a progressive layer | Visual identity without blocking content | WebGL cost; static fallbacks required |
| Deterministic assistant | No API keys, backend, or cost | Limited to predefined intents |
| CSS variables for spotlights | Pointer tracking without React re-renders | Slightly more CSS |

## 3. Technology Stack

| Area | Package | Version | Role |
|---|---|---|---|
| UI runtime | `react`, `react-dom` | 19.2 | Rendering |
| Build | `vite`, `@vitejs/plugin-react` | 7.x / 5.1 | Dev server, bundling, Fast Refresh |
| Styling | `tailwindcss`, `postcss`, `autoprefixer` | 3.4 / 8.5 | Utility CSS pipeline |
| Animation | `framer-motion` | 12.26 | Entrance, layout, hover, modals |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` | 0.182 / 9.5 / 10.7 | Starfield and monitor showcase |
| Icons | `lucide-react` | 0.562 | UI icons |
| Lint | `eslint` + React plugins | 9.39 | Flat-config linting |

`react-router-dom` and `pdf-parse` were removed because they were unused.

## 4. Directory and Module Map

| Path | Responsibility |
|---|---|
| `index.html` | Document shell, fonts, theme boot script, SEO meta, Open Graph/Twitter, JSON-LD, no-JS fallback |
| `src/main.jsx` | Mounts `<App />` in `StrictMode` |
| `src/App.jsx` | Error boundary, theme persistence, preloader gate, 3D pause, layered background, sections, footer |
| `src/styles/index.css` | Tailwind layers, glass/aurora/grain/focus utilities, scrollbar, reduced-motion fallbacks |
| `src/data/constants.js` | Single source of truth for all displayed content |
| `src/hooks/useFocusTrap.js` | Tabs cycle inside a dialog; restores focus on unmount |
| `src/hooks/useLockBodyScroll.js` | Scroll lock with scrollbar-width compensation |
| `src/hooks/useModalHistory.js` | Pushes a history entry; closes on `popstate`; pops on UI close |
| `src/hooks/useScrollSpy.js` | Shared active-section tracking |
| `src/sections/Hero.jsx` | Single-column name reveal, typewriter, CTAs, socials, stats |
| `src/sections/About.jsx` | Quick facts, focus areas, resume CTA |
| `src/sections/Skills.jsx` | Category filters, spotlight cards, proficiency bars |
| `src/sections/Experience.jsx` | Internship timeline plus education score cards |
| `src/sections/Certifications.jsx` | Tabs, search, spotlight cards, featured awards, modal trigger |
| `src/sections/Projects.jsx` | Search, filters, sorting, thumbnails, featured badges, modal orchestration |
| `src/sections/Contact.jsx` | Availability, copy email, phones, LeetCode, socials, validated form, toast |
| `src/components/layout/Section.jsx` | Section shell with reduced-motion-aware reveal |
| `src/components/layout/SectionHeading.jsx` | Eyebrow, highlighted title, subtitle |
| `src/components/layout/Navbar.jsx` | Scroll-spy, sliding pill, auto-hide, resume CTA, theme toggle, mobile drawer |
| `src/components/layout/ScrollProgress.jsx` | Fixed top scroll progress bar |
| `src/components/layout/BackToTop.jsx` | Scroll-progress ring back-to-top button |
| `src/components/layout/Preloader.jsx` | Session-aware intro animation with skip |
| `src/components/layout/ErrorBoundary.jsx` | Render-error fallback with reload |
| `src/components/ui/Button3D.jsx` | Hard-shadow button with glare sweep and optional glow |
| `src/components/ui/TiltCard3D.jsx` | Pointer-driven 3D tilt with spring damping |
| `src/components/ui/Logo3D.jsx` | Tilt/translateZ logo tile with glow, sheen, image fallback |
| `src/components/ui/SpotlightCard.jsx` | Cursor-tracked radial spotlight via CSS variables |
| `src/components/ui/Reveal.jsx` | Reduced-motion-aware `whileInView` wrapper |
| `src/components/ui/Magnetic.jsx` | Pointer-follow translation for CTAs |
| `src/components/ui/CountUp.jsx` | In-view numeric count-up |
| `src/components/ui/Typewriter.jsx` | Rotating role typewriter |
| `src/components/ui/FilterPill.jsx` | Shared animated filter chip with `layoutId` indicator |
| `src/components/ui/ProjectThumb.jsx` | CSS-only browser mockup with tech chips and feature overlay |
| `src/components/ui/StatusPill.jsx` | Availability badge with pulsing dot |
| `src/components/ui/ThemeToggle.jsx` | Animated sun/moon toggle |
| `src/components/ui/CursorEffect.jsx` | Cursor-follow dot and ring with hover/press states |
| `src/components/ui/Toast.jsx` | Glass notification with auto-dismiss progress |
| `src/components/modals/LiveDemoModal.jsx` | Browser-style project preview with device sizes and mockup fallback |
| `src/components/modals/CertificateModal.jsx` | Credential viewer with metadata and prev/next |
| `src/components/chat/PortfolioBot.jsx` | Chat widget, intent engine, quick prompts, section jumps |
| `src/components/3d/StarBackground.jsx` | Point sphere, parallax, twinkle, shooting stars |
| `src/components/3d/ProjectShowcase3D.jsx` | Floating 3D monitor embedding the live site |
| `check_links.cjs` | Standalone HTTP status probe |

## 5. Rendering Pipeline and Lifecycle

1. `index.html` loads Inter and Space Grotesk, then runs a small inline script that applies `localStorage.theme` (or the system preference) to `<html>` before React hydrates, preventing a theme flash.
2. `main.jsx` mounts `App` in `StrictMode`.
3. `App` initializes:
   - `loading`: `true` only if `sessionStorage.rb-preloaded !== "1"`.
   - `dark`: stored theme, otherwise system preference.
   - `pageVisible`: `!document.hidden`.
4. If loading, `Preloader` runs:
   - If reduced motion or already seen this session, completes after 120 ms.
   - Otherwise shows the logo, "Namaste", the typed welcome, and a progress bar over roughly 1.5 seconds.
   - Can be skipped at any time.
   - `onComplete` writes `rb-preloaded=1` and clears the gate.
5. After loading:
   - `useEffect` toggles the `dark` class and `color-scheme`, and persists the choice.
   - The aurora layer, fixed starfield canvas, and grain overlay render behind `<main>`.
   - `Canvas` uses `dpr={[1, 1.75]}`, `frameloop` tied to `pageVisible`, and a transparent alpha buffer.
6. Eager sections render immediately. The four lazy sections share one `Suspense`, so their imports start in parallel after the preloader.
7. Project modal chunks are requested only when an action is clicked.

## 6. Data Model

All content is plain JavaScript objects exported from `src/data/constants.js`. There are no TypeScript types or runtime validation.

### `skills`

```text
skills[] {
  title, desc, iconUrl, color, categoryKey,
  skills[] { name, desc, iconUrl, color, level, percentage }
}
```

`categoryKey` maps to an icon in `Skills.jsx` (`frontend`, `backend`, `databases`, `languages`, `tools`); unknown keys fall back to `Layers`. `percentage` drives the animated bar and numeric label; `level` maps to a badge color.

### `projects`

```text
projects[] {
  id, name, desc, tech, category, link, repo,
  color, features[], status,
  featured?         // pins to the top when sorting by Featured
}
```

- Categories are derived with `new Set`, so new categories automatically appear as filters.
- `tech` is a comma-and-space separated string.
- `color` is used inline for tags, gradients, thumbnails, and glows.
- `features` appears in the thumbnail hover overlay, one highlight line, and the preview mockup.

### `achievements` (aliased as `certifications`)

```text
achievements[] {
  id, title, org, category, type, date, issueDate,
  desc, previewImage, fileUrl, color, badge, certId
}
```

- `type` is the filter key (`hackathon`, `internship`, `certification`) and selects the icon.
- `category` is a human-readable label.
- `previewImage` and `fileUrl` point into `public/`.
- `certifications` re-exports the same array for compatibility.

### Other exports

| Export | Shape | Consumers |
|---|---|---|
| `heroRoles` | `string[]` | Hero typewriter |
| `stats` | `{ label, value, suffix }[]` | Hero count-up cards |
| `socialLinks` | `{ name, link, iconUrl, color }[]` | Hero, Contact, Navbar drawer, Footer |
| `experience` | `{ role, company, date, type, location, score?, scoreLabel?, desc, skills[] }[]` | Experience and education |
| `contactInfo` | `{ email, phone, leetcode, leetcodeHandle }` | Contact, Footer |
| `availability` | `{ status, detail, tone }` | Contact, quick facts |
| `quickFacts` | `{ label, value, icon }[]` | About |
| `location` | `string` | Quick facts |
| `resumeUrl` | `string` | Hero, Navbar, About, Contact, Footer |

## 7. Visual System

### Color tokens

| Token | Value | Usage |
|---|---|---|
| `primary` | `#3b82f6` | CTAs, active states, links, focus rings |
| `secondary` | `#6366f1` | Gradients, secondary accents |
| `tertiary` | `#0ea5e9` | Gradient endpoints |
| `accent` | `#14b8a6` | Success and highlight accents |
| `dark` | `#030712` | Dark page background token |
| `dark-lighter` | `#111827` | Secondary dark surfaces |
| `aurora.1..4` | `#38bdf8`, `#6366f1`, `#22d3ee`, `#2dd4bf` | Ambient palette |
| `surface.*` | `#f8fafc`, `#0b1120`, `#111a2e` | Surface tokens |

Body background is `#f1f5f9` in light mode and `#0a0e1a` under `.dark`.

### Typography

- Body: Inter.
- Display: Space Grotesk (`font-display`) for headings and numerals.
- Headings use `font-bold`/`font-extrabold` with responsive `text-3xl` to `text-7xl`. Section highlight words use a solid primary-blue accent; the hero name is the only large gradient treatment.
- The palette is intentionally blue/indigo/sky/teal rather than the earlier pink-violet mix, which reads more professional for a hiring audience.
- Metadata uses uppercase `text-[10px]`/`text-xs` with moderate wide tracking.
- `text-wrap: balance` for headings and `pretty` for paragraphs.

### Surfaces and utilities

- `.glass-card`: translucent white/slate, `backdrop-blur-xl`, subtle border, layered shadow with an inner top highlight.
- `.glass-card-hover`: brightens and adds a primary-tinted shadow.
- `.aurora-bg`: fixed multi-radial ambient layer.
- `.grain`: fixed SVG turbulence overlay at low opacity.
- `.glare`: a sheen sweep triggered by a parent `.group:hover`.
- `.focus-ring`: consistent focus-visible ring with offset.

### Shape and depth

- Radii from `rounded-xl` to `rounded-[2.5rem]`; cards mostly `rounded-3xl`.
- `Button3D`: hard `0 6px 0` shadow, press-down on `active`, glare sweep, optional glow.
- `TiltCard3D`: `perspective: 1200px`, spring-damped `rotateX/rotateY` up to 12 degrees, content lifted with `translateZ(40px)`.
- `Logo3D`: tilt plus `translateZ`, radial brand aura, specular sheen, and initials fallback.
- `SpotlightCard`: a 320 px radial spotlight follows the pointer through CSS variables.

## 8. Motion System

Framer Motion:

- Section entrance: fade and 50 px rise once when 50 px into view.
- Card grids: fade/scale with `AnimatePresence` on filter changes and `layout` reflow.
- Filter chips: shared `layoutId` pill slides between active filters.
- Certification hover: a shared `layoutId` gradient frame glides between cards.
- Modals: spring scale/translate with a `rotateX` settle for a 3D entrance.
- Navbar: sliding active pill and auto-hide slide.
- Micro-interactions: magnetic CTAs, hover scale, icon translation, typing caret.
- Count-up stats and a rotating typewriter.
- Toast slide-in with a linear progress bar.

CSS/Tailwind keyframes:

CSS keyframes: caret blink only; the aurora layer is static.

Reduced motion:

- `useReducedMotion` skips Reveal/Section entrances, magnetic movement, tilt, count-up animation, typewriter cycling, and the cursor effect.
- `StarBackground` renders no particles when reduced motion is requested.
- The preloader completes immediately.
- `src/styles/index.css` disables CSS animations/transitions under the media query.

## 9. Interaction Flows

### Theme

1. Inline head script applies stored/system theme.
2. `App` reads the same value for state.
3. On change, `App` toggles `html.dark`, sets `color-scheme`, and writes `localStorage.theme`.
4. All `dark:` variants update through the class strategy.

### Navigation and scroll-spy

`useScrollSpy` computes `window.scrollY + 140` and selects the last section whose `offsetTop` is above it. The navbar:

- Slides a shared `layoutId` pill to the active link.
- Closes over an 80 px anchor offset.
- Auto-hides on downward scroll past 120 px and reveals on upward scroll, focus, or menu open.
- Locks body scroll while the mobile drawer is open.

### Hero

- Single centered column: name, rotating role, one intro paragraph, CTAs, socials, stats, scroll cue.
- Name words stagger in; the final word uses a solid primary-blue accent.
- `Typewriter` cycles `heroRoles`.
- Primary CTA is wrapped in `Magnetic`; resume opens `resumeUrl` in a new tab.
- Stats use `CountUp` when scrolled into view.

### Project preview modal (`LiveDemoModal`)

Shared hooks: body scroll lock, modal history, focus trap.

- Portal into `document.body`.
- Push a history entry; Back closes the modal. Closing via UI schedules a `history.back()` so stale entries are cleaned up.
- `Escape` closes; `Left`/`Right` switch projects.
- Device switcher: desktop, tablet 768 px, mobile 375 px.
- `interactive` mode embeds the live site; `mockup` mode renders features and tech. The user can toggle manually, and an iframe error reveals the summary with an `X-Frame-Options` note.
- Refresh remounts the iframe; copy writes the URL to the clipboard; "Open Full Site" opens a new tab; "3D View" closes this modal and opens the showcase.
- Switching projects resets iframe loading/error state through `selectProject`.

### 3D project showcase (`ProjectShowcase3D`)

- Full-screen portal with an R3F canvas, `Environment preset="city"`, `PresentationControls`, `Float`, and `ContactShadows`.
- A monitor mesh holds a Drei `<Html transform>` panel with faux browser chrome and an iframe.
- If the iframe errors, the panel shows a text summary and launch button.
- Escape closes; Frame View closes this modal and opens the live preview.
- Same history/scroll-lock/focus behavior as the other modals.

### Certificate modal (`CertificateModal`)

- Receives the selected achievement plus the filtered list, so prev/next respects search and tabs.
- Shows the preview image constrained to `68vh`, or an award placeholder when the image fails. Image error state is keyed by achievement ID, so switching credentials resets it without an effect.
- Sidebar: issuer, date/duration, credential ID, badge, description.
- Actions open the original document or download it.
- Escape closes; arrows navigate; focus trap and history integration match the preview modal.

### Contact flow

- Client-side validation for required fields, email format, and a 10-character minimum message.
- Hidden `_gotcha` honeypot; a filled value silently succeeds without sending.
- Submit posts `name`, `email`, and `message` to Formspree `xojjebba`.
- Success resets the form and shows a toast; failure keeps inputs and shows an error toast.
- Copy-email uses the Clipboard API with a fallback message.
- Resume, direct email, phone, LeetCode, and social links are always available.

### Portfolio assistant (`PortfolioBot`)

A closed-domain intent matcher:

1. Lowercase and trim the message.
2. Run regex checks in fixed order: intro/about, internships/work/LOR, skills, projects, hackathons, certifications, education, resume, availability, contact, LeetCode, fallback.
3. Return hardcoded text plus an optional `actionSection` that renders a section-jump button.
4. Render through a small parser supporting `**bold**`, `` `code` ``, `[label](url)`, and bullets.
5. UI extras: 500 ms typing delay, animated dots, quick chips, reset, message IDs from a ref counter, auto-scroll, a greeting bubble, an unread dot, focus on open, and Escape to close.

Because matching is first-hit, ordering is semantic. For example, "work" matches internships before projects, and "cpp" matches skills before LeetCode.

### Preloader

- First visit in a session: progress animation plus the Namaste/welcome sequence.
- Later visits or reduced motion: resolves after 120 ms.
- Skip button calls the completion callback immediately.
- `App` records `rb-preloaded` in session storage and makes the callback idempotent with a ref.

## 10. 3D Subsystem

### `StarBackground`

- Particle count: `0` for reduced motion, `1200` up to 768 px, otherwise `4500`.
- Positions live in a spherical shell of radius 15-45.
- `useFrame` rotates the point cloud, eases the group toward pointer/device-orientation targets, and modulates material opacity for twinkling.
- Three shooting-star meshes drift and wrap around the scene.
- Skips updates when `document.hidden`.
- Particle color is white in dark mode and `#64748b` in light mode.
- Camera at `[0, 0, 1]`; group rotated 45 degrees on Z.

### `ProjectShowcase3D`

- Standard materials (`roughness` 0.2-0.3, `metalness` 0.7-0.8), environment lighting, contact shadows.
- The iframe inside `<Html transform>` is the heaviest element because it loads a third-party page inside WebGL.

## 11. Performance Strategy

- **Section splitting:** Experience, Certifications, Projects, and Contact are `React.lazy`.
- **Viewer splitting:** LiveDemoModal and ProjectShowcase3D are lazy and only imported on first use.
- **Vendor splitting:** `react-vendor`, `three-core`, `three-fiber`, `three-drei`, `motion-vendor`, and `icons-vendor`.
- **Canvas discipline:** clamped DPR, `frameloop="never"` when the tab is hidden, and frame guards for `document.hidden`.
- **Adaptive 3D:** mobile particle counts are lower; reduced motion disables both scenes.
- **Image hints:** content images use `loading="lazy"` and `decoding="async"` where appropriate.
- **Passive scroll listeners:** navigation and scroll-spy handlers are passive.
- **CSS variable spotlights:** pointer tracking avoids React state churn.
- **Session preloader:** skips the intro after the first view in a session.
- **Static hosting:** no server calls on load; Formspree is contacted only on submit.

Not implemented: service worker/offline caching, font subsetting/self-hosting, image `srcset` pipelines, runtime bundle analysis, or intersection-observer-based section loading.

## 12. Accessibility and UX

Present:

- Skip link to `#main`.
- Semantic landmarks (`nav`, `main`, `footer`, `section`) and heading hierarchy.
- `aria-label` on icon-only buttons, `aria-current` on the active nav link, and `aria-pressed` on filter chips.
- Modals use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trapping, focus restoration, Escape, and scroll lock.
- Certificate cards are keyboard-activatable (`Enter`/`Space`).
- Live region for assistant messages; input focused on open; Escape closes.
- Form labels, `aria-invalid`, `aria-describedby`, and inline error text.
- Visible `:focus-visible` rings.
- Reduced-motion handling across 3D, preloader, reveals, and CSS animation.
- Responsive layouts from small phones to wide desktops.

Gaps:

- Modals do not yet set `aria-describedby` or use the native `<dialog>` element.
- Focus trapping is manual and does not handle nested dialogs.
- Assistant messages are announced but the chat is not a full modal experience.
- Color contrast has not been formally audited against WCAG AA.
- No automated accessibility test runs in CI.

## 13. SEO, PWA, and Deployment

- `index.html` includes title, description, keywords, author, theme color, canonical, Open Graph, Twitter card, and JSON-LD `Person`.
- `public/manifest.json` declares a standalone PWA with 192/512 icons, language, direction, categories, and display overrides.
- `public/robots.txt` allows all crawlers and points to the sitemap.
- `public/sitemap.xml` lists the single root URL.
- `public/og-image.png` is the 1200x630 share card and must be publicly reachable.
- Deployment is any static host; hash-anchor navigation needs no rewrite rules.

Domain-dependent content: canonical/OG/Twitter/JSON-LD URLs, `robots.txt` sitemap, and `sitemap.xml` `<loc>`.

## 14. Build and Tooling

- `npm run dev` starts Vite with Fast Refresh.
- `npm run build` emits `dist/`.
- `npm run preview` serves the built output.
- `npm run lint` runs ESLint 9 over `**/*.{js,jsx}` with browser globals, React JSX, hooks, and React Refresh rules. `dist` is ignored; unused variables are errors unless prefixed with an uppercase letter or underscore.
- `npm run verify` runs lint then build.
- `npm run check-links` issues GET requests with a 5-second timeout, follows one redirect, and prints `[status] url` plus a summary.

Environment note: if npm is configured with `omit=dev`, run `npm install --include=dev`, otherwise Vite and ESLint will be missing.

## 15. Known Limitations and Technical Debt

1. **No tests or CI.** There is no unit, integration, or end-to-end suite and no workflow file. `npm run verify` is the current safety net.
2. **Single large data module.** All content lives in `src/data/constants.js`; splitting it per domain would make maintenance easier as the portfolio grows.
3. **Modal history in development.** `useModalHistory` cleans up with a 350 ms delayed `history.back()`. React `StrictMode` double-mounts effects in development, which can leave one stale history entry per modal. Production behavior is single-push/single-pop.
4. **Modal accessibility is manual.** Focus trapping is custom and not tested with screen readers. No nested-dialog support.
5. **Iframe detection is best-effort.** Cross-origin embedding blocked by `X-Frame-Options` or CSP may show a blank frame rather than triggering the mockup fallback. The manual "Switch to Mockup" control is the reliable path.
6. **Static stats.** `stats` values are hardcoded and can drift from the actual array lengths.
7. **Asset naming.** Certificate files contain spaces, parentheses, and mixed case. They work on most hosts, but case-sensitive Linux servers can break mismatched paths.
8. **External assets.** Icons depend on `simpleicons.org`/`jsdelivr`, and fonts depend on Google Fonts. Offline use, blockers, or CDN outages degrade visuals.
9. **Two WebGL canvases.** The background and the showcase each create a context; low-end devices can struggle when both are active. The background pauses when the tab is hidden.
10. **Content in JS.** All text ships in the main bundle; there is no CMS or external data source.
11. **Public Formspree endpoint.** Normal for client-side Formspree forms, but spam protection relies on Formspree settings plus the honeypot.
12. **Assistant is not AI.** It only matches predefined intents and cannot answer arbitrary questions.

## 16. Extension Guide

### Add a new section

1. Create `src/sections/MySection.jsx` using `Section` and `SectionHeading`.
2. Import it lazily in `App.jsx` and render it inside the existing `Suspense` in the desired order.
3. Add `{ name: "My Section", href: "#my-section" }` to `NAV_LINKS` in `Navbar.jsx` and the footer links.
4. Add an intent branch in `PortfolioBot.getAIResponse` if the assistant should route to it.

### Add a new modal

- Render with `createPortal(..., document.body)`.
- Call `useLockBodyScroll(true)`, `useModalHistory(onClose)`, and `useFocusTrap(dialogRef, true)`.
- Put `ref={dialogRef}`, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `tabIndex={-1}` on the panel.
- Handle `Escape` and any arrow-key navigation.
- Use `AnimatePresence` plus a spring/`rotateX` entrance.
- Add a render-error placeholder inside the modal.

### Replace the assistant with a real backend

Keep the message contract (`{ text, actionSection? }`). Replace the `setTimeout` in `handleSendMessage` with an async call, set `isTyping` while pending, handle non-2xx responses, and abort on unmount.

### Replace Formspree

Change the `fetch` URL and payload in `src/sections/Contact.jsx`. Keep the success/reset and error/toast branches, and preserve the honeypot.

### Add a project category

Add the value to a project's `category`. Filters, counts, and the empty state update automatically because they derive from `new Set(projects.map(...))`.
