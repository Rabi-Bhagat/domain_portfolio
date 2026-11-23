import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
}) {
  const reduce = useReducedMotion();
  const isLeft = align === "left";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 mb-12 ${
        isLeft ? "items-start text-left" : "items-center text-center mx-auto"
      } ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed ${
            isLeft ? "max-w-2xl" : "max-w-3xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
