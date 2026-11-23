import { useRef } from "react";

export default function SpotlightCard({
  children,
  className = "",
  color = "rgba(59, 130, 246, 0.16)",
}) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden ${className}`}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--spotlight-x) var(--spotlight-y), ${color}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
