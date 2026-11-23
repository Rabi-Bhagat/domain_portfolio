import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CursorEffect() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduce) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame;
    let lastHover = false;

    const moveDot = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
    };

    const render = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      frame = requestAnimationFrame(render);
    };

    const handleMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      moveDot();

      const interactive = event.target.closest?.(
        'a, button, [role="button"], input, textarea, select, label'
      );
      const isHovering = Boolean(interactive);

      if (isHovering !== lastHover) {
        lastHover = isHovering;
        setHovering(isHovering);
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    moveDot();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, reduce]);

  if (!enabled || reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]">
      <div ref={dotRef} className="fixed left-0 top-0">
        <span
          className={`block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_4px_rgba(59,130,246,0.35)] transition-opacity duration-200 ${
            hovering ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div ref={ringRef} className="fixed left-0 top-0">
        <span
          className={`block -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
            pressed
              ? "h-5 w-5 border-primary/80 bg-primary/15"
              : hovering
                ? "h-10 w-10 border-primary/70 bg-primary/10"
                : "h-6 w-6 border-primary/40"
          }`}
        />
      </div>
    </div>
  );
}
