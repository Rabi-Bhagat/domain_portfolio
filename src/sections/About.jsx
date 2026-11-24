import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import Reveal from "../components/ui/Reveal";
import ButtonLink from "../components/ui/Button3D";
import { resumeUrl } from "../data/constants";

const highlights = [
  {
    label: "Education",
    value: "B.Tech CSE, MM(DU)",
    note: "2023 – 2027 · CGPA 7.24 / 10",
  },
  {
    label: "Internships",
    value: "CodeAlpha · Bluestock Fintech",
    note: "Frontend & SDE intern, 2025",
  },
  {
    label: "Focus",
    value: "Full-stack web engineering",
    note: "React, Node, MongoDB, REST APIs",
  },
  {
    label: "Base",
    value: "Mullana, India",
    note: "Open to remote & relocation",
  },
];

const approach = [
  "Ship small, review often, and keep the codebase easy to reason about.",
  "Design for the edge cases first: empty states, slow networks, small screens.",
  "Measure before optimizing, then optimize the part users actually feel.",
];

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A builder with a product mindset"
        subtitle="I care about the details that make software feel effortless, from data models to the last pixel."
      />

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="space-y-6">
          <p className="text-base leading-relaxed text-muted">
            I&apos;m a Computer Science &amp; Engineering student at Maharishi Markandeshwar
            University and a full-stack developer working primarily with the MERN stack. I
            enjoy turning ambiguous problems into clear, maintainable systems, then polishing
            the interface until it feels obvious.
          </p>
          <p className="text-base leading-relaxed text-muted">
            Most of my work sits between product and engineering: building REST APIs,
            structuring data, and crafting responsive interfaces that stay fast under real
            conditions.
          </p>

          <div className="pt-2">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              How I work
            </p>
            <ul className="space-y-3">
              {approach.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="accent-dot mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <ButtonLink
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            Read my resume
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel rounded-2xl">
            <div className="divide-y divide-line">
              {highlights.map((item) => (
                <div key={item.label} className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-ink">{item.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
