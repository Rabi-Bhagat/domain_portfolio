import { useState } from "react";
import Section from "../components/ui/Section";
import { projects } from "../data/constants";
import { ExternalLink, Github, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button3D from "../components/ui/Button3D";
import TiltCard3D from "../components/ui/TiltCard3D";
import Lightbox from "../components/ui/Lightbox";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <Section id="projects" className="section-padding">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Showcasing my journey through code and creativity.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button3D
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "primary" : "secondary"}
            size="sm"
          >
            {category}
          </Button3D>
        ))}
      </div>

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard3D className="glass-card glass-card-hover flex flex-col group relative overflow-hidden h-full">
                {/* Screenshot */}
                <button
                  onClick={() => setActiveProject(project)}
                  className="relative block w-full aspect-video overflow-hidden cursor-zoom-in"
                  aria-label={`Preview ${project.name}`}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (e.target.src !== project.imageFallback) {
                        e.target.src = project.imageFallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/70 backdrop-blur border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={16} />
                  </span>
                </button>

                <div className="relative z-10 flex flex-col h-full p-6 pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-accent mb-2 block uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed flex-grow">
                    {project.desc}
                  </p>

                  {project.highlights && (
                    <ul className="mb-5 space-y-1.5">
                      {project.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-xs text-slate-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.split(", ").map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-800/50 rounded-full text-xs font-medium text-emerald-300 border border-emerald-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors hover:underline decoration-slate-500 underline-offset-4 pointer-events-auto"
                    >
                      <Github size={18} /> Code
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-300 transition-colors ml-auto group/link pointer-events-auto"
                    >
                      Live Demo <ExternalLink size={18} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <Lightbox
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
