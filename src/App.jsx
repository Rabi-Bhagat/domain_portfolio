import React, { Suspense, useState, useEffect, lazy } from "react";
import Navbar from "./components/ui/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Preloader from "./components/ui/Preloader";
import BackToTop from "./components/ui/BackToTop";
import PortfolioBot from "./components/ui/PortfolioBot";
import TechMarquee from "./components/ui/TechMarquee";
import { AnimatePresence } from "framer-motion";

const Experience = lazy(() => import('./sections/Experience'));
const Certifications = lazy(() => import('./sections/Certifications'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));

const Canvas = React.lazy(() =>
  import("@react-three/fiber").then((m) => ({ default: m.Canvas })),
);
const StarBackground = React.lazy(
  () => import("./components/3d/StarBackground"),
);

function StarField({ dark }) {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground dark={dark} />
      </Suspense>
    </Canvas>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);

  // Sync theme class on <html> so Tailwind `dark:` variants apply
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 dark:bg-dark dark:text-white relative overflow-hidden font-sans transition-colors duration-500`}
    >
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 3D Background */}
          <div className="fixed inset-0 z-0">
            <Suspense fallback={null}>
              <StarField dark={dark} />
            </Suspense>
          </div>

          <Navbar dark={dark} setDark={setDark} />
          <BackToTop />
          <PortfolioBot />

          <main className="relative z-10 w-full overflow-y-auto">
            <Hero />
            <TechMarquee />
            <About />
            <Skills />

            <Suspense
              fallback={
                <div className="h-40 flex items-center justify-center text-slate-500">
                  Loading section...
                </div>
              }
            >
              <Experience />
              <Certifications />
              <Projects />
              <Contact />
            </Suspense>

            <footer className="py-8 text-center text-slate-500 dark:text-slate-500 text-sm relative z-10 glass-card mx-6 mb-6 mt-10">
              <p>
                © {new Date().getFullYear()} Rabi Bhagat. All rights reserved.
              </p>
              <p className="mt-1">Built with React, Three.js & Tailwind CSS</p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
