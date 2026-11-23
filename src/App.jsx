import React, { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/layout/Preloader";
import BackToTop from "./components/layout/BackToTop";
import ScrollProgress from "./components/layout/ScrollProgress";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import PortfolioBot from "./components/chat/PortfolioBot";
import NifleCursor from "./components/ui/NifleCursor";
import Hero from "./sections/Hero";

const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Experience = lazy(() => import("./sections/Experience"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Projects = lazy(() => import("./sections/Projects"));
const Contact = lazy(() => import("./sections/Contact"));

const Canvas = lazy(() =>
  import("@react-three/fiber").then((module) => ({ default: module.Canvas }))
);
const StarBackground = lazy(() => import("./components/3d/StarBackground"));

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
    return !window.matchMedia("(prefers-color-scheme: light)").matches;
  } catch {
    return true;
  }
}

function StarField({ dark, active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 60 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: true }}
    >
      <Suspense fallback={null}>
        <StarBackground dark={dark} />
      </Suspense>
    </Canvas>
  );
}

function SectionFallback() {
  return (
    <div className="shell space-y-4 py-20">
      <div className="h-6 w-40 animate-pulse rounded bg-line" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-line/60" />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return window.sessionStorage.getItem("rb-preloaded") !== "1";
    } catch {
      return true;
    }
  });
  const [dark, setDark] = useState(getInitialTheme);
  const [visible, setVisible] = useState(
    () => typeof document === "undefined" || !document.hidden
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    try {
      window.localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* Ignore storage failures. */
    }
  }, [dark]);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const finishLoading = () => {
    try {
      window.sessionStorage.setItem("rb-preloaded", "1");
    } catch {
      /* Ignore storage failures. */
    }
    setLoading(false);
  };

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100]"
        >
          Skip to content
        </a>

        <NifleCursor />
        <ScrollProgress />

        <AnimatePresence>
          {loading && <Preloader onComplete={finishLoading} />}
        </AnimatePresence>

        {!loading && (
          <>
            {!reduceMotion && (
              <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
                <Suspense fallback={null}>
                  <StarField dark={dark} active={visible} />
                </Suspense>
              </div>
            )}

            <div className="relative z-10">
              <Navbar dark={dark} setDark={setDark} />

              <main id="main">
                <Hero />

                <Suspense fallback={<SectionFallback />}>
                  <About />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Skills />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Experience />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Certifications />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Contact />
                </Suspense>
              </main>

              <Footer />
            </div>

            <BackToTop />
            <PortfolioBot />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
