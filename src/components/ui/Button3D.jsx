import { ArrowRight } from "lucide-react";

export default function ButtonLink({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  const variants = {
    solid: "bg-ink text-canvas hover:opacity-88",
    accent: "bg-primary text-white hover:opacity-90",
    outline: "border border-line text-ink hover:border-primary hover:text-primary",
    quiet: "text-muted hover:text-ink",
  };

  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-ring ${sizes[size]} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      <ArrowRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
