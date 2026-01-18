import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Navbar from './components/ui/Navbar';
import StarBackground from './components/3d/StarBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Preloader from './components/ui/Preloader';
import BackToTop from './components/ui/BackToTop';
import LiquidGlass from './components/ui/LiquidGlass';
import ScrollProgress from './components/ui/ScrollProgress';
import PortfolioBot from './components/ui/PortfolioBot';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-dark min-h-screen text-white relative overflow-hidden font-sans">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          
          {/* 3D Background */}
          <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <Suspense fallback={null}>
                <StarBackground />
              </Suspense>
            </Canvas>
          </div>

          {/* Liquid Glass Effect - Desktop Only */}
          <div className="hidden md:block">
            <LiquidGlass />
          </div>
          <Navbar />
          <BackToTop />
          <PortfolioBot />

          <main className="relative z-10 w-full overflow-y-auto">
            <Hero />
            <About />
            <Skills />
            <Experience />
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
