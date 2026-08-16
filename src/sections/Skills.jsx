import Section from "../components/ui/Section";
import { skills } from "../data/constants";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <Section id="skills" className="py-20 relative z-10">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Skills</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
          Technologies, frameworks, and programming languages I work with every day.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Timeline Center Line (Visible on lg) */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-800/80 rounded-full" />

        {skills.map((category, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`relative mb-12 lg:mb-20 flex items-center ${
                isEven ? "justify-start" : "justify-end"
              } lg:gap-16`}
            >
              {/* Connector Dot */}
              <div
                className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 z-10 items-center justify-center shadow-lg"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color || "#3b82f6" }}></div>
              </div>

              {/* Content Card */}
              <div className="w-full lg:w-[calc(50%-2.5rem)] relative">
                <div
                  className="glass-card glass-card-hover p-6 md:p-8 group border-l-4 rounded-3xl shadow-xl transition-all"
                  style={{ borderLeftColor: category.color || "#3b82f6" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{category.desc}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-2.5 flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0">
                      <img
                        src={category.iconUrl}
                        alt={category.title}
                        loading="lazy"
                        decoding="async"
                        width="36"
                        height="36"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 transition-colors"
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          loading="lazy"
                          decoding="async"
                          width="24"
                          height="24"
                          className="w-6 h-6 object-contain shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm block truncate">
                            {skill.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-[11px] block truncate">
                            {skill.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
