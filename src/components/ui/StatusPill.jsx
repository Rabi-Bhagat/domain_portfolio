export default function StatusPill({ label, detail }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] font-medium text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      {label}
      {detail && <span className="text-faint">· {detail}</span>}
    </span>
  );
}
