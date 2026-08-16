import Section from "../components/ui/Section";
import { experience } from "../data/constants";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary">Education</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
          My academic foundation and software engineering journey.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative px-4">
        {/* Timeline Line (Vertical) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 md:translate-x-0"></div>

        <div className="space-y-12">
          {experience.map((item, index) => {
            const isEducation = item.role.includes("Student") || item.role.includes("B.Tech") || item.role.includes("Degree");
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-slate-900 -translate-x-1/2 md:-translate-x-1/2 mt-6 z-10 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 glass-card glass-card-hover p-6 md:p-8 group rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    {isEducation ? (
                      <GraduationCap className="text-secondary shrink-0" size={26} />
                    ) : (
                      <Briefcase className="text-primary shrink-0" size={26} />
                    )}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                  </div>

                  <h4 className="text-slate-700 dark:text-slate-200 font-semibold mb-3">
                    {item.company}
                  </h4>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-4">
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
