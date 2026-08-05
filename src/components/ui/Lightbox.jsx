import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="glass-card max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={project.image}
              alt={project.name}
              className="w-full max-h-[50vh] object-cover object-top"
              onError={(e) => {
                if (e.target.src !== project.imageFallback) {
                  e.target.src = project.imageFallback;
                }
              }}
            />
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-slate-500">{project.tech}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {project.name}
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">{project.desc}</p>

            {project.highlights && (
              <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors"
              >
                Live Demo <ExternalLink size={16} />
              </a>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-700 border border-white/10 transition-colors"
                >
                  View Code <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
