import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { experience } from "../data/constants";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  const work = experience.filter((item) => item.type === "work");
  const education = experience.filter((item) => item.type === "education");

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Work & education"
        subtitle="Internships, hands-on product work, and the academic record behind it."
      />

      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
            Professional
          </h3>

          <ol className="space-y-8 border-l border-line pl-6">
            {work.map((item) => (
              <li key={`${item.role}-${item.company}`} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full border border-primary bg-canvas" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-base font-semibold text-ink">
                    {item.role}
                  </h4>
                  <span className="text-[11px] text-faint">{item.date}</span>
                </div>

                <p className="mt-0.5 text-sm font-medium text-primary">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-medium text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
            Academic
          </h3>

          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.company} className="panel panel-hover rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{item.role}</h4>
                    <p className="mt-0.5 text-xs text-muted">{item.company}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-xl font-semibold leading-none text-primary">
                      {item.score}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-faint">
                      {item.scoreLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-faint">
                  <span>{item.date}</span>
                  <span className="inline-flex items-center gap-1">
                    {item.location}
                    <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
