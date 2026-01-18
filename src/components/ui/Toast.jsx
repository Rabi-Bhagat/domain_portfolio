import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        className={`fixed bottom-10 right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 ${
          type === "success" ? "bg-emerald-900/90" : "bg-red-900/90"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="text-emerald-400" size={24} />
        ) : (
          <XCircle className="text-red-400" size={24} />
        )}
        <div>
          <h4 className={`font-bold ${type === "success" ? "text-emerald-100" : "text-red-100"}`}>
            {type === "success" ? "Success!" : "Error"}
          </h4>
          <p className="text-sm text-slate-200">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
