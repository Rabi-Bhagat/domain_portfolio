import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Button3D from "../components/ui/Button3D";
import {
  Download,
  Gauge,
  GraduationCap,
  Layers,
  MapPin,
  Server,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { quickFacts, resumeUrl } from "../data/constants";

const factIcons = {
  location: MapPin,
  degree: GraduationCap,
  focus: Target,
  availability: Zap,
};

const focusAreas = [
  {
    icon: Layers,
    title: "Full-stack product engineering",
    desc: "End-to-end features from interface to data.",
  },
  {
    icon: Server,
    title: "APIs & data modeling",
    desc: "REST services and schemas that stay maintainable.",
  },
  {
    icon: Gauge,
    title: "Performance & accessibility",
    desc: "Fast, keyboard-friendly, polished experiences.",
  },
];

export default function About() {
  return (
    <Section id="about" className="py-20 relative">
      <SectionHeading
        eyebrow="Profile"
        title="Background &"
        highlight="focus"
        subtitle="A quick snapshot of where I am, what I work on, and how I approach building software."
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal x={-20} className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickFacts.map((fact) => {
              const Icon = factIcons[fact.icon] || Sparkles;
              return (
                <div
                  key={fact.label}
                  className="glass-card flex items-start gap-3 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {fact.label}
                    </span>
                    <span className="block text-sm font-semibold leading-snug text-slate-800 dark:text-slate-200">
                      {fact.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button3D
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            View full resume <Download size={16} />
          </Button3D>
        </Reveal>

        <Reveal x={20}>
          <div className="glass-card h-full rounded-3xl p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Focus areas
            </h3>
            <ul className="mt-4 space-y-4">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <li key={area.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {area.title}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {area.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
