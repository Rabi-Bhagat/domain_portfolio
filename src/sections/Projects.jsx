import React, { useState, lazy, Suspense, useMemo } from 'react';
import Section from "../components/ui/Section";
import { projects } from "../data/constants";
import { ExternalLink, Github, Monitor, Search, Sparkles, Eye, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button3D from "../components/ui/Button3D";
import TiltCard3D from "../components/ui/TiltCard3D";

const ProjectShowcase3D = lazy(() => import("../components/3d/ProjectShowcase3D"));
const LiveDemoModal = lazy(() => import("../components/ui/LiveDemoModal"));

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject3D, setSelectedProject3D] = useState(null);
  const [selectedLiveDemo, setSelectedLiveDemo] = useState(null);

  // Category counts
  const categories = useMemo(() => {
    const unique = ["All", ...new Set(projects.map((p) => p.category))];
    return unique.map(cat => ({
      name: cat,
      count: cat === "All" ? projects.length : projects.filter(p => p.category === cat).length
    }));
  }, []);

  // Filtering by category & search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.desc.toLowerCase().includes(query) ||
        project.tech.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Section id="projects" className="section-padding relative">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">Projects</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Interactive showcase of my web applications, full-stack systems, and mobile solutions. Click any project for an interactive live demo preview!
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name, tech (React, MERN)..."
            className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-xl transition-all shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pill Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button3D
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              variant={activeCategory === cat.name ? "primary" : "secondary"}
              size="sm"
            >
              {cat.name} <span className="ml-1 opacity-80 text-xs">({cat.count})</span>
            </Button3D>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between mb-8 px-2 max-w-7xl mx-auto text-sm text-slate-500 dark:text-slate-400">
        <span>Showing <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> project{filteredProjects.length !== 1 ? 's' : ''}</span>
        {searchQuery && (
          <span className="text-xs">
            Filter: "<span className="text-primary font-semibold">{searchQuery}</span>"
          </span>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-3xl max-w-xl mx-auto">
          <Layers size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No matching projects found</h3>
          <p className="text-slate-500 text-sm mb-6">Try adjusting your search terms or select another category.</p>
          <button
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id || project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard3D className="glass-card glass-card-hover p-6 md:p-7 flex flex-col group relative overflow-hidden h-full rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br"
                    style={{
                      backgroundImage: `radial-gradient(circle at top right, ${project.color || '#3b82f6'}20, transparent 70%)`
                    }}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Category & Status */}
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm"
                        style={{
                          backgroundColor: `${project.color || '#3b82f6'}15`,
                          color: project.color || '#3b82f6',
                          borderColor: `${project.color || '#3b82f6'}40`
                        }}
                      >
                        {project.category}
                      </span>

                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {project.status || "Live App"}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-3">
                      {project.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.split(", ").map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-white/10 items-center flex-wrap">
                      {/* Open Live Site in New Tab */}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-blue-600 transition-all transform group-hover:scale-105"
                      >
                        <ExternalLink size={15} /> Live Site
                      </a>

                      {/* Frame Preview Button */}
                      <button
                        onClick={() => setSelectedLiveDemo(project)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-xs font-bold border border-slate-200 dark:border-slate-700/60 transition-colors"
                        title="Preview in Frame"
                      >
                        <Eye size={14} /> Frame View
                      </button>

                      {/* 3D View Button */}
                      <button
                        onClick={() => setSelectedProject3D(project)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold border border-purple-500/30 transition-colors"
                        title="View in 3D scene"
                      >
                        <Sparkles size={14} /> 3D View
                      </button>

                      {/* Repo Link */}
                      <div className="flex items-center gap-2 ml-auto">
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                          title="View Source Code on GitHub"
                        >
                          <Github size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Interactive Live Demo Preview Modal */}
      {selectedLiveDemo && (
        <Suspense fallback={null}>
          <LiveDemoModal
            project={selectedLiveDemo}
            projects={projects}
            onClose={() => setSelectedLiveDemo(null)}
            onSelectProject={(proj) => setSelectedLiveDemo(proj)}
            onOpen3D={(proj) => setSelectedProject3D(proj)}
          />
        </Suspense>
      )}

      {/* 3D Showcase Modal */}
      {selectedProject3D && (
        <Suspense fallback={null}>
          <ProjectShowcase3D
            project={selectedProject3D}
            onClose={() => setSelectedProject3D(null)}
            onOpenLiveDemo={(proj) => setSelectedLiveDemo(proj)}
          />
        </Suspense>
      )}
    </Section>
  );
}
