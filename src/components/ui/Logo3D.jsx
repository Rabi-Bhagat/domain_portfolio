import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Logo3D - Highly responsive & attractive 3D Logo component
 * Features 3D tilt physics, layered depth extrusion (translateZ),
 * brand ambient lighting glow, and smooth touch/hover dynamics.
 */
export default function Logo3D({
  src,
  alt = "Logo",
  color = "#3b82f6",
  size = "md", // "sm" | "md" | "lg" | "xl" or custom CSS classes
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

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 22 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Size preset mapping
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

  const containerStyle = typeof size === "string" ? sizeMap[size] || sizeMap.md : "";
  const imgStyle = typeof size === "string" ? imgSizeMap[size] || imgSizeMap.md : "";

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 shadow-lg group overflow-hidden ${containerStyle} ${className}`}
      >
        {/* 3D Brand Glowing Light Aura */}
        {showGlow && (
          <div
            className="absolute inset-0 opacity-25 dark:opacity-40 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none rounded-inherit"
            style={{
              background: `radial-gradient(circle at center, ${color} 0%, transparent 75%)`,
              filter: "blur(6px)",
              transform: "translateZ(-10px)",
            }}
          />
        )}

        {/* 3D Border Glow on Hover */}
        <div
          className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 20px ${color}60, inset 0 0 10px ${color}40`,
          }}
        />

        {/* Specular Light Sheen Animation */}
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Floating 3D Extruded Logo Image */}
        <div
          style={{ transform: isHovered ? "translateZ(24px) scale(1.1)" : "translateZ(10px)", transition: "transform 0.25s ease-out" }}
          className="relative z-10 flex items-center justify-center"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`object-contain transition-all duration-300 filter drop-shadow-md ${imgStyle}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.innerText = alt.slice(0, 2).toUpperCase();
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
