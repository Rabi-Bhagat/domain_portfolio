import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const callbackRef = useRef(onComplete);

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("rb-preloaded") === "1";
    } catch {
      seen = false;
    }

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      callbackRef.current?.();
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      const timer = window.setTimeout(finish, 80);
      return () => window.clearTimeout(timer);
    }

    const start = performance.now();
    const duration = 900;
    let frame;
    let endTimer;

    const tick = (now) => {
      const value = Math.min(1, (now - start) / duration);
      setProgress(value);

      if (value < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        endTimer = window.setTimeout(finish, 160);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(endTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-canvas">
      <p className="font-display text-lg font-semibold tracking-tight text-ink">Rabi Bhagat</p>
      <div className="mt-5 h-px w-40 overflow-hidden bg-line">
        <div
          className="h-px bg-primary transition-[width] duration-100"
          style={{ width: `${Math.max(progress * 100, 6)}%` }}
        />
      </div>
    </div>
  );
}
