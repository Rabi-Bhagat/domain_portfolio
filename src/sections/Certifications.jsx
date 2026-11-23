import { useMemo, useState } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import FilterPill from "../components/ui/FilterPill";
import Reveal from "../components/ui/Reveal";
import CertificateModal from "../components/modals/CertificateModal";
import { achievements } from "../data/constants";
import { ArrowUpRight, Search } from "lucide-react";

export default function Certifications() {
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filters = useMemo(
    () => [
      { key: "all", label: "All", count: achievements.length },
      {
        key: "hackathon",
        label: "Hackathons",
        count: achievements.filter((item) => item.type === "hackathon").length,
      },
      {
        key: "internship",
        label: "Internships",
        count: achievements.filter((item) => item.type === "internship").length,
      },
      {
        key: "certification",
        label: "Certifications",
        count: achievements.filter((item) => item.type === "certification").length,
      },
    ],
    []
  );

  const visible = useMemo(() => {
    const search = query.toLowerCase().trim();

    return achievements.filter((item) => {
      const matchesType = type === "all" || item.type === type;
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.org.toLowerCase().includes(search) ||
        item.desc.toLowerCase().includes(search);
      return matchesType && matchesSearch;
    });
  }, [type, query]);

  return (
    <Section id="certifications">
      <SectionHeading
        index="05"
        eyebrow="Credentials"
        title="Achievements"
        subtitle="Verified hackathons, internship letters, and professional certifications."
      />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <FilterPill
              key={item.key}
              active={type === item.key}
              onClick={() => setType(item.key)}
            >
              {item.label}
              <span className="ml-1.5 text-[10px] opacity-70">{item.count}</span>
            </FilterPill>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search credentials"
            aria-label="Search credentials"
            className="w-full rounded-full border border-line bg-transparent py-2 pl-9 pr-3 text-xs text-ink placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {visible.map((cert, index) => (
          <Reveal key={cert.id} delay={index * 0.02}>
            <button
              type="button"
              onClick={() => setSelected(cert)}
              className="group flex w-full items-start gap-4 px-1 py-4 text-left transition-colors hover:bg-primary/[0.04] focus-ring"
            >
              <span className="mt-1 text-[11px] tabular-nums text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-sm font-medium text-ink transition-colors group-hover:text-primary">
                    {cert.title}
                  </h3>
                  <span className="text-[11px] text-faint">{cert.date}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  {cert.org} · {cert.category}
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="mt-1 shrink-0 text-faint transition-colors group-hover:text-primary"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">No credentials match that search.</p>
      )}

      {selected && (
        <CertificateModal
          achievement={selected}
          achievements={visible}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </Section>
  );
}
