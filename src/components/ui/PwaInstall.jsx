import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

export default function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    const handleInstalled = () => {
      setShow(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 glass-card rounded-2xl p-4 flex items-center gap-4 max-w-xs border-white/10 shadow-2xl"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shrink-0">
            <Download size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white text-sm">Install Portfolio</h4>
            <p className="text-xs text-slate-400">Add to home screen for quick access</p>
          </div>
          <button
            onClick={handleInstall}
            className="text-xs font-semibold bg-primary text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors shrink-0"
          >
            Install
          </button>
          <button
            onClick={() => setShow(false)}
            aria-label="Dismiss install prompt"
            className="text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
