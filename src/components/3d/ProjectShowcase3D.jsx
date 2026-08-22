import React, { Suspense, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowLeft } from 'lucide-react';

export default function ProjectShowcase3D({ project, onClose, onOpenLiveDemo }) {
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // Push state so browser back button closes modal instead of closing/navigating away from portfolio
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-[99999] flex flex-col bg-slate-950"
      >
        {/* Fixed Top Navigation Bar */}
        <div className="w-full px-4 sm:px-6 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-4 z-[120] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700/80 shadow-md shrink-0"
              title="Back to Portfolio"
            >
              <ArrowLeft size={16} /> Back to Projects
            </button>

            <div className="h-4 w-px bg-slate-800 shrink-0 hidden sm:block"></div>

            <div className="min-w-0">
              <h3 className="font-bold text-sm text-white truncate max-w-[200px] sm:max-w-[320px]">{project.name}</h3>
              <p className="text-[11px] text-slate-400 font-medium truncate">{project.category} • 3D Canvas View</p>
            </div>
          </div>

          <div className="hidden md:block text-center text-xs text-slate-400 bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-slate-800">
            🖱️ Drag to rotate 3D view • Scroll to zoom
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
            >
              Open in New Tab <ExternalLink size={14} />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close 3D View"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <color attach="background" args={['transparent']} />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <PresentationControls
                global
                rotation={[0.1, 0, 0]}
                polar={[-0.4, 0.3]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.3} floatIntensity={1.5} speed={1.5}>
                  {/* Floating Monitor Mesh */}
                  <mesh position={[0, 0.1, 0]}>
                    <boxGeometry args={[4.2, 2.7, 0.12]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
                    
                    {/* Screen Display inside Three.js */}
                    <Html
                      transform
                      wrapperClass="htmlScreen"
                      distanceFactor={1.17}
                      position={[0, 0, 0.061]}
                      style={{
                        width: '1024px',
                        height: '640px',
                        background: '#0a0e1a',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(0,0,0,0.8)'
                      }}
                    >
                      <div className="w-full h-full flex flex-col bg-slate-950 text-white relative font-sans">
                        {/* Fake Browser Header */}
                        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                          </div>
                          <div className="bg-slate-950 px-4 py-1 rounded-md text-xs font-mono text-slate-400 border border-slate-800">
                            {project.link}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                          >
                            Open <ExternalLink size={12} />
                          </a>
                        </div>

                        {/* Screen Content */}
                        <div className="flex-1 relative overflow-hidden bg-slate-900">
                          {iframeError ? (
                            <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                              <div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 inline-block mb-4">
                                  {project.category}
                                </span>
                                <h2 className="text-3xl font-black text-white mb-3">{project.name}</h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {project.tech.split(", ").map(t => (
                                    <span key={t} className="px-2.5 py-1 bg-slate-800 rounded text-xs font-semibold text-emerald-300">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors w-max"
                              >
                                Launch Live Application <ExternalLink size={16} />
                              </a>
                            </div>
                          ) : (
                            <iframe
                              src={project.link}
                              title={project.name}
                              className="w-full h-full border-0 bg-white"
                              onError={() => setIframeError(true)}
                            />
                          )}
                        </div>
                      </div>
                    </Html>
                  </mesh>

                  {/* Monitor Stand Base */}
                  <mesh position={[0, -1.45, 0]}>
                    <boxGeometry args={[1.2, 0.08, 0.8]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
                  </mesh>
                  <mesh position={[0, -1.38, 0]}>
                    <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
                  </mesh>
                </Float>
              </PresentationControls>
              <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={20} blur={2.5} far={4} />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
