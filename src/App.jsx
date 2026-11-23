import React, { Suspense, useState, useEffect, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Preloader from "./components/layout/Preloader";
import BackToTop from "./components/layout/BackToTop";
import PortfolioBot from "./components/chat/PortfolioBot";
import ScrollProgress from "./components/layout/ScrollProgress";
import CursorEffect from "./components/ui/CursorEffect";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { contactInfo, resumeUrl, socialLinks } from "./data/constants";

const Experience = lazy(() => import("./sections/Experience"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Projects = lazy(() => import("./sections/Projects"));
const Contact = lazy(() => import("./sections/Contact"));

const Canvas = React.lazy(() =>
  import("@react-three/fiber").then((module) => ({ default: module.Canvas }))
);

const StarBackground = React.lazy(() => import("./components/3d/StarBackground"));

function getInitialTheme() {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
    return !window.matchMedia?.("(prefers-color-scheme: light)").matches;
  } catch {
    return true;
  }
}

function StarField({ dark, active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <StarBackground dark={dark} />
      </Suspense>
    </Canvas>
  );
}

function SectionSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-24 md:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="glass-card h-48 animate-pulse rounded-3xl" />
      ))}
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const socialIcon = (name) =>
    name === "GitHub" ? Github : name === "LinkedIn" ? Linkedin : ArrowUpRight;

  return (
    <footer className="relative z-10 mx-4 mb-6 mt-16 sm:mx-6">
      <div className="glass-card mx-auto max-w-7xl rounded-3xl p-6 sm:p-8 md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <a href="#home" className="inline-flex items-center gap-3 focus-ring rounded-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-xs font-black text-white shadow-lg shadow-primary/40">
                RB
              </span>
              <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Rabi Bhagat
              </span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Full-stack developer building performant, accessible web products with the MERN
              stack, React, and modern tooling.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = socialIcon(social.name);
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:text-white focus-ring"
                  >
                    <Icon size={13} />
                    {social.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Experience", "#experience"],
                ["Projects", "#projects"],
                ["Certifications", "#certifications"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white focus-ring rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white focus-ring rounded"
                >
                  <Mail size={14} /> {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white focus-ring rounded"
                >
                  <Download size={14} /> Download resume
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white focus-ring rounded"
                >
                  <ArrowUpRight size={14} /> Verified credentials
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500 sm:flex-row">
          <p>© {year} Rabi Bhagat. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with React, Three.js & Tailwind CSS
            <a href="#home" className="ml-2 font-semibold text-primary hover:underline focus-ring rounded">
              Back to top
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return window.sessionStorage.getItem("rb-preloaded") !== "1";
    } catch {
      return true;
    }
  });
  const [dark, setDark] = useState(getInitialTheme);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be unavailable in private modes; theme still works for the session.
    }
  }, [dark]);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handlePreloaderComplete = () => {
    try {
      window.sessionStorage.setItem("rb-preloaded", "1");
    } catch {
      // Ignore storage failures.
    }
    setLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-500 dark:bg-dark dark:text-white">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-primary px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <CursorEffect />

        <AnimatePresence>
          {loading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>

        {!loading && (
          <>
            <div className="aurora-bg" aria-hidden="true" />

            <div className="fixed inset-0 z-[1]" aria-hidden="true">
              <Suspense fallback={null}>
                <StarField dark={dark} active={pageVisible} />
              </Suspense>
            </div>

            <div className="grain" aria-hidden="true" />

            <Navbar dark={dark} setDark={setDark} />
            <BackToTop />
            <PortfolioBot />

            <main id="main" className="relative z-10 w-full overflow-y-auto">
              <Hero />
              <About />
              <Skills />

              <Suspense fallback={<SectionSkeleton />}>
                <Experience />
                <Certifications />
                <Projects />
                <Contact />
              </Suspense>

              <Footer />
            </main>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
