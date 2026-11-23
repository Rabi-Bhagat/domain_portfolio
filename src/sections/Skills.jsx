import { useState, useMemo } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import FilterPill from "../components/ui/FilterPill";
import { skills } from "../data/constants";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Server,
  Terminal,
  Wrench,
} from "lucide-react";

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  databases: Database,
  languages: Terminal,
  tools: Wrench,
};

function levelClass(level) {
  switch (level) {
    case "Expert":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400";
    case "Advanced":
      return "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400";
    case "Proficient":
      return "bg-secondary/10 text-secondary border-secondary/30";
    default:
      return "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400";
  }
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => [
      {
        key: "all",
        label: "All skills",
        count: skills.reduce((total, category) => total + category.skills.length, 0),
      },
      ...skills.map((category) => ({
        key: category.categoryKey || category.title.toLowerCase().replace(/\s+/g, "-"),
        label: category.title,
        count: category.skills.length,
      })),
    ],
    []
  );

  const filteredCategories = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter(
      (category) =>
        (category.categoryKey || category.title.toLowerCase().replace(/\s+/g, "-")) ===
        activeCategory
    );
  }, [activeCategory]);

  return (
    <Section id="skills" className="py-20 relative z-10">
      <SectionHeading
        eyebrow="Capabilities"
        title="Skills &"
        highlight="Tech Stack"
        subtitle="Core technologies, frameworks, and languages I use to ship full-stack products and software solutions."
      />

      <div
        className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-2.5 px-2"
        role="group"
        aria-label="Filter skills by category"
      >
        {categories.map((category) => (
          <FilterPill
            key={category.key}
            active={activeCategory === category.key}
            onClick={() => setActiveCategory(category.key)}
            layoutId="skills-filter-pill"
          >
            {category.label}
            <span className="text-[10px] opacity-75">({category.count})</span>
          </FilterPill>
        ))}
      </div>

      <motion.div layout className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-2 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category) => {
            const CategoryIcon = categoryIcons[category.categoryKey] || Layers;

            return (
              <motion.div
                layout
                key={category.title}
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <SpotlightCard
                  className="glass-card h-full rounded-3xl border border-slate-200 p-6 shadow-xl transition-all duration-300 hover:border-primary/40 dark:border-white/10 md:p-7"
                  color={`${category.color || "#3b82f6"}22`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-6 flex items-center gap-3.5 border-b border-slate-200/80 pb-4 dark:border-white/10">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
                          style={{
                            backgroundColor: `${category.color || "#3b82f6"}18`,
                            borderColor: `${category.color || "#3b82f6"}40`,
                            color: category.color || "#3b82f6",
                          }}
                        >
                          <CategoryIcon size={22} />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                            {category.title}
                          </h3>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {category.skills.length} key competencies
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {category.skills.map((skill) => (
                          <div key={skill.name} className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2 text-sm">
                              <div className="flex min-w-0 items-center gap-2">
                                <CheckCircle2 size={15} className="shrink-0 text-primary" />
                                <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
                                  {skill.name}
                                </span>
                              </div>

                              <div className="flex shrink-0 items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400">
                                  {skill.percentage || 85}%
                                </span>
                                {skill.level && (
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${levelClass(
                                      skill.level
                                    )}`}
                                  >
                                    {skill.level}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                              <motion.div
                                initial={reduce ? false : { width: 0 }}
                                whileInView={{ width: `${skill.percentage || 85}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500 shadow-[0_0_10px_rgba(59,130,246,0.55)]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
