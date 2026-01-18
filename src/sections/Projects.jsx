import { useState } from "react";
import Section from "../components/ui/Section";
import { projects } from "../data/constants";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

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
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              activeCategory === category
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                : "bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500"
            }`}
          >
            {category}
          </button>
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
              className="glass-card glass-card-hover p-6 flex flex-col group relative overflow-hidden"
            >
               {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                        <div>
                             <span className="text-xs font-bold text-accent mb-2 block uppercase tracking-wider">{project.category}</span>
                             <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                 {project.name}
                             </h3>
                        </div>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                      {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
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
                        className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors hover:underline decoration-slate-500 underline-offset-4"
                      >
                        <Github size={18} /> Code
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-300 transition-colors ml-auto group/link"
                      >
                        Live Demo <ExternalLink size={18} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                  </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
