import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function Logo3D({
  src,
  alt = "Logo",
  color = "#3b82f6",
  size = "md",
  className = "",
  containerClassName = "",
  showGlow = true,
  onClick,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 22 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const sizeMap = {
    sm: "w-9 h-9 p-1.5 rounded-xl",
    md: "w-12 h-12 p-2.5 rounded-2xl",
    lg: "w-14 h-14 p-3 rounded-2xl",
    xl: "w-16 h-16 p-3.5 rounded-3xl",
  };

  const imgSizeMap = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-9 h-9",
  };

  const containerStyle = sizeMap[size] || sizeMap.md;
  const imgStyle = imgSizeMap[size] || imgSizeMap.md;

  const handleMouseMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const content = (
    <div
      style={{ perspective: "1000px" }}
      className={`relative inline-block cursor-pointer select-none ${containerClassName}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative flex items-center justify-center overflow-hidden border border-slate-200/80 bg-white/80 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/80 ${containerStyle} ${className}`}
      >
        {showGlow && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-25 transition-opacity duration-300 group-hover:opacity-85 dark:opacity-40"
            style={{
              background: `radial-gradient(circle at center, ${color} 0%, transparent 75%)`,
              filter: "blur(6px)",
              transform: reduce ? undefined : "translateZ(-10px)",
            }}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `0 0 20px ${color}60, inset 0 0 10px ${color}40` }}
        />

        {!reduce && (
          <div className="pointer-events-none absolute -inset-[100%] rotate-45 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full dark:via-white/10" />
        )}

        <div
          style={{
            transform: reduce
              ? undefined
              : isHovered
                ? "translateZ(24px) scale(1.1)"
                : "translateZ(10px)",
            transition: reduce ? undefined : "transform 0.25s ease-out",
          }}
          className="relative z-10 flex items-center justify-center"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`object-contain drop-shadow-md transition-all duration-300 ${imgStyle}`}
            onError={(event) => {
              event.currentTarget.style.display = "none";
              if (event.currentTarget.parentElement) {
                event.currentTarget.parentElement.innerText = alt.slice(0, 2).toUpperCase();
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={alt} title={alt} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
