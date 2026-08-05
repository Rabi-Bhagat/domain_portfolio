import React, { Suspense, useState, useEffect } from 'react';
import Navbar from './components/ui/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Preloader from './components/ui/Preloader';
import BackToTop from './components/ui/BackToTop';
import LiquidGlass from './components/ui/LiquidGlass';
import PortfolioBot from './components/ui/PortfolioBot';
import TechMarquee from './components/ui/TechMarquee';
import { AnimatePresence } from 'framer-motion';

const Canvas = React.lazy(() =>
  import('@react-three/fiber').then((m) => ({ default: m.Canvas })),
);
const StarBackground = React.lazy(() =>
  import('./components/3d/StarBackground'),
);

function StarField() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [blackMode, setBlackMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check for desktop on mount and resize
    const checkDesktop = () => {
        setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Update body background color when mode changes
  useEffect(() => {
    if (blackMode) {
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '#030712'; 
    }
  }, [blackMode]);

  return (
    <div className={`${blackMode ? "bg-black" : "bg-dark"} min-h-screen text-white relative overflow-hidden font-sans transition-colors duration-500`}>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 3D Background */}
          <div className="fixed inset-0 z-0">
            <Suspense fallback={null}>
              <StarField />
            </Suspense>
          </div>

          {/* Liquid Glass Effect - Desktop Only & Conditionally Rendered */}
          {isDesktop && <LiquidGlass />}
          
          <Navbar blackMode={blackMode} setBlackMode={setBlackMode} />
          <BackToTop />
          <PortfolioBot />

          <main className="relative z-10 w-full overflow-y-auto">
            <Hero />
            <TechMarquee />
            <About />
            <Skills />
            <Experience />
            <Certifications />
            <Projects />
            <Contact />
            
            <footer className="py-8 text-center text-slate-500 text-sm relative z-10 glass-card mx-6 mb-6 mt-10">
              <p>© {new Date().getFullYear()} Rabi Bhagat. All rights reserved.</p>
              <p className="mt-1">Built with React, Three.js & Tailwind CSS</p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
