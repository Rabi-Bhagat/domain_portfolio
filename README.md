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

### Social Links (`socialLinks`)
```js
{ name: "GitHub", link: "https://github.com/Rabi-Bhagat", iconUrl: "...", color: "#181717" }
```
Add or remove entries to change the social icons in the Hero and Contact sections.

### Projects (`projects`)
```js
{
  name: "Mohanpur Village",
  desc: "Short description",
  tech: "MongoDB, Express, React, Node.js",
  category: "Full Stack",        // used for the filter buttons
  link: "https://live-demo.com", // Live Demo button
  repo: "https://github.com/you/repo", // Code button
}
```

### Skills (`skills`), Experience (`experience`), Certifications (`certifications`)
Same pattern — one object per item. Categories drive the timeline layout in Skills and the filter in Projects automatically.

### Hero text & stats
- `heroRoles` → the typewriter words
- `stats` → the number counters under the hero

### Contact info (`contactInfo`)
Update email / phone. **The contact form itself is wired to Formspree** — change the endpoint in `src/sections/Contact.jsx` (line 28: `fetch("https://formspree.io/f/...")`) if you use your own account.

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
