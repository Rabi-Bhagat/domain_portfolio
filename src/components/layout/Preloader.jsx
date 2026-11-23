import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("rb-preloaded") === "1";
    } catch {
      seen = false;
    }

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onCompleteRef.current?.();
    };

    if (reduce || seen) {
      const timer = window.setTimeout(finish, 120);
      return () => window.clearTimeout(timer);
    }

    const start = performance.now();
    const duration = 1500;
    let frame;
    let completionTimer;

    const tick = (now) => {
      const value = Math.min(1, (now - start) / duration);
      setProgress(value);

      if (value < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        completionTimer = window.setTimeout(finish, 320);
      }
    };

    frame = requestAnimationFrame(tick);
    const namasteTimer = window.setTimeout(() => setStep(1), 160);
    const welcomeTimer = window.setTimeout(() => setStep(2), 720);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
      window.clearTimeout(namasteTimer);
      window.clearTimeout(welcomeTimer);
    };
  }, [reduce]);

  const skip = () => {
    onCompleteRef.current?.();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-dark"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="aurora-bg" aria-hidden="true" />

      <button
        type="button"
        onClick={skip}
        className="absolute right-5 top-5 z-10 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-bold text-slate-600 backdrop-blur-md transition-colors hover:text-primary dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white focus-ring"
      >
        Skip intro
      </button>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/30 bg-primary text-2xl font-black tracking-tighter text-white shadow-glow-primary"
        >
          <span className="absolute inset-1 rounded-[1.7rem] border border-white/20" />
          RB
          <span className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-primary/20 blur-2xl" />
        </motion.div>

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            Namaste
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-mono text-sm text-slate-600 dark:text-slate-300 md:text-base"
          >
            Welcome to Rabi&apos;s Portfolio
            <span className="caret-blink ml-1 inline-block text-primary" aria-hidden="true">
              |
            </span>
          </motion.p>
        )}
      </div>

      <div className="absolute bottom-16 z-10 w-64 max-w-[70vw]">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          <span>Loading experience</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
