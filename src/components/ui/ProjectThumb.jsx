export default function ProjectThumb({ project, className = "" }) {
  const initials = project.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const domain = project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const tech = project.tech.split(", ").slice(0, 3);

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-lg border border-line bg-canvas ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="ml-1.5 flex-1 truncate text-[10px] text-faint">{domain}</span>
      </div>

      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-display text-2xl font-semibold tracking-tight text-ink/85">
          {initials}
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line px-2 py-0.5 text-[9px] text-faint"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
