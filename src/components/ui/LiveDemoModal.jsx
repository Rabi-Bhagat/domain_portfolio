import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, Monitor, Tablet, Smartphone, 
  RotateCw, ChevronLeft, ChevronRight, Check, Copy, AlertCircle, Sparkles, Eye, ArrowLeft
} from 'lucide-react';

export default function LiveDemoModal({ project, projects = [], onClose, onSelectProject, onOpen3D }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'mockup'
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const currentIndex = projects.findIndex(p => p.id === project?.id || p.name === project?.name);

  // Keyboard navigation, browser history back interceptor & body scroll lock
  useEffect(() => {
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(projects[currentIndex - 1]);
      }
      if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
        onSelectProject(projects[currentIndex + 1]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, projects, onClose, onSelectProject]);

  // Reset state when project changes
  useEffect(() => {
    setIframeError(false);
    setLoading(true);
    setIframeKey(prev => prev + 1);
  }, [project]);

  if (!project) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setLoading(true);
    setIframeError(false);
    setIframeKey(prev => prev + 1);
  };

  const deviceDimensions = {
    desktop: 'w-full h-[70vh] md:h-[75vh]',
    tablet: 'w-[768px] max-w-full h-[650px] max-h-[70vh]',
    mobile: 'w-[375px] max-w-full h-[640px] max-h-[70vh]'
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-2xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="w-full max-w-7xl h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden relative"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Left Info & Nav */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700/80 shadow-sm shrink-0"
                title="Back to Projects"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => currentIndex > 0 && onSelectProject(projects[currentIndex - 1])}
                  disabled={currentIndex <= 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous Project (←)"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => currentIndex < projects.length - 1 && onSelectProject(projects[currentIndex + 1])}
                  disabled={currentIndex >= projects.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next Project (→)"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="h-4 w-px bg-slate-800 shrink-0 hidden sm:block"></div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">
                    {project.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 hidden lg:inline">
                    ({currentIndex + 1} of {projects.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Center Controls - Viewport Switcher */}
            <div className="hidden md:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  device === 'desktop' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor size={15} /> Desktop
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  device === 'tablet' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet size={15} /> Tablet
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  device === 'mobile' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone size={15} /> Mobile
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              {onOpen3D && (
                <button
                  onClick={() => {
                    onClose();
                    onOpen3D(project);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 text-xs font-semibold transition-colors"
                  title="Open in 3D Scene"
                >
                  <Sparkles size={14} /> 3D View
                </button>
              )}

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>

              <button
                onClick={handleRefresh}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Refresh Frame"
              >
                <RotateCw size={18} className={loading ? "animate-spin" : ""} />
              </button>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-opacity"
              >
                Open Full Site <ExternalLink size={14} />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Browser Address Bar Sub-header */}
          <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
            </div>

            <div className="flex-1 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1 flex items-center justify-between text-slate-300 text-xs font-mono truncate">
              <span className="truncate">🔒 {project.link}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded ml-2 shrink-0">
                HTTPS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'interactive' ? 'mockup' : 'interactive')}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-primary transition-colors"
              >
                <Eye size={13} />
                {viewMode === 'interactive' ? 'Switch to Mockup' : 'Try Live Frame'}
              </button>
            </div>
          </div>

          {/* Main Viewport Content Area */}
          <div className="flex-1 bg-slate-950/90 p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Viewport Frame */}
            <div className={`transition-all duration-500 ease-out flex flex-col items-center justify-center ${deviceDimensions[device]}`}>
              <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 relative flex flex-col">
                
                {/* Visual loading indicator */}
                {loading && viewMode === 'interactive' && (
                  <div className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-300 text-sm font-medium">Loading live preview...</p>
                  </div>
                )}

                {/* If iframe load error or Mockup Mode selected */}
                {(iframeError || viewMode === 'mockup') ? (
                  <div className="w-full h-full p-6 md:p-10 flex flex-col justify-between overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div>
                      {iframeError && (
                        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                          <AlertCircle size={16} className="shrink-0" />
                          <span>Direct iframe embedding is restricted by the remote host's security header (`X-Frame-Options`). You can launch the full site directly below!</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                          {project.category}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{project.status || "Live Web App"}</span>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        {project.name}
                      </h2>

                      <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                        {project.desc}
                      </p>

                      {project.features && project.features.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3">Key Highlights & Features</h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {project.features.map((feat, i) => (
                              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm font-medium">
                                <Check size={16} className="text-emerald-400 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-3">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.split(", ").map((t) => (
                            <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-800 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-accent text-white font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                      >
                        Launch Live Application <ExternalLink size={18} />
                      </a>

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center gap-2"
                      >
                        <Github size={18} /> View Source Code
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Live Iframe View */
                  <iframe
                    key={iframeKey}
                    src={project.link}
                    title={project.name}
                    className="w-full h-full border-0 bg-white"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setIframeError(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-400 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-300">{project.name}</span>
              <span>•</span>
              <span className="truncate max-w-md">{project.desc}</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span className="hidden sm:inline text-slate-500">Tip: Use ← → keys to switch projects</span>
              <button
                onClick={onClose}
                className="text-slate-300 hover:text-white font-semibold underline underline-offset-2"
              >
                Close Preview
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
