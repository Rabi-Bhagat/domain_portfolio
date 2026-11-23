import { motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  const success = type === "success";

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="fixed bottom-6 right-6 z-[70] flex w-[calc(100vw-3rem)] max-w-xs items-start gap-3 rounded-xl border border-line bg-canvas p-3.5 shadow-xl"
    >
      <span className={`mt-0.5 shrink-0 ${success ? "text-primary" : "text-red-400"}`}>
        {success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
      </span>

      <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted">{message}</p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="text-faint transition-colors hover:text-ink"
        >
          <X size={14} />
        </button>
      )}
    </motion.div>
  );
}
