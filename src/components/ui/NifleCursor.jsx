import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const modules = import.meta.glob("../../assets/cursor/frame_*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const FRAMES = Object.keys(modules)
  .sort()
  .map((key) => modules[key]);

const SIZE = 48;
const HOTSPOT_X = 0.29;
const HOTSPOT_Y = 0.195;

export default function NifleCursor() {
  const cursorRef = useRef(null);
  const shownRef = useRef(false);
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [frame, setFrame] = useState(0);
  const [hidden, setHidden] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled || reduce || FRAMES.length < 2) return;
    const timer = window.setInterval(() => {
      setFrame((value) => (value + 1) % FRAMES.length);
    }, 90);
    return () => window.clearInterval(timer);
  }, [enabled, reduce]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event) => {
      const node = cursorRef.current;
      if (!node) return;

      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (!shownRef.current) {
        shownRef.current = true;
        setHidden(false);
      }

      const target = event.target;
      const isText = target.closest?.(
        'input, textarea, select, [contenteditable="true"]'
      );
      const isInteractive = target.closest?.('a, button, [role="button"], label');

      node.dataset.mode = isText ? "text" : isInteractive ? "active" : "default";
    };

    const handleLeave = () => {
      shownRef.current = false;
      setHidden(true);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled]);

  if (!enabled || FRAMES.length === 0) return null;

  const displayFrame = reduce ? 0 : frame;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="nifle-cursor"
      data-mode="default"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <img
        src={FRAMES[displayFrame]}
        alt=""
        draggable={false}
        style={{
          width: SIZE,
          height: SIZE,
          marginLeft: -SIZE * HOTSPOT_X,
          marginTop: -SIZE * HOTSPOT_Y,
        }}
      />
    </div>
  );
}
