# Rabi Bhagat — Portfolio

A modern, animated personal portfolio built with **React, Vite, Tailwind CSS, Three.js, and Framer Motion**. Features a 3D starfield background, liquid-glass UI, typewriter hero, project filters, a contact form, and a built-in assistant chat bot.

---

## 🚀 Quick Start

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint      # run ESLint
```

---

## 📁 Project Structure

```
├── index.html                  # SEO / social media meta tags
├── public/
│   ├── logo.svg                # favicon
│   ├── og-image.png            # social share banner (1200x630)
│   ├── resume.pdf              # your downloadable resume
│   ├── robots.txt              # search engine rules
│   ├── sitemap.xml             # SEO sitemap
│   ├── manifest.json           # PWA manifest
│   └── icon-192/512.png        # app icons
├── src/
│   ├── data/constants.js       # ⭐ ALL your content lives here
│   ├── sections/               # Hero, About, Skills, Experience, Certifications, Projects, Contact
│   ├── components/
│   │   ├── 3d/StarBackground.jsx
│   │   └── ui/                 # Navbar, Button3D, TechMarquee, PortfolioBot, etc.
│   └── App.jsx                 # page assembly & layout
└── vite.config.js              # build config (code splitting)
```

---

## ✏️ How to Update Your Content

**Everything you need to edit is in `src/data/constants.js`.** No need to touch any component files.

### Sections you can update
| Data export | Controls | Notes |
|---|---|---|
| `projects` | Project cards + lightbox | Add `image`, `imageFallback`, `highlights` |
| `services` | "What I Offer" cards | Add/remove services |
| `caseStudies` | Problem → Solution → Result blocks | Showcases your top projects |
| `testimonials` | Client/colleague quotes | ⚠️ Replace the 3 placeholders with real people |
| `blogPosts` | "Latest Insights" cards | Replace placeholders with your real posts |
| `certifications` | Certifications cards | Keep links current |
| `skills`, `experience` | Skills timeline, Experience timeline | |
| `socialLinks` | Social icons (Hero + Contact) | WhatsApp already added |
| `heroRoles`, `stats` | Typewriter words, hero counters | |
| `contactInfo` | Email, phones, **WhatsApp**, location, status | WhatsApp link uses `https://wa.me/9779815787410` |
| `githubUsername` | Live GitHub stats widget in About | Set to your GitHub handle |

### Project screenshots
Each project loads a **live screenshot** of its URL (via `s.wordpress.com/mshots`). If it can't load, it falls back to the local thumbnail in `public/projects/<slug>.png`. To use your own screenshots, just replace the `image` field with your image URL.

### Contact form
The form is wired to **Formspree**. To use your own account, change the endpoint in `src/sections/Contact.jsx` (the `fetch("https://formspree.io/f/...")` call).

---

## 📣 Hosting on Social Media

When you share `https://rabibhagat.com.np/` on WhatsApp, LinkedIn, Facebook, X/Twitter, etc., the preview uses:

| Tag | Purpose |
|---|---|
| `og:title` / `og:description` | Post headline & text |
| `og:image` | The 1200x630 preview card (`public/og-image.png`) |
| `twitter:card` | Large image layout on X |

> ⚠️ Before sharing, the image at `og:image` **must** be publicly reachable at your deployed domain. Deploy first, then test your URL at https://developers.facebook.com/tools/debug/ and https://cards-dev.twitter.com/validator.

**To change the domain used everywhere** (SEO/social), edit `index.html` (canonical, `og:url`, `twitter:url`, JSON-LD), `public/robots.txt`, and `public/sitemap.xml` — replace `rabibhagat.com.np` with your URL.

To regenerate the share banner, edit/re-run the image-generation step in this project, or replace `public/og-image.png` with your own 1200x630 image.

---

## 🚢 Deployment

Any static host works (output is `dist/`):

- **Cloudflare Pages** — `npm run build`, then upload/publish the `dist` folder (the simplest for custom domains).
- **Vercel** — connect the repo; framework preset: *Vite*.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — build and push `dist`, or use a GitHub Action.

Set your custom domain's DNS so `rabibhagat.com.np` points at your host, then update the SEO files above.

---

## 🔗 Known Broken Repo Links

The following projects are live, but their GitHub repo links currently return **404** (the repos may be private or renamed). Update these in `src/data/constants.js` (or the `repo` field) once fixed:

1. `mohanpur_village` → live at mohanpur-village.vercel.app
2. `Booking-App-hotelBazaar-` → live at booking-app-hotelbazaar.pages.dev
3. `SecureDocs-document-management-system-` → live at securedocs-a3x.pages.dev
4. `frontened-project` (used by **E-commerce**, **Guessing Game**, **To-Do List**) → repo not found publicly

Run `npm run check-links` to re-check all links in the project.

---

## 🛠️ Tech Stack

React 19 · Vite 7 · Tailwind CSS 3 · Three.js / React Three Fiber · Framer Motion · lucide-react
