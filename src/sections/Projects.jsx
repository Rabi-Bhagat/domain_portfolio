import { useState, lazy, Suspense, useMemo } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import FilterPill from "../components/ui/FilterPill";
import ProjectThumb from "../components/ui/ProjectThumb";
import { projects } from "../data/constants";
import {
  ArrowUpDown,
  CheckCircle2,
  ExternalLink,
  Eye,
  Github,
  Layers,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import TiltCard3D from "../components/ui/TiltCard3D";

const ProjectShowcase3D = lazy(() => import("../components/3d/ProjectShowcase3D"));
const LiveDemoModal = lazy(() => import("../components/modals/LiveDemoModal"));

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProject3D, setSelectedProject3D] = useState(null);
  const [selectedLiveDemo, setSelectedLiveDemo] = useState(null);
  const reduce = useReducedMotion();

  const categories = useMemo(() => {
    const unique = ["All", ...new Set(projects.map((project) => project.category))];
    return unique.map((category) => ({
      name: category,
      count:
        category === "All"
          ? projects.length
          : projects.filter((project) => project.category === category).length,
    }));
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const matches = projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.desc.toLowerCase().includes(query) ||
        project.tech.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    const sorted = [...matches];

    if (sortBy === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      sorted.sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      );
    } else {
      sorted.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          a.name.localeCompare(b.name)
      );
    }

    return sorted;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <Section id="projects" className="section-padding relative">
      <SectionHeading
        eyebrow="Selected work"
        title="Featured"
        highlight="Projects"
        subtitle="Interactive full-stack applications, REST API systems, and web tools. Open a live preview or explore any project in 3D."
      />

      <div className="mx-auto mb-10 max-w-4xl space-y-6">
        <div className="mx-auto max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search size={18} />
            </div>
            <input
              id="project-search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by project, tech (React, MERN)..."
              className="w-full rounded-2xl border border-slate-300 bg-white/80 py-3.5 pl-11 pr-16 text-sm text-slate-900 shadow-lg backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-white"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400 hover:text-primary focus-ring rounded"
              >
                Clear
              </button>
            ) : (
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {projects.length} total
              </span>
            )}
          </div>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2.5"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <FilterPill
              key={category.name}
              active={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
              layoutId="projects-filter-pill"
            >
              {category.name}
              <span className="text-[10px] opacity-75">({category.count})</span>
            </FilterPill>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 px-1 text-sm text-slate-500 dark:text-slate-400">
          <span>
            Showing{" "}
            <strong className="text-slate-900 dark:text-white">
              {filteredProjects.length}
            </strong>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} />
            <label htmlFor="project-sort" className="sr-only">
              Sort projects
            </label>
            <select
              id="project-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
            >
              <option value="featured">Featured first</option>
              <option value="az">Name A-Z</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="glass-card mx-auto max-w-xl rounded-3xl py-16 text-center">
          <Layers size={48} className="mx-auto mb-4 text-slate-400" />
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
            No matching projects found
          </h3>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Try a different search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-600 focus-ring"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div layout className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id || project.name}
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard3D className="group glass-card glass-card-hover flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 p-5 shadow-xl dark:border-white/10 sm:p-6">
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.color || "#3b82f6" }}
                        />
                        {project.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            <Star size={11} className="fill-current" /> Featured
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          {project.status || "Live App"}
                        </span>
                      </div>
                    </div>

                    <ProjectThumb project={project} className="mb-5" />

                    <h3 className="mb-2 font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                      {project.name}
                    </h3>
                    <p className="mb-4 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.desc}
                    </p>

                    {project.features?.[0] && (
                      <p className="mb-4 flex items-start gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-accent" />
                        {project.features[0]}
                      </p>
                    )}

                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {project.tech.split(", ").map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[11px] font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-blue-600 focus-ring"
                      >
                        <ExternalLink size={14} /> Live Site
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedLiveDemo(project)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-700 transition-colors hover:text-primary dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-primary focus-ring"
                      >
                        <Eye size={14} /> Frame View
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProject3D(project)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2 text-[11px] font-bold text-secondary transition-colors hover:bg-secondary/20 dark:text-indigo-300 focus-ring"
                      >
                        <Sparkles size={14} /> 3D View
                      </button>

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name} source code on GitHub`}
                        className="ml-auto rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white focus-ring"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedLiveDemo && (
        <Suspense fallback={null}>
          <LiveDemoModal
            project={selectedLiveDemo}
            projects={projects}
            onClose={() => setSelectedLiveDemo(null)}
            onSelectProject={(project) => setSelectedLiveDemo(project)}
            onOpen3D={(project) => setSelectedProject3D(project)}
          />
        </Suspense>
      )}

      {selectedProject3D && (
        <Suspense fallback={null}>
          <ProjectShowcase3D
            project={selectedProject3D}
            onClose={() => setSelectedProject3D(null)}
            onOpenLiveDemo={(project) => {
              setSelectedProject3D(null);
              setSelectedLiveDemo(project);
            }}
          />
        </Suspense>
      )}
    </Section>
  );
}
