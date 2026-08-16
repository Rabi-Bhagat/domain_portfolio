import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, RefreshCw } from 'lucide-react';

export default function ProjectShowcase3D({ project, onClose, onOpenLiveDemo }) {
  const [iframeError, setIframeError] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md"
      >
        {/* Header Bar */}
        <div className="absolute top-6 left-6 z-[110] flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-lg border border-slate-700/60 text-white flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h3 className="font-bold text-sm leading-none text-white">{project.name}</h3>
              <span className="text-[11px] text-slate-400 font-medium">{project.category} • 3D Interactive View</span>
            </div>
          </div>
        </div>

        {/* Top Hint */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-[110] hidden md:block">
          <span className="px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 text-xs font-semibold shadow-xl">
            🖱️ Drag to rotate 3D view • Scroll to zoom
          </span>
        </div>

        {/* Close & Action Buttons */}
        <div className="absolute top-6 right-6 z-[110] flex items-center gap-3">
          {onOpenLiveDemo && (
            <button
              onClick={() => {
                onClose();
                onOpenLiveDemo(project);
              }}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
            >
              Interactive Demo <ExternalLink size={14} />
            </button>
          )}

          <button 
            onClick={onClose}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/60 backdrop-blur-lg"
            aria-label="Close 3D View"
          >
            <X size={20} />
          </button>
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
}
