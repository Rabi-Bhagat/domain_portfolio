export default function ProjectThumb({ project, className = "" }) {
  const color = project.color || "#3b82f6";
  const initials = project.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const domain = project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const tech = project.tech.split(", ").slice(0, 3);
  const features = (project.features || []).slice(0, 2);

  return (
    <div
      aria-hidden="true"
      className={`group/thumb relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}26, rgba(11, 17, 32, 0.9) 55%, ${color}14)`,
      }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950/50 px-3 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 flex-1 truncate rounded-md border border-white/10 bg-slate-950/70 px-2 py-0.5 text-[10px] font-mono text-slate-400">
          {domain}
        </span>
      </div>

      <div className="relative h-32 sm:h-36 overflow-hidden p-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full blur-2xl opacity-50 transition-opacity duration-500 group-hover/thumb:opacity-80"
          style={{ backgroundColor: color }}
        />

        <span
          className="relative z-10 font-display text-4xl font-black tracking-tighter transition-transform duration-500 group-hover/thumb:scale-105"
          style={{ color }}
        >
          {initials}
        </span>

        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap gap-1.5">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-md border border-white/10 bg-slate-950/60 px-2 py-0.5 text-[10px] font-semibold text-slate-300 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {features.length > 0 && (
          <div className="absolute inset-0 z-20 flex translate-y-3 flex-col justify-center gap-1.5 bg-slate-950/85 p-4 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/thumb:translate-y-0 group-hover/thumb:opacity-100">
            {features.map((feature) => (
              <span key={feature} className="flex items-start gap-2 text-[11px] font-medium leading-snug text-slate-200">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
