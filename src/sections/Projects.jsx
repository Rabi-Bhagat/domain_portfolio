import { useMemo, useState, lazy, Suspense } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import FilterPill from "../components/ui/FilterPill";
import Reveal from "../components/ui/Reveal";
import ProjectThumb from "../components/ui/ProjectThumb";
import { projects } from "../data/constants";
import { ArrowUpRight, Eye, Github, Search, Sparkles } from "lucide-react";

const ProjectShowcase3D = lazy(() => import("../components/3d/ProjectShowcase3D"));
const LiveDemoModal = lazy(() => import("../components/modals/LiveDemoModal"));

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [liveDemo, setLiveDemo] = useState(null);
  const [showcase, setShowcase] = useState(null);

  const categories = useMemo(() => {
    const unique = ["All", ...new Set(projects.map((project) => project.category))];
    return unique.map((name) => ({
      name,
      count:
        name === "All"
          ? projects.length
          : projects.filter((project) => project.category === name).length,
    }));
  }, []);

  const visible = useMemo(() => {
    const search = query.toLowerCase().trim();

    return projects
      .filter((project) => {
        const matchesCategory = category === "All" || project.category === category;
        const matchesSearch =
          !search ||
          project.name.toLowerCase().includes(search) ||
          project.desc.toLowerCase().includes(search) ||
          project.tech.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
      })
      .sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          a.name.localeCompare(b.name)
      );
  }, [category, query]);

  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Selected work"
        subtitle="Full-stack applications, REST APIs, and web tools. Open a live preview or inspect any project in 3D."
      />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <FilterPill
              key={item.name}
              active={category === item.name}
              onClick={() => setCategory(item.name)}
            >
              {item.name}
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
            placeholder="Search projects"
            aria-label="Search projects"
            className="w-full rounded-full border border-line bg-transparent py-2 pl-9 pr-3 text-xs text-ink placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="panel rounded-xl py-16 text-center">
          <p className="text-sm text-muted">No projects match that search.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="mt-4 text-xs font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04}>
              <article className="panel panel-hover flex h-full flex-col rounded-xl p-4">
                <ProjectThumb project={project} className="mb-4" />

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {project.category}
                  </span>
                  <span className="text-[10px] text-faint">{project.status}</span>
                </div>

                <h3 className="mt-2 font-display text-base font-semibold text-ink">
                  {project.name}
                </h3>
                <p className="mt-2 flex-grow text-xs leading-relaxed text-muted">
                  {project.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.split(", ").slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-1 border-t border-line pt-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-[11px] font-medium text-canvas transition-opacity hover:opacity-85"
                  >
                    Live <ArrowUpRight size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setLiveDemo(project)}
                    title="Open frame preview"
                    aria-label={`Preview ${project.name}`}
                    className="rounded-full p-1.5 text-muted transition-colors hover:text-ink"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowcase(project)}
                    title="Open 3D view"
                    aria-label={`Open ${project.name} in 3D`}
                    className="rounded-full p-1.5 text-muted transition-colors hover:text-ink"
                  >
                    <Sparkles size={14} />
                  </button>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source"
                    aria-label={`${project.name} repository`}
                    className="ml-auto rounded-full p-1.5 text-muted transition-colors hover:text-ink"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {liveDemo && (
        <Suspense fallback={null}>
          <LiveDemoModal
            project={liveDemo}
            projects={projects}
            onClose={() => setLiveDemo(null)}
            onSelectProject={setLiveDemo}
            onOpen3D={(project) => setShowcase(project)}
          />
        </Suspense>
      )}

      {showcase && (
        <Suspense fallback={null}>
          <ProjectShowcase3D
            project={showcase}
            onClose={() => setShowcase(null)}
            onOpenLiveDemo={(project) => {
              setShowcase(null);
              setLiveDemo(project);
            }}
          />
        </Suspense>
      )}
    </Section>
  );
}
