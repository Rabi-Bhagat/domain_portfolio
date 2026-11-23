import { motion } from "framer-motion";

export default function FilterPill({ active, onClick, children, layoutId, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-colors focus-ring ${
        active
          ? "border-transparent text-white"
          : "border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
      } ${className}`}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </button>
  );
}
