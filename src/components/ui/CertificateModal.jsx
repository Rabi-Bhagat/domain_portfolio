import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, Award, ChevronLeft, ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CertificateModal({ achievement, achievements = [], onClose, onSelect }) {
  const [imageError, setImageError] = useState(false);
  const currentIndex = achievements.findIndex(a => a.id === achievement?.id || a.title === achievement?.title);

  useEffect(() => {
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelect(achievements[currentIndex - 1]);
      }
      if (e.key === 'ArrowRight' && currentIndex < achievements.length - 1) {
        onSelect(achievements[currentIndex + 1]);
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
  }, [currentIndex, achievements, onClose, onSelect]);

  useEffect(() => {
    setImageError(false);
  }, [achievement]);

  if (!achievement) return null;

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
          className="w-full max-w-6xl h-[92vh] max-h-[900px] flex flex-col rounded-3xl bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden relative"
        >
          {/* Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700/80 shadow-sm shrink-0"
                title="Back to Credentials"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => currentIndex > 0 && onSelect(achievements[currentIndex - 1])}
                  disabled={currentIndex <= 0}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous Certificate (←)"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => currentIndex < achievements.length - 1 && onSelect(achievements[currentIndex + 1])}
                  disabled={currentIndex >= achievements.length - 1}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next Certificate (→)"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="h-4 w-px bg-slate-800 shrink-0 hidden sm:block"></div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[240px] sm:max-w-[420px]">
                    {achievement.title}
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border shrink-0"
                    style={{
                      backgroundColor: `${achievement.color || '#3b82f6'}15`,
                      color: achievement.color || '#3b82f6',
                      borderColor: `${achievement.color || '#3b82f6'}40`
                    }}
                  >
                    {achievement.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={achievement.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all"
              >
                <Download size={15} /> Download Document
              </a>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close document modal"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 grid lg:grid-cols-3 overflow-hidden bg-slate-950 min-h-0">
            {/* Left/Center: Visual Preview Box */}
            <div className="lg:col-span-2 p-4 md:p-6 flex items-center justify-center bg-slate-950/90 relative overflow-y-auto">
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                {!imageError && achievement.previewImage ? (
                  <img
                    src={achievement.previewImage}
                    alt={achievement.title}
                    className="max-w-full max-h-[68vh] object-contain rounded-2xl border border-slate-800 shadow-2xl transition-transform hover:scale-[1.01]"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-80 max-w-lg p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                    <Award size={56} style={{ color: achievement.color }} />
                    <h4 className="text-xl font-bold text-white">{achievement.title}</h4>
                    <p className="text-slate-400 text-sm">{achievement.desc}</p>
                    <a
                      href={achievement.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2"
                    >
                      Open PDF File <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Metadata & Details */}
            <div className="p-5 md:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={16} /> Verified Credential
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300">
                    Issued by <span className="text-primary font-bold">{achievement.org}</span>
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-sm">
                  {achievement.date && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400 text-xs uppercase font-semibold">Date / Duration</span>
                      <span className="font-medium">{achievement.date}</span>
                    </div>
                  )}

                  {achievement.certId && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400 text-xs uppercase font-semibold">Credential ID</span>
                      <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {achievement.certId}
                      </span>
                    </div>
                  )}

                  {achievement.badge && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400 text-xs uppercase font-semibold">Highlight</span>
                      <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        {achievement.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Description & Highlights</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons Pinned at Bottom */}
              <div className="pt-4 mt-4 border-t border-slate-800 space-y-2.5 shrink-0">
                <a
                  href={achievement.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-accent text-white font-bold text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  View Original Document <ExternalLink size={16} />
                </a>

                <a
                  href={achievement.fileUrl}
                  download
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={15} /> Download PDF/PNG File
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
