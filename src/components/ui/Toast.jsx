import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  const reduce = useReducedMotion();
  const success = type === "success";

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-8 right-5 z-[70] flex w-[calc(100vw-2.5rem)] max-w-sm items-start gap-3 overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl sm:right-8 ${
        success
          ? "border-emerald-500/25 bg-emerald-950/90 text-emerald-50"
          : "border-rose-500/25 bg-rose-950/90 text-rose-50"
      }`}
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
          success ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
        }`}
      >
        {success ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      </span>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold">{success ? "Success" : "Something went wrong"}</h4>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-200">{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="rounded-lg p-1 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-ring"
        >
          <X size={15} />
        </button>
      )}

      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-0.5 ${
          success ? "bg-emerald-400/70" : "bg-rose-400/70"
        }`}
      />
    </motion.div>
  );
}
