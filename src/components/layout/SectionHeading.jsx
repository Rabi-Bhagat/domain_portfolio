import Reveal from "../ui/Reveal";

export default function SectionHeading({ index, eyebrow, title, subtitle, className = "" }) {
  return (
    <Reveal className={`mb-12 border-b border-line pb-8 ${className}`}>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            {index && <span className="font-mono text-xs text-faint">{index}</span>}
            {eyebrow && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {eyebrow}
              </span>
            )}
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-right">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}
