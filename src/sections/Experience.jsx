import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { experience } from "../data/constants";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";

const workPalette = {
  icon: Briefcase,
  label: "Internship",
  accent: "text-secondary",
  border: "border-secondary/25",
  bg: "bg-secondary/10",
};

const educationPalettes = [
  {
    accent: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/10",
    glow: "#3b82f6",
  },
  {
    accent: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/10",
    glow: "#6366f1",
  },
  {
    accent: "text-accent",
    border: "border-accent/20",
    bg: "bg-accent/10",
    glow: "#0d9488",
  },
];

export default function Experience() {
  const workItems = experience.filter((item) => item.type === "work");
  const educationItems = experience.filter((item) => item.type === "education");

  return (
    <Section id="experience" className="section-padding">
      <SectionHeading
        eyebrow="Career & academics"
        title="Experience &"
        highlight="Education"
        subtitle="Internships, hands-on product work, and the academic record behind it."
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-secondary/25 bg-secondary/10 text-secondary">
            <Briefcase size={15} />
          </span>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Professional Experience
          </h3>
          <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-white/10" />
        </div>

        <div className="relative">
          <div
            className="absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-primary/40 to-transparent sm:left-5"
            aria-hidden="true"
          />

          {workItems.map((item, index) => {
            const meta = workPalette;
            const Icon = meta.icon;

            return (
              <Reveal
                key={`${item.role}-${item.company}`}
                delay={index * 0.08}
                y={20}
                className="relative pb-8 pl-12 last:pb-0 sm:pl-16"
              >
                <span
                  className={`absolute left-0 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-md dark:bg-slate-900 sm:h-10 sm:w-10 ${meta.border} ${meta.accent}`}
                >
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </span>

                <div className="glass-card group relative overflow-hidden rounded-3xl p-5 shadow-xl transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary/20 blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="relative z-10">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span
                          className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${meta.border} ${meta.bg} ${meta.accent}`}
                        >
                          <Icon size={11} />
                          {meta.label}
                        </span>
                        <h3 className="font-display text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {item.company}
                        </p>
                      </div>

                      <div className="flex w-fit shrink-0 flex-col gap-1.5 sm:items-end">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary">
                          <Calendar size={13} />
                          {item.date}
                        </span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            <MapPin size={12} />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mb-5 mt-14 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <GraduationCap size={15} />
          </span>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Academic Background
          </h3>
          <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-white/10" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {educationItems.map((item, index) => {
            const palette = educationPalettes[index % educationPalettes.length];

            return (
              <Reveal key={`${item.role}-${item.company}`} delay={index * 0.07} y={22}>
                <div className="glass-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ backgroundColor: palette.glow }}
                  />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${palette.border} ${palette.bg} ${palette.accent}`}
                    >
                      <GraduationCap size={18} />
                    </span>

                    <div className="text-right">
                      <div className="font-display text-3xl font-black leading-none text-primary">
                        {item.score}
                      </div>
                      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        {item.scoreLabel}
                      </div>
                    </div>
                  </div>

                  <h4 className="relative z-10 mt-5 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
                    {item.role}
                  </h4>
                  <p className="relative z-10 mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {item.company}
                  </p>

                  <div className="relative z-10 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} /> {item.date}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} /> {item.location}
                      </span>
                    )}
                  </div>

                  <p className="relative z-10 mt-3 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>

                  <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                    {item.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
