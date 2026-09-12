import React, { useState, useMemo } from 'react';
import Section from "../components/ui/Section";
import { skills } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Code2, Server, Database, Terminal, Wrench, Layers } from "lucide-react";
import Button3D from "../components/ui/Button3D";

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  databases: Database,
  languages: Terminal,
  tools: Wrench,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => [
    { key: "all", label: "All", count: skills.reduce((acc, cat) => acc + cat.skills.length, 0) },
    ...skills.map((cat) => ({
      key: cat.categoryKey || cat.title.toLowerCase().replace(/\s+/g, '-'),
      label: cat.title,
      count: cat.skills.length,
    })),
  ], []);

  const filteredCategories = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter(
      (cat) =>
        (cat.categoryKey || cat.title.toLowerCase().replace(/\s+/g, '-')) === activeCategory
    );
  }, [activeCategory]);

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case "Expert":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
      case "Advanced":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Proficient":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <Section id="skills" className="py-20 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">Tech Stack</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
          Core technologies, frameworks, and programming languages I utilize to craft full-stack web products and software solutions.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12 max-w-4xl mx-auto px-2">
        {categories.map((cat) => (
          <Button3D
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            variant={activeCategory === cat.key ? "primary" : "secondary"}
            size="sm"
          >
            {cat.label} <span className="ml-1 opacity-80 text-xs">({cat.count})</span>
          </Button3D>
        ))}
      </div>

      {/* Skills 3-Column Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-2"
      >
        <AnimatePresence>
          {filteredCategories.map((category) => {
            const CatIcon = categoryIcons[category.categoryKey] || Layers;

            return (
              <motion.div
                layout
                key={category.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="glass-card p-6 md:p-7 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl h-full flex flex-col justify-between relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
                  {/* Background Glow */}
                  <div
                    className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: category.color || "#3b82f6" }}
                  ></div>

                  <div>
                    {/* Category Card Header */}
                    <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-200/80 dark:border-white/10">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <CatIcon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {category.skills.length} Key Competencies
                        </span>
                      </div>
                    </div>

                    {/* Skill Items List */}
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-sm">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Level Badge */}
                            {skill.level && (
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${getLevelBadgeClass(
                                  skill.level
                                )}`}
                              >
                                {skill.level}
                              </span>
                            )}
                          </div>

                          {/* Animated Glowing Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percentage || 85}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
