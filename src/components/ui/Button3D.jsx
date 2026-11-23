import React from "react";

export default function Button3D({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  glow = false,
  ...props
}) {
  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-base sm:text-lg",
  };

  const baseClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-bold transition-all duration-150 active:translate-y-[6px] active:shadow-none focus-ring disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: `bg-primary text-white shadow-[0_6px_0_#1d4ed8] hover:bg-blue-500 ${
      glow ? "shadow-glow-primary" : ""
    }`,
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-[0_6px_0_#cbd5e1] hover:bg-slate-50 dark:border-white/5 dark:bg-slate-800 dark:text-slate-300 dark:shadow-[0_6px_0_#0f172a] dark:hover:border-white/10 dark:hover:bg-slate-700 dark:hover:text-white",
  };

  const combinedClasses = `${baseClasses} ${sizes[size] || sizes.md} ${
    variants[variant] || variants.primary
  } ${className}`;

  const content = (
    <>
      <span className="glare" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
