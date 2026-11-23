import { useMemo, useState } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import FilterPill from "../components/ui/FilterPill";
import Reveal from "../components/ui/Reveal";
import { skills } from "../data/constants";

export default function Skills() {
  const [active, setActive] = useState("all");

  const categories = useMemo(
    () => [
      {
        key: "all",
        label: "All",
        count: skills.reduce((total, category) => total + category.skills.length, 0),
      },
      ...skills.map((category) => ({
        key: category.categoryKey || category.title,
        label: category.title,
        count: category.skills.length,
      })),
    ],
    []
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? skills
        : skills.filter(
            (category) => (category.categoryKey || category.title) === active
          ),
    [active]
  );

  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="Tools I work with"
        subtitle="Technologies I use to design, build, and ship full-stack products."
      />

      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {categories.map((category) => (
          <FilterPill
            key={category.key}
            active={active === category.key}
            onClick={() => setActive(category.key)}
          >
            {category.label}
            <span className="ml-1.5 text-[10px] opacity-70">{category.count}</span>
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {visible.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.05}>
            <div>
              <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
                <h3 className="font-display text-base font-semibold text-ink">
                  {category.title}
                </h3>
                <span className="text-[11px] text-faint">{category.skills.length} items</span>
              </div>

              <ul className="space-y-3.5">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="group">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-ink">{skill.name}</span>
                      <span className="text-[11px] tabular-nums text-faint">
                        {skill.level}
                      </span>
                    </div>
                    <div className="mt-2 h-px w-full bg-line">
                      <div
                        className="h-px bg-primary transition-all duration-500"
                        style={{ width: `${skill.percentage || 80}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
