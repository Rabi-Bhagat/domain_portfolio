export default function FilterPill({ active, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-ring ${
        active
          ? "border-primary bg-primary text-white"
          : "border-line text-muted hover:border-primary/50 hover:text-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}
