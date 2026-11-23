const tones = {
  emerald: {
    dot: "bg-emerald-500",
    ring: "bg-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/10",
  },
  amber: {
    dot: "bg-amber-500",
    ring: "bg-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-500/10",
  },
  primary: {
    dot: "bg-primary",
    ring: "bg-primary/30",
    text: "text-primary",
    border: "border-primary/25",
    bg: "bg-primary/10",
  },
};

export default function StatusPill({
  status = "Open to opportunities",
  detail,
  tone = "emerald",
  className = "",
}) {
  const palette = tones[tone] || tones.emerald;

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md ${palette.bg} ${palette.border} ${palette.text} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${palette.ring}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${palette.dot}`} />
      </span>
      <span>{status}</span>
      {detail && <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">• {detail}</span>}
    </span>
  );
}
